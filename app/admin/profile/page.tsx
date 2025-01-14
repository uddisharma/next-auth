import { db } from "@/lib/db";
import AdminProfileForm from "@/components/others/AdminProfileForm";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Resource } from "@prisma/client";
import { checkPermission } from "@/lib/checkPermission";
import { FormError } from "@/components/others/form-error";

export default async function AdminProfilePage() {
  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login")
  }

  const hasPermission = await checkPermission(session?.role, Resource.USERS, 'read');

  if (!hasPermission) {
    return <FormError message="You do not have permission to view this content!" />
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
      <AdminProfileForm user={{ ...user, name: user.name || "", email: user.email || "", loginType: user.loginType || "" }} />
    </div>
  );
}
