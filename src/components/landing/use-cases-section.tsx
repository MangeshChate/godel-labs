import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { ArrowRight, FileText, MessageSquareText, Send, Wrench } from "lucide-react";

const stages = [
  {
    icon: FileText,
    label: "MCP response",
    detail: "Sensitive HR data enters the session",
  },
  {
    icon: MessageSquareText,
    label: "Agent context",
    detail: "The agent summarizes and transforms it",
  },
  {
    icon: Wrench,
    label: "Tool argument",
    detail: "The information becomes part of a tool call",
  },
  {
    icon: Send,
    label: "External action",
    detail: "Policy stops the wrong destination",
  },
] as const;

export default function UseCasesSection() {
  return (
    <section id="why-godel" className="scroll-mt-24 border-y border-[#e5dff0] bg-white px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="max-w-[850px]">
          <SectionLabel>The missing security context</SectionLabel>
          <h2 className="mt-5 max-w-[820px] text-balance text-3xl font-semibold leading-[1.08] tracking-normal text-[#111322] sm:text-4xl lg:text-5xl">
            Data becomes context. <span className="text-[#6d49fd]">Policy should follow.</span>
          </h2>
          <p className="mt-6 max-w-[760px] text-[15px] leading-7 text-[#625d6e] sm:text-base">
            Sensitive information does not remain a file. Inside an AI workflow it becomes a prompt, an MCP response, a model output, a tool argument, and eventually an action. Gödel classifies that information as it moves and enforces how it may be processed, retained, shared, or allowed to influence what happens next.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start">
          {stages.map((stage, index) => (
            <div key={stage.label} className="contents">
              <Reveal delay={index * 0.06} className="border-t border-[#dcd4ec] pt-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[#eee9ff] text-[#6d49fd]">
                    <stage.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6d49fd]">0{index + 1}</p>
                    <h3 className="mt-2 text-base font-semibold tracking-normal text-[#1c1825]">{stage.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#706a7a]">{stage.detail}</p>
                  </div>
                </div>
              </Reveal>
              {index < stages.length - 1 && (
                <ArrowRight className="mx-auto hidden h-5 w-5 text-[#b2a6d5] lg:mt-8 lg:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <Reveal className="mt-12 border-l-4 border-[#6d49fd] bg-[#f5f2ff] px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d49fd]">Handling requirements that persist</p>
            <p className="mt-2 text-sm font-semibold text-[#24202d] sm:text-base">Restricted · Internal only · No external output · No memory persistence</p>
          </div>
          <p className="mt-3 text-sm text-[#696273] sm:mt-0 sm:max-w-[310px] sm:text-right">The format changes. The protection does not.</p>
        </Reveal>
      </div>
    </section>
  );
}
