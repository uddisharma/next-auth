"use server";
import { db } from "@/lib/db";
import { LeadsSchema, LeadsSchemaData } from "@/public/schemas";
import { z } from "zod";

export async function subscribe(values: LeadsSchemaData) {
  try {
    const { name: validatedName, phone: validatedPhone } =
      LeadsSchema.parse(values);

    const existingLead = await db.leads.findUnique({
      where: { phone: validatedPhone },
    });

    if (existingLead) {
      return {
        success: false,
        message: "This phone number is already subscribed.",
      };
    }

    await db.leads.create({
      data: {
        name: validatedName,
        phone: validatedPhone,
      },
    });

    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "An error occurred. Please try again." };
  }
}
