import Image from "next/image";

export default function MealPlan() {
  return (
    <div className="p-5 w-full bg-btnblue flex items-center justify-center rounded-[71px]">
      <div className="w-full max-w-7xl bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2] rounded-[144px] p-8 relative">
        <h1 className="text-2xl font-semibold text-center mb-12">
          For Vegetarians
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-[132px] h-[132px] rounded-full overflow-hidden mb-4">
              <Image
                src="/blogs3.png"
                alt="Spinach smoothie ingredients"
                width={192}
                height={192}
                className="w-[132px] h-[132px] object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Breakfast</h2>
            <p className="text-gray-700">
              Spinach smoothie with chia seeds and almonds.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-[132px] h-[132px] rounded-full overflow-hidden mb-4">
              <Image
                src="/blogs3.png"
                alt="Lentil soup with quinoa"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Lunch</h2>
            <p className="text-gray-700">Lentil soup with a quinoa salad.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-[132px] h-[132px] rounded-full overflow-hidden mb-4">
              <Image
                src="/blogs3.png"
                alt="Paneer with whole-grain roti"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Dinner</h2>
            <p className="text-gray-700">
              Paneer with whole-grain roti and a side of broccoli.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-[132px] h-[132px] rounded-full overflow-hidden mb-4">
              <Image
                src="/blogs3.png"
                alt="Healthy snacks"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Snacks</h2>
            <p className="text-gray-700">
              Pumpkin seeds, walnuts, or a fruit bowl.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
