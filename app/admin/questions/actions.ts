"use server";

import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";
import {db} from "@/lib/db";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { questionSchema, type QuestionFormData } from "@/schemas";

export async function addQuestion(questionData: QuestionFormData) {
  // const session = await getServerSession(authOptions);
  // if (
  //   !session ||
  //   (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  // ) {
  //   throw new Error("Unauthorized");
  // }

  const validatedData = questionSchema.parse(questionData);

  const { options, ...questionFields } = validatedData;

  const question = await db.question.create({
    data: {
      ...questionFields,
      options: {
        create: options,
      },
    },
  });

  revalidatePath("/admin/questions");
  return question;
}

export async function updateQuestion(
  id: number,
  questionData: QuestionFormData,
) {
  // const session = await getServerSession(authOptions);
  // if (
  //   !session ||
  //   (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  // ) {
  //   throw new Error("Unauthorized");
  // }

  const validatedData = questionSchema.parse(questionData);

  const { options, ...questionFields } = validatedData;

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

  revalidatePath("/admin/questions");
  revalidatePath(`/admin/questions/${id}`);
  return question;
}

export const getQuestions = unstable_cache(
  async () => {
    return db.question.findMany({
      orderBy: { sequence: "asc" },
      include: { options: true },
    });
  },
  ["questions"],
  { revalidate: 60 }, // Revalidate every 60 seconds
);
