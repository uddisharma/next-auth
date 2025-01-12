
'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Editor from '@/components/editor/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
    return (
        <section className='py-24'>
            <div className='container'>
                <h1 className='text-3xl font-bold'>Write a blog</h1>

                <ContentForm />
            </div>
        </section>
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
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState<string>('')
    const [pending, setPending] = useState(false)

    useEffect(() => {
        const name = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')

        setSlug(name)
    }, [title])

    async function handleSubmit() {
        console.log(content)
    }

    return (
        <div className='mt-6 flex max-w-2xl flex-col gap-4'>
            <div className='flex gap-4'>
                <Input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Input
                    type='text'
                    placeholder='Slug'
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                />
            </div>

            <Editor initialValue={defaultValue} onChange={setContent} />
            <Button onClick={handleSubmit} disabled={pending}>
                {pending ? 'Submitting...' : 'Create'}
            </Button>
        </div>
    )
}
