import MultiStepForm from "@/components/others/Analysis";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const Page = async () => {
  const questions = await db.question.findMany({
    where: { isActive: true },
    include: { options: true },
    orderBy: { sequence: "asc" },
  });

  return (
    <div>
      <MultiStepForm data={questions} />
    </div>
  );
};

export default Page;
