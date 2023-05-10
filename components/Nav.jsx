"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn,signOut,useSession,getProviders } from 'next-auth/react'

const Nav = () => {

  const { data: session } = useSession()
  
  const isuserLoggedIn = true;
  const [providers, setProviders] = useState(null)
  const [dropdownToggle, setDropdownToggle] = useState(false)

  useEffect(() => { 
    const setProvider = async () => { 
      const response = await getProviders();
      setProviders(response)
    }
    setProvider();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          alt="nav_logo"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptomia</p>
      </Link>
      

      {/* Desktop Navigation */}
      {
        session?.user ? (<>
          <div className='sm:flex hidden gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                height={37}
                width={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>

          </div>
        </>) : (<>
            {
              providers && Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            }
        </>)
      }

      {/* Mobile Navigation */}


      <div className='sm:hidden flex relative'>
        {session?.user ? (<>
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className='rounded-full'
            alt='profile'
            onClick={() => {setDropdownToggle((prev)=>!prev)}}
          />

          {dropdownToggle && (
            <div className='dropdown'>
              <Link
                href='/profile'
                className='dropdown_link'
                onClick={() => {setDropdownToggle(false)}}
              >
                My Profile
              </Link>

              <Link
                href='/profile'
                className='dropdown_link'
                onClick={() => setDropdownToggle(false) }
              >
                Create Prompt
              </Link>

              <button
                type='button'
                className='mt-5 w-full black_btn'
                onClick={() => { 
                  setDropdownToggle(false)
                  signOut()
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </>) : (<>
            {
              providers && Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            }
        </>)}
      </div>
    </nav>
  )
}

export default Nav