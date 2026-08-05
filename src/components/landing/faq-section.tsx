"use client";

import { useState } from "react";
import { faqItems } from "@/components/landing/landing-data";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";

export default function FaqSection() {
  const [showAll, setShowAll] = useState(false);
  const initialFaqCount = 5;
  const displayedFaqs = showAll ? faqItems : faqItems.slice(0, initialFaqCount);

  return (
    <section id="faq" className="scroll-mt-0 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <div className="flex justify-center"><SectionLabel>FAQ</SectionLabel></div>
          <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl lg:text-5xl">What buyers need to know.</h2>
        </Reveal>
        <Reveal className="mt-12 divide-y divide-[#dfd9ed] border-y border-[#dfd9ed]">
          {displayedFaqs.map((faq, index) => (
            <details key={faq.question} className="group py-1" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold sm:text-lg">
                <span>{faq.question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#dcd5eb] text-[#6d49fd] transition group-open:rotate-45"><span className="text-xl font-light">+</span></span>
              </summary>
              <p 
                className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-[#716b7c] sm:text-[15px]" 
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </Reveal>
        
        {!showAll && faqItems.length > initialFaqCount && (
          <Reveal className="mt-10 flex justify-center pb-8">
            <button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-[#716b7c] transition-colors hover:bg-[#f4f2f9] hover:text-[#6d49fd]"
            >
              <span>Read more FAQs</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
