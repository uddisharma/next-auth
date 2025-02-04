import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema, LoginWithPhoneSchema } from "@/public/schemas";
import { getUserByEmailorPhone, getUserByPhone } from "@/data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password,
            );

            if (passwordsMatch) return user;
          }
        }

        if (credentials.loginType === "PHONE") {
          const validatedPhoneFields =
            LoginWithPhoneSchema.safeParse(credentials);
          if (validatedPhoneFields.success) {
            const { phone } = validatedPhoneFields.data;
            let user = await getUserByPhone(phone);

            if (!user) return null;

            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
