import BlogList from "@/components/home/bloglist";
import HeroSection from "@/components/home/hero-section";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BlogList />
    </div>
  );
}
