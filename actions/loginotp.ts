"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginWithPhoneSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmailorPhone } from "@/data/user";
import { verifyOTP } from "@/data/verifyOtp";

export const loginOTP = async (
    values: z.infer<typeof LoginWithPhoneSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = LoginWithPhoneSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { phone, otp, email } = validatedFields.data;


    const user = await getUserByEmailorPhone(email);

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
