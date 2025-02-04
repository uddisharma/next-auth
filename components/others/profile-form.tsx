"use client";

import { useTransition } from "react";
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
import { toast } from "sonner";
import { User } from "@/public/schemas/types";
import { ProfileFormData, ProfileSchema } from "@/public/schemas";
import { updateAdminProfile } from "@/actions/my-profile";

type Props = {
  admin: Pick<
    User,
    "firstName" | "lastName" | "phone" | "email" | "location"
  > | null;
};

export default function ProfileForm({ admin }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: admin?.firstName ?? "",
      lastName: admin?.lastName ?? "",
      phone: admin?.phone ?? "",
      email: admin?.email ?? "",
      location: admin?.location ?? "",
    },
  });

  const onSubmit = (values: ProfileFormData) => {
    startTransition(async () => {
      try {
        await updateAdminProfile(values);
        toast.success("Profile updated successfully!");
        router.refresh();
      } catch (error) {
        toast.error("Failed to update profile.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
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
                <Input placeholder="Enter last name" {...field} />
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
                <Input placeholder="Enter email" {...field} disabled />
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
                <Input placeholder="Enter phone number" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-5 w-full">
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-fit flex justify-center bg-btnblue text-white px-4 py-2"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
