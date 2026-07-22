import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { ArrowRight, FileText, MessageSquareText, Send, Wrench } from "lucide-react";

const stages = [
  {
    icon: FileText,
    number: "01",
    label: "MCP response",
    detail: "Sensitive HR data enters the session.",
    subtext: "The last point your existing controls can see.",
    subtextHighlighted: false,
  },
  {
    icon: MessageSquareText,
    number: "02",
    label: "Agent context",
    detail: "The agent summarizes and transforms it.",
    subtext: "Same data, new shape — invisible to filters.",
    subtextHighlighted: false,
  },
  {
    icon: Wrench,
    number: "03",
    label: "Tool argument",
    detail: "It becomes part of an outbound tool call.",
    subtext: "No label left to inspect.",
    subtextHighlighted: false,
  },
  {
    icon: Send,
    number: "04",
    label: "External action",
    detail: "Gödel still knows what it is.",
    subtext: "Policy stops the wrong destination.",
    subtextHighlighted: true,
  },
] as const;

export default function UseCasesSection() {
  return (
    <section id="why-godel" className="scroll-mt-0 border-y border-[#e5dff0] bg-white px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal className="max-w-[860px]">
          <SectionLabel>The chain nothing follows</SectionLabel>
          <h2 className="mt-5 max-w-[840px] text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-[#111322] sm:text-5xl lg:text-[54px]">
            Context becomes a tool call becomes an action.{" "}
            <span className="text-[#6d49fd]">Nothing in your stack follows that chain.</span>
          </h2>
          <p className="mt-6 max-w-[780px] text-[15px] leading-7 text-[#625d6e] sm:text-base sm:leading-7">
            Sensitive information doesn&apos;t stay where your controls can see it. The moment an agent touches it, it&apos;s rewritten at every hop — summarized into context, embedded in a tool argument, dispatched as an action. Each transformation strips whatever your stack knew about it. By the time it matters, nothing remembers what the data was — except Gödel, which classifies it at every hop and carries its handling requirements through to the final action.
          </p>
        </Reveal>

        {/* 4-Step Chain Flow */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start">
          {stages.map((stage, index) => (
            <div key={stage.label} className="contents">
              <Reveal delay={index * 0.06} className="border-t border-[#e2dcee] pt-6">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-[#6d49fd]">{stage.number}</p>
                  
                  <div className="mt-3.5 flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0ecff] text-[#6d49fd]">
                      <stage.icon className="h-4.5 w-4.5" />
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-[#1c1825]">{stage.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5e576b] sm:text-[13px]">{stage.detail}</p>
                  
                  <p className={`mt-3.5 text-xs italic leading-relaxed ${
                    stage.subtextHighlighted ? "font-medium text-[#6d49fd]" : "text-[#918a9e]"
                  }`}>
                    {stage.subtext}
                  </p>
                </div>
              </Reveal>
              {index < stages.length - 1 && (
                <div className="hidden lg:flex lg:h-full lg:items-center lg:pt-14">
                  <ArrowRight className="h-4 w-4 text-[#c4b9e4]" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <Reveal className="mt-14 rounded-r-xl border-l-4 border-[#6d49fd] bg-[#f5f2ff] px-6 py-5.5 sm:px-8 sm:py-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6d49fd]">
              Handling requirements that survive every hop
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#1c1825] sm:text-base">
              <span className="font-semibold">Restricted · Internal only · No external output · No memory persistence</span>{" "}
              <span className="text-[#6e6878]">— enforced from step 01 to step 04</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
