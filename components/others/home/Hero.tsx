import Image from "next/image";
import Link from "next/link";
import React from "react";
const Hero = () => {
  return (
    <div className="bg-white pb-8">
      <div
        className="hidden relative md:flex justify-between bg-[#EDDE79]  rounded-[0px_0px_144px_144px] px-10 min-h-[650px]"
        style={{
          backgroundImage: 'url("/men.png")',
          backgroundSize: "550px 630px",
          backgroundPosition: "65% bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Left Section */}
        <div className="flex flex-col space-y-8">
          <h1 className="text-[45px] text-btnblue text-left xs:text-center">
            NO MORE{" "}
            <span className="text-btnblue font-bold">TRAIL AND ERROR</span>{" "}
            <br />
          </h1>
          <p className="text-[18px] text-black max-w-lg pr-10">
            It’s time to find the solution you can finally trust because you
            deserve results. Never let Hair loss take your confidence
          </p>
          <div className="flex flex-col space-y-8 w-[250px] max-w-[250px]">
            <Link href="/analyze">
              <button className="px-6 py-3 text-white bg-btnblue rounded-[12px] hover:opacity-90 box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; ">
                Get Your Hair Analysis
              </button>
            </Link>
            <Link href="/technology">
              <button className="px-6 py-[10px] w-[215px] text-btnblue bg-yellow border-black border-[1.5px] rounded-[12px]  hover:opacity-90 ">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative mt-28 hidden md:block">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-lg">Hair Density</p>
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-20 bg-black"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <p className="text-lg">Scalp Analysis</p>
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-20 bg-black"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <p className="text-lg">Get Treated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:hidden flex-col space-y-8 bg-yellow px-5 pt-10 rounded-[0px_0px_48px_48px] overflow-hidden">
        <h1 className="text-[40px] md:text-[45px] w-full text-btnblue text-center">
          NO MORE{" "}
          <span className="text-btnblue font-bold">TRAIL AND ERROR</span> <br />{" "}
        </h1>
        <p className="text-[16px] text-black w-full text-center ">
          Get tailored hair care treatments based on advanced hair and scalp
          analysis.
        </p>
        <div className="flex flex-col justify-center items-center space-y-8 w-full pb-5">
          <Link href="/analyze">
            <button className="px-6 w-[250px] py-3 text-white bg-btnblue rounded-[12px] hover:opacity-90 m-auto shadow-[rgba(0,_0,_0,_0.25)_0px_54px_55px,_rgba(0,_0,_0,_0.12)_0px_-12px_30px,_rgba(0,_0,_0,_0.12)_0px_4px_6px,_rgba(0,_0,_0,_0.17)_0px_12px_13px,_rgba(0,_0,_0,_0.09)_0px_-3px_5px]">
              Get Your Hair Analysis
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-[30px] overflow-hidden mx-2 mt-5">
          <Image
            src="/men.png"
            alt=""
            width={400}
            height={400}
            className="object-cover w-full h-full border-[5px] border-[#bea500] rounded-[30px]"
          />
        </div>
        <div className="h-[1px] w-full"></div>
      </div>
    </div>
  );
};

export default Hero;
