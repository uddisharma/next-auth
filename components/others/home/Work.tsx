import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Work = () => {
  return (
    <>
      <div className="px-6 md:hidden bg-white">
        <div className="min-h-20 bg-white w-full flex justify-center items-center">
          <h2 className="text-4xl bg-white text-center text-btnblue py-8 mb-5">
            How It Works
            <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg mt-3">
              Get tailored hair care treatments based on advanced hair and scalp
              analysis. Get tailored hair care treatments based on advanced hair
              and scalp analysis.Get tailored hair care treatments based on
              advanced hair and scalp analysis.
            </p>
          </h2>
        </div>
        <section className="flex flex-col items-center justify-center bg-btnblue mx-2 p-6 px-10 rounded-[38px] shadow-md py-12">
          <div className="max-w-sm w-full space-y-6">
            {[
              "Expert Guidance",
              "AI-Driven Insights",
              "Tailored Solutions",
            ].map((title, index) => (
              <div
                key={index}
                className="bg-yellow text-center p-6 rounded-[38px] shadow-md border-[1px] border-black py-12 px-10"
              >
                <h3 className="text-[18px] text-btnblue font-semibold">
                  {title}
                </h3>
                <p className="text-gray-700 mt-2">
                  Precision diagnostics for hair health.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="hidden md:block ">
        <div className="bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2] pt-24 max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-0 bg-btnblue rounded-[144px] min-h-[400px]  m-auto">
            <div className="rounded-[134px_0px_100px_0px] w-full bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2]">
              <div className="flex justify-center items-center h-full">
                <div className="px-8 py-5 max-w-[800px] w-full">
                  <h1 className="text-[35px] text-left text-blue-900">
                    How we work ?
                  </h1>
                  <p className="text-left text-black">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto ducimus veniam vitae magnam, tempora quia numquam
                    nulla, fugiat in fuga tempore ipsum ullam. Quo et assumenda
                    corporis praesentium maxime reiciendis?
                  </p>
                  <div className="mt-2">
                    <Link href={`/analyze`}>
                      <Button
                        variant="default"
                        className="bg-btnblue text-white hover:bg-btnblue/80 p-[6px_30px] text-[14px] rounded-[11px]"
                      >
                        Get Analysis
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2] relative">
              <div className=" rounded-[100px_144px_0px_0px] bg-btnblue w-full h-full z-10">
                <div className="flex justify-center align-middle items-center h-full">
                  <div className="bg-yellow text-center p-6 rounded-[38px] shadow-md border-[1px] border-black py-12 px-10">
                    <h3 className="text-[18px] text-btnblue font-semibold">
                      AI-Driven Insights
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Precision diagnostics for hair health.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2] relative">
              <div className="rounded-[144px_0px_0px_184px] bg-btnblue z-10 w-full h-full">
                <div className="flex justify-center align-middle items-center h-full">
                  <div className="bg-yellow text-center p-6 rounded-[38px] shadow-md border-[1px] border-black py-12 px-10">
                    <h3 className="text-[18px] text-btnblue font-semibold">
                      AI-Driven Insights
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Precision diagnostics for hair health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center align-middle items-center h-full">
                <div className="bg-yellow text-center p-6 rounded-[38px] shadow-md border-[1px] border-black py-12 px-10 my-10">
                  <h3 className="text-[18px] text-btnblue font-semibold">
                    AI-Driven Insights
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Precision diagnostics for hair health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
