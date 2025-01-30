import Header from "@/components/others/header";
import React from "react";
import FAQ from "@/components/others/faq";
import Footer from "@/components/others/footer";
import Hero from "@/components/others/home/Hero";
import Cta from "@/components/others/home/Cta";
import Work from "@/components/others/home/Work";
import Testimonials from "@/components/others/home/Testimonial";
import { Chart } from "@/components/others/home/Chart";
import { Chart1 } from "@/components/others/home/Chart1";
import AIInsightsSection from "@/components/others/home/Ai";
import Blogs from "@/components/others/home/Blogs";

const Home = () => {
  return (
    <div className="min-h-screen container m-auto">
      <Header className="bg-yellow md:pb-20" />
      <Hero />
      <Cta />
      <Work />
      <Testimonials />
      <Chart />
      <Chart1 />
      <AIInsightsSection />
      <Blogs />
      <div className="my-8 md:my-12 mb-28">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
