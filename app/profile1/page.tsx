'use client'

import { Bell, ChevronDown, Mail } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProfilePage() {
  const currentDate = new Date('2022-06-07').toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-white p-6 px-24">
      {/* Header */}
      {/* <header className="mb-8">
        <h1 className="text-xl font-bold">Mr. Mard</h1>
      </header> */}

      {/* Welcome Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-gray-800">Welcome, Naveen</h2>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>
        <div className="flex items-center gap-4 ">
          <div className="relative flex-1 bg-btnblue rounded-xl text-white border-none">
            <Input
              type="search"
              placeholder="Search"
              className="w-[300px] bg-btnblue pl-10 "
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Image
            src="/user.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mb-8 rounded-lg bg-[#F6E05E] p-6"></div>

      {/* Profile Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/user.png"
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-medium">Naveen</h3>
              <p className="text-gray-500">abc@gmail.com</p>
            </div>
          </div>
          <Button className="bg-btnblue hover:bg-btnblue/90 text-white">Edit</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <Input placeholder="Your First Name" className='border-btnblue' />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <Input placeholder="Your Last Name" className='border-btnblue' />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <Select defaultValue="male" >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Country</label>
            <Select defaultValue="india">
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Language</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Time Zone</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ist">(GMT+5:30) India Standard Time</SelectItem>
                <SelectItem value="pst">(GMT-8:00) Pacific Time</SelectItem>
                <SelectItem value="est">(GMT-5:00) Eastern Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="mb-4 text-sm font-medium text-gray-700">My email Address</h4>
          <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
            <div className="rounded-full bg-blue-100 p-2">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">abc@gmail.com</p>
              <p className="text-sm text-gray-500">1 month ago</p>
            </div>
          </div>
          <Button variant="ghost" className="mt-4 bg-[#4182F9] bg-opacity-20">
            + Add Email Address
          </Button>
        </div>
      </div>
    </div>
  )
}

