import { db } from "@/lib/db";
import AdminProfileForm from "@/components/AdminProfileForm";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminProfilePage() {
  const session = await currentUser();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
  ) {
    redirect("/auth/login");
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
      <AdminProfileForm user={{ ...user, name: user.name || "", email: user.email || "" }} />
    </div>
  );
}
