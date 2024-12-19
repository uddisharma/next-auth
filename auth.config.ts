import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmailorPhone(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    Credentials({
      id: "mobile-otp",
      name: "Mobile OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
        email: { label: "Email", type: "email" },
        isSignup: { label: "Is Signup", type: "boolean" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) {
          throw new Error("Phone and OTP are required");
        }

        const user = await db.user.findUnique({
          where: { phone: String(credentials.phone) },
        });

        if (!user && !credentials.isSignup) {
          return null;
        }

        const isValid = await verifyOTP(
          user ? user.id : "",
          Number(credentials.otp),
        );

        if (!isValid) {
          throw new Error("Invalid OTP");
        }

        if (!user && credentials.isSignup) {

          const newUser = await db.user.create({
            data: {
              phone: String(credentials.phone),
              loginType: "PHONE",
              email: String(credentials.email),
            },
          });
          return { ...newUser, id: newUser.id.toString() };
        }

        return user ? { ...user, id: user.id.toString() } : null;
      },
    })
  ],
} satisfies NextAuthConfig;
