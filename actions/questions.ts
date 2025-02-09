"use server";

import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { QuestionFormValues, QuestionSchema } from "@/public/schemas";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Resource } from "@prisma/client";
import { checkPermission } from "@/lib/checkPermission";

export async function addQuestion(questionData: QuestionFormValues) {
  const session = await currentUser();

  if (!session) {
    return redirect("/auth");
  }

  const hasPermission = await checkPermission(
    session?.role,
    Resource.QUESTIONS,
    "create",
  );

  if (!hasPermission) {
    return { message: "You don't have permission to add a question" };
  }

  const validatedData = QuestionSchema.parse(questionData);

  const { options, ...questionFields } = validatedData;

  const existingQuestion = await db.question.findFirst({
    where: { sequence: questionFields.sequence },
  });

  if (existingQuestion) {
    return { message: "Question with this sequence already exists" };
  }

  const question = await db.question.create({
    data: {
      ...questionFields,
      options: {
        create: options,
      },
    },
  });
  await db.$disconnect();

  revalidatePath("/admin/questions");
  return question;
}

export async function updateQuestion(
  id: number,
  questionData: QuestionFormValues,
) {
  const session = await currentUser();

  if (!session) {
    return redirect("/auth");
  }

  const hasPermission = await checkPermission(
    session?.role,
    Resource.QUESTIONS,
    "update",
  );

  if (!hasPermission) {
    return { message: "You don't have permission to update this question" };
  }

  const validatedData = QuestionSchema.parse(questionData);

  const { options, ...questionFields } = validatedData;

  // const existingQuestion = await db.question.findFirst({
  //     where: { sequence: questionFields.sequence },
  // });

  // if (existingQuestion) {
  //     return { message: "Question with this sequence already exists" };
  // }

  const question = await db.question.update({
    where: { id },
    data: {
      ...questionFields,
      options: {
        deleteMany: {},
        create: options,
      },
    },
  });
  await db.$disconnect();

  revalidatePath("/admin/questions");
  revalidatePath(`/admin/questions/${id}`);
  return question;
}

export const getQuestions = unstable_cache(
  async () => {
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
      return { message: "You don't have permission to read questions" };
    }

    const questions = db.question.findMany({
      orderBy: { sequence: "asc" },
      include: { options: true },
    });
    await db.$disconnect();

    return questions;
  },
  ["questions"],
  { revalidate: 60 }, // Revalidate every 60 seconds
);
