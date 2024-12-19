import { db } from "@/lib/db";

export async function verifyOTP(userId: string, otp: number): Promise<boolean> {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
  
    if (!user || user.otp !== otp || !user.otpExpires) {
      return false;
    }
  
    if (user.otpExpires < new Date()) {
      return false;
    }
  
    await db.user.update({
      where: { id: userId },
      data: { otp: null, otpExpires: null },
    });
  
    return true;
  }