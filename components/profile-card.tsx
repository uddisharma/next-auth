"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Instagram, Copy } from 'lucide-react'
import Image from 'next/image'

const timeRanges = ['1M', '6M', '1Y', 'ALL TIME']

interface ProfileStat {
    label: string
    value: number
}

export default function ProfileCard() {
    const [activeRange, setActiveRange] = useState('1M')

    const stats: ProfileStat[] = [
        { label: 'New Users', value: 33 },
        { label: 'Users Lost', value: 0 },
        { label: 'Current opportunities', value: 9 },
    ]

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                    <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                    <div className="absolute -right-1 -bottom-1 bg-blue-500 text-white p-1 rounded-full">
                        <Instagram className="w-4 h-4" />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Santhosh</h2>
                    <p className="text-gray-500">Founder</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                {timeRanges.map((range) => (
                    <Button
                        key={range}
                        variant={activeRange === range ? "default" : "outline"}
                        onClick={() => setActiveRange(range)}
                        className="text-sm"
                    >
                        {range}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <div className="text-2xl font-semibold">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            <Button
                variant="outline"
                className="w-full mb-4"
            >
                View public profile
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>https://app.Mr.Mard</span>
                <Button variant="ghost" size="sm" className="p-0">
                    <Copy className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

