import { decodeHtmlEntities } from "@/lib/decode";

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    author?: Array<{ name: string; avatar_urls?: Record<string, string> }>;
  };
}

const WP_API_URL = "https://blogs.godel-labs.ai/wp-json/wp/v2";

function decodePostEntities(post: WordPressPost): WordPressPost {
  return {
    ...post,
    title: { ...post.title, rendered: decodeHtmlEntities(post.title.rendered) },
    excerpt: { ...post.excerpt, rendered: decodeHtmlEntities(post.excerpt.rendered) },
    content: { ...post.content, rendered: decodeHtmlEntities(post.content.rendered) },
  };
}

async function fetchWordPressPosts(path: string): Promise<WordPressPost[]> {
  const response = await fetch(`${WP_API_URL}${path}`, { next: { revalidate: 60 } });
  if (!response.ok) throw new Error(`WordPress request failed with status ${response.status}`);
  const posts = (await response.json()) as WordPressPost[];
  return posts.map(decodePostEntities);
}

export function getPosts(): Promise<WordPressPost[]> {
  return fetchWordPressPosts("/posts?_embed");
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const posts = await fetchWordPressPosts(`/posts?slug=${encodeURIComponent(slug)}&_embed`);
  return posts[0] ?? null;
}
