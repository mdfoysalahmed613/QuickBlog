"use client";

import { columns, Blog } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blogs");
        
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blog List</CardTitle>
          <CardDescription>Loading blogs...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blog List</CardTitle>
          <CardDescription>Error loading blogs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 text-center py-8">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog List</CardTitle>
        <CardDescription>
          Manage your blog posts - {blogs.length} blog(s) total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={blogs} />
      </CardContent>
    </Card>
  );
};

export default BlogListPage;