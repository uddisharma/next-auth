"use server";

import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { userSchema, type UserFormData } from "@/schemas";
import { currentUser } from "@/lib/auth";

export async function addUser(userData: UserFormData) {
  const session = await currentUser();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const validatedData = userSchema.parse(userData);

  const user = await db.user.create({
    data: validatedData,
  });

  revalidatePath("/admin/users");
  return user;
}

export async function updateUser(userId: string, userData: UserFormData) {
  const session = await currentUser();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const validatedData = userSchema.parse(userData);

  const user = await db.user.update({
    where: { id: userId },
    data: validatedData,
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  return user;
}

export const getUsers = unstable_cache(
  async () => {
    return db.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["users"],
  { revalidate: 60 }, // Revalidate every 60 seconds
);
