import ReportForm from "@/components/ReportForm";
import { db } from "@/lib/db";

export default async function SubmitReportPage() {

  const activeQuestions = await db.question.findMany({
    // where: { isActive: true },
    include: { options: true },
    orderBy: { sequence: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Submit Report</h1>
      <ReportForm
        questions={activeQuestions}
        userId={3}
      />
    </div>
  );
}
