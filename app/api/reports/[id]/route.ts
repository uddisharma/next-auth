import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  // const session = await getServerSession(authOptions);
  // if (
  //   !session ||
  //   (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  // ) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const id = parseInt(params.id);

  try {
    await db.report.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 },
    );
  }
}
