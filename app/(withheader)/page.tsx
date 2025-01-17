// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { db } from "@/lib/db";

// interface PageProps {
//   params: { id: number };
// }

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const blog = await db.blog.findUnique({
//     where: { id: params.id },
//   });

//   if (!blog) {
//     return {
//       title: "Blog Not Found",
//       description: "The requested blog post could not be found.",
//     };
//   }

//   return {
//     title: `${blog.title} | Our Platform`,
//     description: blog.content.slice(0, 160),
//   };
// }

// export default async function BlogPage({ params }: PageProps) {
//   const blog = await db.blog.findUnique({
//     where: { id: params.id },
//     include: { author: true },
//   });

//   if (!blog) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//       <p className="text-muted-foreground mb-4">
//         By {blog.author.firstName} {blog.author.lastName} |{" "}
//         {new Date(blog.createdAt).toLocaleDateString()}
//       </p>
//       <div className="prose max-w-none">
//         {blog.content.split("\n").map((paragraph, index) => (
//           <p key={index} className="mb-4">
//             {paragraph}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
function BlogPost() {
  return (
    <div className="min-h-screen flex flex-col md:px-24 mb-10">
      <main className="flex-grow container mx-auto px-4 py-2 md:py-8">
        <Link
          href="/articles"
          className="inline-flex items-center text-[#115FD6] mb-3 hover:text-gray-900"
        >
          Category
        </Link>
        <div>
          <article>
            {/* Article Header */}
            <h1 className="text-[35px] md:text-[52px] mb-6 text-btnblue">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/how-we-do/image3.png"
                alt="Author"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-[15px] text-gray-600 ">
                <p>By Sampath | Published on November 14, 2022 | 2 min read</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-[400px] mb-8">
              <Image
                src="/blogs3.png"
                alt="Featured image"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="grid lg:grid-cols-[1fr,320px] gap-12">
              <div>
                <div className="prose max-w-none flex flex-col gap-8">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales.
                  </p>

                  <p>
                    Quisque sagittis orci ut diam condimentum, vel euismod erat
                    placerat. In iaculis arcu eros, eget tempus orci facilisis
                    id.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet.
                  </p>

                  <h2 className="text-[35px] md:text-[52px] text-btnblue">
                    Lorem ipsum dolor, sit amet consectetur
                  </h2>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales.
                  </p>

                  <p>
                    Quisque sagittis orci ut diam condimentum, vel euismod erat
                    placerat. In iaculis arcu eros, eget tempus orci facilisis
                    id.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet.
                  </p>

                  <p>
                    Pellentesque commodo lacus at sodales sodales. Quisque
                    sagittis orci ut diam condimentum, vel euismod erat
                    placerat. In iaculis arcu eros, eget tempus orci facilisis
                    id.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus.
                  </p>
                </div>

                <div className="container mx-auto mt-20">
                  <Separator className="mb-3" />
                </div>

                {/* Twitter CTA */}
                <div className="mt-10  text-gray-600">
                  <p className="mb-1">
                    Good or bad, wed love to hear your thoughts. Find us on
                    Twitter{" "}
                    <Link href="https://twitter.com" className="text-blue-500">
                      @twitter
                    </Link>
                  </p>
                  <p className="uppercase text-xs pt-3">
                    WERE ALL ONLY AS HELPFUL AS YOU MAY FIND INTERESTING
                  </p>
                </div>

                {/* Related Posts */}
                <div className="mt-16">
                  <div className="flex flex-col gap-8">
                    {[...Array(4)].map((_, i) => (
                      <>
                        <article key={i} className="hidden md:flex gap-4">
                          <Image
                            src="/blogs2.png"
                            alt="Related post"
                            width={180}
                            height={80}
                            className="rounded object-cover"
                          />
                          <div>
                            <h2 className="text-sm text-gray-500 mb-2">
                              PRODUCT • 6 MINUTE READ
                            </h2>
                            <h3 className="mb-2 text-btnblue">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h3>
                            <p className="text-sm text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Etiam eu ligula molestie, dictum est a,
                              mattis tellus. Sed dignissim, metus nec fringilla
                              accumsan, risus sem. Lorem ipsum dolor sit amet,
                              consectetur adipiscing elit. Etiam eu ligula
                              molestie, dictum est a, mattis tellus. Sed
                              dignissim, metus nec fringilla accumsan, risus
                              sem.
                            </p>
                          </div>
                        </article>
                        <article
                          key={i}
                          className="md:hidden flex flex-wrap gap-4"
                        >
                          <Image
                            src="/blogs2.png"
                            alt="Related post"
                            width={1000}
                            height={80}
                            className="rounded object-cover"
                          />
                          <div>
                            <h2 className="text-sm text-gray-500 mb-2">
                              PRODUCT • 6 MINUTE READ
                            </h2>
                            <h3 className="mb-2 text-btnblue">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h3>
                            <p className="text-sm text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Etiam eu ligula molestie, dictum est a,
                              mattis tellus. Sed dignissim, metus nec fringilla
                              accumsan, risus sem. Lorem ipsum dolor sit amet,
                              consectetur adipiscing elit. Etiam eu ligula
                              molestie, dictum est a, mattis tellus. Sed
                              dignissim, metus nec fringilla accumsan, risus
                              sem.
                            </p>
                          </div>
                        </article>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <aside className="space-y-8">
                <div>
                  <h2 className="text-gray-500 mb-4">POPULAR POSTS</h2>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <>
                        <article key={i} className="flex gap-4">
                          <Image
                            src="/blogs2.png"
                            alt="Popular post"
                            width={80}
                            height={60}
                            className="rounded object-cover"
                          />
                          <div>
                            <h2 className="text-sm text-gray-500 ">
                              PRODUCT • 6 MINUTE READ
                            </h2>
                            <h3 className="text-sm text-btnblue">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Lorem ipsum dolor
                            </h3>
                          </div>
                        </article>
                        <Separator className="bg-btnblue" />
                      </>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow p-6 rounded-lg text-center">
                  <h2 className=" mb-2 text-[24px]">
                    Get More Done Together With Us
                  </h2>
                  <p className="text-[22px] text-black mb-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Button className="px-6 py-2  bg-btnblue text-white hover:bg-btnblue/80">
                    Get Started
                  </Button>
                </div>
              </aside>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
export default BlogPost;
