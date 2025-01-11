import Footer from '@/components/footer'
import Header from '@/components/header'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full bg-white dark:bg-dot-black/[0.2] bg-dot-white/[0.2]">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout