"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerWithOTP } from "@/actions/register-phone";
import { OtpSchema, RegisterWithOtpSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterFormPhone = () => {
  const [isOtpSent, setIsOtpSent] = useState(false); // State to toggle between forms
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // User details form
  const userForm = useForm<z.infer<typeof RegisterWithOtpSchema>>({
    resolver: zodResolver(RegisterWithOtpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // OTP form
  const otpForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleUserSubmit = (values: z.infer<typeof RegisterWithOtpSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      registerWithOTP(values).then((data) => {
        setError(data.error);
        setSuccess(data.sucess);
        setIsOtpSent(true);
      });
    });
  };

  // Handle submission of OTP
  const handleOtpSubmit = (values: z.infer<typeof OtpSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // Replace with your OTP verification logic
      if (values.otp === "123456") {
        setSuccess("Welcome! Your phone is verified.");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {!isOtpSent ? (
        // User Details Form
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(handleUserSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              {/* Name */}
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={userForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="1234567890"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Submit Button */}
            <Button disabled={isPending} type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        </Form>
      ) : (
        // OTP Form
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
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Submit Button */}
            <Button disabled={isPending} type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default RegisterFormPhone;
