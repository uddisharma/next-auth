"use server";

import bcrypt from "bcrypt";
import {
  RegisterSchema,
  RegisterSchemaData,
  RegularRegister,
  RegularRegisterData,
} from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmailorPhone, getUserByPhone } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn } from "@/auth";
import { Gender } from "@prisma/client";

export const register = async (values: RegisterSchemaData) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmailorPhone(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { sucess: "Confirmation email sent!" };
};

export const regularRegister = async (values: RegularRegisterData) => {
  try {
    const validatedFields = RegularRegister.safeParse(values);

    if (!validatedFields.success) {
      return { success: false, message: "Invalid fields!" };
    }
    const { name, email, phone } = validatedFields?.data;

    const User = await getUserByPhone(phone);

    if (!User) {
      return { success: false, message: "User not found!" };
    }

    if (User?.signUpSuccess) {
      return { success: false, message: "User already registered!" };
    }

    await db.user.update({
      where: { id: User.id },
      data: {
        name,
        email,
        phone,
        gender: validatedFields.data.gender as Gender,
        signUpSuccess: true,
      },
    });

    await signIn("credentials", {
      redirect: false,
      phone: validatedFields.data.phone,
      otp: "789456",
      loginType: "PHONE",
    });
    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    // @ts-ignore
    console.log(error?.message);
    return { success: false, message: "An error occurred. Please try again." };
  }
};
