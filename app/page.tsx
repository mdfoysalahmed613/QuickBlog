import BlogList from "@/components/home/bloglist";
import Header from "@/components/home/header";
import UserInfo from "@/components/home/users";

export default function Home() {
  return (
    <div>
      <Header />
      <BlogList />
      <UserInfo />
    </div>
  );
}
