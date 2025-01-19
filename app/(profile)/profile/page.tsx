import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProfileForm from "@/components/others/ProfileForm";
import ProfileHeader from "@/components/others/ProfileHeader";

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
    <div className="min-h-screen px-5 md:px-16 pt-5">
      <ProfileHeader user={user} />
      <div className="rounded-lg bg-white p-6 shadow-sm pb-20">
        <ProfileForm user={user} session={session} />
      </div>
    </div>
  );
}
