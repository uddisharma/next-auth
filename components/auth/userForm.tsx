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
import { RegisterWithOtpSchema, RegisterWithOtpSchemaData } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerWithOTP } from "@/actions/register-phone";

interface UserFormProps {
  setIsOtpSent: (isOtpSent: boolean) => void;
  setData: (phone: string, email: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ setIsOtpSent, setData }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const userForm = useForm<RegisterWithOtpSchemaData>({
    resolver: zodResolver(RegisterWithOtpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleUserSubmit = (values: RegisterWithOtpSchemaData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerWithOTP(values).then((data) => {
        if (data.error) {
          return setError(data.error);
        }
        setSuccess(data.sucess);
        setIsOtpSent(true);
        setData(values.phone, values.email);
      });
    });
  };

  return (
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
  );
};

export default UserForm;
