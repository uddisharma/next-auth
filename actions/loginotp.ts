"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {
  LoginWithPhoneSchema,
  LoginWithPhoneSchemaData,
  PhoneSchema,
  PhoneSchemaData,
} from "@/public/schemas";
import { getUserByPhone } from "@/data/user";
import { verifyOTP } from "@/data/verifyOtp";
import { db } from "@/lib/db";
import { generateOtp } from "@/lib/otp";

export const loginOTP = async (values: LoginWithPhoneSchemaData) => {
  const validatedFields = LoginWithPhoneSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields!" };
  }

  const { phone, otp } = validatedFields.data;

  let user = await getUserByPhone(phone);

  if (!user) {
    return { success: false, redirect: false, message: "User not found!" };
  }

  const isValid = await verifyOTP(user.id, Number(otp));

  if (!isValid) {
    return { success: false, redirect: false, message: "Invalid OTP!" };
  }

  if (!user?.signUpSuccess) {
    return { success: false, redirect: true, message: "Signup first!" };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      phone,
      otp,
      loginType: "PHONE",
    });

    await db.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    });

    return { success: true, message: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  } finally {
    await db.$disconnect();
  }
};

export const sendOtpRequest = async (
  values: PhoneSchemaData,
  callbackUrl?: string | null,
) => {
  const validatedFields = PhoneSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { phone } = validatedFields.data;

  const user = await getUserByPhone(phone);

  if (!user) {
    return { error: "Phone number not found!" };
  }

  const { otp, otpExpires } = generateOtp();

  const response = await fetch(
    `https://www.fast2sms.com/dev/bulkV2?authorization=${process?.env.FAST2SMS_API_KEY}&route=dlt&sender_id=MRMOTP&message=179684&variables_values=${otp}%7C&flash=0&numbers=${phone}`,
  );

  if (!response.ok) {
    return { success: false, message: "Failed to send OTP" };
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        otp,
        otpExpires,
      },
    });
    return { success: "OTP sent successfully!" };
  } catch (error) {
    return { error: "Failed to send OTP" };
  } finally {
    await db.$disconnect();
  }
};
