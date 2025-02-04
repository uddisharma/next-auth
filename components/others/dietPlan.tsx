import Image from "next/image";

interface pageProps {
  heading: string;
  data: {
    image: string;
    heading1: string;
    heading2: string;
  }[];
}

export default function MealPlan(data: pageProps) {
  return (
    <div className="p-5 w-full bg-btnblue flex items-center justify-center rounded-[71px]">
      <div className="w-full max-w-6xl bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2] rounded-[144px] p-8 relative">
        <h1 className="text-2xl font-semibold text-center mb-12">
          {data?.heading ?? "For Vegetarians"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {data?.data.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-[132px] h-[132px] bg-white rounded-full overflow-hidden mb-4">
                <Image
                  src={item?.image}
                  alt="Spinach smoothie ingredients"
                  width={192}
                  height={192}
                  className="w-[132px] h-[132px] object-cover scale-150"
                />
              </div>
              <h2 className="text-md font-semibold mb-2">{item?.heading1}</h2>
              <p className="text-gray-700 text-[14px]">{item?.heading2}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
