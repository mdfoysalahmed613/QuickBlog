import { IBlog } from "@/models/Blog";

const getAllBlogs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const {data}: {data: IBlog[]} = await response.json();
  return data;
}

export default getAllBlogs