// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Play } from "lucide-react";
// import Image from "next/image";
// import React from "react";

// const Cta = () => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 mb-10">
//       {/* Top buttons */}
//       <div className="bg-white py-10 mb-5">
//         <div className="flex flex-wrap justify-center gap-16 mb-12">
//           <Button className="bg-[#1a2642] text-white hover:bg-[#243154] rounded-[12px] py-5">
//             Get Your Hair Analysis
//           </Button>
//           <Button variant="outline" className="py-5 gap-2 rounded-[12px]">
//             <div className="flex items-center gap-2 text-white bg-black rounded-full p-1">
//               <Play size={16} className="" />
//             </div>
//             Watch Demo
//           </Button>
//         </div>
//         {/* Customer count and avatars */}
//         <div className="flex flex-wrap items-center justify-center gap-2 ">
//           <div className="text-3xl font-bold">2200+</div>
//           <div className="flex flex-col sm:flex-row items-center ">
//             <span className="text-black text-[12px] max-w-[80px]">
//               Happy Customers
//             </span>
//             <div className="flex -space-x-2">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
//                 >
//                   <Image
//                     src={`/user.png`}
//                     alt={`Customer ${i}`}
//                     width={32}
//                     height={32}
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Timeline */}
//       <div className="relative mb-8">
//         <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black -translate-y-1/2" />
//         <div className="relative flex justify-between">
//           {[1, 2, 3].map((step) => (
//             <div key={step} className="w-4 h-4 rounded-full bg-black z-10" />
//           ))}
//         </div>
//       </div>

//       {/* Process steps */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
//         {[
//           { title: "1. Analyze", active: false },
//           { title: "2. Get Report", active: false },
//           { title: "3. Treatment", active: false },
//         ].map((step, index) => (
//           <Card
//             key={index}
//             className={`p-6 ${
//               step.active
//                 ? "bg-btnblue text-white ring-2 ring-blue-400"
//                 : "bg-btnblue text-white"
//             }`}
//           >
//             <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//             <p className="text-sm text-gray-300">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry.
//             </p>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cta;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

const Cta = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 mb-10">
      {/* Top buttons */}
      <div className=" py-10">
        <div className=" flex-wrap justify-center gap-4 mb-10 hidden md:flex">
          <Button className="bg-[#1a2642] text-white hover:bg-[#243154] rounded-[12px] py-5">
            Get Your Hair Analysis
          </Button>
          <Button variant="outline" className="py-5 gap-2 rounded-[12px]">
            <div className="flex items-center gap-2 text-white bg-black rounded-full p-1">
              <Play size={16} />
            </div>
            Watch Demo
          </Button>
        </div>

        <div className="md:hidden flex flex-col items-center justify-center text-center  relative bg-white py-2">
          {/* Customer count */}
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-black">
              2200<span className="text-[#000]">+</span>
            </h2>
            <p className="text-lg text-black">Happy Customers</p>
          </div>
          <div className="flex -space-x-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative w-16 h-16 rounded-full border-2 border-white overflow-hidden"
              >
                <Image
                  src={`/user.png`}
                  alt={`Customer ${i}`}
                  width={320}
                  height={320}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Customer count and avatars */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2 ">
          <div className="text-3xl font-bold">2200+</div>
          <div className="flex flex-col sm:flex-row items-center ">
            <span className="text-black text-[12px] max-w-[80px]">
              Happy Customers
            </span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
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

      {/* Timeline - Vertical for mobile, horizontal for larger screens */}
      <div className="relative flex flex-col items-center md:grid md:grid-cols-3 md:gap-6 pt-4 bg-white">
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="h-16 w-[2px] bg-black md:hidden" />}
            <Card className="flex flex-col items-center text-center bg-[#1A2642] text-white p-6 rounded-lg w-[80%] md:w-full">
              <h3 className="text-2xl pt-4 font-semibold">{`${step}. ${
                step === 1 ? "Analyze" : step === 2 ? "Get Report" : "Treatment"
              }`}</h3>
              <p className="text-lg md:text-sm m-4 text-gray-300">
                Lorem Ipsum
              </p>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Cta;
