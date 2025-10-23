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
import { usePathname } from "next/navigation"
import React from 'react'
import favicon from '../../public/favicon.svg'
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
                  <Link href={"/"} className="flex gap-2 justify-center items-center cursor-pointer">
                     <Image
                        src={favicon}
                        alt="QuickBlog Logo"
                        className="w-8 h-8"
                        priority
                     />
                     <h1 className="font-bold text-2xl">QuickBlog</h1>
                  </Link>
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