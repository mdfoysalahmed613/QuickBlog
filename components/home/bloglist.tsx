import { IBlog } from '@/models/Blog'
import React from 'react'
import BlogCard from './blog'
import getAllBlogs from '@/lib/getAllBlogs'
import Link from 'next/link'

const BlogList = async () => {
  const blogs: IBlog[] = await getAllBlogs()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 py-2 ">
      {blogs.map((blog: IBlog) => (
        <Link href={`/blog/${blog._id}`} key={blog._id}>
          <BlogCard {...blog} />
        </Link>
      ))}
    </div>
  )
}

export default BlogList