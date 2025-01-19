import MultiStepForm from "@/components/others/Analysis";
import { db } from "@/lib/db";
import React from "react";

const Page = async () => {
  const activeQuestions = await db.question.findMany({
    where: { isActive: true },
    include: { options: true },
    orderBy: { sequence: "asc" },
  });

  return (
    <div>
      <MultiStepForm dummyData={activeQuestions} />
    </div>
  );
};

export default Page;
