import BlogList from "@/components/home/bloglist";
import Header from "@/components/home/header";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div>
      <Header />
      <BlogList />
    </div>
  );
}
