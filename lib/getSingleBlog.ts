
const getSingleBlog = async (id: string) => {
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
};
export default getSingleBlog;