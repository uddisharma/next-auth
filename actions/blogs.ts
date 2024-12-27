"use server";

import { revalidatePath, unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { BlogSchema, type BlogFormData } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkServerActionPermission } from "@/lib/checkServerActionPermission";
import { Resource } from "@prisma/client";

export async function addBlog(blogData: BlogFormData) {

    const session = await currentUser();

    if (!session) {
        return redirect("/auth/login")
    }

    const hasPermission = await checkServerActionPermission(session?.role, Resource.BLOGS, 'create');

    if (!hasPermission) {
        return { message: "You don't have permission to create a blog" };
    }

    const validatedData = BlogSchema.parse(blogData);

    const blog = await db.blog.create({
        data: {
            ...validatedData,
            authorId: session?.id,
        },
    });

    revalidatePath("/admin/blogs");
    return blog;
}

export async function updateBlog(id: bigint, blogData: BlogFormData) {
    const session = await currentUser();

    if (
        !session ||
        (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
    ) {
        return redirect("/auth/login")
    }

    const validatedData = BlogSchema.parse(blogData);

    const blog = await db.blog.update({
        where: { id: Number(id) },
        data: validatedData,
    });

    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}`);
    return blog;
}

export const getBlogs = unstable_cache(
    async () => {
        return db.blog.findMany({
            orderBy: { createdAt: "desc" },
            include: { author: true },
        });
    },
    ["blogs"],
    { revalidate: 60 }, // Revalidate every 60 seconds
);
