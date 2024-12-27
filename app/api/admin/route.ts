import { currentUser } from "@/lib/auth";
import { checkPermission } from "@/lib/checkPermission";
import { Resource } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {

  const session = await currentUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasPermission = await checkPermission(session?.role, Resource.BLOGS, 'create');

  if (!hasPermission) {
    return NextResponse.json({ error: "You don't have permission to create a blog" }, { status: 403 });
  }

  return new NextResponse(null, { status: 200 });
}
