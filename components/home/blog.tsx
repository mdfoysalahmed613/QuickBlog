
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { IBlog } from '@/models/Blog'
import { Card, CardContent, CardHeader } from '../ui/card'
import { AspectRatio } from '../ui/aspect-ratio'

const BlogCard = ({ title, subTitle, image, category }: IBlog) => {
   return (
      <Card className='p-0 hover:scale-[1.02] transition-transform duration-200 ease-in-out'>
         <CardHeader className='p-0'>
            <AspectRatio ratio={16 / 9}>
               <Image src={image} fill alt={title} className='rounded-t-lg w-full h-full fill object-cover' />
            </AspectRatio>
         </CardHeader>

         <CardContent className='pb-5 flex flex-col gap-2'>
            <Badge>{category}</Badge>
            <h1 className='font-semibold text-md'>{title}</h1>
            <p className='text-muted-foreground text-sm'>{subTitle}</p>
         </CardContent>
      </Card>
   )
}

export default BlogCard