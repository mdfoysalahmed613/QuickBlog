"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {getAllBlogs} from "@/lib/api";
import { IBlog } from "@/models/Blog";
import { Spinner } from "@/components/ui/spinner";

const BlogListPage = () => {

  const { data: blogs, isPending, isError } = useQuery<IBlog[]>({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  });

  
  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error loading blogs</div>;
  }
  if (!blogs) {
    return <div>No blogs found</div>;
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