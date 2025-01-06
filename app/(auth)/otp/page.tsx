'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function VerificationPage() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(true)
  const [otp, setOtp] = useState(['', '', '', ''])

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isActive])

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  const handleResend = () => {
    setTimeLeft(30)
    setIsActive(true)
  }

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value !== '' && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-yellow rounded-lg p-8 shadow-lg">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-semibold text-btnblue">
              Verification
            </h1>
            <p className="text-gray-600">
              Enter your 4 digits code that you received on your number.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl border-[1px] border-black rounded-lg focus:border-btnblue focus:outline-none bg-yellow"
                />
              ))}
            </div>

            <div className="text-center text-orange-500">
              {formatTime(timeLeft)}
            </div>

            <Button 
              className="w-full bg-btnblue hover:bg-btnblue/80 text-white py-6"
            >
              Next
            </Button>

            <div className="text-center space-x-1">
              <span className="text-gray-500">If you didn't receive a code!</span>
              <button
                onClick={handleResend}
                className="text-orange-500 hover:underline focus:outline-none"
              >
                Resend
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

