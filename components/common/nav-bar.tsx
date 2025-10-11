"use client"
import React from 'react'
import { Button } from '../ui/button'
import { redirect, usePathname } from 'next/navigation'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const NavBar = () => {
   const pathName = usePathname();
   const {data:session,status} = useSession();
   const isAdminRoute = pathName.startsWith('/admin');
   const noNavPath = ["/login","/register"].includes(pathName);
   if (isAdminRoute || noNavPath) {
     return null; // Don't render NavBar on admin, login or register routes
   }
   return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-5">
         <div className="flex gap-2 justify-center items-center cursor-pointer" onClick={() => redirect("/")}>
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
         <div>
            {status === "authenticated" ? <div className='flex gap-4 items-center'>
               <Button onClick={() => redirect("/admin")}>
                  Admin
               </Button>
               <Button variant='destructive' onClick={() => signOut({ redirect: false })}>
                  Logout
               </Button>
            </div> : <div className='flex gap-4'>
               <Button onClick={() => redirect("/login")}>
                  Login
               </Button>
            </div>   
            }
         </div>
      </div>
   )
}

export default NavBar