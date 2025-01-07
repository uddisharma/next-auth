"use client"
import ProgressDots from "@/components/progress-dots"
import AnalyticsIllustration from "@/components/analytics-illustrations"
import GenderSelection from "@/components/gender-selection"

export default function OnboardingPage() {
    const handleNext = (gender: string) => {
        console.log("Selected gender:", gender)
        // Handle navigation to next step
    }

    return (
        <div className="min-h-screen flex flex-col px-10">
            <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="order-1 md:order-2">
                        <AnalyticsIllustration />
                    </div>
                    <div className="order-2 md:order-1">
                        <ProgressDots total={7} current={1} />
                        <GenderSelection onNext={handleNext} />
                    </div>
                </div>
            </main>
        </div>
    )
}

