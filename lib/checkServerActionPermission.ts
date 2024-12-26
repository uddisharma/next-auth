import { getPermissions } from './permissions';
import { UserRole, Resource } from '@prisma/client';

type PermissionType = 'create' | 'read' | 'update' | 'delete';

export async function checkServerActionPermission(
  userRole: UserRole,
  resource: Resource,
  action: PermissionType
) {
  const permissions = await getPermissions(userRole, resource);

  switch (action) {
    case 'create':
      return permissions.canCreate;
    case 'read':
      return permissions.canRead;
    case 'update':
      return permissions.canUpdate;
    case 'delete':
      return permissions.canDelete;
    default:
      return false;
  }
}

