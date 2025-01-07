import Link from 'next/link'
import { LayoutGrid, ShoppingCart, Users, UserCircle, ClipboardList, RefreshCw, MessageSquare, Mail, Activity, FileText, Settings } from 'lucide-react'

const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingCart, label: 'Products', href: '/products' },
    { icon: Users, label: 'Manage Users', href: '/manage-users' },
    { icon: UserCircle, label: 'Unique users', href: '/unique-users' },
    { icon: ClipboardList, label: 'Order', href: '/order' },
    { icon: RefreshCw, label: 'Refunds', href: '/refunds' },
    { icon: MessageSquare, label: 'Message', href: '/message' },
    { icon: Mail, label: 'Email', href: '/email' },
    { icon: Activity, label: 'Transactions', href: '/transactions' },
    { icon: FileText, label: 'Invoices', href: '/invoices' },
    { icon: Settings, label: 'Profile Settings', href: '/settings' },
]

export default function Sidebar() {
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 hover:bg-white/10 ${item.label === 'Profile Settings'
                            ? 'bg-yellow-200 text-navy-900'
                            : ''
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-6 text-sm text-gray-400">
                © 2024 Mr Mard. All Rights Reserved. Made With ❤️ In India.
            </div>
        </div>
    )
}

