"use client"
import { Bell, MailCheckIcon, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import ProfileCard from "@/components/profile-card"
import ProfileForm from "@/components/profile-form"

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            <div className="pl-64">
                <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
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

                <main className="p-6">
                    <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
                    <div className="bg-yellow h-[270px] w-full border-b rounded-xl ">
                        <div className="grid lg:grid-cols-[300px,1fr] gap-6 px-5 pt-32">
                            <ProfileCard />
                            <div className="bg-white rounded-xl p-6 shadow-sm border-[1px] border-whiteGray">
                                <ProfileForm />
                                <div className="flex justify-end mt-5">
                                    <Button className="bg-btnblue text-white">
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-[350px,1fr] gap-6 px-5 pt-32">

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

