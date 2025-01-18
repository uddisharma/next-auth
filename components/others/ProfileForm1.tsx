"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail } from "lucide-react";
import { profileSchema, ProfileFormValues } from "@/schemas";
import Image from "next/image";
import { timeAgo } from "@/lib/timeAgo";

export default function ProfileForm({ user }: { user: any }) {
  const [isEditable, setIsEditable] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      gender: user?.gender || "male",
      country: user?.country || "india",
      language: user?.language || "english",
      timezone: user?.timeZone || "ist",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
    setIsEditable(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={user?.image || "/user.png"}
            alt={user?.name || "User"}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-medium">{user?.name}</h3>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <Button
          className="bg-btnblue hover:bg-btnblue/90 text-white"
          type="button"
          onClick={() => setIsEditable(!isEditable)}
          variant="outline"
        >
          {isEditable ? "Cancel" : "Edit"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Your First Name"
                className="border-none bg-[#F9F9F9]"
                disabled={!isEditable}
              />
            )}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Your Last Name"
                className="border-none bg-[#F9F9F9]"
                disabled={!isEditable}
              />
            )}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isEditable}
              >
                <SelectTrigger className="border-none bg-[#F9F9F9]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isEditable}
              >
                <SelectTrigger className="border-none bg-[#F9F9F9]">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Language</label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isEditable}
              >
                <SelectTrigger className="border-none bg-[#F9F9F9]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Time Zone</label>
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isEditable}
              >
                <SelectTrigger className="border-none bg-[#F9F9F9]">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">
                    (GMT+5:30) India Standard Time
                  </SelectItem>
                  <SelectItem value="pst">(GMT-8:00) Pacific Time</SelectItem>
                  <SelectItem value="est">(GMT-5:00) Eastern Time</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-4 text-sm font-medium text-gray-700">
          My email Address
        </h4>
        <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
          <div className="rounded-full bg-blue-100 p-2">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">{user.email}</p>
            <p className="text-sm text-gray-500">{timeAgo(user.createdAt)}</p>
          </div>
        </div>
        <Button variant="ghost" className="mt-4 bg-[#4182F9] bg-opacity-20">
          + Add Email Address
        </Button>
      </div>

      {isEditable && (
        <Button type="submit" className="mt-6">
          Save Changes
        </Button>
      )}
    </form>
  );
}
