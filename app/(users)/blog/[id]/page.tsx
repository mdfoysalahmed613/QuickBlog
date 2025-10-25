import {getSingleBlog} from '@/lib/api';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getSingleBlog(id);
  const { title, subTitle, description, image } = blog;
  return (
    <div>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <h2 className='text-2xl font-semibold'>{subTitle}</h2>
      <p>{description}</p>
      <Image src={image} width={1280} height={720} alt={title} className='rounded-lg' />

    </div>
  )
}

export default BlogDetails