'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { updatePermissions } from '@/actions/permissions'
import { Resource, UserRole } from '@prisma/client'
import { fetchPermissions } from '@/actions/permissions'

type PermissionKey = 'canCreate' | 'canRead' | 'canUpdate' | 'canDelete'

export default function PermissionsManager() {
  const [permissions, setPermissions] = useState<Record<string, Record<PermissionKey, boolean>>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPermissions = async () => {
      const result = await fetchPermissions()
      if (result.success) {
        const formattedPermissions: Record<string, Record<PermissionKey, boolean>> = {}
        result?.data?.forEach((permission) => {
          formattedPermissions[`${permission.role}-${permission.resource}`] = {
            canCreate: permission.canCreate,
            canRead: permission.canRead,
            canUpdate: permission.canUpdate,
            canDelete: permission.canDelete,
          }
        })
        setPermissions(formattedPermissions)
      } else {
        toast.error("Failed to load permissions. Please try again.")
      }
      setIsLoading(false)
    }

    loadPermissions()
  }, [])

  const handlePermissionChange = (role: string, resource: string, permission: PermissionKey) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [`${role}-${resource}`]: {
        ...prevPermissions[`${role}-${resource}`],
        [permission]: !prevPermissions[`${role}-${resource}`]?.[permission]
      }
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const permissionsArray = Object.entries(permissions).map(([key, value]) => {
      const [role, resource] = key.split('-')
      return {
        role,
        resource,
        ...value
      }
    })

    const result = await updatePermissions(permissionsArray)
    setIsSaving(false)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  if (isLoading) {
    return <div>Loading permissions...</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Permissions Manager</CardTitle>
        <CardDescription>Manage user roles and resource permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-250px)] w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="w-[150px] font-semibold">Role</TableHead>
                  <TableHead className="w-[150px] font-semibold">Resource</TableHead>
                  <TableHead className="text-center font-semibold">Create</TableHead>
                  <TableHead className="text-center font-semibold">Read</TableHead>
                  <TableHead className="text-center font-semibold">Update</TableHead>
                  <TableHead className="text-center font-semibold">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(UserRole).map(role =>
                  Object.values(Resource).map(resource => (
                    <TableRow key={`${role}-${resource}`} className="hover:bg-muted/50 border-b last:border-b-0">
                      <TableCell className="font-medium border-r">
                        <Badge variant="outline" className="text-xs font-semibold">
                          {role.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r">
                        <Badge variant="secondary" className="text-xs">
                          {resource}
                        </Badge>
                      </TableCell>
                      {(['canCreate', 'canRead', 'canUpdate', 'canDelete'] as const).map((permission, index) => (
                        <TableCell key={permission} className={`text-center ${index < 3 ? 'border-r' : ''}`}>
                          <Checkbox
                            checked={permissions[`${role}-${resource}`]?.[permission] || false}
                            onCheckedChange={() => handlePermissionChange(role, resource, permission)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  )
}

