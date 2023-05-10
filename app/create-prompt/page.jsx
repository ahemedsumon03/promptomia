"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Form from '@components/Form'

const CreatePrompt = () => {

    const router = useRouter()
    const { data: session } = useSession()

    const [post, setPost] = useState({
        prompt:'',tag:''
    })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setSubmitting(true)

        try {

            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userID: session?.user.id,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }
            
        } catch (error) {
            console.log(error)
        } finally { 
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="create"
            handleSubmit={handleSubmit}
            post={post}
            setPost={setPost}
            submitting={ submitting }
        />
    )
}

export default CreatePrompt