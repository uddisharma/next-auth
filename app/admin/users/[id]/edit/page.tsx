import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import UserForm from "@/components/UserForm";

interface PageProps {
  params: { id: string };
}

export default async function EditUserPage({ params }: PageProps) {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
      <UserForm user={{ ...user, id: user.id, name: user.name || "", email: user.email || "" }} />
    </div>
  );
}
