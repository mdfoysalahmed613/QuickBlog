import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Image from "next/image";
export type Blog = {
   _id: string
   title: string
   subTitle: string
   description: string
   category: string
   isPublished: boolean
   createdAt: string
   image?: string
}
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

export const columns: ColumnDef<Blog>[] = [
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
         return <div className="font-medium max-w-[200px] truncate">{title}</div>
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
         const isPublished = row.getValue("isPublished") as boolean
         return (
            <Badge variant={isPublished ? "default" : "secondary"}>
               {isPublished ? "Published" : "Draft"}
            </Badge>
         )
      },
   },
   {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
         const date = new Date(row.getValue("createdAt"))
         return <div className="text-sm text-gray-600">
            {date.toLocaleDateString()}
         </div>
      },
   },
   {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
         const blog = row.original
         return (
            <div className="flex gap-2">
               <Button variant="outline" size="sm">
                  Edit
               </Button>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button variant="destructive" size="sm">
                        Delete
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                           This action cannot be undone. This will permanently delete your
                           blog and remove it from our servers.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(blog._id)}>Delete</AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
               
            </div>
         )
      },
   },
]