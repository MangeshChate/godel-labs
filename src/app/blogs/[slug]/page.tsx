import { permanentRedirect } from "next/navigation";
import { getPosts } from "@/lib/wordpress";

export async function generateStaticParams() {
  const posts = await getPosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function LegacyBlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/blog/${slug}`);
}
