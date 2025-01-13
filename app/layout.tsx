import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import "./prosemirror.css"
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import OpenHeader from "@/components/openHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "Mr Mard is a personal blog",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2]">
            <Toaster />
            {/* <OpenHeader /> */}
            {children}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
