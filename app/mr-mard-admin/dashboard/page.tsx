"use client"

import { Button } from "@/components/ui/button"
import ProfileCard from "@/components/others/profile-card"
import ProfileForm from "@/components/others/profile-form"

export default function SettingsPage() {
    return (
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
    )
}

