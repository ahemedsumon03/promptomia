import React from 'react'
import Feed from '@components/Feed.jsx'

const page = () => {
    return (
        <section className='flex-center w-full flex-col'>
            <h1 className='head_text text-center'>
                Discover and Share
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'>Ai Power Prompt</span>
            </h1>
            <p className='desc text-center'>Promitomia is open-source Ai Prompting tool for mordern world to discover, create and share creative prompt</p>

            {/* Feed */}
            <Feed/>

        </section>
    )
}

export default page