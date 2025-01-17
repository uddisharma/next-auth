"use server";
import { db } from "@/lib/db";
import { z } from "zod";

const SubscribeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

type SubscribeSchema = z.infer<typeof SubscribeSchema>;

export async function subscribe(values: SubscribeSchema) {
  try {
    const { name: validatedName, phone: validatedPhone } =
      SubscribeSchema.parse(values);

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
