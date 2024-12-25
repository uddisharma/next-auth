"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function updateAdminProfile(userId: string, userData: any) {

    const session = await currentUser();

    if (
        !session ||
        (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
    ) {
        return redirect("/auth/login")
    }

    const updatedUser = await db.user.update({
        where: { id: userId },
        data: userData,
    });

    revalidatePath("/admin/profile");
    return updatedUser;
}
