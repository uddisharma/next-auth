import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";
import { FormError } from "@/components/others/form-error";

interface PageProps {
  params: { id: string };
}

export default async function EditUserPage({ params }: PageProps) {
  const session = await currentUser();

  if (!session) {
    return redirect("/auth");
  }

  const hasPermission = await checkPermission(
    session?.role,
    Resource.USERS,
    "read",
  );

  if (!hasPermission) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="p-4 sm:p-6 ">
      <h1 className="text-2xl font-semibold mb-6">User Details</h1>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-[1px] border-whiteGray">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium">Name</label>
            <span>{user.name || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <span>{user.email || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Phone</label>
            <span>{user.phone || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Role</label>
            <span>{user.role || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Two-Factor Enabled</label>
            <span>{user.isTwoFactorEnabled ? "Yes" : "No"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Last Login</label>
            <span>{user.lastLogin ? user.lastLogin.toString() : "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Location</label>
            <span>{user.location || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Country</label>
            <span>{user.country || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Date of Birth</label>
            <span>{user.dob || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Language</label>
            <span>{user.language || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Source</label>
            <span>{user.source || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Gender</label>
            <span>{user.gender || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Age</label>
            <span>{user.age || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Pin Code</label>
            <span>{user.pinCode || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Signup Completed</label>
            <span>{user.signUpSuccess ? "Yes" : "No"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Created At</label>
            <span>{user.createdAt ? user.createdAt.toString() : "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Updated At</label>
            <span>{user.updatedAt ? user.updatedAt.toString() : "N/A"}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
