// import Link from "next/link";
// import { Metadata } from "next";
// import { db } from "@/lib/db";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { currentUser } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { checkPermission } from "@/lib/checkPermission";
// import { Resource } from "@prisma/client";
// import { FormError } from "@/components/form-error";

// export const metadata: Metadata = {
//   title: "Blogs | Our Platform",
//   description: "Read our latest blog posts and articles.",
// };

// export default async function BlogsPage() {

//   const session = await currentUser();

//   if (!session) {
//     return redirect("/auth/login")
//   }

//   const hasPermission = await checkPermission(session?.role, Resource.BLOGS, 'read');

//   if (!hasPermission) {
//     return <FormError message="You do not have permission to view this content!" />
//   }

//   const blogs = await db.blog.findMany({
//     where: { published: true },
//     orderBy: { createdAt: "desc" },
//     include: { author: true },
//   });

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Our Blog</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {blogs.map((blog) => (
//           <Card key={blog.id.toString()}>
//             <CardHeader>
//               <CardTitle>{blog.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">
//                 {blog.content.slice(0, 150)}...
//               </p>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <span className="text-sm text-muted-foreground">
//                 By {blog.author.firstName} {blog.author.lastName}
//               </span>
//               <Link
//                 href={`/blogs/${blog.id}`}
//                 className="text-primary hover:underline"
//               >
//                 Read more
//               </Link>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }



import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BlogHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow md:px-24">
        <section className="py-2 md:py-6 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-[32px] font-bold mb-4">Stay Updated with Our Latest Blogs</h1>
          <p className="text-black">
            Catch up with our latest news and stay in the loop on recent updates, insightful stories, and exciting
            announcements shaping our journey forward!
          </p>
        </section>
        <div className="container mx-auto px-4">
          <Separator className="mb-8" />
        </div>

        <section className="container mx-auto px-4 mb-10 md:mb-20">
          <h2 className="text-[24px] mb-6">Recent Post (08)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Image
                src="/blogs1.png"
                alt="AI Cube"
                width={500}
                height={500}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="bg-[#EDDE79] rounded-lg p-8 flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] border-solid border-[1px] border-[#252525]">
              <div>
                <div className="flex items-center gap-2 text-sm mb-2 text-gray1 font-semibold">
                  <span>22 July 2024</span>
                  <span>•</span>
                  <span>4 min</span>
                </div>
                <h3 className="text-2xl font-semibold">Lorem ipsum dolor sit amet</h3>
                <p className="text-black mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                  Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam
                  quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                </p>
              </div>

              <Button variant="default" className="self-start mt-5 bg-btnblue text-white hover:bg-btnblue/80 p-[10px_20px] text-[14px] rounded-[10px]">
                Read More
              </Button>
            </div>
          </div>

        </section>
        <div className="container mx-auto px-4 ">
          <Separator className="mb-8 md:mt-14" />
        </div>

        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-2xl mb-6">Weekly Most Read</h2>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-12">
            {[...Array(6)].map((_, i) => (
              <article key={i} className="flex flex-col">
                <div className="relative h-[240px] mb-4">
                  <Image
                    src="/blogs2.png"
                    alt="Blog post image"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray1 font-semibold mb-2">
                  <span>22 July 2024</span>
                  <span>•</span>
                  <span>4 min</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Product Just Launched!</h3>
                <p className="text-black text-sm mb-4 flex-grow">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                </p>
                <Link href="/blogs/1">
                  <Button variant="default" className="self-start bg-btnblue text-white hover:bg-btnblue/80 p-[6px_12px] text-[14px] rounded-[11px]">
                    Read More
                  </Button>
                </Link>
              </article>
            ))}
          </div>

        </section>

        <div className="container mx-auto px-4 mb-10 flex justify-between gap-2">
          <Button variant="outline" className="border-gray1 text-btnblue"><ArrowLeft /> Previous</Button>
          <div className='flex justify-center gap-2'>
            <Button variant="default" className="bg-btnblue text-white hover:bg-btnblue/80">1</Button>
            <Button variant="outline" className="border-gray1 text-btnblue">2</Button>
            <Button variant="outline" className="border-gray1 text-btnblue">3</Button>
            <Button variant="outline" className="border-gray1 text-btnblue hidden md:block">4</Button>
          </div>
          <Button variant="outline" className="border-gray1 text-btnblue">Next <ArrowRight /></Button>
        </div>
        <div className="container mx-auto px-4">
          <Separator className="" />
        </div>
      </main>

      <section className="bg-[#1E2A4A] py-16 my-10">
        <div className="container mx-auto">
          <h2 className="text-2xl text-white mb-8 px-16">Categories</h2>
          <div className="flex gap-4 flex-wrap pb-4 no-scrollbar justify-center">
            {[...Array(7)].map((_, i) => (
              <Button
                key={i}
                variant="outline"
                className="border-yellow text-yellow hover:bg-yellow hover:text-btnblue whitespace-nowrap min-w-[120px]"
              >
                Lorem ipsum
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-btnblue py-20 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl text-white mb-2">Sign up to our Newsletter</h2>
          <p className="text-white/80 mb-8">Stay up to date with the latest news announcements and articles</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-white/20 text-white placeholder:text-white/50 p-5"
            />
            <Button className="bg-yellow text-btnblue hover:bg-yellow p-5">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}


