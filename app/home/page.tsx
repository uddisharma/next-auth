import Header from "@/components/others/header";
import React from "react";
import Hero from "./Hero";
import Cta from "./Cta";
import Work from "./Work";
import Testimonials from "./Testimonial";
import { Chart } from "./Chart";
import { Chart1 } from "./Chart1";
import Ai from "./Ai";
import Blogs from "./Blogs";
import FAQ from "@/components/others/faq";
import Footer from "@/components/others/footer";

const Banner = () => {
  return (
    <div className="min-h-screen container m-auto">
      <Header className="bg-yellow md:pb-20" />
      <Hero />
      <Cta />
      <Work />
      <Testimonials />
      <Chart />
      <Chart1 />
      <Ai />
      <Blogs />
      <div className="my-8 md:my-12 mb-28">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Banner;
