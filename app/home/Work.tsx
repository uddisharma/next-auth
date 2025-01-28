import React from "react";

const Work = () => {
  return (
    <div className="px-4">
      <div className="min-h-20 bg-white w-full flex justify-center items-center">
        <h2 className="text-4xl bg-white text-center text-btnblue py-8 mb-5">
          How It Works
          <p className="text-center text-gray-600 max-w-3xl mx-auto text-sm mt-3">
            Get tailored hair care treatments based on advanced hair and scalp
            analysis. Get tailored hair care treatments based on advanced hair
            and scalp analysis.Get tailored hair care treatments based on
            advanced hair and scalp analysis.
          </p>
        </h2>
      </div>
      <section className="flex flex-col items-center justify-center bg-btnblue p-6 px-10 rounded-[48px] shadow-md py-12">
        <div className="max-w-sm w-full space-y-6">
          {["Expert Guidance", "AI-Driven Insights", "Tailored Solutions"].map(
            (title, index) => (
              <div
                key={index}
                className="bg-yellow text-center p-6 rounded-2xl shadow-md border-[1px] border-black py-12 px-10"
              >
                <h3 className="text-lg text-btnblue font-semibold">{title}</h3>
                <p className="text-gray-700 mt-2">
                  Precision diagnostics for hair health.
                </p>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;
