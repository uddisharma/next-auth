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
import { addUser } from "@/actions/users";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserByEmailorPhone } from "@/data/user";

export default function UserForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const password = formData.get("password") as string | null
        const userData = {
            name: name as string,
            firstName: name?.split(" ")[0] ?? "" as string,
            lastName: name?.split(" ")[1] ?? "" as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            role: formData.get("role") as "USER" | "ADMIN" | "SUPER_ADMIN" | "EDITOR",
            loginType: password ? "EMAIL" : ("PHONE" as "EMAIL" | "PHONE" | "GOOGLE"),
            password: password ?? undefined as string | undefined
        };

        const existingUser = await getUserByEmailorPhone(userData.email, userData.phone);

        if (existingUser) {
            setIsSubmitting(false);
            toast.error("Email or Phone already in use!");
            return;
        }

        try {
            const data = await addUser(userData);
            if (data && 'message' in data) {
                toast.error(data.message as string);
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
        <Tabs defaultValue="email" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email Registration</TabsTrigger>
                <TabsTrigger value="phone">Phone Registration</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue=""
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue=""
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            defaultValue=""
                        />
                    </div>
                    <div>
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" defaultValue="USER">
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
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Submitting..." : "Add User"}
                    </Button>
                </form>
            </TabsContent>
            <TabsContent value="phone">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name-phone">Full Name</Label>
                        <Input
                            id="name-phone"
                            name="name"
                            defaultValue=""
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone-reg">Phone</Label>
                        <Input
                            id="phone-reg"
                            name="phone"
                            type="tel"
                            defaultValue=""
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email-phone">Email</Label>
                        <Input
                            id="email-phone"
                            name="email"
                            type="email"
                            defaultValue=""
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="role-phone">Role</Label>
                        <Select name="role" defaultValue="USER">
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                                <SelectItem value="EDITOR">Editor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Submitting..." : "Add User"}
                    </Button>
                </form>
            </TabsContent>
        </Tabs >
    );
}

