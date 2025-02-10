import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await currentUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasPermission = await checkPermission(
    session?.role,
    Resource.QUESTIONS,
    "delete",
  );

  if (!hasPermission) {
    return NextResponse.json({ error: "" }, { status: 403 });
  }

  const id = parseInt(params.id);

  try {
    await db.question.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 },
    );
  }
}
