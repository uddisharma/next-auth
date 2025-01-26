import Header from "@/components/others/header";
import React from "react";
import Hero from "./Hero";
import Cta from "./Cta";
import Work from "./Work";
import Testimonials from "./Testimonial";
import { Chart } from "./Chart";

const Banner = () => {
  return (
    <div className="min-h-screen">
      <Header className="bg-yellow pb-20" />
      <Hero />
      <Cta />
      <Work />
      <Testimonials />
      <Chart />
    </div>
  );
};

export default Banner;
