import { NextApiRequest, NextApiResponse } from 'next';
import { getPermissions } from './permissions';
import { Resource } from '@prisma/client';
import { currentRole } from './auth';
import { NextResponse } from 'next/server';

export function apiPermissionMiddleware(resource: Resource) {
    return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
        const userRole = await currentRole();

        if (!userRole) {
            return new NextResponse(null, { status: 403 });
        }

        const permissions = await getPermissions(userRole, resource);

        const method = req.method?.toLowerCase();
        if (
            (method === 'get' && !permissions.canRead) ||
            (method === 'post' && !permissions.canCreate) ||
            (method === 'put' && !permissions.canUpdate) ||
            (method === 'delete' && !permissions.canDelete)
        ) {
            return new NextResponse(null, { status: 403 });
        }

        next();
    };
}

