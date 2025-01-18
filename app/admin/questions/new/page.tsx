import QuestionForm from "@/components/others/QuestionForm";

export default function NewQuestionPage() {
  return (
    <main className="p-4 sm:p-6 ">
      <h1 className="text-2xl font-semibold mb-6">Add New Question</h1>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-[1px] border-whiteGray">
        <QuestionForm />
      </div>
    </main>
  );
}
