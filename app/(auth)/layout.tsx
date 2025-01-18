import AuthHeader from "@/components/others/authHeader";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2]">
      <AuthHeader />
      {children}
    </div>
  );
};

export default Layout;
