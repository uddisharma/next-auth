"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addUser } from "@/actions/users";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserByEmailorPhone } from "@/data/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { LoginType } from "@prisma/client";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  role: z.enum(["USER", "ADMIN", "SUPER_ADMIN", "EDITOR"]),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  loginType: z.enum(["EMAIL", "PHONE", "GOOGLE"]),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function UserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "USER",
      loginType: "EMAIL",
    },
  });

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    setIsSubmitting(true);

    const userData = {
      ...data,
      firstName: data.name.split(" ")[0] ?? "",
      lastName: data.name.split(" ")[1] ?? "",
      loginType: data.password ? "EMAIL" : ("PHONE" ?? ("GOOGLE" as LoginType)),
    };

    try {
      const existingUser = await getUserByEmailorPhone(
        userData.email,
        userData.phone,
      );

      if (existingUser) {
        toast.error("Email or Phone already in use!");
        return;
      }
      //@ts-ignore
      const result = await addUser(userData);
      if (result && "message" in result) {
        toast.error(result.message as string);
        return;
      }

      toast.success("User added successfully");
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      console.error("Error submitting user:", error);
      toast.error("Failed to submit user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "email" | "phone")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email Registration</TabsTrigger>
            <TabsTrigger value="phone">Phone Registration</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {activeTab === "email" && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                        <SelectItem value="EDITOR">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Add User"}
              </Button>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
