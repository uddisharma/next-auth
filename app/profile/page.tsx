import { db } from "@/lib/db";
import ProfileForm from "@/components/others/ProfileForm";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <ProfileForm
        user={{
          id: user.id,
          name: user.name || "",
          firstName: user.firstName ?? (user.name?.split(" ")[0] || ""),
          lastName: user.lastName ?? (user.name?.split(" ")[1] || ""),
          email: user.email || "",
          phone: user.phone,
          loginType: user.loginType || "",
        }}
      />
    </div>
  );
}
