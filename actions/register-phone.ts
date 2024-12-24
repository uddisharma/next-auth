"use server";

import * as z from "zod";
import { RegisterWithOtpSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmailorPhone } from "@/data/user";
import { generateOtp } from "@/lib/otp";
import { sendSMS } from "@/lib/sms";

export const registerWithOTP = async (values: z.infer<typeof RegisterWithOtpSchema>) => {
    const validatedFields = RegisterWithOtpSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, name, phone } = validatedFields.data;

    const existingUser = await getUserByEmailorPhone(email, phone);

    if(existingUser?.email==email &&existingUser.phone==phone){
        return {error:'Email and Phone both are already in use!'}
    }

    if(existingUser?.email==email){
        return{ error:"Email already in use!"}
    }

    if(existingUser?.phone==phone){
        return {error:"Phone already in use!"}
    }

    const { otp, otpExpires } = generateOtp()

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
