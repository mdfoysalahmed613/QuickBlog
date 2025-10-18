import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

const NavBar = () => {
   return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-5">
         <div className="flex gap-2 justify-center items-center cursor-pointer">
            <Link href={"/"}>
               <Image
                  src="/favicon.svg"
                  alt="QuickBlog Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 cursor-pointer"
                  priority
               />
            </Link>
            <h1 className="font-bold text-2xl">QuickBlog</h1>
         </div>
         <div>
            <Button>
               <Link href={"/admin"}>Admin</Link>
            </Button>
         </div>
      </div>
   )
}

export default NavBar