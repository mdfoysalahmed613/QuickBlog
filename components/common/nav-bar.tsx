import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import favicon from '../../public/favicon.svg'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
const NavBar = () => {
   return (
      <div className="flex justify-between items-center py-5">
         <Link href={"/"} className="flex gap-2 justify-center items-center cursor-pointer">
            <Image
               src={favicon}
               alt="QuickBlog Logo"
               className="w-8 h-8"
               priority
            />
            <h1 className="font-bold text-2xl">QuickBlog</h1>
         </Link>
         <div>
            <SignedOut>
               <div className="flex gap-3 items-center">
               <Button variant='outline' asChild>
                  <Link href={"/sign-in"}>
                     Sign In
                  </Link>
               </Button>
               <Button asChild>
                  <Link href={"/sign-up"}>
                     Sign Up
                  </Link>
                  </Button>
               </div>
            </SignedOut>
            <SignedIn>
               <div className="flex gap-3 items-center">
                  <Button variant="outline" className="mr-2" asChild>
                     <Link href={"/admin"}>Admin</Link>
                  </Button>
                  <UserButton />
               </div>
            </SignedIn>
         </div>
      </div>
   )
}

export default NavBar