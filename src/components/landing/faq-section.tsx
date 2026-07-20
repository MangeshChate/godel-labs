import { faqItems } from "@/components/landing/landing-data";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-36 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <div className="flex justify-center"><SectionLabel>FAQ</SectionLabel></div>
          <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl lg:text-5xl">What buyers need to know.</h2>
        </Reveal>
        <Reveal className="mt-12 divide-y divide-[#dfd9ed] border-y border-[#dfd9ed]">
          {faqItems.map((faq, index) => (
            <details key={faq.question} className="group py-1" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold sm:text-lg">
                <span>{faq.question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#dcd5eb] text-[#6d49fd] transition group-open:rotate-45"><span className="text-xl font-light">+</span></span>
              </summary>
              <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-[#716b7c] sm:text-[15px]">{faq.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
