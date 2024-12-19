"use client";

import { useState } from "react";
import OtpForm from "./otpForm";
import UserForm from "./userForm";

const RegisterFormPhone = () => {
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [phone_email, setPhoneEmail] = useState<{ phone: string, email: string }>({ phone: "", email: "" });

  const setOTPSent = (boolen: boolean) => {
    setIsOtpSent(boolen)
  }
  const setData = (phone: string, email: string) => {
    setPhoneEmail({ phone, email })
  }

  return (
    <div className="space-y-6">
      {!isOtpSent ? (
        <UserForm setIsOtpSent={setOTPSent} setData={setData} />
      ) : (
        <OtpForm phone_email={phone_email} />
      )}
    </div>
  );
};

export default RegisterFormPhone;
