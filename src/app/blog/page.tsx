import { BlogPlaceholder } from "@/components/blog/blog-placeholder";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { getPosts, type WordPressPost } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog | Gödel Labs",
  description: "Technical deep dives and research from the Gödel Labs security team.",
};

export const revalidate = 60;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function PostArtwork({ post, priority = false, className = "object-cover" }: { post: WordPressPost; priority?: boolean; className?: string }) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];

  return media?.source_url ? (
    <Image
      src={media.source_url}
      alt={media.alt_text || stripHtml(post.title.rendered)}
      fill
      priority={priority}
      sizes={priority ? "(max-width: 1024px) 100vw, 720px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      className={className}
    />
  ) : (
    <BlogPlaceholder title={post.title.rendered} excerpt={post.excerpt.rendered} variant="full" showText />
  );
}

function getReadTime(post: WordPressPost) {
  const words = stripHtml(post.content.rendered).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function PostMeta({ post, compact = false }: { post: WordPressPost; compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-[#777082] ${compact ? "text-[10px]" : "text-[11px]"}`}>
      <span>{formatDate(post.date)}</span>
      <span className="text-[#c4bdce]">•</span>
      <span>{getReadTime(post)} min read</span>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getPosts().catch(() => []);
  const uniquePosts = posts.filter((post, index, allPosts) => index === allPosts.findIndex((candidate) => candidate.id === post.id));
  const lead = uniquePosts[0];
  const stories = uniquePosts.slice(1);
  const editorChoices = stories.slice(0, 3);
  const moreStories = stories.slice(3);

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
        <div className="hero-grid absolute inset-0 opacity-55" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[linear-gradient(to_bottom,rgba(109,73,253,.1),transparent_78%)]" />

        <div className="relative mx-auto max-w-[1120px]">
          <header className="mb-10 max-w-[900px] sm:mb-14">
            <h1 className="text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-4xl lg:text-5xl">Research for the <span className="text-[#6d49fd]">agentic frontier.</span></h1>
            <p className="mt-4 max-w-[680px] text-sm leading-6 text-[#686375] sm:mt-5 sm:text-[15px] sm:leading-7">Technical research, field notes, and practical guidance for securing autonomous systems.</p>
          </header>

          {lead ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,.8fr)] lg:items-start">
              <Link href={`/blog/${lead.slug}`} aria-label={`Read ${stripHtml(lead.title.rendered)}`} className="group block min-w-0">
                <article>
                  <h2 className="sr-only">{stripHtml(lead.title.rendered)}</h2>
                  <div className="relative aspect-[1.83/1] w-full overflow-hidden rounded-[20px] border border-[#ddd7e8] bg-[#efecf8] sm:rounded-[24px]">
                    <PostArtwork post={lead} priority />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6d49fd]">Latest blog</span>
                    <span className="text-[#d0cad8]">•</span>
                    <span className="text-[11px] text-[#777082]">{lead._embedded?.author?.[0]?.name || "Gödel Team"}</span>
                    <span className="text-[#d0cad8]">•</span>
                    <PostMeta post={lead} />
                  </div>
                  <p className="mt-3 line-clamp-2 max-w-[760px] text-sm leading-6 text-[#676171]">{stripHtml(lead.excerpt.rendered)}</p>
                </article>
              </Link>

              {editorChoices.length > 0 && (
                <aside aria-labelledby="editors-choice-title">
                  <h2 id="editors-choice-title" className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">Editor&apos;s <span className="text-[#6d49fd]">Choice</span></h2>
                  <div className="mt-5 divide-y divide-[#e4deeb]">
                    {editorChoices.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="group grid grid-cols-[92px_minmax(0,1fr)] gap-4 py-4 first:pt-0">
                        <div className="relative aspect-[1.25/1] overflow-hidden rounded-[12px] border border-[#e0dae8] bg-[#efecf8]">
                          <PostArtwork post={post} className="object-contain" />
                        </div>
                        <div className="min-w-0 self-center">
                          <h3 className="line-clamp-2 text-sm font-semibold leading-5 tracking-[-0.02em] text-[#1d1925] transition group-hover:text-[#6d49fd]">{stripHtml(post.title.rendered)}</h3>
                          <div className="mt-2"><PostMeta post={post} compact /></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </aside>
              )}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#ded8ef] bg-white p-12 text-center text-sm text-[#756f80]">Research articles will appear here shortly.</div>
          )}

          {moreStories.length > 0 && (
            <section className="mt-16 border-t border-[#e2dce9] pt-10 sm:mt-20 sm:pt-12" aria-labelledby="more-stories-title">
              <div className="mb-7 flex items-end justify-between sm:mb-9">
                <h2 id="more-stories-title" className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">More stories</h2>
                <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-[#9b95a6] sm:block">{moreStories.length} articles</span>
              </div>
              <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {moreStories.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} aria-label={`Read ${stripHtml(post.title.rendered)}`} className="group block h-full">
                    <article>
                      <h3 className="sr-only">{stripHtml(post.title.rendered)}</h3>
                      <div className="relative aspect-[1.83/1] overflow-hidden rounded-[18px] border border-[#ded8e7] bg-[#efecf8]"><PostArtwork post={post} /></div>
                      <div className="mt-4">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#777082]">
                          <PostMeta post={post} />
                          <span className="text-[#c4bdce]">•</span>
                          <span className="text-[#8068e8]">{post._embedded?.author?.[0]?.name || "Gödel Team"}</span>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#676171]">{stripHtml(post.excerpt.rendered)}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
