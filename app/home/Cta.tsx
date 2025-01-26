import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

const Cta = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-10">
      {/* Top buttons */}
      <div className="bg-white py-10 mb-5">
        <div className="flex flex-wrap justify-center gap-16 mb-12">
          <Button className="bg-[#1a2642] text-white hover:bg-[#243154] rounded-[12px] py-5">
            Get Your Hair Analysis
          </Button>
          <Button variant="outline" className="py-5 gap-2 rounded-[12px]">
            <div className="flex items-center gap-2 text-white bg-black rounded-full p-1">
              <Play size={16} className="" />
            </div>
            Watch Demo
          </Button>
        </div>
        {/* Customer count and avatars */}
        <div className="flex flex-wrap items-center justify-center gap-2 ">
          <div className="text-3xl font-bold">2200+</div>
          <div className="flex flex-col sm:flex-row items-center ">
            <span className="text-black text-[12px] max-w-[80px]">
              Happy Customers
            </span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image
                    src={`/user.png`}
                    alt={`Customer ${i}`}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black -translate-y-1/2" />
        <div className="relative flex justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="w-4 h-4 rounded-full bg-black z-10" />
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[
          { title: "1. Analyze", active: false },
          { title: "2. Get Report", active: false },
          { title: "3. Treatment", active: false },
        ].map((step, index) => (
          <Card
            key={index}
            className={`p-6 ${
              step.active
                ? "bg-btnblue text-white ring-2 ring-blue-400"
                : "bg-btnblue text-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-300">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cta;
