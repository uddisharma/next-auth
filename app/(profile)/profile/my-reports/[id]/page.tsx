import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import ProfileHeader from "@/components/others/ProfileHeader";
import ReportDetails from "@/components/others/ReportDetail";

interface PageProps {
  params: { id: string };
}
export default async function ReportDetail({ params }: PageProps) {
  const sessions = await currentUser();

  if (!sessions) {
    return redirect("/auth");
  }

  const report = await db.report.findUnique({
    where: {
      id: parseInt(params.id),
      userId: sessions.id,
    },
  });
  await db.$disconnect();

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen px-5 md:px-16 pt-5">
      <ProfileHeader user={sessions} />
      <ReportDetails report={report} />
    </div>
  );
}
