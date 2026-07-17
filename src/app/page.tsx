import LandingPage from "@/components/landing/landing-page";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { getPosts } from "@/lib/wordpress";

export default async function Home() {
  const posts = await getPosts().catch(() => []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ff] text-[#111322]">
      <Navbar />
      <LandingPage posts={posts.slice(0, 6)} />
      <Footer />
    </main>
  );
}
