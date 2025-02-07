"use server";
import { verifyOTP } from "@/data/verifyOtp";
import { db } from "@/lib/db";
import { sendVerificationOTP } from "@/lib/mail";
import { generateOtp } from "@/lib/otp";
import { z } from "zod";

export async function EmailVerification(phone: string, email: string) {
  try {
    const existingUserwithEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserwithEmail) {
      return { success: false, message: "Email already exists" };
    }

    const existingUser = await db.user.findUnique({
      where: { phone },
    });

    if (!existingUser) {
      return { success: false, message: "User not found" };
    }

    const { otp, otpExpires } = await generateOtp();

    const response = await sendVerificationOTP(email, otp);

    if (!response?.success) return response;

    await db.user.update({
      where: { phone },
      data: {
        email,
        otp,
        otpExpires,
      },
    });
    return { success: true, message: "OTP sent successfully" + " " + otp };
  } catch (error) {
    // @ts-ignore
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "An error occurred. Please try again." };
  }
}

export async function VerifyEmail(email: string, otp: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isValid = await verifyOTP(user.id, Number(otp));

    if (!isValid) {
      return { success: false, message: "Invalid OTP" };
    }

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    return { success: false, message: "An error occurred. Please try again." };
  }
}
