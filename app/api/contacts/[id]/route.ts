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

  const hasPermission = await checkPermission(session?.role, Resource.CONTACT_SUBMISSIONS, 'delete');

  if (!hasPermission) {
    return NextResponse.json({ error: "You don't have permission to delete a contact submission" }, { status: 403 });
  }

  try {
    await db.contactSubmission.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Contact submission deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete contact submission" },
      { status: 500 },
    );
  }
}
