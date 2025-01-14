import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ExportType } from "@/schemas/types";

export async function GET(
    request: Request,
    { params }: { params: { type: ExportType } },
) {
    const session = await currentUser();
    const type = params.type

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        switch (type) {
            case "blog":
                const blogs = await db.blog.findMany();
                return NextResponse.json(blogs, { status: 200 });
            case "question":
                const questions = await db.question.findMany();
                return NextResponse.json(questions, { status: 200 });
            case "contact":
                const contactSubmissions = await db.contactSubmission.findMany();
                return NextResponse.json(contactSubmissions, { status: 200 });
            case "report":
                const reports = await db.report.findMany();
                return NextResponse.json(reports, { status: 200 });
            case "user":
                const users = await db.user.findMany();
                return NextResponse.json(users, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to export data" },
            { status: 500 },
        );
    }
}
