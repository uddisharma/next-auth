'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SignupForm() {
  const [verificationSent, setVerificationSent] = useState(false)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="p-8 lg:p-12">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Mr. Mard</h1>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
              />
              <Button 
                className="w-full bg-btnblue hover:bg-btnblue/90" 
                onClick={() => setVerificationSent(true)}
              >
                Send Code
              </Button>
            </div>

            {verificationSent && (
              <div className="space-y-2">
                <Label htmlFor="verification">Verification</Label>
                <Input
                  id="verification"
                  placeholder="Enter the code sent on your email address"
                  required
                />
                <Button className="w-full bg-btnblue hover:bg-btnblue/90">
                  Verify
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <Label>What&apos;s your gender? (optional)</Label>
              <RadioGroup defaultValue="female" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-binary" id="non-binary" />
                  <Label htmlFor="non-binary">Non-binary</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>What&apos;s your date of birth?</Label>
              <div className="grid grid-cols-3 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month.toLowerCase()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing" className="text-sm">
                  Share my registration data with our content providers for marketing purposes.
                </Label>
              </div>

              <div className="text-sm">
                By creating an account, you agree to the{" "}
                <Link href="/terms" className="underline">
                  Terms of use
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </div>

              {/* Placeholder for reCAPTCHA */}
              <div className="h-[78px] w-full rounded border bg-gray-50"></div>

              <Button className="w-full bg-btnblue hover:bg-btnblue/90">
                Sign up
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MCl2q98yHbot0Z3rnocxsSkX20uPal.png"
          alt="Profile"
          width={800}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

