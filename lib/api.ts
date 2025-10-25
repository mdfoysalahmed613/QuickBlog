import { IBlog } from "@/models/Blog";

export const getAllBlogs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const {data}: {data: IBlog[]} = await response.json();
  return data;
}

export const getSingleBlog = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
};

