"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'

export const categories = ['All', 'Tech', 'Startup', 'Life', 'Finance']

const Header = () => {
  const [active, setActive] = useState('All')
  const {data:session,status} = useSession();
  if(status === "authenticated") {
    console.log(session?.user);
  }
  return (
    <div className='flex flex-col items-center max-w-3xl mx-auto justify-center pt-12 lg:pt-24 pb-6'>
      <h1 className="text-4xl font-bold text-center  lg:text-6xl">Your own <span className="text-primary">blogging</span><br /> platform</h1>
      <p className="text-center mt-4 text-gray-600">This is your space to think out loud, to share what matters, and to write without filters. Whether it is one word or a thousand, your story starts right here.</p>
      <h1>Hey {session?.user?.name}</h1>
      <div className='flex gap-2 md:gap-4 lg:gap-6 mt-6 flex-wrap justify-center'>
        {categories.map((category) => (
          <Button
            key={category}
            variant={active === category ? 'default' : 'outline'}
            onClick={() => setActive(category)}
          >
            {category}
          </Button>
        ))}
      </div>

    </div>
  )
}

export default Header