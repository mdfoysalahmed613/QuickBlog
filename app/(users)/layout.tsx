import NavBar from '@/components/common/nav-bar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <header>
        <NavBar />
      </header>
      
      {children}
    </div>
  )
}

export default layout