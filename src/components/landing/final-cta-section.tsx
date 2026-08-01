"use client";

import Reveal from "@/components/landing/reveal";
import EmailCaptureForm from "@/components/landing/email-capture-form";

type FinalCtaSectionProps = {
  heading?: string;
  description?: string;
  buttonLabel?: string;
};

export default function FinalCtaSection({
  heading = "Put a provable boundary in front of every agent.",
  description = "Deploy in five minutes. Your agents keep shipping — unsafe actions don't.",
  buttonLabel = "Get Started",
}: FinalCtaSectionProps = {}) {
  return (
    <section className="relative overflow-hidden bg-[#6d49fd] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-20 mx-auto max-w-[1180px] px-5 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center lg:gap-12">
          <Reveal className="max-w-[620px] md:w-7/12">
            <h2 className="text-balance text-2xl font-semibold leading-[1.1] tracking-normal text-white sm:text-3xl lg:text-4xl">
              {heading}
            </h2>
            <p className="mt-2.5 text-xs leading-6 text-white/80 sm:text-sm">
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="w-full max-w-[440px] md:w-5/12">
            <EmailCaptureForm source="cta" buttonLabel={buttonLabel} theme="purple" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
