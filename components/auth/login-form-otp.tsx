"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "../others/form-error";
import { FormSucess } from "../others/form-sucess";
import { sendOtpRequest, loginOTP } from "@/actions/loginotp";
import {
  OtpSchema,
  OtpSchemaData,
  PhoneSchema,
  PhoneSchemaData,
} from "@/public/schemas";
import { useSearchParams } from "next/navigation";

const LoginOtpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const phoneForm = useForm<PhoneSchemaData>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const otpForm = useForm<OtpSchemaData>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const sendOtp = (values: PhoneSchemaData) => {
    setError("");
    setSuccess("");
    setPhoneNumber(values.phone);

    startTransition(() => {
      sendOtpRequest({ phone: values.phone })
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            setSuccess(data.message);
            setIsOtpSent(true);
          }
        })
        .catch(() => setError("Failed to send OTP. Please try again."));
    });
  };

  const handleOtpSubmit = (values: OtpSchemaData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      loginOTP({ phone: phoneNumber, otp: values.otp })
        .then((data) => {
          if (data?.error) {
            otpForm.reset();
            setError(data?.error);
          }

          if (data?.success) {
            otpForm.reset();
            setSuccess(data?.message);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="space-y-6">
      {/* Phone Number Form */}
      {!isOtpSent && (
        <Form {...phoneForm}>
          <form
            onSubmit={phoneForm.handleSubmit(sendOtp)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your phone number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Error and Success Messages */}
            <FormError message={error} />
            <FormSucess message={success} />

            <Button disabled={isPending} type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        </Form>
      )}

      {/* OTP Input Form */}
      {isOtpSent && (
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
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Error and Success Messages */}
            <FormError message={error} />
            <FormSucess message={success} />

            <Button disabled={isPending} type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default LoginOtpForm;
