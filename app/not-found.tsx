import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function NotFound() {
   return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-white">
         <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
         <p className="text-gray-600">The page you are looking for does not exist.</p>
         <Link href="/">
            <Button>Go Home</Button>
         </Link>
      </div>
   );
}