"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginWithPhoneSchema, PhoneSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmailorPhone, getUserByPhone } from "@/data/user";
import { verifyOTP } from "@/data/verifyOtp";
import { db } from "@/lib/db";
import { generateOtp } from "@/lib/otp";

export const loginOTP = async (
    values: z.infer<typeof LoginWithPhoneSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = LoginWithPhoneSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { phone, otp, email } = validatedFields.data;

    let user = null;

    if (email == "") {
        user = await getUserByPhone(phone)
    } else {
        user = await getUserByEmailorPhone(email, phone);
    }

    if (!user) {
        return { error: "User not found!" };
    }

    const isValid = await verifyOTP(user.id, Number(otp));

    if (!isValid) {
        return { error: "Invalid OTP!" };
    }

    try {
        await signIn("credentials", {
            email,
            phone,
            otp,
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            loginType: "PHONE"
        });

        return { success: "Login Sucess!" };
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
    }
};

export const sendOtpRequest = async (
    values: z.infer<typeof PhoneSchema>,
    callbackUrl?: string | null
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

    const { otp, otpExpires } = generateOtp()

    try {
        await db.user.update({
            where: { id: user.id },
            data: {
                otp,
                otpExpires
            },
        });
        return { success: "OTP sent successfully!" + " " + otp };

    } catch (error) {
        return { error: "Failed to send OTP" };
    }

};
