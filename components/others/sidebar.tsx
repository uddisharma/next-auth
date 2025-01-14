'use client'
import Link from 'next/link'
import {
    Home,
    FileText,
    HelpCircle,
    FileBarChart,
    User,
    Users,
    LogOut,
    ScanFace
  } from "lucide-react";
import { usePathname } from 'next/navigation';

const navItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: FileText, label: 'Blogs', href: '/mr-mard-admin/blogs' },
    { icon: HelpCircle, label: 'Questions', href: '/admin/questions' },
    { icon: FileBarChart, label: 'Reports', href: '/admin/reports' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Users, label: 'Contact Submissions', href: '/admin/contact-submissions' },
    { icon: ScanFace, label: 'Permissions', href: '/admin/permissions' },
    { icon: User, label: 'Profile', href: '/admin/profile' },
]

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="w-64 bg-btnblue text-white h-screen flex flex-col fixed left-0">
            <div className="p-6">
                <Link href="/" className="text-xl font-serif font-bold">
                    Mr. Mard
                </Link>
            </div>

            <nav className="flex-1 px-4">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1   ${pathname.startsWith(item.href)
                            ? 'bg-yellow text-btnblue'
                            : 'hover:bg-white/10'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-6 text-sm text-gray-400">
                © 2025 Mr Mard. All Rights Reserved. Made With ❤️ In India.
            </div>
        </div>
    )
}

