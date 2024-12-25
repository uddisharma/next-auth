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

  const id = params.id;

  try {
    await db.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
