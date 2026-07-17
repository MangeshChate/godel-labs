"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "Godel Labs is the missing piece in AI security architecture. While most solutions are stuck on surface-level filters, Godel provides the holistic defense needed to secure the full agentic killchain. It is a sophisticated, necessary evolution for any organization deploying AI at scale.",
    name: "Atif Haque",
    title: "Head of Enterprise Security Engineering",
    source: "LinkedIn",
    bgColor: "bg-[#fae8e3] dark:bg-rose-950/10",
    quoteColor: "text-[#ff5f56]",
  },
  {
    quote:
      "AI agents are fail-dangerous without interpretability. By examining data flows inside an agent's inner loop, Godel Labs provides a practical proxy for interpretability by validating operations within the AI grey box. As systems evolve from chat to agency, this level of assurance becomes essential.",
    name: "CISO",
    title: "Leading AI Orchestration Platform",
    bgColor: "bg-[#e6f4ea] dark:bg-emerald-950/10",
    quoteColor: "text-[#27c93f]",
  },
  {
    quote:
      "Godel Labs closes the gap between rapid AI innovation and enterprise-grade data integrity. By moving away from brittle, static filters toward a deep understanding of agentic threats, they have built the most credible security layer I have seen for the modern AI stack.",
    name: "CIO",
    title: "Fortune 100 Financial Services Enterprise",
    bgColor: "bg-[#edf1fc] dark:bg-indigo-950/15",
    quoteColor: "text-[#5e32ff]",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-[#e2dcef] bg-[#faf9fd] pb-12 pt-24 sm:pb-16 sm:pt-32"
    >
      <div className="mx-auto mb-14 max-w-[1180px] px-5 sm:px-6 md:mb-16">
        <div className="relative mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6d49fd]">Proof from the field</p>
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#111322] sm:text-4xl md:text-5xl">
            What Security Leaders Say
          </h2>

          <p className="mx-auto max-w-xl text-[13px] leading-6 text-[#746e7f] sm:text-sm">
            Hear from cybersecurity experts and engineering executives who rely on Godel to protect their agentic systems.
          </p>
        </div>
      </div>

      {/* Carousel Slider Wrapper (Bleeds full screen width) */}
      <div className="relative w-full overflow-visible">
        {/* Slides Container with Peek Visibility */}
        <div className="relative w-full overflow-hidden slides-viewport">
          <div className="flex gap-6 md:gap-8 slides-track">
            {testimonials.map((item) => (
              <div
                key={item.name + item.title}
                className="flex w-[80%] flex-shrink-0 flex-col md:w-[42%]"
              >
                <div
                  className="flex min-h-[360px] h-full flex-col justify-between bg-white/85 rounded-[26px] border border-[#e4def5] p-7 shadow-[0_12px_40px_rgba(58,35,123,.03)] hover:border-[#bdaff5] hover:shadow-[0_20px_50px_rgba(58,35,123,.08)] transition-all duration-300 sm:min-h-[390px] sm:rounded-[32px] sm:p-9 md:p-10"
                >
                  {/* Quote Text */}
                  <p className="mb-8 text-left text-[15px] leading-7 text-[#393341] sm:text-[17px] sm:leading-8 md:text-lg">
                    <span className="text-[#6d49fd] font-serif font-bold text-3xl inline-block mr-2 select-none align-middle leading-none translate-y-[2px]">“</span>
                    {item.quote}
                    <span className="text-[#6d49fd] font-serif font-bold text-3xl inline-block ml-2 select-none align-middle leading-none translate-y-[2px]">”</span>
                  </p>

                  {/* Card Bottom */}
                  <div className="flex items-end justify-between pt-6 border-t border-black/5 dark:border-white/5">
                    {/* Author Info */}
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-[#181522] sm:text-base">
                        {item.name}
                      </h4>
                      <p className="text-[11px] leading-snug text-[#6e6878] sm:text-xs">
                        {item.title}
                        {item.source ? ` • ${item.source}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls Below (Constrained to max-w-7xl) */}
      <div className="mx-auto mt-9 max-w-[1180px] px-5 sm:px-6 md:mt-10">
        <div className="flex items-center justify-between w-full z-10 relative">
          {/* Pagination Indicators (dots with wide active indicator) */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
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

          {/* Navigation Buttons (rounded circles, hover transitions to brand purple) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-zinc-800 text-neutral-600 dark:text-neutral-400 hover:bg-[#6f4cf4] dark:hover:bg-[#6f4cf4] hover:text-white dark:hover:text-white hover:border-[#6f4cf4] dark:hover:border-[#6f4cf4] transition-all duration-300"
              aria-label="Previous testimonial"
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
              className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-zinc-800 text-neutral-600 dark:text-neutral-400 hover:bg-[#6f4cf4] dark:hover:bg-[#6f4cf4] hover:text-white dark:hover:text-white hover:border-[#6f4cf4] dark:hover:border-[#6f4cf4] transition-all duration-300"
              aria-label="Next testimonial"
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

      <style jsx>{`
        .slides-viewport {
          padding-left: 1.5rem;
        }
        @media (min-width: 640px) {
          .slides-viewport {
            padding-left: 2rem;
          }
        }
        @media (min-width: 1280px) {
          .slides-viewport {
            padding-left: calc((100vw - 80rem) / 2 + 2rem);
          }
        }
        .slides-track {
          transform: translateX(calc(-${currentIndex} * (80% + 1.5rem)));
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @media (min-width: 768px) {
          .slides-track {
            transform: translateX(calc(-${currentIndex} * (42% + 2rem)));
          }
        }
      `}</style>
    </section>
  );
}
