import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { useCasesData } from "@/data/use-cases";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(useCasesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCasesData[slug];
  if (!useCase) return {};

  return {
    title: `${useCase.title} | Gödel Security Gate`,
    description: useCase.description,
  };
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = useCasesData[slug];

  if (!useCase) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      {/* Title & Information Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_bottom,rgba(109,73,253,.08),transparent_80%)]" />

        <div className="relative mx-auto max-w-[1040px]">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6d49fd]/20 bg-[#6d49fd]/8 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#6d49fd]">
              <span>{useCase.badge}</span>
            </div>
            <h1 className="mt-4 max-w-[880px] text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111322] sm:text-5xl lg:text-6xl">
              {useCase.title}
            </h1>
            <p className="mt-5 max-w-[760px] text-base leading-7 text-[#5d576a] sm:text-lg sm:leading-8">
              {useCase.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#6d49fd] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-[#5e32ff] active:scale-[0.97]"
              >
                <span>Install Gödel</span>
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border border-[#d6ceed] bg-white px-6 py-3 text-sm font-semibold text-[#221d2d] transition duration-150 hover:border-[#6d49fd]/40 hover:bg-[#f6f3fe] active:scale-[0.97]"
              >
                <span>Book Demo</span>
                <ArrowRight className="h-4 w-4 text-[#6d49fd]" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section className="border-t border-[#e5dff0] bg-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1040px]">
          <Reveal className="max-w-[760px]">
            <SectionLabel>Walkthrough Video</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#111322] sm:text-3xl">
              See {useCase.shortTitle} enforcement in action
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#625d6e] sm:text-base">
              {useCase.videoCaption}
            </p>
          </Reveal>

          {/* Video Player Frame */}
          <Reveal className="mt-8 overflow-hidden rounded-[24px] border border-[#ded5f0] bg-[#110e1c] p-2 shadow-[0_20px_50px_rgba(24,14,50,.15)] sm:p-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-black">
              <video
                src={useCase.videoSrc}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Policy Engine Section */}
      <section className="border-t border-[#e5dff0] bg-[#f7f5ff] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[1040px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionLabel>Policy Engine</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#111322] sm:text-4xl">
                Deterministic Policy Enforcement
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#5d576a] sm:text-base sm:leading-7">
                Gödel uses declarative YAML policy files to enforce zero-trust security rules directly inside agent execution hooks. Policies take effect in real time with zero code modifications required.
              </p>

              <div className="mt-8 flex flex-col gap-3.5">
                {[
                  "Declarative YAML policy rules for agent hooks",
                  "Sub-millisecond decision evaluation latency",
                  "Zero agent code modification or wrapper script required",
                  "Cryptographic evidence audit trail logging",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#2d2838]">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#6d49fd]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="overflow-hidden rounded-[22px] border border-[#2b243b] bg-[#141022] shadow-[0_16px_40px_rgba(0,0,0,.2)]">
                <div className="flex items-center justify-between border-b border-[#2b243b] bg-[#1c162e] px-4 py-3 text-xs text-[#a39bb3]">
                  <span className="font-mono text-[#6d49fd]">{useCase.policyExample.filename}</span>
                  <span className="rounded bg-[#28213b] px-2 py-0.5 uppercase tracking-wider text-[#d2c9e8]">YAML</span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-[#e5dff5]">
                  <code>{useCase.policyExample.code}</code>
                </pre>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
