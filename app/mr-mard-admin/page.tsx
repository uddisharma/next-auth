"use client"

import { Bell, MailCheckIcon, Search, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProfileCard from "@/components/profile-card"
import ProfileForm from "@/components/profile-form"
import Sidebar from '@/components/sidebar'

export default function SettingsPage() {
    return (
        <div className="bg-gray-50 flex pb-[550px]">
            <div className="hidden lg:block w-64">
                <Sidebar />
            </div>
            <Sheet>
                <SheetContent side="left" className="p-0 w-64">
                    <Sidebar />
                </SheetContent>
                <div className="flex-1">
                    <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
                        <div className="flex items-center gap-4">
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <div className="relative flex-1 max-w-md hidden sm:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    className="w-full pl-10 pr-4"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MailCheckIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </header>

                    <main className="p-4 sm:p-6 ">
                        <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
                        <div className="bg-yellow h-[270px] w-full border-b rounded-xl">
                            <div className="grid lg:grid-cols-[300px,1fr] gap-6 px-4 sm:px-5 pt-16 md:pt-32">
                                <ProfileCard />
                                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-[1px] border-whiteGray">
                                    <ProfileForm />
                                    <div className="flex justify-end mt-5">
                                        <Button className="bg-btnblue text-white">
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </Sheet>
        </div>
    )
}

