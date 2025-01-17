"use client";
import ProgressDots from "@/components/others/progress-dots";
import AnalyticsIllustration from "@/components/others/analytics-illustrations";
import GenderSelection from "@/components/others/gender-selection";

export default function OnboardingPage() {
  const handleNext = (gender: string) => {
    console.log("Selected gender:", gender);
    // Handle navigation to next step
  };

  return (
    <div className="flex flex-col px-5 md:px-10 my-2 mb-20 md:mb-0 md:py-10">
      <main className="flex-1 md:px-4 md:py-12 w-full">
        <div className="grid md:grid-cols-2 justify-center gap-20 items-center">
          <div className="">
            <AnalyticsIllustration />
          </div>
          <div className="">
            <ProgressDots total={7} current={1} />
            <GenderSelection onNext={handleNext} />
          </div>
        </div>
      </main>
    </div>
  );
}
