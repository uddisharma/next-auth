"use server";

import { db } from "@/lib/db";

export const Subscribe = async (email: string) => {
  try {
    const isExist = await db?.newsLetter?.findFirst({
      where: {
        email,
      },
    });

    if (isExist) {
      return { success: false, message: "Email already exists" };
    }

    await db?.newsLetter?.create({
      data: {
        email,
      },
    });

    return { success: true, message: "Thanks for subscribing !" };
  } catch (error) {
    return { success: false, message: "Failed to subscribe" };
  }
};
