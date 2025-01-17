"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";
import { ProfileFormData, ProfileSchema, UserFormData } from "@/schemas";

type UserData = {
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
}

export async function updateProfile(userData: UserData) {

    const session = await currentUser();

    if (!session) {
        return redirect("/auth/login")
    }

    const hasPermission = await checkPermission(session?.role, Resource.USERS, 'update');

    if (!hasPermission) {
        return { message: "You don't have permission to update this profile" };
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
        return redirect("/auth/login")
    }

    const hasPermission = await checkPermission(session?.role, Resource.USERS, 'delete');

    if (!hasPermission) {
        return { message: "You don't have permission to delete this profile" };
    }

    await db.user.delete({
        where: { id: session.id },
    });

    revalidatePath("/profile");
}

export async function updateAdminProfile(data: ProfileFormData) {
    const validatedData = ProfileSchema.parse(data);

    const session = await currentUser();

    if (!session) {
        return redirect("/auth/login")
    }

    try {
        await db.user.update({
            where: { id: session.id },
            data: validatedData,
        });

        revalidatePath('/admin/profile');
        return { success: true };
    } catch (error) {
        console.error('Failed to update user:', error);
        return { success: false, error: 'Failed to update user' };
    }
}

export async function updateProfilePhoto( photoUrl: string): Promise<{ success: boolean; error?: string } | undefined> {

    const session = await currentUser();

    if (!session) {
        return redirect("/auth/login")
    }

    try {
        await db.user.update({
            where: {
                id: session.id,
            },
            data: {
                image: photoUrl
            }
        })

        revalidatePath('/admin/profile');
        return { success: true };
    } catch (error) {
        console.error('Failed to update user:', error);
        return { success: false, error: 'Failed to update user' };
    }
}
