"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { reportSchema, type ReportFormData } from "@/schemas";
import { currentUser } from "@/lib/auth";

export async function submitReport(reportData: ReportFormData) {
  const session = await currentUser();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const validatedData = reportSchema.parse(reportData);

  let { userId, questions } = validatedData;
  userId = Number(userId);

  try {
    const report = await db.report.create({
      data: {
        userId: userId.toString(),
        startTime: new Date(),
        endTime: new Date(),
        sessionId: session.id,
        recommendation: {},
        questions: questions,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/reports");
    return report;
  } catch (error) {
    console.error("Error submitting report:", error);
    throw new Error("Failed to submit report");
  }
}

export async function getReports() {
  return db.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}
