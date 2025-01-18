import Link from "next/link";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MyReportsPage() {
  const sessions = await currentUser();
  if (!sessions) {
    return redirect("/auth/login");
  }

  const reports = await db.report.findMany({
    where: { userId: sessions.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Reports</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id.toString()}>
              <TableCell>
                {new Date(report.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <Link href={`/profile/my-reports/${report.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
