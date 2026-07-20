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

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative scroll-mt-36 bg-[#f4f3f8] pt-14 pb-6 sm:pt-18 sm:pb-8">
      {/* Solid Zigzag Cut-out Top Teeth (Matching Section BG Color, No Border) */}
      <div className="absolute inset-x-0 top-0 h-3 w-full overflow-hidden z-20 pointer-events-none -translate-y-[99%]">
        <svg
          className="block w-full h-full text-[#f4f3f8]"
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,12 L10,0 L20,12 L30,0 L40,12 L50,0 L60,12 L70,0 L80,12 L90,0 L100,12 L110,0 L120,12 L130,0 L140,12 L150,0 L160,12 L170,0 L180,12 L190,0 L200,12 L210,0 L220,12 L230,0 L240,12 L250,0 L260,12 L270,0 L280,12 L290,0 L300,12 L310,0 L320,12 L330,0 L340,12 L350,0 L360,12 L370,0 L380,12 L390,0 L400,12 L410,0 L420,12 L430,0 L440,12 L450,0 L460,12 L470,0 L480,12 L490,0 L500,12 L510,0 L520,12 L530,0 L540,12 L550,0 L560,12 L570,0 L580,12 L590,0 L600,12 L610,0 L620,12 L630,0 L640,12 L650,0 L660,12 L670,0 L680,12 L690,0 L700,12 L710,0 L720,12 L730,0 L740,12 L750,0 L760,12 L770,0 L780,12 L790,0 L800,12 L810,0 L820,12 L830,0 L840,12 L850,0 L860,12 L870,0 L880,12 L890,0 L900,12 L910,0 L920,12 L930,0 L940,12 L950,0 L960,12 L970,0 L980,12 L990,0 L1000,12 L1010,0 L1020,12 L1030,0 L1040,12 L1050,0 L1060,12 L1070,0 L1080,12 L1090,0 L1100,12 L1110,0 L1120,12 L1130,0 L1140,12 L1150,0 L1160,12 L1170,0 L1180,12 L1190,0 L1200,12 V12 H0 Z" />
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
