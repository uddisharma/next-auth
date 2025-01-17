import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { OtpSchema, OtpSchemaData } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FormError } from "../others/form-error";
import { FormSucess } from "../others/form-sucess";
import { loginOTP } from "@/actions/loginotp";

interface OtpFormProps {
  phone_email: { phone: string; email: string };
}

const OtpForm = ({ phone_email }: OtpFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider!"
      : "";

  // OTP form
  const otpForm = useForm<OtpSchemaData>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleOtpSubmit = (values: OtpSchemaData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      loginOTP({ ...phone_email, otp: values.otp }, callbackUrl)
        .then((data) => {
          if (data?.error) {
            otpForm.reset();
            setError(data?.error);
          }

          if (data?.success) {
            otpForm.reset();
            setSuccess(data?.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <Form {...otpForm}>
      <form
        onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter OTP</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="123456" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Error and Success Messages */}
        <FormError message={error || urlError} />
        <FormSucess message={success} />

        {/* Submit Button */}
        <Button disabled={isPending} type="submit" className="w-full">
          Verify OTP
        </Button>
      </form>
    </Form>
  );
};

export default OtpForm;
