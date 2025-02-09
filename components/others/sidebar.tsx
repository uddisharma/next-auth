"use client";
import Link from "next/link";
import {
  Home,
  FileText,
  HelpCircle,
  FileBarChart,
  Users,
  LogOut,
  ScanFace,
  Newspaper,
  Bolt,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: HelpCircle, label: "Questions", href: "/admin/questions" },
  { icon: FileBarChart, label: "Reports", href: "/admin/reports" },
  { icon: Users, label: "Users", href: "/admin/users" },
  {
    icon: Users,
    label: "Contacts",
    href: "/admin/contact-submissions",
  },
  { icon: ScanFace, label: "Permissions", href: "/admin/permissions" },
  { icon: Newspaper, label: "NewsLetter", href: "/admin/newsletter" },
  { icon: Bolt, label: "Leads", href: "/admin/leads" },
];

export default function Sidebar({ role }: { role: string | undefined }) {
  const pathname = usePathname();
  return (
    <div className="w-64 bg-btnblue text-white h-screen flex flex-col fixed left-0">
      <div className="p-6">
        <Link href="/" className="text-xl font-serif font-bold">
          <Image
            src="/logo.png"
            alt="Mr. Mard"
            className="m-auto"
            width={120}
            height={50}
          />
        </Link>
      </div>

      <nav className="flex-1 px-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1   ${
              pathname.startsWith(item.href)
                ? "bg-yellow text-btnblue"
                : "hover:bg-white/10"
            } ${role !== "SUPER_ADMIN" && item.label === "Permissions" ? "hidden" : ""}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <LogOut className="inline-block mr-2" size={20} />
          Logout
        </button>
      </nav>

      <div className="p-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Mr Mard. All Rights Reserved. Made With ❤️
        In India.
      </div>
    </div>
  );
}
