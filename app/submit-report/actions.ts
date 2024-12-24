"use server";

import { revalidatePath } from "next/cache";
import {db} from "@/lib/db";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { reportSchema, type ReportFormData } from "@/schemas";

export async function submitReport(reportData: ReportFormData) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   throw new Error("Unauthorized");
  // }

  const validatedData = reportSchema.parse(reportData);

  let { userId, questions } = validatedData;
  userId = Number(userId);

  try {
    const report = await db.report.create({
      data: {
        userId: userId.toString(),
        startTime: new Date(),
        endTime: new Date(),
        sessionId: "", // Replace with actual session ID if available
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
