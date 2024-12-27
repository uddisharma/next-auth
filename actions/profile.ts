"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";

export async function updateAdminProfile(userId: string, userData: any) {

    const session = await currentUser();

    if (!session) {
        return redirect("/auth/login")
    }

    const hasPermission = await checkPermission(session?.role, Resource.USERS, 'update');

    if (!hasPermission) {
        return { message: "You don't have permission to update this profile" };
    }

    const updatedUser = await db.user.update({
        where: { id: userId },
        data: userData,
    });

    revalidatePath("/admin/profile");
    return updatedUser;
}


