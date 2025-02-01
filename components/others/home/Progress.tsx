import Image from "next/image";
import React from "react";

const Progress = () => {
  return (
    <div className="md:hidden bg-[#eaeaea] rounded-[48px] my-10 py-16">
      <h2 className="text-4xl text-center text-btnblue mb-5">
        Track you progress
      </h2>
      <Image
        src="/progress.png"
        alt="progress"
        width={500}
        height={500}
        className="px-10 m-auto mt-16"
      />
      <Image
        src="/progress2.png"
        alt="progress"
        width={500}
        height={500}
        className="px-10 m-auto mt-10"
      />
    </div>
  );
};

export default Progress;
