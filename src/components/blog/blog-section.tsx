"use client";

import Link from "next/link";
import { useState } from "react";
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
      "How we engineered Godel's Sieve to parse unstructured documents and identify sensitive data leakage before model inference in high-throughput applications.",
    slug: "detecting-pii-leaks-in-llm-pipeline-streams",
  },
  {
    date: "April 05, 2026",
    title: "Introducing Godel: The Enterprise AI Security Suite",
    excerpt:
      "A unified platform for securing AI application inputs, outputs, and agentic workflows with deterministic guardrails and security scanning.",
    slug: "introducing-godel-the-enterprise-ai-security-suite",
  },
  {
    date: "March 12, 2026",
    title: "Evaluating Prompt Injection Risks in Autonomous Agents",
    excerpt:
      "Developing rigorous evaluation sets to stress test LLM agent policies against advanced jailbreaking techniques and system-override prompts.",
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

  // Map wordpress posts if present, otherwise fallback to defaults
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
    <section
      id="blog"
      className="relative overflow-hidden bg-[#faf9fd] pb-24 pt-12 sm:pb-32 sm:pt-16"
    >
      <div className="mx-auto mb-14 max-w-[1180px] px-5 sm:px-6 md:mb-16">
        <div className="relative mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6d49fd]">From the lab</p>
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#111322] sm:text-4xl md:text-5xl">
            Research and Updates
          </h2>

          <p className="mx-auto max-w-xl text-[13px] leading-6 text-[#746e7f] sm:text-sm">
            Stay up to date with our security research, technical deep-dives, and announcements from the Godel engineering team.
          </p>
        </div>
      </div>

      {/* Carousel Slider Wrapper (Bleeds full screen width) */}
      <div className="relative w-full overflow-visible">
        {/* Slides Container with Peek Visibility */}
        <div className="relative w-full overflow-hidden slides-viewport-blog">
          <div className="flex gap-6 md:gap-8 slides-track-blog">
            {displayPosts.map((blog) => (
              <div
                key={blog.slug}
                className="w-[85%] md:w-[31.3%] flex-shrink-0 flex flex-col"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group flex min-h-[280px] h-full cursor-pointer flex-col justify-between rounded-[22px] border border-[#dfd8ed] bg-white p-6 shadow-[0_14px_42px_rgba(48,31,96,.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ad99f2] hover:shadow-[0_24px_60px_rgba(72,48,145,.1)] sm:p-8"
                >
                  {/* Top Details */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-medium text-[#958ea0]">
                        {blog.date}
                      </span>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold leading-snug tracking-[-0.025em] text-[#181522] transition-colors duration-300 group-hover:text-[#6f4cf4] sm:text-xl">{blog.title}</h3>
                    <p className="line-clamp-3 text-xs leading-6 text-[#706a7b] sm:text-[13px]">{blog.excerpt}</p>
                  </div>

                  {/* Bottom CTA Link */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6f4cf4] mt-6 group/btn">
                    <span>Read Article</span>
                    <svg
                      className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls Below */}
      <div className="mx-auto mt-8 max-w-[1180px] px-5 sm:mt-9 sm:px-6 md:mt-10">
        <div className="relative z-10 flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Pagination Indicators (dots with wide active indicator) */}
          <div className="flex items-center gap-1.5">
            {displayPosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-[#6f4cf4]"
                    : "w-2 bg-neutral-200 dark:bg-zinc-800"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Controls (View All link + Prev/Next circular buttons) */}
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-normal sm:gap-6">
            <Link
              href="/blog"
              className="flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#6f4cf4] transition-colors hover:text-[#5e32ff] group/updates"
            >
              <span>View All Updates</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover/updates:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-all duration-300 hover:border-[#6f4cf4] hover:bg-[#6f4cf4] hover:text-white sm:h-12 sm:w-12"
                aria-label="Previous posts"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-all duration-300 hover:border-[#6f4cf4] hover:bg-[#6f4cf4] hover:text-white sm:h-12 sm:w-12"
                aria-label="Next posts"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slides-viewport-blog {
          padding-left: 1.5rem;
        }
        @media (min-width: 640px) {
          .slides-viewport-blog {
            padding-left: 2rem;
          }
        }
        @media (min-width: 1280px) {
          .slides-viewport-blog {
            padding-left: calc((100vw - 80rem) / 2 + 2rem);
          }
        }
        .slides-track-blog {
          transform: translateX(calc(-${currentIndex} * (85% + 1.5rem)));
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @media (min-width: 768px) {
          .slides-track-blog {
            transform: translateX(calc(-${currentIndex} * (31.3% + 2rem)));
          }
        }
      `}</style>

    </section>
  );
}
