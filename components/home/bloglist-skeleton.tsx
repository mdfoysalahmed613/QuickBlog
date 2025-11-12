import { Skeleton } from '../ui/skeleton'

const BloglistSkeleton = () => {
  return (
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 py-2'>
        <Skeleton className="h-[374px] w-full rounded-lg" />
        <Skeleton className="h-[374px] w-full rounded-lg" />
        <Skeleton className="h-[374px] w-full rounded-lg" />
    </div>
  )
}

export default BloglistSkeleton