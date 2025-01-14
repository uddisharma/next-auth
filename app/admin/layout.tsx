import { ReactNode } from "react";
import AdminSidebar from "@/components/others/AdminSidebar";
import { currentRole } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userRole = await currentRole();
  if (!userRole) return null
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar userRole={userRole} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
