import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import UserForm from "@/components/others/UserForm";
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
      <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-[1px] border-whiteGray">
        <UserForm
          user={{
            ...user,
            id: user.id,
            name: user.name || "",
            email: user.email || "",
          }}
        />
      </div>
    </main>
  );
}
