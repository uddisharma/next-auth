"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { updateAdminProfile } from "@/actions/profile";
import { toast } from "sonner";
import { AdminProfileSchema, AdminFormData } from "@/public/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
interface AdminProfileFormProps {
  user: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    role: string;
    loginType: string;
  };
}

export default function AdminProfileForm({ user }: AdminProfileFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const session = useCurrentUser();

  const form = useForm<AdminFormData>({
    resolver: zodResolver(AdminProfileSchema),
    defaultValues: {
      name: user.name || "",
      firstName: (user.firstName ?? user?.name?.split(" ")[0]) || "",
      lastName: (user.lastName ?? user?.name?.split(" ")[1]) || "",
      email: user.email || "",
      role: user.role || "",
      isTwoFactorEnabled: session?.isOAuth === false ? false : true,
    },
  });

  const onSubmit = async (values: AdminFormData) => {
    setIsUpdating(true);
    try {
      await updateAdminProfile(user.id.toString(), values);
      router.refresh();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
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
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Role" {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        {session?.isOAuth === false && user.loginType == "EMAIL" && (
          <div>
            <Label htmlFor="isTwoFactorEnabled">
              Enable Two-Factor Authentication
            </Label>
            <Switch
              id="isTwoFactorEnabled"
              name="isTwoFactorEnabled"
              defaultChecked={session.isTwoFactorEnabled}
            />
          </div>
        )}
        <Button type="submit" disabled={isUpdating} className="w-full">
          {isUpdating ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
