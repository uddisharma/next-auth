"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProfile, updateProfile } from "@/actions/my-profile";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Switch } from "../ui/switch";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
    loginType: string | null;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { update } = useSession();
  const session = useCurrentUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("name") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      isTwoFactorEnabled: formData.get("isTwoFactorEnabled") == "on",
    };

    try {
      const updatedUser = await updateProfile(userData);
      console.log(updatedUser);
      if ("message" in updatedUser) {
        toast.error(updatedUser.message as string);
      }
      router.refresh();
      update();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const deleted_data = await deleteProfile();
      if (deleted_data && "message" in deleted_data) {
        toast.error(deleted_data.message as string);
        return;
      }
      router.push("/auth/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" defaultValue={user.name || ""} required />
      </div>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          defaultValue={user.firstName || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          defaultValue={user.lastName || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={user.phone || ""}
        />
      </div>
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
      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Profile"}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="ml-4">
            Delete Profile
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Link href="/">
        <Button className="ml-4">Go to Home</Button>
      </Link>
      <Link href="/admin">
        <Button className="ml-4">Admin</Button>
      </Link>
    </form>
  );
}
