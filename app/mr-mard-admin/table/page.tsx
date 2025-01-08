'use client'

import * as React from 'react'
import { Calendar, ChevronDown, MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { User } from '@/schemas/types'

function getRoleColor(role: string) {
    switch (role) {
        case 'Admin':
            return 'bg-[#FF6B6B] text-white'
        case 'Contributor':
            return 'bg-[#B8D1E5] text-[#1E2A4A]'
        case 'Viewer':
            return 'bg-[#333333] text-white'
        default:
            return 'bg-gray-100'
    }
}

// Sample data
const users: User[] = [
    {
        id: '1',
        name: 'Aditi',
        email: 'aditi@gmail.com',
        avatar: '/blogs3.png',
        location: 'Bengaluru',
        joinedDate: '2024-04-02',
        role: 'Admin'
    },
    {
        id: '2',
        name: 'Atharv',
        email: 'athar@gmail.com',
        avatar: '/blogs3.png',
        location: 'Mumbai',
        joinedDate: '2024-03-03',
        role: 'Admin'
    },
    // Add more sample users...
]

export default function Dashboard() {
    const [date, setDate] = React.useState<Date>()
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selectedPermission, setSelectedPermission] = React.useState('All')
    const [selectedTimeframe, setSelectedTimeframe] = React.useState('Anytime')

    return (
        <div className="min-h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] px-5">

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Manage Users</h2>
                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                {/* <CalendarComponent
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                /> */}
                            </PopoverContent>
                        </Popover>
                        <Input
                            type="search"
                            placeholder="Search"
                            className="w-[200px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <Input
                            type="search"
                            placeholder="Search items..."
                            className="w-[240px] bg-btnblue text-white placeholder:text-white"
                        />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="bg-btnblue text-white border-none">
                                    Permissions: {selectedPermission}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {['All', 'Admin', 'Contributor', 'Viewer'].map((role) => (
                                    <DropdownMenuItem
                                        key={role}
                                        onClick={() => setSelectedPermission(role)}
                                    >
                                        {role}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="bg-btnblue text-white border-none">
                                    Joined: {selectedTimeframe}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {['Anytime', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((timeframe) => (
                                    <DropdownMenuItem
                                        key={timeframe}
                                        onClick={() => setSelectedTimeframe(timeframe)}
                                    >
                                        {timeframe}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <Button variant="outline" className='border-black border-[1px]'>Export</Button>
                        <Button className="bg-btnblue hover:bg-btnblue/80 text-white">+ New User</Button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg border">
                    <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 p-4 bg-btnblue text-white rounded-t-lg">
                        <div className="w-8"></div>
                        <div>Full Name</div>
                        <div>Email Address</div>
                        <div>Location</div>
                        <div>Joined</div>
                        <div>Permissions</div>
                    </div>

                    <div className="divide-y">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 p-4 items-center hover:bg-gray-50"
                            >
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                <div className="flex items-center gap-2">
                                    <img
                                        src={user.avatar}
                                        alt=""
                                        className="w-8 h-8 rounded-full"
                                    />
                                    {user.name}
                                </div>
                                <div>{user.email}</div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                    {user.location}
                                </div>
                                <div>{format(new Date(user.joinedDate), 'MMMM d, yyyy')}</div>
                                <div className="flex items-center gap-4">
                                    <span className={cn(
                                        'px-2 py-1 rounded text-sm font-medium',
                                        getRoleColor(user.role)
                                    )}>
                                        {user.role}
                                    </span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
                            {'<'}
                        </Button>
                        {[1, 2, 3, 4, '...', 10].map((page, i) => (
                            <Button
                                key={i}
                                variant={page === 1 ? 'default' : 'outline'}
                                size="icon"
                                className={cn(
                                    'h-8 w-8 bg-white',
                                    page === 1 && 'bg-btnblue text-white'
                                )}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
                            {'>'}
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 bg-white">
                        <span className="text-sm text-gray-500">Rows per page:</span>
                        <Button variant="outline" className="h-8">
                            10 rows
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

