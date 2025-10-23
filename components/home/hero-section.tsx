"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'


export const categories = ['All', 'Tech', 'Startup', 'Life', 'Finance']

const HeroSection = () => {
  const [active, setActive] = useState('All')
  return (
    <div className='flex flex-col mx-auto max-w-3xl pt-12 lg:pt-24 pb-6 text-center'>
      <h1 className="text-5xl font-bold lg:text-6xl">Your own <span className="text-primary">blogging</span><br /> platform</h1>
      <p className="my-6 text-muted-foreground text-sm">This is your space to think out loud, to share what matters, and to write without filters. Whether it is one word or a thousand, your story starts right here.</p>
      <div className='flex gap-2 md:gap-4 lg:gap-6 justify-center '>
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

export default HeroSection