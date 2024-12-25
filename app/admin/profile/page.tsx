import { db } from "@/lib/db";
import AdminProfileForm from "@/components/AdminProfileForm";
import { currentUser } from "@/lib/auth";

export default async function AdminProfilePage() {
  const session = await currentUser();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
      <AdminProfileForm user={{ ...user, name: user.name || "", email: user.email || "" }} />
    </div>
  );
}
