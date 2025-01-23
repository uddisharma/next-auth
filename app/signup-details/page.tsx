"use client";
import { EmailVerification, VerifyEmail } from "@/actions/email-verification";
import { regularRegister } from "@/actions/register";
import { decryptPhoneNumber } from "@/lib/encryption";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [isPending1, startTransition1] = useTransition();
  const [isPending2, startTransition2] = useTransition();
  const [data, setData] = useState({
    name: "",
    email: "",
    gender: "",
    otp: "",
  });
  const [verification, setVerification] = useState({
    isOtpSent: false,
    isVerified: false,
    resendTimer: 0,
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const startResendTimer = () => {
    setVerification((prev) => ({ ...prev, resendTimer: 30 }));
  };

  useEffect(() => {
    if (verification.resendTimer > 0) {
      const timer = setTimeout(() => {
        setVerification((prev) => ({
          ...prev,
          resendTimer: prev.resendTimer - 1,
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [verification.resendTimer]);

  const handleSendOtp = () => {
    if (!data.email) {
      return toast.error("Email is required");
    }
    const decryptPhone = searchParams.get("token") ?? "";
    const phone = decryptPhoneNumber(decryptPhone) ?? "";

    startTransition(async () => {
      const res = await EmailVerification(phone, data.email);
      if (res?.success === false) {
        toast.error(res?.message);
      } else {
        toast.success(res?.message);
        setVerification({
          ...verification,
          isOtpSent: true,
          isVerified: false,
        });
        startResendTimer();
      }
    });
  };

  const handleResendOtp = () => {
    if (!data.email) {
      return toast.error("Email is required");
    }
    if (verification.resendTimer > 0) {
      return;
    }
    setData({ ...data, otp: "" });
    handleSendOtp();
  };

  const handleVerifyOtp = () => {
    if (!data.otp) {
      return toast.error("OTP is required");
    }
    startTransition1(async () => {
      const res = await VerifyEmail(data.email, data.otp);
      if (res?.success === false) {
        toast.error(res?.message);
      } else {
        toast.success(res?.message);
        setVerification({ ...verification, isVerified: true });
      }
    });
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition2(async () => {
      const res = await regularRegister({
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: decryptPhoneNumber(searchParams.get("token") ?? "") ?? "",
      });
      if (res?.success) {
        toast.success(res.message);
        setData({ name: "", email: "", gender: "", otp: "" });
        router.push("/profile");
      } else {
        toast.error(res?.message);
      }
    });
  };

  return (
    <div>
      <form>
        <input
          className="border-[2px] border-red-500"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <br />
        <input
          className="border-[2px] border-red-500"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        {verification.isVerified && (
          <p className="text-green-500 mt-1">Verified</p>
        )}
        <br />
        {!verification.isVerified && !verification.isOtpSent && (
          <button
            className={`${isPending ? "cursor-wait" : "cursor-pointer"}`}
            onClick={handleSendOtp}
            disabled={isPending || verification.isOtpSent}
            type="button"
          >
            Send OTP
          </button>
        )}
        {verification.isOtpSent && !verification.isVerified && (
          <>
            <input
              value={data.otp}
              onChange={handleChange}
              className="border-[2px] border-red-500"
              type="number"
              name="otp"
            />
            <button
              className={`${isPending1 ? "cursor-wait" : "cursor-pointer"}`}
              onClick={handleVerifyOtp}
              type="button"
              disabled={isPending1 || verification.isVerified}
            >
              Verify OTP
            </button>
            <br />
            <button
              className={`${
                verification.resendTimer > 0
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handleResendOtp}
              type="button"
              disabled={verification.resendTimer > 0}
            >
              Resend OTP{" "}
              {verification.resendTimer > 0 && `(${verification.resendTimer}s)`}
            </button>
            <br />
          </>
        )}
        <br />
        <select onChange={handleChange} name="gender" id="gender">
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <br />
        <button
          className={`${
            !verification.isVerified || isPending2
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={!verification.isVerified || isPending2}
          onClick={handleSaveUser}
        >
          {isPending2 ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Page;
