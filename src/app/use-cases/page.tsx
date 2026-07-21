import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { useCasesData } from "@/data/use-cases";
import { ArrowRight, Download, Eye, FileCheck, ShieldAlert, Lock, Shield, ClipboardCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases | Gödel Security Gate",
  description: "Explore enterprise use cases for securing AI coding agents, browser automation, MCP tools, and LLM pipelines.",
};

const iconMap = {
  Eye,
  FileCheck,
  ShieldAlert,
  Lock,
  Shield,
  ClipboardCheck,
};

export default function UseCasesIndexPage() {
  const useCasesList = Object.values(useCasesData);

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
        <div className="hero-grid absolute inset-0 opacity-55" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[linear-gradient(to_bottom,rgba(109,73,253,.1),transparent_78%)]" />

        <div className="relative mx-auto max-w-[1120px]">
          <Reveal className="max-w-[850px]">
            <SectionLabel>Enterprise Security Use Cases</SectionLabel>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#111322] sm:text-5xl lg:text-6xl">
              Zero-trust security for the <span className="text-[#6d49fd]">agentic enterprise.</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-[#625d6e] sm:text-lg sm:leading-8">
              Gödel classifies content in real time and enforces deterministic security policy as data moves across coding agents, browser automation, Model Context Protocol (MCP) tools, and LLM application pipelines.
            </p>
          </Reveal>

          {/* Use Cases Cards Grid */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {useCasesList.map((uc, idx) => {
              const IconComp = iconMap[uc.iconName];
              return (
                <Reveal key={uc.slug} delay={idx * 0.1}>
                  <Link
                    href={`/use-cases/${uc.slug}`}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#e2daee] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6d49fd]/40 hover:shadow-[0_20px_45px_rgba(109,73,253,.08)]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eee9ff] text-[#6d49fd] transition duration-200 group-hover:bg-[#6d49fd] group-hover:text-white">
                          <IconComp className="h-6 w-6" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
                          {uc.badge}
                        </span>
                      </div>

                      <h2 className="mt-6 text-xl font-semibold tracking-tight text-[#1c1825] transition group-hover:text-[#6d49fd] sm:text-2xl">
                        {uc.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-[#676173] sm:text-[15px]">
                        {uc.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[#f0ebf8] pt-5 text-xs font-semibold text-[#6d49fd]">
                      <span>Explore use case details</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#e5dff0] bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#111322] sm:text-5xl">
              Ready to protect your AI agent fleet?
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
                className="inline-flex items-center gap-2 rounded-full border border-[#d6ceed] bg-[#f9f8fe] px-7 py-3.5 text-sm font-semibold text-[#221d2d] transition duration-150 hover:border-[#6d49fd]/40 hover:bg-[#f3effd] active:scale-[0.97]"
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
