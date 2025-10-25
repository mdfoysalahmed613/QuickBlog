import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { IBlog } from "@/models/Blog";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
const handleDelete = async (id: string) => {
   if (!id) return;
   try {
      const response = await fetch(`/api/blogs/${id}`, {
         method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
         toast.success("Blog deleted successfully");
         // make the refresh of the table or remove the deleted row from the UI
         window.location.reload();
         // Optionally, you can add logic to refresh the table or remove the deleted row from the UI
      } else {
         toast.error("Failed to delete blog: " + data.message);
      }
   } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("An error occurred while deleting the blog.");
   }
};

export const columns: ColumnDef<IBlog>[] = [
   {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
         const image = row.getValue("image") as string
         return image ? (
            <Image
               src={image}
               width={48}
               height={48}
               alt={row.getValue("title")}
               className="w-12 h-12 object-cover rounded"
            />
         ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
               <span className="text-xs text-gray-500">No Image</span>
            </div>
         )
      },
   },
   {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
         const title = row.getValue("title") as string
         return <div className="font-medium w-[200px] truncate">{title}</div>
      },
   },
   {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
         const category = row.getValue("category") as string
         return <Badge variant="outline">{category}</Badge>
      },
   },
   {
      accessorKey: "isPublished",
      header: "Status",
      cell: ({ row }) => {
         const isPublished = row.getValue("isPublished")
         return (
            <Badge variant={isPublished ? "default" : "secondary"}>
               {isPublished ? "Published" : "Draft"}
            </Badge>
         )
      },
   },
   {
      accessorKey: "createdAt",
      header: ({ column }) => {
         return (
            <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
               Created
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => {
         const date = new Date(row.getValue("createdAt"))
         return <div className="text-sm text-center text-gray-600">
            {date.toLocaleDateString()}
         </div>
      },
   },
   {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
         const blog = row.original
         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Open menu</span>
                     <MoreHorizontal />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                     {blog.isPublished ? "Unpublish" : "Publish"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(blog._id)} variant="destructive">Delete</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         )
      },
   },
]