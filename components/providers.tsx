'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ClerkProvider } from '@clerk/nextjs'
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(() => new QueryClient())
   return (
      <ClerkProvider>
         <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </ClerkProvider>
   )
}
