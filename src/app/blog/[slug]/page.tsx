import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { BlogPlaceholder } from "@/components/blog/blog-placeholder";
import { getPostBySlug, getPosts } from "@/lib/wordpress";
import { ArrowLeft, CalendarDays, Clock3, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActiveToc from "@/components/blog/active-toc";
import SocialShare from "@/components/blog/social-share";
import ArticleBody from "@/components/blog/article-body";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

type TocItem = { id: string; title: string };

export const revalidate = 60;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://godel-labs.ai";

export async function generateStaticParams() {
  const posts = await getPosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function prepareArticle(content: string) {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const html = content.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_match, level, attributes, inner) => {
    const title = stripHtml(inner);
    const base = title
      .toLowerCase()
      .replace(/&[a-z0-9#]+;/gi, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    const cleanAttributes = String(attributes).replace(/\s+id=("[^"]*"|'[^']*')/gi, "");
    // Keep lower-level headings linkable in the article, but only expose true
    // article sections in the table of contents.
    if (title && Number(level) === 2) toc.push({ id, title });
    return `<h${level}${cleanAttributes} id="${id}">${inner}</h${level}>`;
  });

  return { html, toc };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Post Not Found" };

  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered);
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${title} | Gödel Labs`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "Gödel Labs",
      publishedTime: post.date,
      authors: [post._embedded?.author?.[0]?.name || "Gödel Team"],
      images: featuredImage ? [{ url: featuredImage, alt: title }] : undefined,
    },
    twitter: {
      card: featuredImage ? "summary_large_image" : "summary",
      title,
      description,
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const authorName = post._embedded?.author?.[0]?.name || "Gödel Team";
  const title = stripHtml(post.title.rendered);
  const readTime = Math.max(1, Math.round(stripHtml(post.content.rendered).split(/\s+/).filter(Boolean).length / 220));
  const date = new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const { html, toc } = prepareArticle(post.content.rendered);

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      <article className="px-4 pb-16 pt-[6.5rem] sm:px-6 sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-[1120px]">
          <Link href="/blog" className="group inline-flex items-center gap-2 text-[11px] font-semibold text-[#777184] transition hover:text-[#6d49fd]">
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-1" /> Back to journal
          </Link>

          <div className="mt-7 grid gap-9 sm:mt-9 lg:grid-cols-[210px_minmax(0,760px)] lg:items-start lg:justify-center lg:gap-12 xl:gap-16">
            <aside className="order-2 lg:order-1 lg:sticky lg:top-28 space-y-8">
              {toc.length > 0 && (
                <ActiveToc toc={toc} />
              )}
              <div className={toc.length > 0 ? "border-l border-[#dcd5e8] pl-4 pt-1" : ""}>
                <SocialShare title={title} />
              </div>
            </aside>

            <div className="order-1 min-w-0 lg:order-2">
              <header>
                <h1 className={featuredImage ? "sr-only" : "max-w-3xl text-[2rem] font-semibold leading-tight tracking-[-0.045em] sm:text-4xl"}>{title}</h1>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-[#80798b]">
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-[#6d49fd]" />{date}</span>
                  <span className="flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5 text-[#6d49fd]" />{authorName}</span>
                  <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#6d49fd]" />{readTime} min read</span>
                </div>

                <div className="relative mt-5 aspect-[1.45/1] w-full overflow-hidden rounded-[16px] border border-[#ded8ec] bg-[#ece8f7] shadow-[0_18px_55px_rgba(46,29,99,.07)] sm:mt-6 sm:aspect-[1.83/1] sm:rounded-[20px]">
                  {featuredImage ? (
                    <Image src={featuredImage} alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || title} fill priority sizes="(max-width: 1024px) 100vw, 760px" className="object-contain" />
                  ) : (
                    <BlogPlaceholder title={post.title.rendered} excerpt={post.excerpt.rendered} variant="hero" showText />
                  )}
                </div>
              </header>

              <div className="mt-8">
                <ArticleBody html={html} />
              </div>

              {/* Mobile-only sharing bar */}
              <div className="mt-8 pt-6 border-t border-[#e5dfef] lg:hidden">
                <SocialShare title={title} />
              </div>

              <div className="mt-12 flex flex-col gap-5 rounded-[20px] border border-[#ddd6ef] bg-white/70 p-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:rounded-[22px] sm:p-6">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#6d49fd]">Keep agents safe at runtime</p><p className="mt-2 text-sm text-[#6d6777]">See how Gödel&apos;s Gate fits your agent stack.</p></div>
                <Link href="/demo" className="inline-flex min-h-10 w-fit items-center rounded-full bg-[#111322] px-5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#6d49fd]">Request a demo</Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
