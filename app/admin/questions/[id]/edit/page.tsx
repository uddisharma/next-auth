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
    return redirect("/auth");
  }

  const hasPermission = await checkPermission(
    session?.role,
    Resource.QUESTIONS,
    "read",
  );

  if (!hasPermission) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  const question = await db.question.findUnique({
    where: { id: parseInt(params.id) },
    include: { options: true },
  });
  await db.$disconnect();

  if (!question) {
    notFound();
  }

  return (
    <main className="p-4 sm:p-6 ">
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-[1px] border-whiteGray">
        <QuestionForm question={question} />
      </div>
    </main>
  );
}
