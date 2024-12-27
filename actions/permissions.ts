'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updatePermissions(permissions: {
  role: string
  resource: string
  canCreate: boolean
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
}[]) {
  try {
    const updatePromises = permissions.map(async (permission) => {
      await prisma.permission.upsert({
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
      })
    })

    await Promise.all(updatePromises)
    return { success: true, message: 'Permissions updated successfully' }
  } catch (error) {
    console.error('Error updating permissions:', error)
    return { success: false, message: 'Failed to update permissions' }
  }
}

