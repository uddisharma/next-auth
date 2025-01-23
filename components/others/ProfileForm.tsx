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
import {
  updateProfile,
  updateProfileEmail,
  updateProfilePhoto,
} from "@/actions/my-profile";
import { toast } from "sonner";
import { uploadFile } from "@/actions/upload";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { splitName } from "@/lib/splitname";

export default function ProfileForm({
  user,
  session,
}: {
  user: any | undefined;
  session: any;
}) {
  const [isEditable, setIsEditable] = useState(false);
  const { update } = useSession();
  const { firstName, lastName } = splitName(user?.name ?? "");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? firstName ?? "",
      lastName: user?.lastName ?? lastName ?? "",
      gender: user?.gender || "MALE",
      country: user?.country || "India",
      language: user?.language || "English",
      timeZone: user?.timeZone || "IST",
      isTwoFactorEnabled: session.isTwoFactorEnabled,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    startTransition(async () => {
      const res = await updateProfile(data);
      if (res?.success) {
        toast.success(res.message);
        update();
        setIsEditable(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
        <DialogContent className="w-80 md:w-full rounded-lg">
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

  const handleImageUpload = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await uploadFile(formData);
        const data = await updateProfilePhoto(result.url);
        if (data?.success) {
          user!.image = result.url;
          update();
          setPreviewImage(null);
          setIsOpen(false);
        } else {
          toast.error(data?.error);
        }
      } catch (error) {
        toast.error("Something went wrong !");
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row sm:items-center">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <Image
              src={user?.image || "/user.png"}
              alt={user?.name || "User"}
              width={100}
              height={100}
              className="rounded-full w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="absolute bottom-0 right-0 bg-blue-100 rounded-full p-2"
            >
              <Camera className="w-4 h-4 text-blue-600" />
            </button>
            {isOpen && (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-80 md:w-full rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Update Profile Picture</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      handleImageUpload(formData);
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                          <AvatarImage
                            src={previewImage || user?.image || "/user.png"}
                          />
                          <AvatarFallback>{user?.name}</AvatarFallback>
                        </Avatar>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          disabled={isPending || !previewImage}
                          type="submit"
                        >
                          {isPending ? "Loading..." : "Save"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-medium">{user?.name}</h3>
            <p className="text-gray-500 text-sm sm:text-base">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {user?.role !== "USER" && (
            <Link href="/admin">
              <Button className="hidden md:block mt-4 sm:mt-0 bg-btnblue hover:bg-btnblue/90 text-white">
                Admin Panel
              </Button>
            </Link>
          )}
          <Button
            className="mt-4 sm:mt-0 bg-btnblue hover:bg-btnblue/90 text-white"
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            variant="outline"
          >
            {isEditable ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
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
            <label className="text-sm font-medium text-gray-700">
              Language
            </label>
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
            <label className="text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <Controller
              name="timeZone"
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
        {session?.isOAuth === false && user.loginType == "EMAIL" && (
          <div className="space-y-2 mt-5">
            <label className="text-sm font-medium text-gray-700">
              Two Factor Auth
            </label>
            <Controller
              name="isTwoFactorEnabled"
              control={control}
              render={({ field }) => (
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label className="text-base font-medium">
                      Enable Two-Factor Authentication
                    </label>
                    <p className="text-sm text-gray-500">
                      Secure your account with two-factor authentication.
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!isEditable}
                    className="disabled:opacity-50"
                  />
                </div>
              )}
            />
          </div>
        )}
        <div className="mt-6">
          {user?.emails?.length > 0 && (
            <h4 className="mb-4 text-sm font-medium text-gray-700">
              My email Address
            </h4>
          )}
          {user?.emails?.map((email: { email: string; createdAt: string }) => (
            <div
              className="flex items-start justify-between gap-3 rounded-lg bg-gray-50 p-4 m-[10px_0px]"
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
                <DialogTrigger className="mx-4" asChild>
                  <div className="rounded-full bg-red-400 p-2 cursor-pointer">
                    {isPending ? (
                      <Loader2 className="animate-spin h-5 w-5 text-white" />
                    ) : (
                      <Trash2 className="h-5 w-5 text-white" />
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="w-80 md:w-full rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    the email and remove it from our servers.
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
            type="button"
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
    </>
  );
}
