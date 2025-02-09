"use server";

import { db } from "@/lib/db";
import { ContactFormData } from "@/public/schemas";

export async function submitContactForm(data: ContactFormData) {
  try {
    await db.contactSubmission.create({
      data,
    });
    await db.$disconnect();

    return { success: true, message: "The form was successfully submitted" };
  } catch (error) {
    return { success: false, message: "Failed to submit the form" };
  }
}
