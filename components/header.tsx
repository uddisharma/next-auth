import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="py-5">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="  text-xl">
                    Mr. Mard
                </Link>
                <div className='flex items-center gap-8 text-black'>
                    <Link href="/technology">Our Technology</Link>
                    <Link href="/analyze" >Analyze</Link>
                    <Link href="/pricing">Pricing</Link>
                </div>
                <Button variant="default" className="bg-btnblue text-white rounded-[12px] p-[12px_20px]">
                    Sign up / Log in
                </Button>
            </div>
        </header>

    )
}

export default Header