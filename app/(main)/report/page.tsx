"use client";
import MealPlan from "@/components/others/dietPlan";
import MealPlan1 from "@/components/others/dietPlan1";
import FAQ from "@/components/others/faq";
import ReportBanner from "@/components/others/reportBanner";
import { Button } from "@/components/ui/button";

export default function HairAnalysis() {
  return (
    <div className="container mx-auto">
      <div className="bg-yellow py-4 md:mx-6 px-4 rounded-[144px] md:mt-5">
        <p className="text-[#1E2A4A] text-[20px] md:text-[25px] text-center font-semibold">
          Hair Health Report
        </p>
      </div>
      {/* <div className="text-center my-7 md:my-14 px-5">
        <h1 className="text-2xl mb-2">Your Personalised Hair Analysis</h1>
        <h2 className="text-[18px] mb-2 md:px-4">
          Our AI-powered Hair Analysis Tool provides you with a comprehensive
          evaluation of your hair health. By analyzing your images and input
          data, we generate actionable insights and recommendations to help you
          achieve your hair goals.
        </h2>
      </div>
      <ReportBanner /> */}
      <div className="text-center my-10 px-5">
        <h1 className="text-2xl font-semibold mb-2">Tailored Diet Plan</h1>
        <h2 className="text-xl font-normal mb-2">
          Nourish Your Hair from Within
        </h2>
        <p className="pb-8 text-btnblue">
          Your hair health is closely linked to your diet. Here’s a customized
          meal plan to provide the nutrients your hair needs:
        </p>
      </div>
      <div className="flex flex-col space-y-10">
        <MealPlan />
        <MealPlan />
      </div>
      <div className="text-center my-16 px-5">
        <h1 className="text-2xl font-semibold mb-2">Tailored Diet Plan</h1>
        <h2 className="text-xl font-normal mb-2">
          Nourish Your Hair from Within
        </h2>
      </div>
      <div className="flex flex-col space-y-10 ">
        <MealPlan />
      </div>
      <div className="text-center my-16 px-5">
        <h1 className="text-2xl font-semibold mb-2">Tailored Diet Plan</h1>
        <h2 className="text-xl font-normal mb-2">
          Nourish Your Hair from Within
        </h2>
      </div>
      <div className="flex flex-col space-y-10 ">
        <MealPlan1 />
      </div>
      <div className="mt-10 flex justify-center">
        <Button
          variant="default"
          className="bg-btnblue text-white hover:bg-btnblue/80 p-[6px_30px] text-[14px] rounded-[11px]"
        >
          Buy Now
        </Button>
      </div>
      <div className="text-left py-12 px-5 md:px-24">
        <h1 className="text-2xl font-semibold mb-2">
          Take the first step Toward Healthier Hairs
        </h1>
        <h2 className="text-sm font-normal mb-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic cum
          aperiam possimus laborum culpa asperiores, quibusdam eveniet saepe rem
          deleniti vitae, nisi corrupti impedit molestias, neque modi tempora
          enim eligendi.
        </h2>
      </div>
      <div className="px-5 ">
        <FAQ />
      </div>
    </div>
  );
}
