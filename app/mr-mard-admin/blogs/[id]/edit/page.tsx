import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";
import { FormError } from "@/components/others/form-error";
import BlogForm from "@/components/admin/blogs/BlogsForm";

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

  console.log("content", blog?.content)

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>
      <BlogForm blog={{ ...blog, image: blog.image ?? undefined }} />
    </div>
  );
}
