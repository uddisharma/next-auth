"use server";

import * as z from "zod";
import { RegisterWithOtpSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmailorPhone } from "@/data/user";

async function sendSMS(phone: string, message: string): Promise<void> {
    console.log(`Sending SMS to ${phone}: ${message}`);
}

export const registerWithOTP = async (values: z.infer<typeof RegisterWithOtpSchema>) => {
    const validatedFields = RegisterWithOtpSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, name, phone } = validatedFields.data;

    const existingUser = await getUserByEmailorPhone(email, phone);

    if (existingUser) {
        return { error: "Email or Phone already in use!" };
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await db.user.create({
        data: {
            name,
            email,
            phone,
            otp,
            otpExpires,
            loginType: "PHONE",
        },
    });

    await sendSMS(phone, `Your OTP for signup is: ${otp}`);

    return { sucess: "OTP sent successfully" };
};
