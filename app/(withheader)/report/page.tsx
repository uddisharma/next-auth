'use client'
import MealPlan from "@/components/others/dietPlan"
import FAQ from "@/components/others/faq"
import ReportBanner from "@/components/others/reportBanner"

export default function HairAnalysis() {
  return (
    <div>
      <div className="bg-yellow py-4 md:mx-6 px-4 rounded-[144px] md:mt-5">
        <p className="text-[#1E2A4A] text-[20px] md:text-[25px] text-center font-semibold">
          Hair Health Report
        </p>
      </div>
      <div className="text-center my-7 md:my-14 px-5">
        <h1 className="text-2xl mb-2">Your Personalised Hair Analysis</h1>
        <h2 className="text-[18px] mb-2 md:px-4">Our AI-powered Hair Analysis Tool provides you with a comprehensive evaluation of your hair health. By analyzing your images and input data, we generate actionable insights and recommendations to help you achieve your hair goals.</h2>
      </div>
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



