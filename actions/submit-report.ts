"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { reportSchema, type ReportFormData } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";

export async function submitReport(reportData: ReportFormData) {
  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login");
  }

  const hasPermission = await checkPermission(
    session?.role,
    Resource.REPORTS,
    "create",
  );

  if (!hasPermission) {
    return { message: "You don't have permission to submit a report" };
  }

  const validatedData = reportSchema.parse(reportData);

  let { questions } = validatedData;

  try {
    const report = await db.report.create({
      data: {
        userId: session?.id,
        startTime: new Date(),
        endTime: new Date(),
        sessionId: session.id,
        recommendation: {},
        questions,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/reports");
    return report;
  } catch (error) {
    console.error("Error submitting report:", error);
  }
}

export async function getReports() {
  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login");
  }

  const hasPermission = await checkPermission(
    session?.role,
    Resource.REPORTS,
    "read",
  );

  if (!hasPermission) {
    return { message: "You don't have permission to read reports" };
  }

  return db.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}
