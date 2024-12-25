"use server";

import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { QuestionFormValues, QuestionSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export async function addQuestion(questionData: QuestionFormValues) {
    const session = await currentUser();

    if (
        !session ||
        (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
    ) {
        throw new Error("Unauthorized");
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

    revalidatePath("/admin/questions");
    return question;
}

export async function updateQuestion(
    id: number,
    questionData: QuestionFormValues,
) {
    const session = await currentUser();

    if (
        !session ||
        (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
    ) {
        throw new Error("Unauthorized");
    }

    const validatedData = QuestionSchema.parse(questionData);

    const { options, ...questionFields } = validatedData;

    const existingQuestion = await db.question.findFirst({
        where: { sequence: questionFields.sequence },
    });

    if (existingQuestion) {
        return { message: "Question with this sequence already exists" };
    }

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
