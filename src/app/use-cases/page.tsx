import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { useCasesData } from "@/data/use-cases";
import { ArrowRight, Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Enterprise Use Cases | Gödel Security Gate",
  description: "Explore all enterprise use cases for securing AI coding agents, browser automation, MCP tools, and LLM pipelines in one place.",
};

export default function UseCasesIndexPage() {
  const useCasesList = Object.values(useCasesData);

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_bottom,rgba(109,73,253,.08),transparent_80%)]" />

        <div className="relative mx-auto max-w-[1040px]">
          <Reveal className="max-w-[850px]">
            <SectionLabel>All Security Use Cases</SectionLabel>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111322] sm:text-5xl lg:text-6xl">
              Runtime Security for Every <span className="text-[#6d49fd]">AI Agent Surface</span>
            </h1>
            <p className="mt-5 text-base leading-7 text-[#5d576a] sm:text-lg sm:leading-8">
              Explore all enterprise use cases for governing coding agents, browser automation, Model Context Protocol (MCP) tools, and LLM application pipelines in one single place.
            </p>
          </Reveal>
        </div>
      </section>

      {/* All 6 Use Cases List In One Place */}
      <section className="border-t border-[#e5dff0] bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[1040px] flex flex-col gap-20">
          {useCasesList.map((uc) => (
            <Reveal key={uc.slug} delay={0.05}>
              <div className="overflow-hidden rounded-[28px] border border-[#e5dfef] bg-[#fbfaff] p-6 shadow-sm transition hover:border-[#6d49fd]/40 hover:shadow-md sm:p-8">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111322] sm:text-3xl">
                    {uc.title}
                  </h2>
                  <Link
                    href={`/use-cases/${uc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd] hover:underline"
                  >
                    <span>View Dedicated Page</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#5d576a] sm:text-base">
                  {uc.description}
                </p>

                {/* Video Player */}
                <div className="mt-6 overflow-hidden rounded-[20px] border border-[#ded5f0] bg-[#110e1c] p-2 shadow-sm sm:p-2.5">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px] bg-black">
                    <video
                      src={uc.videoSrc}
                      controls
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      Your browser does not support HTML5 video playback.
                    </video>
                  </div>
                </div>

                {/* Paragraphs info */}
                <div className="mt-6 flex flex-col gap-3.5 border-t border-[#eee8f6] pt-6 text-sm leading-7 text-[#484254] sm:text-[15px]">
                  {uc.detailedParagraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#e5dff0] bg-[#f7f5ff] px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[850px] text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#111322] sm:text-5xl">
              Ready to secure your AI workflows?
            </h2>
            <p className="mt-4 text-base leading-7 text-[#625d6e]">
              Deploy Gödel Security Gate in minutes and gain real-time visibility into all agent file reads, tool calls, and model outputs.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#6d49fd] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-[#5e32ff] active:scale-[0.97]"
              >
                <span>Install Gödel</span>
                <Download className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border border-[#d6ceed] bg-white px-7 py-3.5 text-sm font-semibold text-[#221d2d] transition duration-150 hover:border-[#6d49fd]/40 hover:bg-[#f3effd] active:scale-[0.97]"
              >
                <span>Book Demo</span>
                <ArrowRight className="h-4 w-4 text-[#6d49fd]" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
