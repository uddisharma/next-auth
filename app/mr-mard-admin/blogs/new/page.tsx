
"use client"

import { Button } from "@/components/ui/button"
import BlogsForm from '@/components/admin/blogs/BlogsForm'

export default function SettingsPage() {
    return (
        <main className="p-4 sm:p-6 ">
            <h1 className="text-2xl font-semibold mb-6">Add New Blog</h1>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-[1px] border-whiteGray">
                <BlogsForm />
            </div>
        </main>
    )
}

