"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams,useRouter } from 'next/navigation'
import Form from '@components/Form';

const UpdatePrompt = () => {

    const router = useRouter();
    const seachParams = useSearchParams()
    const paramsId = seachParams.get('id')
    const [post, setPost] = useState([])
    const [submitting, setSubmitting] = useState(false)


    useEffect(() => {
        const promptDetails = async () => { 
            const response = await fetch(`/api/prompt/${paramsId}`)
            const data = await response.json()
            setPost(data)
        }
        if(paramsId) promptDetails()

    }, [paramsId]);

    const updatePrompt = async (e) => { 
        e.preventDefault();
        setSubmitting(true)

        if (!paramsId) return alert('paramsid is missing')

        try {
            
            const response = await fetch(`/api/prompt/${paramsId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

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
          type='Edit'
          submitting={submitting}
          post={post}
          setPost={setPost}
          handleSubmit={updatePrompt}
      />
  )
}

export default UpdatePrompt