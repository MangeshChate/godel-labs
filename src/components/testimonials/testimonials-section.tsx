"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Godel Labs is the missing piece in AI security architecture. While most solutions are stuck on surface-level filters, Godel provides the holistic defense needed to secure the full agentic killchain. It is a sophisticated, necessary evolution for any organization deploying AI at scale.",
    name: "Atif Haque",
    title: "Head of Enterprise Security Engineering",
    source: "LinkedIn",
  },
  {
    quote:
      "AI agents are fail-dangerous without interpretability. By examining data flows inside an agent's inner loop, Godel Labs provides a practical proxy for interpretability by validating operations within the AI grey box. As systems evolve from chat to agency, this level of assurance becomes essential.",
    name: "CISO",
    title: "Leading AI Orchestration Platform",
    source: "",
  },
  {
    quote:
      "Godel Labs closes the gap between rapid AI innovation and enterprise-grade data integrity. By moving away from brittle, static filters toward a deep understanding of agentic threats, they have built the most credible security layer I have seen for the modern AI stack.",
    name: "CIO",
    title: "Fortune 100 Financial Services Enterprise",
    source: "",
  },
];

const roundedZigzagPath = `M 0 16 L ${Array.from(
  { length: 41 },
  (_, index) => `${index * 30} ${index % 2 === 0 ? 14 : 2}`,
).join(" L ")} L 1200 16 Z`;

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative scroll-mt-0 bg-[#f4f3f8] pt-14 pb-6 sm:pt-18 sm:pb-8">
      {/* Keep the zigzag silhouette, with rounded joins instead of sharp points. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-4 -translate-y-[99%] overflow-hidden">
        <svg
          className="block h-full w-full text-[#f4f3f8]"
          viewBox="0 0 1200 16"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={roundedZigzagPath}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Header Block aligned with container */}
      <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
        <div className="max-w-[650px]">
          <h2 className="max-w-[600px] text-3xl font-semibold leading-[1.12] tracking-normal text-[#111322] sm:text-4xl lg:text-5xl">
            AI changes where <br className="hidden sm:inline" />
            <span className="text-[#6d49fd]">information must be protected.</span>
          </h2>
        </div>
      </div>

      {/* Full-Bleed Slider Track */}
      <div className="mt-8 w-full overflow-hidden slides-viewport-testimonials">
        <div className="flex gap-6 transition-transform duration-500 ease-out slides-track-testimonials">
          {testimonials.map((item) => (
            <div
              key={item.name + item.title}
              className="w-[85vw] max-w-[500px] shrink-0 sm:w-[520px]"
            >
              <div className="flex min-h-[240px] h-full flex-col justify-between rounded-[24px] border border-[#e2daee] bg-white p-7 shadow-[0_12px_40px_rgba(58,35,123,0.04)] transition-all duration-300 hover:border-[#6d49fd]/40 hover:shadow-[0_18px_50px_rgba(58,35,123,0.08)] sm:p-8">
                {/* Quote Text */}
                <p className="text-sm leading-6 text-[#393341] sm:text-[15px] sm:leading-7">
                  <span className="text-[#6d49fd] font-serif font-bold text-2xl inline-block mr-1.5 select-none align-baseline">“</span>
                  {item.quote}
                  <span className="text-[#6d49fd] font-serif font-bold text-2xl inline-block ml-1.5 select-none align-baseline">”</span>
                </p>

                {/* Author Footer */}
                <div className="mt-6 border-t border-[#f0ea9f]/20 pt-4">
                  <h4 className="text-sm font-semibold text-[#181522] sm:text-base">
                    {item.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#6e6878]">
                    {item.title}
                    {item.source ? ` • ${item.source}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mx-auto mt-6 max-w-[1180px] px-5 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#e2daee] bg-white text-[#4a4258] shadow-sm transition hover:border-[#6d49fd] hover:bg-[#6d49fd] hover:text-white"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#e2daee] bg-white text-[#4a4258] shadow-sm transition hover:border-[#6d49fd] hover:bg-[#6d49fd] hover:text-white"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .slides-viewport-testimonials {
          padding-left: 1.25rem;
        }
        @media (min-width: 640px) {
          .slides-viewport-testimonials {
            padding-left: 1.5rem;
          }
        }
        @media (min-width: 1280px) {
          .slides-viewport-testimonials {
            padding-left: calc((100vw - 1180px) / 2 + 1.5rem);
          }
        }
        .slides-track-testimonials {
          transform: translateX(calc(-${currentIndex} * (min(85vw, 500px) + 1.5rem)));
        }
        @media (min-width: 640px) {
          .slides-track-testimonials {
            transform: translateX(calc(-${currentIndex} * (520px + 1.5rem)));
          }
        }
      `}</style>
    </section>
  );
}
