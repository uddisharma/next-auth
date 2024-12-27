
import { apiPermissionMiddleware } from '@/lib/apiPermissionMiddleware';
import { Resource } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default apiPermissionMiddleware(Resource.BLOGS)
{
    async (req: NextApiRequest, res: NextApiResponse) => {
        switch (req.method) {
            case 'GET':
                handleGet(req, res);
            case 'POST':
                handlePost(req, res);
            case 'PUT':
                handlePut(req, res);
            case 'DELETE':
                handleDelete(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    };
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    // Logic for GET request
    res.status(200).json({ message: 'GET request handled' });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    // Logic for POST request
    res.status(201).json({ message: 'POST request handled' });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    // Logic for PUT request
    res.status(200).json({ message: 'PUT request handled' });
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    // Logic for DELETE request
    res.status(200).json({ message: 'DELETE request handled' });
}

