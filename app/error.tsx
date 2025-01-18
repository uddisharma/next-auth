'use client'
import React from 'react'

export const metadata = {
    title: '500 - Internal Server Error',
    description: '500 - Internal Server Error',
}

const Error = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl text-gray-500   '>500 - Internal Server Error</h1>
        </div>
    )
}

export default Error