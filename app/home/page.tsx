// "use client"

// import { useState } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"

// interface Testimonial {
//     id: number
//     name: string
//     role: string
//     content: string
//     date: string
//     avatar: string
// }

// const testimonials: Testimonial[] = [
//     {
//         id: 1,
//         name: "Ateeth Patel",
//         role: "Back-end developer at abc",
//         content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//         date: "Mr. Mard user, 18/10/2024",
//         avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5jpesONXjQkAIe3inTbh1BGwA4uXrg.png",
//     },
//     {
//         id: 2,
//         name: "Sankalp",
//         role: "Back-end developer at abc",
//         content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//         date: "Mr. Mard user, 18/10/2024",
//         avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5jpesONXjQkAIe3inTbh1BGwA4uXrg.png",
//     },
//     {
//         id: 3,
//         name: "Ateeth Patel",
//         role: "Back-end developer at abc",
//         content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//         date: "Mr. Mard user, 18/10/2024",
//         avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5jpesONXjQkAIe3inTbh1BGwA4uXrg.png",
//     },
//     {
//         id: 4,
//         name: "Sankalp",
//         role: "Back-end developer at abc",
//         content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//         date: "Mr. Mard user, 18/10/2024",
//         avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5jpesONXjQkAIe3inTbh1BGwA4uXrg.png",
//     },
//     {
//         id: 5,
//         name: "Sankalp",
//         role: "Back-end developer at abc",
//         content:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
//         date: "Mr. Mard user, 18/10/2024",
//         avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5jpesONXjQkAIe3inTbh1BGwA4uXrg.png",
//     },
//     // Add more testimonials as needed
// ]

// export default function Testimonials() {
//     const [currentSlide, setCurrentSlide] = useState(0)
//     const totalSlides = testimonials.length

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % totalSlides)
//     }

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
//     }

//     const goToSlide = (index: number) => {
//         setCurrentSlide(index)
//     }

//     return (
//         <section className="py-16 px-4">
//             <div className="max-w-6xl mx-auto">
//                 <h2 className="text-4xl font-bold text-center text-[#1e2756] mb-12">What Our Users Say</h2>

//                 <div className="relative">
//                     <div className="overflow-hidden">
//                         <div
//                             className="flex transition-transform duration-300 ease-in-out"
//                             style={{ transform: `translateX(-${currentSlide * 50}%)` }}
//                         >
//                             {testimonials.map((testimonial) => (
//                                 <div key={testimonial.id} className="w-1/2 flex-shrink-0 px-4 md:px-6">
//                                     <Card className="shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
//                                         <CardContent className="p-6">
//                                             <div className="flex items-center gap-4 mb-4">
//                                                 <Avatar className="h-12 w-12">
//                                                     <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
//                                                     <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
//                                                 </Avatar>
//                                                 <div>
//                                                     <h3 className="font-semibold text-lg">{testimonial.name}</h3>
//                                                     <p className="text-sm text-gray-600">{testimonial.role}</p>
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-600 mb-4">{testimonial.content}</p>
//                                             <p className="text-sm text-gray-400">{testimonial.date}</p>
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4"
//                         onClick={prevSlide}
//                     >
//                         <ChevronLeft className="h-6 w-6" />
//                         <span className="sr-only">Previous slide</span>
//                     </Button>

//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4"
//                         onClick={nextSlide}
//                     >
//                         <ChevronRight className="h-6 w-6" />
//                         <span className="sr-only">Next slide</span>
//                     </Button>
//                 </div>

//                 <div className="flex justify-center gap-2 mt-8">
//                     {Array.from({ length: totalSlides }).map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => goToSlide(index)}
//                             className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? "bg-[#1e2756]" : "bg-gray-300"
//                                 }`}
//                         >
//                             <span className="sr-only">Go to slide {index + 1}</span>
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

import Header from "@/components/others/header";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div>
      <Header className="bg-yellow pb-20" />
      <div
        className="relative flex justify-between bg-[#EDDE79] min-h-screen rounded-[0px_0px_144px_144px] px-10"
        style={{
          backgroundImage: 'url("/men.png")',
          backgroundSize: "550px 630px",
          // backgroundSize: "contain",
          backgroundPosition: "65% bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Left Section */}
        <div className="flex flex-col space-y-8">
          <h1 className="text-[35px] text-btnblue">
            Your Journey to{" "}
            <span className="text-btnblue font-bold">Healthier Hair</span>{" "}
            <br /> Starts Here!
          </h1>
          <p className="text-[16px] text-black max-w-md pr-10">
            Get tailored hair care treatments based on advanced hair and scalp
            analysis.
          </p>
          <div className="flex flex-col space-y-8 w-[250px] max-w-[250px]">
            <Link href="/analyze">
              <button className="px-6 py-3 text-white bg-[#1A2F4E] rounded-[12px] hover:opacity-90 box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; ">
                Get Your Hair Analysis
              </button>
            </Link>
            <Link href="/ai">
              <button className="px-6 py-3 text-[#1A2F4E] bg-yellow border-black border-[1.5px] rounded-[12px] hover:opacity-90 ">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        {/* <div className="relative mt-28">
                    <div className="flex flex-col space-y-16 text-btnblue">
                        <p className="text-lg">Hair Density</p>
                        <p className="text-lg">Scalp Analysis</p>
                        <p className="text-lg">Get Treated</p>
                    </div>
                </div> */}

        {/* <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-black">Hair Density</div>
                    <div className="w-1 h-16 bg-black rounded-full mt-4"></div>
                    <div className="text-black mt-4">Scalp Analysis</div>
                    <div className="w-1 h-16 bg-black rounded-full mt-4"></div>
                    <div className="text-black mt-4">Get Treated</div>
                </div> */}

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <p className="text-black font-bold text-lg">Hair Density</p>
            <div className="w-1 h-20 bg-black mt-2"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <p className="text-black font-bold text-lg mt-2">Scalp Analysis</p>
            <div className="w-1 h-10 bg-black rounded mt-2"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <p className="text-black font-bold text-lg mt-2">Get Treated</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
