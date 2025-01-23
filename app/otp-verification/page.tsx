"use client";
import { loginOTP } from "@/actions/loginotp";
import { registerWithOTP } from "@/actions/register-phone";
import { decryptPhoneNumber } from "@/lib/encryption";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";

const page = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isResending, startTransition1] = useTransition();
  const [timer, setTimer] = useState(30);
  const router = useRouter();
  const searchParams = useSearchParams();

  const decryptPhone = searchParams.get("token") ?? "";
  const phone = decryptPhoneNumber(decryptPhone) ?? "";

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    startTransition(async () => {
      const res = await loginOTP({ phone, otp });
      if (res?.error && !res?.redirect) {
        toast.error(res.message);
      } else if (res?.redirect) {
        router.push(`/signup-details?token=${decryptPhone}`);
      } else {
        toast.success(res.message);
      }
    });
  };

  const handleResendOTP = async () => {
    startTransition1(() => {
      registerWithOTP({ phone }).then((data) => {
        if (data.error) {
          return setError(data.error);
        }
        setSuccess(data.message);
      });
    });
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <form onSubmit={(e) => handleVerify(e)}>
      <input
        className="border-red-500 border-[2px]"
        type="number"
        maxLength={6}
        minLength={6}
        required
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br />
      <button disabled={isPending} type="submit">
        {isPending ? "Verifying.." : "Verify OTP"}
      </button>
      <br />
      {timer > 0 ? (
        <p>Resend OTP in {timer} seconds</p>
      ) : (
        <button type="button" onClick={handleResendOTP} disabled={isResending}>
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default page;
