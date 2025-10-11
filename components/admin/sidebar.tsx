"use client"
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ClipboardList, FolderPlus, House, MessageCircleMore } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import React from 'react'
const items = [
   {
      title: "Dashboard",
      url: "admin",
      icon: House,
   },
   {
      title: "Add Blogs",
      url: "admin/addblog",
      icon: FolderPlus,
   },
   {
      title: "Blog List",
      url: "admin/bloglist",
      icon: ClipboardList,
   },
   {
      title: "Comments",
      url: "admin/comments",
      icon: MessageCircleMore,
   },
]
const AdminSideBar = () => {
   const pathName = usePathname()
   return (
      <Sidebar>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <div className="flex gap-2 items-center mb-2 mt-1 cursor-pointer" onClick={() => redirect("/")}>
                     <Image
                        src="/favicon.svg"
                        alt="QuickBlog Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 cursor-pointer"
                        priority
                     />
                     <h1 className="font-bold text-2xl">QuickBlog</h1>
                  </div>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <SidebarMenu>
               {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton size='lg' asChild isActive={pathName === `/${item.url}`}>
                        <Link href={`/${item.url}`} className="flex items-center gap-2">
                           <item.icon />
                           <span className="text-lg">{item.title}</span>
                        </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarContent>
         <SidebarFooter>
            <div className="text-sm text-gray-500 p-4">© 2025 QuickBlog. All rights reserved.</div>
         </SidebarFooter>
      </Sidebar>
   )
}

export default AdminSideBar