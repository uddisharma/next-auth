import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import "./prosemirror.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import SubscriptionPopup from "@/components/others/leads/Popup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mr Mard",
  description: "Mr Mard",
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
            <NextTopLoader
              color="#1A2F4E"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              zIndex={1600}
              showAtBottom={false}
            />
            <SubscriptionPopup />
            {children}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
