import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/others/ProfileHeader";
import ReportsList from "@/components/others/Reports";

export default async function MyReportsPage() {
  const sessions = await currentUser();
  if (!sessions) {
    return redirect("/auth");
  }

  const reports = await db.report.findMany({
    where: { userId: sessions.id },
    orderBy: { createdAt: "desc" },
  });
  await db.$disconnect();

  return (
    <div className="min-h-screen px-5 md:px-16 pt-5">
      <ProfileHeader user={sessions} />
      <ReportsList reports={reports} />
    </div>
  );
}
