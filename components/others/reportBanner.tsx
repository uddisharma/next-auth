import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import Image from "next/image";

const ReportBanner = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 mt-[-15px]">
      <div className="p-4 bg-[#F2F2F2] rounded-xl">
        <Tabs defaultValue="general" className="w-full">
          <div className="flex justify-center mb-6 md:mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2 items-center justify-center rounded-[144px] bg-white border-btnblue border-[1px] h-[45px] text-btnblue font-bold">
              <TabsTrigger
                value="general"
                className="data-[state=active]:bg-[#1B2B4B] data-[state=active]:text-white rounded-[144px] h-[35px] text-xs md:text-sm"
              >
                General Hair Health
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="data-[state=active]:bg-[#1B2B4B] data-[state=active]:text-white rounded-[144px] h-[35px] text-xs md:text-sm"
              >
                Hair Loss Analysis
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="general">
            <General />
          </TabsContent>
          <TabsContent value="analysis">
            <Analysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportBanner;

const General = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      {/* Left Sidebar (Full width on mobile) */}
      <Card className="w-full md:w-1/4 p-5 mb-6 md:mb-0">
        <h2 className="text-xl font-semibold text-center mb-6">
          Your Hair Score
        </h2>
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="stroke-[8] fill-none stroke-gray-200"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="stroke-[8] fill-none stroke-[#6366F1] transform -rotate-90 origin-center"
              cx="50"
              cy="50"
              r="45"
              strokeDasharray={`${2.827 * 75} ${2.827 * (100 - 75)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">
              75<span className="text-lg font-normal">/100</span>
            </span>
          </div>
        </div>
        <div className="mt-8 md:mt-16 space-y-4 bg-[#F7F7F7] text-[#808080] p-4 rounded-xl">
          {[
            { label: "Hair Thickness", value: 80 },
            { label: "Oiliness", value: 65 },
            { label: "Hair Density", value: 78 },
            { label: "Scalp Coverage", value: 85 },
            { label: "Dryness", value: 70 },
            { label: "Hair Type Adjustment", value: 75 },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span>{item.value}/100</span>
              </div>
              <Progress value={item.value} className="h-2 bg-yellow" />
            </div>
          ))}
        </div>
      </Card>

      {/* Right Content Area (Full width on mobile, grid on desktop) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-4">
        <Card className="p-6 h-fit-content">
          <h2 className="text-xl font-semibold text-left mb-6">
            Total Hair Count
          </h2>
          <div className="flex items-center justify-center">
            <span className="text-[48px] md:text-[64px] font-bold text-btnblue">
              95,675
            </span>
          </div>
        </Card>

        <Card className="p-6 h-fit-content">
          <h2 className="text-xl font-semibold text-left mb-6">Hair Type</h2>
          <div className="flex justify-center gap-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <WavyIcon className="w-6 h-6" />
              </div>
              <span className="text-sm">Straight</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <DotsIcon className="w-6 h-6" />
              </div>
              <span className="text-sm">Low</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center"></div>
              <span className="text-sm">Black</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <BellCurve value={91} color="red" />
          <div className="flex justify-between text-sm mt-2">
            <span>You</span>
            <span>Age Average</span>
          </div>
        </Card>

        <Card className="p-6">
          <BellCurve value={75} color="green" />
          <div className="flex justify-between text-sm mt-2">
            <span>You</span>
            <span>Age Average</span>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <TimelineGraph />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Better hair coverage.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Dryness in top 70%; hydrate more.</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Hair density improved; more growth</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>No dandruff.</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Analysis = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/user-icon.png"
            width={180}
            height={180}
            alt="User icon"
            className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]"
          />
          <div className="w-full sm:w-48 h-32 sm:h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </Card>
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/user-icon.png"
            width={180}
            height={180}
            alt="User icon"
            className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]"
          />
          <div className="w-full sm:w-48 h-32 sm:h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-[#1B2B4B] mb-4">
          How Does Your Hair Density Compare?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Using advanced AI algorithms, we've analyzed your scalp's hair count
          and compared it to individuals in your age and gender group.
        </p>
      </Card>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="text-[#1B2B4B]">
              <p className="font-medium">
                Your Hair Count:{" "}
                <span className="font-bold">45 follicles/cm²</span>
              </p>
              <p className="font-medium">
                Average Hair Count (Peers):{" "}
                <span className="font-bold">60 follicles/cm²</span>
              </p>
              <p className="font-medium">
                Scalp Coverage:{" "}
                <span className="font-bold">80% (Moderate Coverage)</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1B2B4B]">Insights:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • Your hair density is below the average, indicating potential
                thinning.
              </li>
              <li>• Targeted care can help boost density over time.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

function WavyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12" />
    </svg>
  );
}

function DotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </svg>
  );
}

function BellCurve({ value, color }: { value: number; color: string }) {
  return (
    <svg className="w-full h-24" viewBox="0 0 200 100">
      <path
        d="M0 90 C50 90 50 10 100 10 C150 10 150 90 200 90"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="2"
      />
      <line
        x1={value * 2}
        y1="0"
        x2={value * 2}
        y2="100"
        stroke={color === "red" ? "#EF4444" : "#10B981"}
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="0"
        x2="100"
        y2="100"
        stroke="#E5E7EB"
        strokeWidth="2"
        strokeDasharray="4"
      />
    </svg>
  );
}

function TimelineGraph() {
  return (
    <div className="relative h-20">
      <svg className="w-full h-full" viewBox="0 0 400 100">
        <defs>
          <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(96, 165, 250, 0.2)" />
            <stop offset="100%" stopColor="rgb(96, 165, 250, 0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 80 C100 80 100 60 200 40 L200 100 L0 100 Z"
          fill="url(#blueGradient)"
        />
        <path
          d="M0 80 C100 80 100 60 200 40"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2"
        />
        <path
          d="M200 40 C300 20 300 70 400 60"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="0"
          x2="200"
          y2="100"
          stroke="#1B2B4B"
          strokeWidth="2"
          strokeDasharray="4"
        />
        {/* <text x="190" y="95" className="text-xs" fill="#1B2B4B">Today</text> */}
        <text x="0" y="20" className="text-xs" fill="#666">
          145908
        </text>
        <text x="350" y="20" className="text-xs" fill="#666">
          91294
        </text>
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600">
        <span>0 year</span>
        <span>1 year</span>
      </div>
    </div>
  );
}
