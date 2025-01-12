'use client'
import MealPlan from "@/components/dietPlan"
import FAQ from "@/components/faq"
import ReportBanner from "@/components/reportBanner"

export default function HairAnalysis() {
  return (
    <div>
      <ReportBanner />
      <div className="text-center my-10 px-5">
        <h1 className="text-2xl font-semibold mb-2">Tailored Diet Plan</h1>
        <h2 className="text-xl font-normal mb-2">Nourish Your Hair from Within</h2>
        <p className="pb-8 text-btnblue">Your hair health is closely linked to your diet. Here’s a customized meal plan to provide the nutrients your hair needs:</p>
      </div>
      <div className="flex flex-col space-y-10">
        <MealPlan />
        <MealPlan />
      </div>
      <div className="text-center my-16 px-5">
        <h1 className="text-2xl font-semibold mb-2">Tailored Diet Plan</h1>
        <h2 className="text-xl font-normal mb-2">Nourish Your Hair from Within</h2>
      </div>
      <div className="flex flex-col space-y-10 ">
        <MealPlan />
      </div>
      <div className="px-5 mt-16">
        <FAQ />
      </div>
    </div>
  )
}



