const getAllBlogs = async () => {
   const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
     cache: "force-cache",
   });
  return result.json()
}

export default getAllBlogs