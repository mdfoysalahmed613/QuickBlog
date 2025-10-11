import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import AdminSideBar from '@/components/admin/sidebar'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      <SidebarProvider>
         <AdminSideBar />
         <main>
          {children}
         </main>
      </SidebarProvider>
    </div>
  )
}

export default layout