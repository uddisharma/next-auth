"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { User } from "@/schemas/types"

type Props = {
    admin: Pick<User, "firstName" | "lastName" | "phone" | "email" | "location">| null
}

export default function ProfileForm({ admin }: Props) {
    return (
        <div className="space-y-6 ">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-gray-600">First Name</label>
                    <Input placeholder="Enter first name" />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">Last Name</label>
                    <Input placeholder="Enter last name" />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">Date of Birth</label>
                    <Input type="date" />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">Phone</label>
                    <Input placeholder="Enter phone number" />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">City</label>
                    <Input placeholder="Enter city" />
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">Country</label>
                    <Select defaultValue="india">
                        <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="india">India</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <Button className="bg-btnblue text-white">
                    Save
                </Button>
            </div>
        </div>
    )
}

