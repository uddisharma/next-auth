"use client";
import ProcessCard from "@/components/others/process-card";
import WhyChooseUs from "@/components/others/why-choose-us";
import FAQ from "@/components/others/faq";
import { Button } from "@/components/ui/button";

export default function Home() {
  const processes = [
    {
      number: 1,
      title: "Data Acquisition",
      content: [
        "The process begins with secure image acquisition",
        "Users provide high-quality, unobstructed images of their face Users provide high-quality, unobstructed images of their face",
        "Our AI-powered system captures and analyzes key facial features Users provide high-quality, unobstructed images of their face",
        "Complete and visual hierarchy for analysis is maintained",
      ],
      imageSrc: "/ai.png",
      imageAlt: "Data Acquisition Illustration",
    },
    {
      number: 2,
      title: "Image Preprocessing",
      content: [
        "Image enhancement and quality optimization",
        "Noise Reduction: Filter out background noise and artifacts Users provide high-quality, unobstructed images of their face",
        "Face Detection: Precise isolation of facial features",
        "Data Normalization: Standardize intensity levels for consistent analysis Users provide high-quality, unobstructed images of their face",
      ],
      imageSrc: "/ai.png",
      imageAlt: "Image Preprocessing Illustration",
    },
    {
      number: 3,
      title: "Deep Learning-Based Analysis",
      content: [
        "Utilizes advanced neural networks for feature extraction Users provide high-quality, unobstructed images of their face",
        "Applies multiple AI models for comprehensive analysis Users provide high-quality, unobstructed images of their face",
        "Identifies key facial landmarks and micro-expressions",
        "Correlates visual data with psychological patterns Users provide high-quality, unobstructed images of their face",
      ],
      imageSrc: "/ai.png",
      imageAlt: "Deep Learning Analysis Illustration",
    },
    {
      number: 4,
      title: "Insight Generation",
      content: [
        "Synthesizes analysis results into actionable insights Users provide high-quality, unobstructed images of their face",
        "Generates personalized mental health assessments",
        "Provides detailed reports on emotional and cognitive patterns Users provide high-quality, unobstructed images of their face",
        "Offers tailored recommendations for mental well-being",
      ],
      imageSrc: "/ai.png",
      imageAlt: "Insight Generation Illustration",
    },
    {
      number: 5,
      title: "Reinforcement Learning for Continuous Improvement",
      content: [
        "Continuously refines AI models based on new data Users provide high-quality, unobstructed images of their face",
        "Adapts to individual user patterns over time",
        "Improves accuracy and personalization with each interaction Users provide high-quality, unobstructed images of their face",
        "Incorporates feedback to enhance overall system performance",
      ],
      imageSrc: "/ai.png",
      imageAlt: "Reinforcement Learning Illustration",
    },
    {
      number: 6,
      title: "Progress Monitoring",
      content: [
        "Tracks changes in mental health patterns over time Users provide high-quality, unobstructed images of their face",
        "Provides visual representations of progress and trends",
        "Alerts users to significant changes or potential concerns Users provide high-quality, unobstructed images of their face",
        "Enables long-term monitoring for sustained well-being",
      ],
      imageSrc: "/ai.png",
      imageAlt: "Progress Monitoring Illustration",
    },
    {
      number: 7,
      title: "Expert Consultation and Review",
      content: [
        "AI-generated insights are reviewed by mental health professionals",
        "Combines artificial intelligence with human expertise",
        "Ensures accuracy and relevance of recommendations",
        "Provides option for direct consultation with experts when needed",
      ],
      imageSrc: "/ai.png",
      imageAlt: "Expert Consultation Illustration",
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="md:px-4 md:py-8 px-5">
        <div className="bg-[url('/hero.png')] bg-cover bg-center py-4 mb-8 md:mb-16">
          <h1 className="text-4xl text-center mb-5">How Our AI Model Works</h1>

          <p className="text-btnblue">
            At Mr. Mard, we leverage cutting-edge Artificial Intelligence and
            Machine Learning (ML) technologies to analyze, detect, and deliver
            actionable insights for hair health. Our AI-driven bald spot
            detection system ensures precision and efficiency by blending
            computer vision, neural networks, and dermatological expertise.
          </p>
        </div>

        <div className="space-y-8">
          {processes.map((process, index) => (
            <ProcessCard key={index} {...process} />
          ))}
        </div>

        <WhyChooseUs />

        <div className="my-16 md:px-16 bg-white rounded-[144px] md:p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Start Your AI-Driven Mind Health Journey
          </h2>
          <p className="text-btnblue mb-8">
            Experience the future of wellness with AI. Get started today.
          </p>
          <Button
            size="lg"
            className="bg-btnblue hover:bg-btnblue/80 text-white"
          >
            Get free trial access
          </Button>
        </div>

        <FAQ />
      </main>
    </div>
  );
}
