import NavBar from '@/components/common/nav-bar'
import React from 'react'

const layout = ({ children }:{children: React.ReactNode}) => {
  return (
     <div>
        <NavBar />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
  )
}

export default layout