"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Mr. Mind?",
    answer:
      "Mr. Mind is an advanced AI-powered analysis platform that helps understand and improve mental health patterns.",
  },
  {
    question: "How does Mr. Mind work?",
    answer:
      "Our platform uses advanced AI algorithms to analyze various parameters and provide comprehensive insights into mental health patterns.",
  },
  {
    question: "Do you store images of your faces?",
    answer:
      "We prioritize your privacy and security. All analysis is done in real-time and no facial images are stored on our servers.",
  },
  {
    question: "What is the accuracy of our AI Model?",
    answer:
      "Our AI model has been trained on a vast dataset and has achieved an accuracy rate of over 95% in identifying mental health patterns.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-16 md:px-16">
      <h2 className="text-2xl font-semibold mb-10 text-center">FAQs</h2>
      <div className="flex flex-wrap gap-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="flex-1 md:flex-[0_0_48%] border border-gray-200 bg-white rounded-lg shadow-sm h-fit"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium">{item.question}</span>
              <ChevronDown
                className={`transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 pt-0">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
