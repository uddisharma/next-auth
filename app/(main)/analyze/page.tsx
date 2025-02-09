import MultiStepForm from "@/components/others/analysis";
import { db } from "@/lib/db";
import React from "react";

const Page = async () => {
  const questions = await db.question.findMany({
    where: { isActive: true },
    include: { options: true },
    orderBy: { sequence: "asc" },
  });
  await db.$disconnect();

  return (
    <div>
      <MultiStepForm data={questions} />
    </div>
  );
};

export default Page;
