import ReportForm from "@/components/others/ReportForm";
// import { db } from "@/lib/db";

// export default async function SubmitReportPage() {
//   const activeQuestions = await db.question.findMany({
//     where: { isActive: true },
//     include: { options: true },
//     orderBy: { sequence: "asc" },
//   });

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Submit Report</h1>
//       <ReportForm questions={activeQuestions} userId={3} />
//     </div>
//   );
// }

("use client");
import React, { useState } from "react";
import "./MultiStepForm.css"; // Import CSS file
import AnalyticsIllustration from "@/components/others/analytics-illustrations";
import ProgressDots from "@/components/others/progress-dots";
import { Button } from "@/components/ui/button";

interface Option {
  id: number;
  questionId: number;
  text: string;
  sequence: number;
  isActive: boolean;
  isDeleted: boolean;
}

interface Question {
  id: number;
  text: string;
  sequence: number;
  questionType: "SINGLE_SELECT" | "MULTIPLE_SELECT" | "TEXT";
  required: boolean;
  options: Option[];
}

const dummyData: Question[] = [
  {
    id: 1,
    text: "How satisfied are you with our service?",
    sequence: 1,
    questionType: "SINGLE_SELECT",
    required: true,
    options: [
      {
        id: 1,
        questionId: 2,
        text: "Satisfied",
        sequence: 2,
        isActive: true,
        isDeleted: false,
      },
      {
        id: 4,
        questionId: 2,
        text: "Very Satisfied",
        sequence: 1,
        isActive: true,
        isDeleted: false,
      },
    ],
  },
  {
    id: 1,
    text: "What features would you like to see improved?",
    sequence: 2,
    questionType: "MULTIPLE_SELECT",
    required: true,
    options: [
      {
        id: 2,
        questionId: 1,
        text: "Feature B",
        sequence: 2,
        isActive: true,
        isDeleted: false,
      },
      {
        id: 3,
        questionId: 1,
        text: "Feature A",
        sequence: 1,
        isActive: true,
        isDeleted: false,
      },
    ],
  },
  {
    id: 3,
    text: "How satisfied are you with our service?",
    sequence: 1,
    questionType: "SINGLE_SELECT",
    required: true,
    options: [
      {
        id: 1,
        questionId: 2,
        text: "Satisfied",
        sequence: 2,
        isActive: true,
        isDeleted: false,
      },
      {
        id: 4,
        questionId: 2,
        text: "Very Satisfied",
        sequence: 1,
        isActive: true,
        isDeleted: false,
      },
    ],
  },
  {
    id: 4,
    text: "What features would you like to see improved?",
    sequence: 2,
    questionType: "MULTIPLE_SELECT",
    required: true,
    options: [
      {
        id: 2,
        questionId: 1,
        text: "Feature B",
        sequence: 2,
        isActive: true,
        isDeleted: false,
      },
      {
        id: 3,
        questionId: 1,
        text: "Feature A",
        sequence: 1,
        isActive: true,
        isDeleted: false,
      },
    ],
  },
];

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [responses, setResponses] = useState<Record<number, string | string[]>>(
    {},
  );
  const [errors, setErrors] = useState<string>("");

  const handleOptionChange = (
    questionId: number,
    value: string,
    isMultiple: boolean,
  ): void => {
    setResponses((prev) => {
      const existing = prev[questionId] || (isMultiple ? [] : "");
      if (isMultiple) {
        const updated = (existing as string[]).includes(value)
          ? (existing as string[]).filter((v) => v !== value)
          : [...(existing as string[]), value];
        return { ...prev, [questionId]: updated };
      }
      return { ...prev, [questionId]: value };
    });
  };

  const handleNext = (): void => {
    const currentQuestion = dummyData[currentStep];
    console.log(currentQuestion);
    if (currentQuestion.required && !responses[currentQuestion.id]) {
      setErrors("This question is required.");
      return;
    }
    setErrors("");
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = (): void => {
    setErrors("");
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (): void => {
    console.log("Form Responses:", responses);
    alert("Form submitted successfully!");
  };

  const currentQuestion = dummyData[currentStep];

  return (
    <>
      <div className="form-container">
        <div className="step-indicator">
          {dummyData.map((_, index) => (
            <span
              key={index}
              className={`step-dot ${index <= currentStep ? "active" : ""}`}
            ></span>
          ))}
        </div>
        <div className="question-container">
          <h2>{currentQuestion.text}</h2>
          {currentQuestion.questionType === "SINGLE_SELECT" &&
            currentQuestion.options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  responses[currentQuestion.id] === option.text
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleOptionChange(currentQuestion.id, option.text, false)
                }
              >
                {option.text}
              </button>
            ))}
          {currentQuestion.questionType === "MULTIPLE_SELECT" &&
            currentQuestion.options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  (responses[currentQuestion.id] as string[])?.includes(
                    option.text,
                  )
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleOptionChange(currentQuestion.id, option.text, true)
                }
              >
                {option.text}
              </button>
            ))}
          {errors && <p className="error-text">{errors}</p>}
        </div>
        <div className="navigation-buttons">
          {currentStep > 0 && (
            <button onClick={handlePrevious} className="nav-button">
              Previous
            </button>
          )}
          {currentStep < dummyData.length - 1 ? (
            <button onClick={handleNext} className="nav-button">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="nav-button">
              Submit
            </button>
          )}
        </div>
      </div>
      {/* <div className="flex flex-col px-5 md:px-10 my-2 mb-20 md:mb-0 md:py-10">
        <main className="flex-1 md:px-4 md:py-12 w-full">
          <div className="grid md:grid-cols-2 justify-center gap-20 items-center">
            <div className="">
              <AnalyticsIllustration />
            </div>
            <div className="">
              <ProgressDots total={dummyData.length} current={currentStep} />
              <div className="space-y-14 mt-16">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentQuestion.text}
                  </h1>
                  <p className="text-gray-600">
                    To get started, let us know your gender to provide insights tailored
                    to your unique hair profile.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {currentQuestion.questionType === "SINGLE_SELECT" &&
                    currentQuestion.options.map((option) => (
                      <Button
                        key={option.id}
                        variant={responses[currentQuestion.id] === option.text ? "default" : "outline"}
                        className={`flex-1 border-[1px] border-black text-black bg-white ${responses[currentQuestion.id] === option.text ? "bg-btnblue text-white" : ""}`}
                        onClick={() =>
                          handleOptionChange(currentQuestion.id, option.text, false)
                        }
                      >
                        {option.text}
                      </Button>
                    ))}
                  {currentQuestion.questionType === "MULTIPLE_SELECT" &&
                    currentQuestion.options.map((option) => (
                      <Button
                        key={option.id}
                        variant={(responses[currentQuestion.id] as string[])?.includes(option.text) ? "default" : "outline"}
                        className={`flex-1 border-[1px] border-black text-black bg-white ${(responses[currentQuestion.id] as string[])?.includes(option.text) ? "bg-btnblue text-white" : ""}`}
                        onClick={() =>
                          handleOptionChange(currentQuestion.id, option.text, true)
                        }
                      >
                        {option.text}
                      </Button>
                    ))}
                </div>
                {errors && (
                  <p className="text-red-500 text-xs">
                    {errors}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-5 mt-10">
                {currentStep > 0 && (
                  <Button
                  variant="outline"
                    onClick={handlePrevious}
                    className=" px-14"
                  >
                    Previous
                  </Button>
                )}
                {currentStep < dummyData.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-btnblue text-white px-14"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-btnblue text-white px-14"
                  >
                    Submit
                  </Button>
                )}

              </div>
            </div>
          </div>
        </main >
      </div> */}
    </>
  );
};

export default MultiStepForm;
