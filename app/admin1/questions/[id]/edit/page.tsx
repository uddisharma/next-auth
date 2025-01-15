import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import QuestionForm from "@/components/others/QuestionForm";
import { currentUser } from "@/lib/auth";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";
import { FormError } from "@/components/others/form-error";

interface PageProps {
  params: { id: string };
}

export default async function EditQuestionPage({ params }: PageProps) {

  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login")
  }

  const hasPermission = await checkPermission(session?.role, Resource.QUESTIONS, 'read');

  if (!hasPermission) {
    return <FormError message="You do not have permission to view this content!" />
  }

  const question = await db.question.findUnique({
    where: { id: parseInt(params.id) },
    include: { options: true },
  });

  if (!question) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Question</h1>
      <QuestionForm question={question} />
    </div>
  );
}
