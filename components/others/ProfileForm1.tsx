"use client";

import { useState, useTransition } from "react";
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
import { Camera, Loader2, Mail, Trash2 } from "lucide-react";
import { profileSchema, ProfileFormValues } from "@/schemas";
import Image from "next/image";
import { timeAgo } from "@/lib/timeAgo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { updateProfile, updateProfileEmail } from "@/actions/my-profile";
import { toast } from "sonner";

export default function ProfileForm({ user }: { user: any | undefined }) {
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
      gender: user?.gender || "MALE",
      country: user?.country || "India",
      language: user?.language || "English",
      timezone: user?.timeZone || "IST",
    },
  });

  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const EmailPopup = () => {
    const [newEmail, setNewEmail] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleAddNewEmail = () => {
      if (!newEmail) {
        return toast.error("Email is required");
      }
      startTransition(async () => {
        const newEmailObject = { email: newEmail, createdAt: new Date() };
        const emails = [...(user?.emails || []), newEmailObject];
        const res = await updateProfileEmail(emails, "add");
        if (res.success) {
          toast.success(res.message);
          setIsEmailPopupOpen(false);
          setNewEmail("");
        } else {
          toast.error(res.message);
        }
      });
    };

    return (
      <Dialog open={isEmailPopupOpen} onOpenChange={setIsEmailPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Email Address</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewEmail();
            }}
          >
            <Input
              type="email"
              placeholder="Enter new email"
              value={newEmail}
              required
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Button
              className="mt-2 w-full"
              disabled={!newEmail || isPending}
              type="submit"
            >
              {isPending ? "Adding..." : "Add Email"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const handleEmailDelete = (email: { email: string }) => () => {
    const emails = user?.emails?.filter(
      (e: { email: string }) => e.email !== email.email,
    );
    startTransition(async () => {
      const res = await updateProfileEmail(emails, "delete");
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
    startTransition(async () => {
      const res = await updateProfile(data);
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
    setIsEditable(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={user?.image || "/user.png"}
              alt={user?.name || "User"}
              width={64}
              height={64}
              className="rounded-full"
            />
            <Dialog>
              <DialogTrigger asChild>
                <button className="absolute bottom-0 right-0 bg-blue-100 rounded-full p-2">
                  <Camera className="w-4 h-4 text-blue-600" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Profile Picture</DialogTitle>
                </DialogHeader>
                <Image
                  src={user?.image || "/user.png"}
                  alt={user?.name || "User"}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <Input type="file" accept="image/*" />
                <Button>Update Picture</Button>
              </DialogContent>
            </Dialog>
          </div>
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
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
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
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
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
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
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
                  <SelectItem value="IST">
                    (GMT+5:30) India Standard Time
                  </SelectItem>
                  <SelectItem value="PST">(GMT-8:00) Pacific Time</SelectItem>
                  <SelectItem value="EST">(GMT-5:00) Eastern Time</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="mt-6">
        {user?.emails?.length > 0 && (
          <h4 className="mb-4 text-sm font-medium text-gray-700">
            My email Address
          </h4>
        )}
        {user?.emails?.map((email: { email: string; createdAt: string }) => (
          <div
            className="flex items-start justify-between gap-3 rounded-lg bg-gray-50 p-4 m-3"
            key={email.email}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{email?.email}</p>
                <p className="text-sm text-gray-500">
                  {timeAgo(new Date(email.createdAt))}
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="rounded-full bg-red-400 p-2 cursor-pointer">
                  {isPending ? (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  ) : (
                    <Trash2 className="h-5 w-5 text-white" />
                  )}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  email and remove it from our servers.
                </DialogDescription>
                <DialogFooter>
                  <Button
                    disabled={isPending}
                    onClick={handleEmailDelete(email)}
                  >
                    {isPending ? "Deleting..." : "Continue"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
        <Button
          onClick={() => setIsEmailPopupOpen(true)}
          variant="ghost"
          className="mt-2 bg-[#4182F9] bg-opacity-20"
        >
          + Add Email Address
        </Button>
        <EmailPopup />
      </div>

      {isEditable && (
        <Button disabled={isPending} type="submit" className="mt-6">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      )}
    </form>
  );
}
