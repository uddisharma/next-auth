"use server";

import { db } from "@/lib/db";
import { ContactSubmissionFormData } from "@/schemas";

export async function submitContactForm(data: ContactSubmissionFormData) {
  try {
    const { name, email, message } = data;

    await db.contactSubmission.create({
      data: { name, email, message },
    });

    return { success: "The form was successfully submitted" };
  } catch (error) {
    return { error: "Failed to submit the form" };
  }
}

export async function getContactSubmissions(
  page: number = 1,
  pageSize: number = 10,
  searchTerm: string = "",
) {
  const skip = (page - 1) * pageSize;

  const [submissions, totalCount] = await Promise.all([
    db.contactSubmission.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    db.contactSubmission.count({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return {
    submissions,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}
