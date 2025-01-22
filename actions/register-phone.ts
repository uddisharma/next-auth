"use server";

import { RegisterWithOtpSchema, RegisterWithOtpSchemaData } from "@/schemas";
import { db } from "@/lib/db";
import { generateOtp } from "@/lib/otp";
import { sendSMS } from "@/lib/sms";

export const registerWithOTP = async (values: RegisterWithOtpSchemaData) => {
  const validatedFields = RegisterWithOtpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
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

  await sendSMS(phone, `Your OTP for signup is: ${otp}`);

  return { sucess: "OTP sent successfully " + otp };
};
