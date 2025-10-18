import React from 'react'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { IBlog } from '@/models/Blog'

const BlogCard = ({ blog }: { blog: IBlog }) => {
   const { title, subTitle, image, category } = blog
   return (
      <div className='max-w-md bg-card rounded-lg shadow-sm overflow-hidden flex flex-col gap-1 hover:scale-105 transition-all'>
         <div className='relative'>
            <Image src={image || '/placeholder.png'} width={1280} height={720} alt={title} />
         </div>


         <div className='mx-6 my-6 flex flex-col gap-2'>
            <Badge>{category}</Badge>
            <h1 className='font-semibold text-md'>{title}</h1>
            <p className='font-light text-sm'>{subTitle}</p>
         </div>


      </div>
   )
}

export default BlogCard