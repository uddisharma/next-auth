"use server";

import {
  RegisterWithOtpSchema,
  RegisterWithOtpSchemaData,
} from "@/public/schemas";
import { db } from "@/lib/db";
import { generateOtp } from "@/lib/otp";
import { sendSMS } from "@/lib/sms";

export const registerWithOTP = async (values: RegisterWithOtpSchemaData) => {
  try {
    const validatedFields = RegisterWithOtpSchema.safeParse(values);

    if (!validatedFields.success) {
      return { success: false, message: "Invalid fields!" };
    }

    const { phone } = validatedFields.data;

    const { otp, otpExpires } = generateOtp();

    await db.user.upsert({
      where: {
        phone,
      },
      update: {
        phone,
        otp,
        otpExpires,
      },
      create: {
        phone,
        otp,
        otpExpires,
        loginType: "PHONE",
      },
    });

    // await sendSMS(phone, `Your OTP for signup is: ${otp}`);

    return { success: true, message: "OTP sent successfully " + otp };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
