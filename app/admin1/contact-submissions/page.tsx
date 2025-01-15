import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Prisma } from '@prisma/client'
import SearchInput from "@/components/others/SearchInput";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkPermission } from "@/lib/checkPermission";
import { FormError } from "@/components/others/form-error";
import { db } from "@/lib/db";
import ContactActions from "@/components/others/ContactActions";

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SubmissionsPage({ searchParams }: PageProps) {
    const page = Number(searchParams.page) || 1;
    const limit = 1;
    const search =
        typeof searchParams.search === "string" ? searchParams.search : undefined;

    const where: Prisma.ContactSubmissionWhereInput = search
        ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
            ],
        }
        : {};

    const session = await currentUser();

    if (!session) {
        return redirect("/auth/login")
    }

    const hasPermission = await checkPermission(session?.role, 'CONTACT_SUBMISSIONS', 'read');

    if (!hasPermission) {
        return <FormError message="You do not have permission to view this content!" />
    }

    const submissions = await db.contactSubmission.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
    });

    const totalSubmissions = await db.contactSubmission.count({ where });
    const totalPages = Math.ceil(totalSubmissions / limit);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Contact Form Submissions</h1>
            </div>

            <div className="mb-4">
                <SearchInput />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell>{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.message}</TableCell>
                            <TableCell>
                                {new Date(submission.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <ContactActions contact={{ id: submission.id, name: submission.name }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-4 flex justify-between items-center">
                <div>
                    Page {page} of {totalPages}
                </div>
                <div>
                    {page > 1 && (
                        <Link href={`/admin/contact-submissions?page=${page - 1}&search=${search || ''}`}>
                            <Button variant="outline" className="mr-2">
                                Previous
                            </Button>
                        </Link>
                    )}
                    {page < totalPages && (
                        <Link href={`/admin/contact-submissions?page=${page + 1}&search=${search || ''}`}>
                            <Button variant="outline">Next</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

