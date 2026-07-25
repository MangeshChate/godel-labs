"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { WordPressPost } from "@/lib/wordpress";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface BlogSectionProps {
  posts?: WordPressPost[];
}

const defaultBlogs: BlogPost[] = [
  {
    date: "June 24, 2026",
    title: "Securing AI Coding Agents in Sandbox Environments",
    excerpt:
      "Analyzing execution paths of autonomous coding agents and preventing host compromise through real-time zero-trust runtime policy checks.",
    slug: "securing-ai-coding-agents-in-sandbox-environments",
  },
  {
    date: "May 18, 2026",
    title: "Detecting PII Leaks in LLM Pipeline Streams",
    excerpt:
      "How we engineered Godel's Sieve to parse unstructured documents and identify sensitive data leakage before model inference.",
    slug: "detecting-pii-leaks-in-llm-pipeline-streams",
  },
  {
    date: "April 05, 2026",
    title: "Introducing Godel: The Enterprise AI Security Suite",
    excerpt:
      "A unified platform for securing AI application inputs, outputs, and agentic workflows with deterministic guardrails.",
    slug: "introducing-godel-the-enterprise-ai-security-suite",
  },
  {
    date: "March 12, 2026",
    title: "Evaluating Prompt Injection Risks in Autonomous Agents",
    excerpt:
      "Developing rigorous evaluation sets to stress test LLM agent policies against advanced jailbreaking techniques.",
    slug: "evaluating-prompt-injection-risks-in-autonomous-agents",
  },
  {
    date: "February 28, 2026",
    title: "Zero-Trust Memory Management in Agent Architectures",
    excerpt:
      "Preventing memory poisoning attacks in vector databases and persistent agent memory stores using cryptographic verification checks.",
    slug: "zero-trust-memory-management-in-agent-architectures",
  },
];

export default function BlogSection({ posts }: BlogSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatPostDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const stripMarkup = (value: string) => value.replace(/<[^>]*>/g, "").trim();

  const displayPosts: BlogPost[] =
    posts && posts.length > 0
      ? posts.map((post) => ({
          title: stripMarkup(post.title?.rendered || ""),
          excerpt: stripMarkup(post.excerpt?.rendered || ""),
          date: formatPostDate(post.date),
          slug: post.slug || "",
        }))
      : defaultBlogs;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayPosts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayPosts.length) % displayPosts.length);
  };

  return (
    <section id="blog" className="relative scroll-mt-24 bg-[#f4f3f8] pt-4 pb-18 sm:pt-6 sm:pb-22">
      {/* Header Block aligned to container */}
      <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[700px]">
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-normal text-[#111322] sm:text-4xl lg:text-5xl">
              Research & <span className="text-[#6d49fd]">Technical Deep Dives</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#e2daee] bg-white px-5 py-2.5 text-xs font-semibold text-[#322a40] shadow-sm transition hover:border-[#6d49fd] hover:text-[#6d49fd]"
          >
            <span>View all updates</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Full-Bleed Slider Track with White Original Cards */}
      <div className="mt-8 w-full overflow-hidden slides-viewport-blog">
        <div className="flex gap-6 transition-transform duration-500 ease-out slides-track-blog">
          {displayPosts.map((blog) => (
            <div
              key={blog.slug}
              className="w-[88vw] max-w-[460px] shrink-0 sm:w-[460px]"
            >
              <Link
                href={`/blog/${blog.slug}`}
                className="group flex h-[270px] sm:h-[285px] cursor-pointer flex-col justify-between rounded-[24px] border border-[#dfd8ed] bg-white p-7 shadow-[0_12px_36px_rgba(48,31,96,.04)] transition-all duration-300 hover:border-[#6d49fd]/50 hover:shadow-[0_20px_50px_rgba(72,48,145,.09)] sm:p-8"
              >
                {/* Top Date & Title */}
                <div>
                  <span className="text-[11px] font-medium text-[#958ea0]">
                    {blog.date}
                  </span>

                  <h3 className="mt-2.5 text-base font-semibold leading-snug tracking-tight text-[#181522] transition-colors duration-300 group-hover:text-[#6d49fd] line-clamp-2 sm:text-xl">
                    {blog.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-xs leading-6 text-[#706a7b] sm:text-[14px]">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Bottom Read CTA */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd] mt-4 group/btn">
                  <span>Read Article</span>
                  <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="mx-auto mt-6 max-w-[1180px] px-5 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#e2daee] bg-white text-[#4a4258] shadow-sm transition hover:border-[#6d49fd] hover:bg-[#6d49fd] hover:text-white"
            aria-label="Previous article"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#e2daee] bg-white text-[#4a4258] shadow-sm transition hover:border-[#6d49fd] hover:bg-[#6d49fd] hover:text-white"
            aria-label="Next article"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Solid Zigzag Cut-out Bottom Teeth (Matching Section BG Color, No Border) */}
      <div className="absolute inset-x-0 bottom-0 h-3 w-full overflow-hidden z-20 pointer-events-none translate-y-[99%] rotate-180">
        <svg
          className="block w-full h-full text-[#f4f3f8]"
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,12 L10,0 L20,12 L30,0 L40,12 L50,0 L60,12 L70,0 L80,12 L90,0 L100,12 L110,0 L120,12 L130,0 L140,12 L150,0 L160,12 L170,0 L180,12 L190,0 L200,12 L210,0 L220,12 L230,0 L240,12 L250,0 L260,12 L270,0 L280,12 L290,0 L300,12 L310,0 L320,12 L330,0 L340,12 L350,0 L360,12 L370,0 L380,12 L390,0 L400,12 L410,0 L420,12 L430,0 L440,12 L450,0 L460,12 L470,0 L480,12 L490,0 L500,12 L510,0 L520,12 L530,0 L540,12 L550,0 L560,12 L570,0 L580,12 L590,0 L600,12 L610,0 L620,12 L630,0 L640,12 L650,0 L660,12 L670,0 L680,12 L690,0 L700,12 L710,0 L720,12 L730,0 L740,12 L750,0 L760,12 L770,0 L780,12 L790,0 L800,12 L810,0 L820,12 L830,0 L840,12 L850,0 L860,12 L870,0 L880,12 L890,0 L900,12 L910,0 L920,12 L930,0 L940,12 L950,0 L960,12 L970,0 L980,12 L990,0 L1000,12 L1010,0 L1020,12 L1030,0 L1040,12 L1050,0 L1060,12 L1070,0 L1080,12 L1090,0 L1100,12 L1110,0 L1120,12 L1130,0 L1140,12 L1150,0 L1160,12 L1170,0 L1180,12 L1190,0 L1200,12 V12 H0 Z" />
        </svg>
      </div>

      <style jsx>{`
        .slides-viewport-blog {
          padding-left: 1.25rem;
        }
        @media (min-width: 640px) {
          .slides-viewport-blog {
            padding-left: 1.5rem;
          }
        }
        @media (min-width: 1280px) {
          .slides-viewport-blog {
            padding-left: calc((100vw - 1180px) / 2 + 1.5rem);
          }
        }
        .slides-track-blog {
          transform: translateX(calc(-${currentIndex} * (min(88vw, 460px) + 1.5rem)));
        }
        @media (min-width: 640px) {
          .slides-track-blog {
            transform: translateX(calc(-${currentIndex} * (460px + 1.5rem)));
          }
        }
      `}</style>
    </section>
  );
}
