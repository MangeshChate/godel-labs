"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/landing/reveal";
import { ArrowRight } from "lucide-react";

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
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed) {
      router.push(`/demo?email=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/demo");
    }
  };

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
            <form
              onSubmit={handleSubmit}
              className="group flex items-center rounded-full border border-white/35 bg-white/15 p-1.5 shadow-xl backdrop-blur-xl transition-all focus-within:border-white focus-within:bg-white/25 hover:border-white/50"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                className="w-full bg-transparent px-4 text-xs text-white placeholder-white/70 outline-none sm:text-sm"
              />
              <button
                type="submit"
                className="group/btn inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#6d49fd] shadow-md transition-all duration-300 hover:bg-[#111322] hover:text-white"
              >
                <span>{buttonLabel}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
