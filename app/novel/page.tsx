
'use client'

import { useState } from 'react'

import Editor from '@/components/editor/editor'
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <div className='container'>
            {/* <h1 className='text-3xl font-bold'>Write a blog</h1> */}
            <ContentForm />
        </div>
    )
}

export const defaultValue = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: []
        }
    ]
}
function ContentForm() {
    const [content, setContent] = useState<string>('')
    const [pending, setPending] = useState(false)

    async function handleSubmit() {
        console.log(content)
    }

    return (
        <div className=' flex flex-col gap-4 p-6 text-black'>
            <Editor initialValue={defaultValue} onChange={setContent} />
            <Button onClick={handleSubmit} disabled={pending}>
                {pending ? 'Submitting...' : 'Create'}
            </Button>
        </div>
    )
}
