import { db } from "@/lib/db";
import ProfileForm from "@/components/others/ProfileForm1";
import ImageUpload from "@/components/others/ImageUpload";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bell, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfilePhoto } from "@/actions/my-profile";
import { uploadFile } from "@/actions/upload";

export default async function ProfilePage() {
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

  const handleImageUpload = async (formData: FormData): Promise<void> => {
    "use server";
    try {
      const result = await uploadFile(formData);
      const data = await updateProfilePhoto(result.url);
      if (!data?.success) {
        throw new Error(data?.error || "Failed to update profile photo");
      }
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen px-5 md:px-16 pt-5">
      <div className="mb-5 md:mb-8 flex flex-wrap md:flex-nowrap items-center w-full justify-between gap-4">
        <div className="flex md:flex-row justify-between items-start md:items-center gap-4 w-full mb-2 md:mb-0">
          <div className="md:w-auto md:mb-0">
            <h2 className="text-2xl font-medium text-gray-800">
              Welcome, {user.firstName || user.name?.split(" ")[0] || "User"}
            </h2>
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <Image
                src={user.image || "/user.png"}
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
              className="w-full bg-btnblue text-white pl-10 rounded-md border-none"
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

          <div className="hidden md:flex items-center gap-4 cursor-pointer">
            <Image
              src={user.image || "/user.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mb-4 md:mb-8 rounded-lg bg-[#F6E05E] p-5 md:p-6"></div>

      {/* Profile Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm pb-20">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <ImageUpload
              currentImage={user.image || "/user.png"}
              onUpload={handleImageUpload}
            />
            <div>
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <ProfileForm
          user={{
            id: user.id,
            firstName: user.firstName ?? (user.name?.split(" ")[0] || ""),
            lastName: user.lastName ?? (user.name?.split(" ")[1] || ""),
            email: user.email || "",
            phone: user.phone || "",
            gender: "male",
            country: "india",
            language: "english",
            timezone: "IST",
            loginType: user.loginType || "",
          }}
          session={{
            isOAuth: session.isOAuth || false,
            isTwoFactorEnabled: session.isTwoFactorEnabled || false,
          }}
        />

        <div className="mt-6">
          <h4 className="mb-4 text-sm font-medium text-gray-700">
            My email Address
          </h4>
          <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
            <div className="rounded-full bg-blue-100 p-2">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-gray-500">Primary email</p>
            </div>
          </div>
          <Button variant="ghost" className="mt-4 bg-[#4182F9] bg-opacity-20">
            + Add Email Address
          </Button>
        </div>
      </div>
    </div>
  );
}
