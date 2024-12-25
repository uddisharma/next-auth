import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await currentUser();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const id = parseInt(params.id);

  try {
    await db.question.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 },
    );
  }
}
