"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  date: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ateeth Patel",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  {
    id: 2,
    name: "Sankalp",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  {
    id: 3,
    name: "Ateeth Patel",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  {
    id: 4,
    name: "Sankalp",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  {
    id: 5,
    name: "Sankalp",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  // Add more testimonials as needed
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl bg-white  text-center text-btnblue py-8 mb-10">
          What Our Users Say
        </h2>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 50}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-1/2 flex-shrink-0 px-4 md:px-6 rounded-lg"
                >
                  <Card className="shadow-[0_10px_30px_rgba(0,0,0,0.15)] my-10 rounded-[12px] border border-gray-200 bg-gradient-to-t from-customGray to-customGray ">
                    <CardContent className="p-6">
                      <div className="flex gap-4 ">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-black font-normal">
                              {testimonial.role}
                            </p>
                          </div>
                          <p className="text-gray-600 mb-4">
                            {testimonial.content}
                          </p>
                          <p className="text-sm text-gray-400">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5">
          <button className="" onClick={prevSlide}>
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </button>
          <div className="flex justify-center items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-[#1e2756]" : "bg-gray-300"
                }`}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
          <button className="" onClick={nextSlide}>
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </button>
        </div>
      </div>
    </section>
  );
}
