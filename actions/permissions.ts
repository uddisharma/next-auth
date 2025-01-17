"use server";

import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePermissions(
  permissions: {
    role: string;
    resource: string;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[],
) {
  try {
    const userRole = await currentRole();

    if (!userRole) {
      return redirect("/auth/login");
    }

    if (userRole !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "You do not have permission to update permissions",
      };
    }

    const updatePromises = permissions.map(async (permission) => {
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
    return { success: true, message: "Permissions updated successfully" };
  } catch (error) {
    console.error("Error updating permissions:", error);
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
  { revalidate: 60 }, // Revalidate every 60 seconds
);
