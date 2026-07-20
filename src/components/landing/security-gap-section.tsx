import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { CheckCircle2, X } from "lucide-react";

const policyExamples = [
  {
    content: "Sensitive HR content",
    interaction: "Returned to Claude Code through an MCP response",
    outcome: "BLOCK",
    allowed: false,
  },
  {
    content: "Material non-public information",
    interaction: "Submitted to ChatGPT on the web",
    outcome: "BLOCK",
    allowed: false,
  },
  {
    content: "Prompt-injected tool output",
    interaction: "Attempts to trigger a shell or network action",
    outcome: "BLOCK",
    allowed: false,
  },
  {
    content: "Internal engineering context",
    interaction: "Summarized by an internal model under policy",
    outcome: "ALLOW",
    allowed: true,
  },
] as const;

export default function SecurityGapSection() {
  return (
    <section id="policies" className="relative scroll-mt-36 overflow-hidden bg-[#11101b] px-5 py-24 text-white sm:px-6 sm:py-32">
      {/* Radial Purple Glow & Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(109,73,253,.22),transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,#000,transparent_78%)] pointer-events-none" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal className="max-w-[850px]">
          <SectionLabel>Policy at the moment of use</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-normal text-white sm:text-4xl lg:text-5xl">
            The same information can be <span className="text-[#a58fff]">safe to summarize and unsafe to send.</span>
          </h2>
          <p className="mt-6 max-w-[720px] text-[15px] leading-7 text-white/60 sm:text-base">
            Gödel evaluates what the content contains, which agent is using it, where it is headed, what operation is being attempted and whether threat signals are present before the interaction proceeds.
          </p>
        </Reveal>

        {/* Table Container matching reference image UI */}
        <Reveal delay={0.08} className="mt-12 overflow-hidden rounded-3xl border border-white/12 bg-[#141122] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Header Row (No icons, matching reference image) */}
          <div className="hidden grid-cols-[1fr_1.4fr_0.6fr] gap-6 border-b border-white/10 bg-[#19152a] px-6 py-4.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45 sm:px-8 md:grid">
            <span>Classified Information</span>
            <span>AI Interaction</span>
            <span>Decision</span>
          </div>

          {/* Table Body Rows (Matching reference image line dividers) */}
          <div className="divide-y divide-white/10">
            {policyExamples.map((example) => (
              <div
                key={example.content}
                className="flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-white/[0.02] sm:px-8 sm:py-5.5 md:grid md:grid-cols-[1fr_1.4fr_0.6fr] md:items-center md:gap-6"
              >
                {/* Column 1: Information */}
                <p className="text-sm font-semibold text-white">{example.content}</p>

                {/* Column 2: AI Interaction */}
                <p className="text-sm leading-6 text-white/60">{example.interaction}</p>

                {/* Column 3: Decision */}
                <div>
                  <span className={`inline-flex items-center gap-2 text-xs font-bold tracking-wider ${example.allowed ? "text-emerald-400" : "text-red-400"}`}>
                    <span className={`grid h-6 w-6 place-items-center rounded-full ${example.allowed ? "bg-emerald-400/15 text-emerald-400" : "bg-red-400/15 text-red-400"}`}>
                      {example.allowed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    </span>
                    <span>{example.outcome}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
