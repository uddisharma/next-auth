'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, Search } from 'lucide-react'

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-white px-24">
            {/* Header */}
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">Mr. Mard</h1>
                        </div>
                        <div className="flex items-center gap-4 flex-1 max-w-xl ml-8">
                            <div className="flex items-center gap-4 flex-1 ml-8">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                    <Input
                                        type="search"
                                        placeholder="Search"
                                        className="pl-8 bg-btnblue text-white placeholder:text-gray-400 border-0 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                                </Button>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback>NA</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-8">
                    <h2 className="text-2xl text-gray-800">Welcome, Naveen</h2>
                    <p className="text-gray-500">Tue, 07 June 2022</p>
                </div>

                {/* Alert Banner */}
                <div className="bg-yellow rounded-lg p-4 mb-8 h-[50px]">
                    {/* Add any alert content here */}
                </div>

                {/* Profile Section */}
                <div className="max-w-4xl">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>NA</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-semibold">Naveen</h3>
                                <p className="text-gray-500">abc@gmail.com</p>
                            </div>
                        </div>
                        <Button variant="default" className="bg-[#1a2642]">
                            Edit
                        </Button>
                    </div>

                    {/* Form */}
                    <form className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input
                                    placeholder="Your First Name"
                                    className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-[#1a2642] px-0"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input
                                    placeholder="Your Last Name"
                                    className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-[#1a2642] px-0"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Gender</label>
                                <Select>
                                    <SelectTrigger className="border-0 border-b rounded-none focus:ring-0">
                                        <SelectValue placeholder="Male" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Country</label>
                                <Select>
                                    <SelectTrigger className="border-0 border-b rounded-none focus:ring-0">
                                        <SelectValue placeholder="India" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="india">India</SelectItem>
                                        <SelectItem value="usa">USA</SelectItem>
                                        <SelectItem value="uk">UK</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Language</label>
                                <Select>
                                    <SelectTrigger className="border-0 border-b rounded-none focus:ring-0">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="english">English</SelectItem>
                                        <SelectItem value="hindi">Hindi</SelectItem>
                                        <SelectItem value="spanish">Spanish</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Time Zone</label>
                                <Select>
                                    <SelectTrigger className="border-0 border-b rounded-none focus:ring-0">
                                        <SelectValue placeholder="Select Time Zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ist">(GMT+5:30) India Standard Time</SelectItem>
                                        <SelectItem value="pst">(GMT-8:00) Pacific Time</SelectItem>
                                        <SelectItem value="est">(GMT-5:00) Eastern Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium">My email Address</h4>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Mail className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p>abc@gmail.com</p>
                                    <p className="text-gray-500">1 month ago</p>
                                </div>
                            </div>
                            <Button variant="secondary" className="text-blue-600">
                                + Add Email Address
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

