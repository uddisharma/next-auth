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
    await db.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
