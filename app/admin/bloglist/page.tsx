"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {deleteBlog, getAllBlogs, togglePublish} from "@/lib/api";
import { IBlog } from "@/models/Blog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const BlogListPage = () => {
  const queryClient = useQueryClient();
  const { data: blogs = [], isPending, isError } = useQuery<IBlog[]>({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  });
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success("Blog deleted successfully");
    },
    onError: (error: Error) => {
      toast.error("An error occurred: " + error.message);
    },
  });

  const handleDelete = (id: string) => {
    if (!id) return;
    deleteMutation.mutate(id);
  }

  const togglePublishMutation = useMutation({
    mutationFn: ({id, isPublished}: {id: string, isPublished: boolean}) => togglePublish(id, isPublished),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error: Error) => {
      toast.error("An error occurred: " + error.message);
    },
  });

  const handleTogglePublish = (id: string, isPublished: boolean) => {
    if (!id) return;
    togglePublishMutation.mutate({ id, isPublished });
  }

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
    <Card className="my-8 shadow-xl bg-secondary/40">
      <CardHeader>
        <CardTitle>Blog List</CardTitle>
        <CardDescription>
          Manage your blog posts - {blogs.length} blog(s) total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns({
          handleDelete,
          handleTogglePublish
        })} data={blogs} />
      </CardContent>
    </Card>
  );
};

export default BlogListPage;