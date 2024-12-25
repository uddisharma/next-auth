"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type UserData = {
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
}

export async function updateProfile(userData: UserData) {
    const session = await currentUser();

    if (!session) {
        return redirect("/auth/login");
    }

    const updatedUser = await db.user.update({
        where: { id: session.id },
        data: userData,
    });

    revalidatePath("/profile");
    return updatedUser;
}

export async function deleteProfile() {

    const session = await currentUser();
    if (!session) {
        return redirect("/auth/login");
    }

    await db.user.delete({
        where: { id: session.id },
    });

    revalidatePath("/profile");
}
