import { Button } from "@/components/ui/button";
import { calculateReadingTime } from "@/lib/calculatetime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { blogs } from "@/data/blogs";

const Blogs = () => {
  return (
    <div className="mt-10 bg-white pb-10 mb-5">
      <h2 className="text-4xl  text-center text-btnblue py-8 mb-2">
        Our Blogs
      </h2>
      <div className="flex justify-center m-auto mb-10">
        <Link href={`/blogs`}>
          <Button
            variant="default"
            className="self-start bg-btnblue text-white hover:bg-btnblue/80 p-[6px_30px] text-[14px] rounded-[11px]"
          >
            View All
          </Button>
        </Link>
      </div>
      <section className="container mx-auto px-4 md:px-24 ">
        <div className="grid md:grid-cols-3 gap-x-6 gap-y-12">
          {blogs?.map((blog, i) => {
            const formattedDate = format(blog.createdAt, "dd MMMM yyyy");
            const timeconsume = calculateReadingTime(blog.content);
            return (
              <Link key={i} href={`/blogs/${blog?.id}`}>
                <article className="cursor-pointer flex flex-col">
                  <div className="relative h-[240px] mb-4">
                    <Image
                      src={blog?.image ?? "/blogs2.png"}
                      alt={blog?.title ?? "Blog"}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray1 font-semibold mb-2">
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span>
                      {timeconsume?.minutes > 0
                        ? timeconsume.minutes + " min "
                        : ""}
                      {timeconsume?.seconds > 0
                        ? timeconsume.seconds + " sec"
                        : ""}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{blog?.title}</h3>
                  <p
                    className="text-black text-sm mb-4 flex-grow"
                    dangerouslySetInnerHTML={{
                      __html: blog?.content?.slice(0, 150) ?? "",
                    }}
                  />

                  <Link href={`/blogs/${blog?.id}`}>
                    <Button
                      variant="default"
                      className="self-start bg-btnblue text-white hover:bg-btnblue/80 p-[6px_12px] text-[14px] rounded-[11px]"
                    >
                      Read More
                    </Button>
                  </Link>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
