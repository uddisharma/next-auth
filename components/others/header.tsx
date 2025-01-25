import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { currentUser } from "@/lib/auth";
import Logout from "./Logout";

const Header = async ({ className }: { className?: string }) => {
  const sessions = await currentUser();
  return (
    <header className={`py-5 ${className}`}>
      <div className="container mx-auto px-10 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Mr. Mard
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-black">
          <Link href="/technology">Our Technology</Link>
          <Link href="/analyze">Analyze</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          {sessions?.name ? (
            <Logout
              image={sessions.image ?? "/user.png"}
              name={sessions.name}
              email={sessions.email ?? ""}
              role={sessions.role}
              hidden={false}
            />
          ) : (
            <Link href="/auth">
              <Button
                variant="default"
                className="hidden md:inline-flex bg-btnblue text-white rounded-[12px] p-[12px_20px]"
              >
                Sign up / Log in
              </Button>
            </Link>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white" side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/technology" className="text-lg font-medium">
                  Our Technology
                </Link>
                <Link href="/analyze" className="text-lg font-medium">
                  Analyze
                </Link>
                <Link href="/pricing" className="text-lg font-medium">
                  Pricing
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
