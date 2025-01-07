"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ProfileForm() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-gray-600">First Name</label>
                    <Select defaultValue="santhosh">
                        <SelectTrigger>
                            <SelectValue placeholder="Select first name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="santhosh">Santhosh</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">Last Name</label>
                    <Select defaultValue="kopparthi">
                        <SelectTrigger>
                            <SelectValue placeholder="Select last name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="kopparthi">Kopparthi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">Date of Birth</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="DD/MM/YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">DD/MM/YYYY</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">Phone</label>
                    <Select defaultValue="phone">
                        <SelectTrigger>
                            <SelectValue placeholder="Enter phone number" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="phone">+910000000000</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-gray-600">City</label>
                    <Select defaultValue="bengaluru">
                        <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bengaluru">Bengaluru</SelectItem>
                        </SelectContent>
                    </Select>
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

            <div className="flex justify-end">
                <Button className="bg-navy-900 hover:bg-navy-800">
                    Save
                </Button>
            </div>
        </div>
    )
}

