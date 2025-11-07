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
} from "@/components/ui/alert-dialog"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { IBlog } from "@/models/Blog";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";


interface ColumnsProps {
   handleDelete: (id: string) => void;
   handleTogglePublish: (id: string, isPublished: boolean) => void;
}

export const columns = ({
   handleDelete,
   handleTogglePublish

}: ColumnsProps): ColumnDef<IBlog>[] => [
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
         const actionCell = () => {
            const blog = row.original
            const [showDeleteDialog, setShowDeleteDialog] = useState(false);
            return (
               <>
                  <DropdownMenu modal={false}>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                           <span className="sr-only">Open menu</span>
                           <MoreHorizontal />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleTogglePublish(blog._id, blog.isPublished)}>
                           {blog.isPublished ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>

                        <DropdownMenuItem variant="destructive" onSelect={() => setShowDeleteDialog(true)}>
                           Delete
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                     <AlertDialogContent>
                        <AlertDialogHeader>
                           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                           <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                           </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                           <AlertDialogAction onClick={() => handleDelete(blog._id)}></AlertDialogAction>
                        </AlertDialogFooter>
                     </AlertDialogContent>
                  </AlertDialog>
               </>
            )
         }
         return actionCell()
      },
   },
]