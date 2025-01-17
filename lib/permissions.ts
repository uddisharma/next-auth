import { UserRole, Resource } from "@prisma/client";
import { db } from "./db";

export async function getPermissions(role: UserRole, resource: Resource) {
  const permission = await db.permission.findUnique({
    where: {
      role_resource: {
        role,
        resource,
      },
    },
  });

  return (
    permission || {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    }
  );
}
