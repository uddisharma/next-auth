import { Bell } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProfileForm from "@/components/others/ProfileForm1";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default async function ProfilePage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const session = await currentUser();

  if (!session) {
    return redirect("/auth/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div className="min-h-screen px-5 md:px-16 pt-5">
      <div className="mb-5 md:mb-8 flex flex-wrap md:flex-nowrap items-center w-full justify-between gap-4">
        <div className="flex md:flex-row justify-between items-start md:items-center gap-4 w-full mb-2 md:mb-0">
          <div className="md:w-auto md:mb-0">
            <h2 className="text-2xl font-medium text-gray-800">
              Welcome, {user.name}
            </h2>
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <Image
                src={user?.image || "/user.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Input
              type="search"
              placeholder="Search"
              className="w-full bg-btnblue text-white pl-10 rounded-md border-none "
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <Button className="hidden md:flex" variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <div className="hidden md:flex items-center gap-4 cursor-pointer">
                <Image
                  src={user?.image || "/user.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <Link href="/profile" className="font-medium">
                  Profile
                </Link>
                <Button variant="outline">Logout</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mb-4 md:mb-8 rounded-lg bg-[#F6E05E] p-5 md:p-6"></div>

      {/* Profile Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm pb-20">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
