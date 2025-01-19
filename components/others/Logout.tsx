"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const Logout = ({ image, hidden }: { image?: string; hidden?: boolean }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`${hidden ? "hidden" : "flex"} md:flex items-center gap-4 cursor-pointer`}
        >
          <Image
            src={image || "/user.png"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full w-[40px] h-[40px]"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 mr-10">
        <div className="grid gap-4">
          <Link href="/" className="font-medium">
            Home
          </Link>
          <Link href="/profile" className="font-medium">
            Profile
          </Link>
          <Link href="/profile/my-reports" className="font-medium">
            My Reports
          </Link>
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="outline"
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Logout;
