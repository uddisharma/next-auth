import React from "react";
import { Bell, MailCheckIcon, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/others/sidebar";
import { currentRole } from "@/lib/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const role = await currentRole();

  return (
    <div>
      <div className="bg-gray-50 flex pb-[550px]">
        <div className="hidden lg:block w-64"><Sidebar role={role} /></div>
        <Sheet>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar role={role} />
          </SheetContent>
          <div className="flex-1">
            <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-4">
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <div className="relative flex-1 max-w-md hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="w-full pl-10 pr-4"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MailCheckIcon className="w-5 h-5" />
                </Button>
              </div>
            </header>
            {children}
          </div>
        </Sheet>
      </div>
    </div>
  );
};

export default Layout;
