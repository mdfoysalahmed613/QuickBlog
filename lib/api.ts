import { IBlog } from "@/models/Blog";
import { error } from "console";
import { is } from "zod/v4/locales";

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
  const {data}:{data: IBlog} = await response.json();
  return data;
};

export const deleteBlog = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error( error?.message || "Failed to delete blog");
  }
  return await response.json();
};

export const togglePublish = async (id: string, isPublished: boolean) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isPublished: !isPublished }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error( error?.message || "Failed to toggle publish status");
  }
  return await response.json();
};