import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import QuestionForm from "@/components/QuestionForm";

interface PageProps {
  params: { id: string };
}

export default async function EditQuestionPage({ params }: PageProps) {
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
