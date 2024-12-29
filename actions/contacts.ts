'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    const submission = await db.contactSubmission.create({
        data: { name, email, message },
    })

    revalidatePath('/admin/contact-submissions')
    return submission
}

export async function getContactSubmissions(
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = ''
) {
    const skip = (page - 1) * pageSize

    const [submissions, totalCount] = await Promise.all([
        db.contactSubmission.findMany({
            where: {
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { email: { contains: searchTerm, mode: 'insensitive' } },
                ],
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: pageSize,
        }),
        db.contactSubmission.count({
            where: {
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { email: { contains: searchTerm, mode: 'insensitive' } },
                ],
            },
        }),
    ])

    return { submissions, totalCount, totalPages: Math.ceil(totalCount / pageSize) }
}
