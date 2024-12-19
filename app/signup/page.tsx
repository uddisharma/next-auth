'use client'
import React, { useState } from 'react'

const Page = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: 0
    })

    const signup = async (e:any) => {
        e.preventDefault()
        const fetchData = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
            })
        })
        console.log(fetchData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Sign up</h1>

            <form onSubmit={signup}>
                <input onChange={handleChange} type="text" placeholder='Name' name='name' />
                <br />
                <input onChange={handleChange} type="email" placeholder='Email' name='email' />
                <br />
                <input onChange={handleChange} type="number" placeholder='Phone' name='phone' />
                <br />
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default Page