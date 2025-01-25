"use server";

import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { permissions } from "@/schemas/types";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePermissions(permissions: permissions[]) {
  try {
    const userRole = await currentRole();

    if (!userRole) {
      return redirect("/auth");
    }

    if (userRole !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "You do not have permission to update permissions",
      };
    }

    await processPermissionsInBatches(permissions, 12, db);

    return { success: true, message: "Permissions updated successfully" };
  } catch (error: any) {
    console.error("Error updating permissions:", error?.message);
    return { success: false, message: "Failed to update permissions" };
  }
}

export const fetchPermissions = unstable_cache(
  async () => {
    try {
      const permissions = await db.permission.findMany();
      return { success: true, data: permissions };
    } catch (error) {
      console.error("Error fetching permissions:", error);
      return { success: false, error: "Failed to fetch permissions" };
    }
  },
  ["blogs"],
  { revalidate: 60 },
);

const processPermissionsInBatches = async (
  permissions: permissions[],
  batchSize: number,
  db: any,
) => {
  const chunkArray = (arr: any[], size: number) => {
    return arr.reduce((chunks, item, i) => {
      const chunkIndex = Math.floor(i / size);
      if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
      chunks[chunkIndex].push(item);
      return chunks;
    }, [] as any[][]);
  };

  const permissionBatches = chunkArray(permissions, batchSize);

  for (const batch of permissionBatches) {
    if (!db.$isConnected) {
      await db.$connect();
    }

    const updatePromises = batch.map(async (permission: permissions) => {
      await db.permission.upsert({
        where: {
          role_resource: {
            role: permission.role as any,
            resource: permission.resource as any,
          },
        },
        update: {
          canCreate: permission.canCreate,
          canRead: permission.canRead,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete,
        },
        create: {
          role: permission.role as any,
          resource: permission.resource as any,
          canCreate: permission.canCreate,
          canRead: permission.canRead,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete,
        },
      });
    });

    await Promise.all(updatePromises);
    await db.$disconnect();
  }
};
