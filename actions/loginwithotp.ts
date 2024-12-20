"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const LoginWithOtp = async (otp: string) => {

    try {
      const data =  await signIn("mobile-otp", {
            phone: "7015713717",
            otp,
            email: "deepak2024@visions.net.in",
            isSignup: false,
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
