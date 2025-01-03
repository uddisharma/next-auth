import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json(
      { error: "Phone number and OTP are required" },
      { status: 400 },
    );
  }

  try {
    const user = await db.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (
      user.otp !== parseInt(otp) ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 },
      );
    }

    await db.user.update({
      where: { id: user.id },
      data: { otp: null, otpExpires: null },
    });

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 },
    );
  }
}
