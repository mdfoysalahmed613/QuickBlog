"use client"
import { IBlog } from '@/models/Blog'
import BlogCard from './blog'
import { getAllBlogs } from '@/lib/api'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { SearchIcon, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/input'
import { ButtonGroup } from '../ui/button-group'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { Spinner } from '../ui/spinner'

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState("All")
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  })
  const filteredData = data?.filter((blog: IBlog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "All" || blog.category === categoryFilter
    const isPublished = blog.isPublished === true
    return matchesSearch && matchesCategory && isPublished
  })
  if (isPending) {
    return <Spinner />
  } if (isError) {
    return <div>Error loading blogs</div>
  }
  return (
    <div>
      <div className='flex gap-4 justify-between mb-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Filter Blogs">
              <SlidersHorizontal />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40 p-2 z-20 bg-background border rounded-md shadow-lg">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
              <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Technology">Technology</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Startup">Startup</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Lifestyle">Lifestyle</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <ButtonGroup className='w-96'>
          <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button variant="outline" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>
        <div className='flex gap-2'>
          <Button variant={"outline"} disabled>
            Previous
          </Button>
          <Button variant={"outline"} disabled>
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 py-2 ">
        {filteredData?.map((blog: IBlog) => (
          <Link href={`/blog/${blog._id}`} key={blog._id}>
            <BlogCard {...blog} />
          </Link>
        ))}
        {
          filteredData && filteredData.length === 0 && (
            <p className="text-center col-span-full">No blogs found.</p>
          )
        }
      </div>
    </div>

  )
}

export default BlogList