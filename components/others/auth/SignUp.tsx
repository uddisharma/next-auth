import { loginOTP } from "@/actions/loginotp";
import { registerWithOTP } from "@/actions/register-phone";
import { encryptPhoneNumber } from "@/lib/encryption";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    startTransition(() => {
      registerWithOTP({ phone }).then((data) => {
        if (data.error) {
          return setError(data.error);
        }
        setSuccess(data.sucess);
        const phoneNumber = encryptPhoneNumber(phone);
        router.push(`/otp-verification?token=${phoneNumber}`);
      });
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="border-red-500 border-[2px]"
        type="number"
        maxLength={10}
        minLength={10}
        value={phone}
        required
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <button disabled={isPending} type="submit">
        {isPending ? "Sending OTP" : "Send OTP"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default SignUp;
