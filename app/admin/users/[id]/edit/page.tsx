import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import UserForm from "@/components/UserForm";
import { currentUser } from "@/lib/auth";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";
import { FormError } from "@/components/form-error";

interface PageProps {
  params: { id: string };
}

export default async function EditUserPage({ params }: PageProps) {

  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login")
  }

  const hasPermission = await checkPermission(session?.role, Resource.USERS, 'read');

  if (!hasPermission) {
    return <FormError message="You do not have permission to view this content!" />
  }

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
