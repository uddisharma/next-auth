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
    Resource.NEWSLETTER,
    "delete",
  );

  if (!hasPermission) {
    return NextResponse.json({ error: "" }, { status: 403 });
  }

  const id = parseInt(params.id);

  try {
    await db.newsLetter.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Newsletter deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return NextResponse.json(
      { error: "Failed to delete newsletter" },
      { status: 500 },
    );
  }
}
