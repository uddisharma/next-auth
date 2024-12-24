// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {db} from "@/lib/db";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signin");
  // }

  const user = await db.user.findUnique({
    where: { id: "3" },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <ProfileForm user={{ 
        id: BigInt(user.id), 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email || "", 
        phone: user.phone 
      }} />
    </div>
  );
}
