"use client"
import { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const MyProfile = () => {

    const { data: session } = useSession()
    const pathname = usePathname()
    const router = useRouter()
    const [mypost, setMypost] = useState([])


    useEffect(() => { 
        const fecthData = async () => { 
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()

            setMypost(data)
        }

        if (session?.user.id) fecthData();

    }, [session?.user.id])
    
    const handleEdit = (post) => { 
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => { 
        const hasConfirmed = (
            'Are you sure you want to delete this prompt?'
        )

        if (hasConfirmed) { 
            try {
                await fetch(`/api/prompt/${post?._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredData = mypost.filter((item) => item._id !== post._id)
                setMypost(filteredData)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <Profile
                name="My"
                description="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
                mypost={mypost}
                handleEdit={handleEdit}
                handleDelete={handleDelete} 
            />
        </div>
    )
}

export default MyProfile