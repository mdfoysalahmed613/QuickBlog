"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import getAllBlogs from "@/lib/getAllBlogs";

const BlogListPage = () => {

  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  });

  // const [blogs, setBlogs] = useState<Blog[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("/api/blogs");
        
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch blogs");
  //       }
        
  //       const data = await response.json();
  //       setBlogs(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "An error occurred");
  //       console.error("Error fetching blogs:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError}</div>;
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