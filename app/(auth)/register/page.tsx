'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
    }

    return (
        <div className="min-h-screen flex bg-white p-5">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 p-12">
                <Link href="/" className="text-2xl font-bold mb-20 inline-block">
                    Mr. Mard
                </Link>

                <div className="max-w-md">
                    <h1 className="text-[32px] mb-3">
                        Sign up
                    </h1>

                    <p className="text-gray-600 mb-16">
                        If you already have an account register
                        <br />
                        you can
                        <Link href="/login" className="text-[#115FD6] hover:underline ml-1 font-semibold">
                            Login here !
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-gray-500 text-sm">
                                Contact Number
                            </label>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-2 border border-black rounded-[11px] px-3 py-2.5 bg-white w-[90px]">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span className="text-gray-600">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="00000 00000"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="flex-1 border border-black rounded-[11px] px-4 py-2.5 focus:outline-none focus:border-[#1E1B4B]"
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-black my-8" />

                        <button
                            type="submit"
                            className="w-full bg-[#1E1B4B] text-white py-3.5 rounded-lg hover:bg-btnblue transition-colors"
                        >
                            Verify OTP
                        </button>
                    </form>

                    <Link
                        href="/admin"
                        className="text-[#0C21C1] font-semibold hover:underline mt-16 inline-block"
                    >
                        Admin's Panel !
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="hidden lg:block w-1/2 bg-yellow relative rounded-lg">
                <div className="absolute top-8 right-8">
                    <p className="text-gray-600 text-lg">
                        +910000000000
                    </p>
                </div>

                <div className="absolute left-0 right-0 top-[70%] bottom-32 text-left w-full px-10">
                    <h2 className="text-[40px] mb-3 text-btnblue">
                        Sign up to name
                    </h2>
                    <p className="text-btnblue text-lg">
                        Lorem Ipsum is simply 
                    </p>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[300px] h-[300px]">
                    <Image
                        src="/register.png"
                        alt="Person working at desk illustration"
                        width={300}
                        height={270}
                        className="object-contain w-full h-full"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

