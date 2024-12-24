import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import BlogForm from "@/components/BlogForm";

interface PageProps {
  params: { id: string };
}

export default async function EditBlogPage({ params }: PageProps) {
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
