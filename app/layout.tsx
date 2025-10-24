import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickBlog",
  description: "Your own blogging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    
      <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        ><ClerkProvider>
          <Toaster position="top-center" richColors />
            <main >{children}</main>
          </ClerkProvider>
      </body>
        </html>
        </QueryClientProvider>
      
  );
}
