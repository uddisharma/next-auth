// import { db } from "@/lib/db";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { notFound, redirect } from "next/navigation";
// import { currentUser } from "@/lib/auth";

// interface PageProps {
//   params: { id: string };
// }

// export default async function ViewReportPage({ params }: PageProps) {
//   const sessions = await currentUser();

//   if (!sessions) {
//     return redirect("/auth/login");
//   }

//   const report = await db.report.findUnique({
//     where: {
//       id: parseInt(params.id),
//       userId: sessions.id,
//     },
//   });

//   if (!report) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">View Report</h1>
//       <Card>
//         <CardHeader>
//           <CardTitle>Report Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>
//             <strong>Created At:</strong>{" "}
//             {new Date(report.createdAt).toLocaleString()}
//           </p>
//         </CardContent>
//       </Card>
//       <h2 className="text-xl font-semibold mt-6 mb-4">Questions and Answers</h2>

//       {report.questions.map((question: any, index: number) => (
//         <Card key={index} className="mb-4">
//           <CardHeader>
//             <CardTitle>{question.question}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {Array.isArray(question.answer) ? (
//               <ul>
//                 {question.answer.map((answer: string, i: number) => (
//                   <li key={i}>{answer}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>{question.answer}</p>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

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
    return redirect("/auth/login");
  }

  const report = await db.report.findUnique({
    where: {
      id: parseInt(params.id),
      userId: sessions.id,
    },
  });

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
