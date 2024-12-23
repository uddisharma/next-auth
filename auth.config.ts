import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema, LoginWithPhoneSchema } from "@/schemas";
import { getUserByEmailorPhone } from "@/data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";
import { verifyOTP } from "./data/verifyOtp";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (credentials.loginType === "EMAIL") {
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmailorPhone(email);

            if (!user || !user.password) return null;

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) return user;
          }
        }

        if (credentials.loginType === "PHONE") {
          const validatedPhoneFields = LoginWithPhoneSchema.safeParse(credentials);

          if (validatedPhoneFields.success) {

            const { email, phone, otp } = validatedPhoneFields.data;

            const user = await getUserByEmailorPhone(email);

            if (!user) {
              return null;
            }

            const isValid = await verifyOTP(user.id, Number(otp));
            if (!isValid) {
              throw new Error("Invalid OTP");
              
            }

            return user
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
