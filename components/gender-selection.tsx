"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface GenderSelectionProps {
    onNext: (gender: string) => void
}

export default function GenderSelection({ onNext }: GenderSelectionProps) {
    const [selectedGender, setSelectedGender] = useState<string>("")

    return (
        <div className="space-y-14 mt-16">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                    What is your gender?
                </h1>
                <p className="text-gray-600">
                    To get started, let us know your gender to provide insights tailored to your unique hair profile.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant={selectedGender === "male" ? "default" : "outline"}
                    className="flex-1 bg-btnblue text-white"
                    onClick={() => setSelectedGender("male")}
                >
                    Male
                </Button>
                <Button
                    variant={selectedGender === "female" ? "default" : "outline"}
                    className="flex-1 border-[1px] border-black text-black bg-white"
                    onClick={() => setSelectedGender("female")}
                >
                    Female
                </Button>
                <Button
                    variant={selectedGender === "other" ? "default" : "outline"}
                    className="flex-1 border-[1px] border-black text-black bg-white"
                    onClick={() => setSelectedGender("other")}
                >
                    Other
                </Button>
            </div>

            <div className="flex justify-end ">
                <Button
                    className="bg-btnblue text-white px-14"
                    onClick={() => onNext(selectedGender)}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

