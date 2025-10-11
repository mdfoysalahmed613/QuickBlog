import { IBlog } from '@/models/Blog'
import React from 'react'
import BlogCard from './blog'
import getAllBlogs from '@/lib/getAllBlogs'
import Link from 'next/link'

const BlogList = async () => {
  try {
    const blogs: IBlog[] = await getAllBlogs()
    if (!blogs || blogs.length === 0) {
      return <div className="text-center text-gray-500">No blogs available</div>
    }
  } catch (error) {
    return console.error(error)
  }
  const blogs: IBlog[] = await getAllBlogs()
  return (
    <div className="flex gap-4 sm:gap-8 justify-center items-center py-2 flex-wrap ">
      {blogs.map((blog: IBlog) => (
        <Link href={`/blog/${blog._id}`} key={blog._id}>
          <BlogCard blog={blog} />
        </Link>
      ))}
    </div>
  )
}

export default BlogList