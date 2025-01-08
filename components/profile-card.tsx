'use client'

import { Camera, Copy } from 'lucide-react'
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileCard() {
    const [timeframe, setTimeframe] = useState<"1M" | "6M" | "1Y" | "ALL">("1M")

    return (
        <Card className="w-full max-w-md mx-auto bg-white">
            <CardHeader className="flex flex-col items-center space-y-2 pt-6">
                <div className="relative">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="/blogs3.png" />
                        <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-blue-100 rounded-full p-2">
                        <Camera className="w-4 h-4 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-semibold mt-4">Santhosh</h2>
                <p className="text-muted-foreground">Founder</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex rounded-full bg-slate-100 p-[12px_32px]">
                    {["1M", "6M", "1Y", "ALL"].map((period) => (
                        <button
                            key={period}
                            onClick={() => setTimeframe(period as any)}
                            className={`flex-1 py-1 text-[12px] rounded-full transition-colors ${timeframe === period
                                ? "bg-white shadow-sm"
                                : "hover:bg-white/50"
                                }`}
                        >
                            {period === "ALL" ? "ALL TIME" : period}
                        </button>
                    ))}
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between py-3">
                        <span className="text-muted-foreground">New Users</span>
                        <span className="font-medium">33</span>
                    </div>
                    <div className="flex justify-between py-3 border-t">
                        <span className="text-muted-foreground">Users Lost</span>
                        <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between py-3 border-t">
                        <span className="text-muted-foreground">Current opportunities</span>
                        <span className="font-medium">9</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-lg border-[1px] border-btnblue p-3 mt-4 text-center">
                    <span className="text-btnblue rounded-full px-3 py-1 flex-1 truncate">
                    View public profile
                    </span>
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-3 mt-4">
                    <span className="text-muted-foreground flex-1 truncate">
                        https://app.Mr.Mard
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

