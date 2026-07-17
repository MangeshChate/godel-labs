import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { Brain, Lock, Zap } from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "Semantic Level",
    body: "EDR sees binaries and syscalls. Gödel sees prompts and intent. A poisoned GitHub issue looks normal to EDR—it tells Gödel not to exfiltrate.",
    featured: false,
  },
  {
    icon: Zap,
    title: "Enforce Before",
    body: "EDR alerts after something looks wrong. Gödel decides before: allow, taint, ask, block, kill. Untrusted data never gets authority to act.",
    featured: true,
  },
  {
    icon: Lock,
    title: "Per-Action Policy",
    body: 'EDR asks "Is this app allowed?" Gödel asks "Is this action, with this data, allowed now?" Read never grants send.',
    featured: false,
  },
];

const tableRows = [
  { dimension: "Watches", edr: "Processes, binaries", godel: "Prompts, intent" },
  { dimension: "When", edr: "After execution", godel: "Before execution" },
  { dimension: "Decides by", edr: "Signatures + anomaly", godel: "Origin + policy" },
  { dimension: "False negative cost", edr: "One recovered breach", godel: "Breach with your creds" },
];

export default function DataAuthoritySection() {
  return (
    <section id="data-authority" className="px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <Reveal className="mx-auto max-w-[760px] text-center">
          <div className="flex justify-center">
            <SectionLabel>Core technology</SectionLabel>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            Not EDR.{" "}
            <span className="text-[#6d49fd]">Authority for AI Agents.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-7 text-[#686375] sm:text-base">
            EDR watches processes. Gödel watches prompts. EDR detects after. Gödel decides before.
          </p>
        </Reveal>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <div
                className={`group h-full rounded-[28px] border p-8 shadow-[0_12px_38px_rgba(53,34,105,.04)] transition duration-300 hover:-translate-y-1 sm:p-10 ${
                  card.featured
                    ? "border-[#6d49fd] bg-white shadow-[0_22px_55px_rgba(109,73,253,.15)]"
                    : "border-[#dfd8ef] bg-white/75 hover:border-[#b8a8f5] hover:shadow-[0_22px_55px_rgba(74,49,148,.1)]"
                }`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl border ${
                    card.featured
                      ? "border-[#c5b5ff] bg-[#ede8ff] text-[#6d49fd]"
                      : "border-[#ddd4ff] bg-[#f0ecff] text-[#6d49fd]"
                  }`}
                >
                  <card.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-7 text-lg font-semibold text-[#282332]">{card.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#746e7f]">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Comparison Table */}
        <Reveal className="mx-auto mt-16 max-w-[940px] overflow-hidden rounded-[28px] border border-[#dfd8ef] bg-white/80 shadow-[0_30px_80px_rgba(109,73,253,0.08)] backdrop-blur-md">
          {/* Table header */}
          <div className="hidden grid-cols-3 gap-4 border-b border-[#ede8ff] bg-[#f7f5ff] p-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9b8fc0] sm:grid">
            <span className="pl-3">Dimension</span>
            <span>EDR</span>
            <span className="text-[#6d49fd]">Gödel</span>
          </div>
          {tableRows.map((row) => (
            <div
              key={row.dimension}
              className="grid gap-2 border-b border-[#ede8ff] p-5 transition duration-200 last:border-0 hover:bg-[#faf8ff] sm:grid-cols-3 sm:items-center sm:p-6"
            >
              <span className="pl-3 text-sm font-bold text-[#282332]">{row.dimension}</span>
              <span className="text-sm text-[#746e7f]">{row.edr}</span>
              <span className="text-sm font-semibold text-[#6d49fd]">{row.godel}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

