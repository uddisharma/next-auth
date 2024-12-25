"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateAdminProfile(userId: string, userData: any) {
  // const session = await getServerSession(authOptions);
  // if (
  //   !session ||
  //   session.user.id !== userId.toString() ||
  //   (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  // ) {
  //   throw new Error("Unauthorized");
  // }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: userData,
  });

  revalidatePath("/admin/profile");
  return updatedUser;
}