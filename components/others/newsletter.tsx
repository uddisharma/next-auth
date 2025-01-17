"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Subscribe } from "@/actions/newsletter";
import { toast } from "sonner";
import { NewsLetterSchema, NewsLetterSchemaData } from "@/schemas";

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsLetterSchemaData>({
    resolver: zodResolver(NewsLetterSchema),
  });

  const onSubmit: SubmitHandler<NewsLetterSchemaData> = async (data) => {
    try {
      const res = await Subscribe(data.email);
      if (res?.success) {
        reset();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <section className="bg-btnblue py-20 mb-10 flex justify-center">
      <div className="container px-4 text-center max-w-lg">
        <h2 className="text-2xl text-white mb-2">Sign up to our Newsletter</h2>
        <p className="text-white/80 mb-8">
          Stay up to date with the latest news, announcements, and articles
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 justify-center">
            <Input
              {...register("email")}
              placeholder="Enter your email"
              className="bg-transparent border-white/20 text-white placeholder:text-white/50 p-5 w-full"
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-yellow text-btnblue hover:bg-yellow p-5"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          {errors.email && (
            <p className="mt-4 text-left text-red-500">
              {errors.email.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
