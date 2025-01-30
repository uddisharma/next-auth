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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  {
    id: 2,
    name: "Sankalp",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  {
    id: 3,
    name: "Ateeth Patel",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
  {
    id: 4,
    name: "Sankalp",
    role: "Back-end developer at abc",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "Mr. Mard user, 18/10/2024",
    avatar: "/user.png",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const slidesPerView = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-10 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl bg-white text-center text-btnblue py-8 mb-2">
          What Our Users Say
        </h2>

        <div className="relative max-w-5xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div key={index} className="flex w-full flex-shrink-0 px-4 py-5">
                {testimonials
                  .slice(
                    index * slidesPerView,
                    index * slidesPerView + slidesPerView,
                  )
                  .map((testimonial) => (
                    <Card
                      key={testimonial.id}
                      className="w-full mx-2 shadow-lg rounded-[12px] border border-gray-200 bg-gradient-to-t from-customGray to-customGray"
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-4">
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
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 mt-6">
          <Button variant="ghost" onClick={prevSlide}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex justify-center items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-[#1e2756]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <Button variant="ghost" onClick={nextSlide}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
