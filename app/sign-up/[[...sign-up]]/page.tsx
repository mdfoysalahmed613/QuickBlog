import { SignupForm } from '@/components/common/signup-form'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/favicon.svg'
import Image from 'next/image'
// import { SignUp } from '@clerk/nextjs'
const page = () => {
  return (
    // <SignUp />
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center justify-center gap-2 self-center font-medium">
          <Image src={logo} alt="Quick Blog" className='w-6 h-6' />
          <p className='text-2xl font-semibold'>Quick Blog</p>
        </Link>
        <SignupForm />
      </div>
    </div>
  )
}

export default page