import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import BlogForm from "@/components/BlogForm";
import { currentUser } from "@/lib/auth";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";
import { FormError } from "@/components/form-error";

interface PageProps {
  params: { id: string };
}

export default async function EditBlogPage({ params }: PageProps) {

  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login")
  }

  const hasPermission = await checkPermission(session?.role, Resource.BLOGS, 'read');

  if (!hasPermission) {
    return <FormError message="You do not have permission to view this content!" />
  }

  const blog = await db.blog.findUnique({
    where: { id: Number(params.id) },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>
      <BlogForm blog={{ ...blog, id: BigInt(blog.id) }} />
    </div>
  );
}
