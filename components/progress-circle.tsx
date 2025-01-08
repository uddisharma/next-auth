'use client'

import { cn } from "@/lib/utils"

interface ProgressCircleProps {
    value: number
    max: number
    size?: number
    strokeWidth?: number
    className?: string
}

export function ProgressCircle({
    value,
    max,
    size = 200,
    strokeWidth = 15,
    className
}: ProgressCircleProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (value / max) * circumference

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-gray-200"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="text-blue-600 transition-all duration-500 ease-in-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold">{value}</span>
                <span className="text-sm text-gray-500">/{max}</span>
            </div>
        </div>
    )
}

