import { db } from "../../../lib/db";

async function sendSMS(phone: string, message: string): Promise<void> {
  console.log(`Sending SMS to ${phone}: ${message}`);
}

export async function POST(request: Request) {
  const data = await request.json();

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: "USER",
        loginType: "PHONE",
        isTwoFactorEnabled: false,
        otp: otp,
        otpExpires: otpExpires,
      },
    });

    await sendSMS(data?.phone, `Your OTP for signup is: ${otp}`);

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Failed to send OTP" }), {
      status: 500,
    });
  }
}
