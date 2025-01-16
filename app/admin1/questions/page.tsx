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
import { db } from "@/lib/db";
import QuestionActions from "@/components/admin/actions/questions";
import SearchInput from "@/components/others/SearchInput";
import { Prisma, Resource } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkPermission } from "@/lib/checkPermission";
import { FormError } from "@/components/others/form-error";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function QuestionsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where: Prisma.QuestionWhereInput = search
    ? {
      text: {
        contains: search,
        mode: "insensitive" as Prisma.QueryMode,
      },
    }
    : {};

  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login")
  }

  const hasPermission = await checkPermission(session?.role, Resource.QUESTIONS, 'read');

  if (!hasPermission) {
    return <FormError message="You do not have permission to view this content!" />
  }

  const questions = await db.question.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { sequence: "asc" },
    include: { options: true },
  });

  const totalQuestions = await db.question.count();
  const totalPages = Math.ceil(totalQuestions / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Questions</h1>
        <Link href="/admin/questions/new">
          <Button>Add New Question</Button>
        </Link>
      </div>

      <div className="mb-4">
        <SearchInput defaultValue={search} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sequence</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.sequence}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>{question.questionType}</TableCell>
              <TableCell>
                <QuestionActions question={question} />
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
            <Link href={`/admin/questions?page=${page - 1}`}>
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/admin/questions?page=${page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
