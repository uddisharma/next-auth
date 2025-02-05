"use client";
import React from "react";
import { Button } from "../ui/button";
import { categories } from "@/data/categories";
import { useRouter } from "next/navigation";

const Categories = () => {
  const router = useRouter();

  const handleCategory = (category: string) => {
    router?.push(`/blogs${category == "All" ? "" : `?category=${category}`}`);
  };

  return (
    <section className="bg-btnblue py-16 my-10">
      <div className="container mx-auto">
        <h2 className="text-2xl text-white mb-8 px-16">Categories</h2>
        <div className="flex gap-4 flex-wrap pb-4 no-scrollbar justify-center">
          {categories.map((category, i) => (
            <Button
              onClick={() => handleCategory(category.name)}
              key={i}
              variant="outline"
              className="bg-btnblue text-yellow whitespace-nowrap min-w-[120px] border-yellow font-semibold"
            >
              {category?.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
