"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addUser, updateUser } from "@/actions/users";
import { toast } from "sonner";

interface UserFormProps {
  user?: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
    role: string;
  };
}

export default function UserForm({ user }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      role: formData.get("role") as "USER" | "ADMIN" | "SUPER_ADMIN" | "EDITOR",
    };

    try {
      if (user) {
        const data = await updateUser(user.id.toString(), userData);
        if ('message' in data) {
          toast.error(data.message as string);
          return;
        }
      } else {
        const data = await addUser(userData);
        if ('message' in data) {
          toast.error(data.message as string);
          return;
        }
      }
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      console.error("Error submitting user:", error);
      alert("Failed to submit user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user?.name || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          defaultValue={user?.firstName || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          defaultValue={user?.lastName || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user?.email || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={user?.phone || ""}
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select name="role" defaultValue={user?.role || "USER"}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : user ? "Update User" : "Add User"}
      </Button>
    </form>
  );
}
