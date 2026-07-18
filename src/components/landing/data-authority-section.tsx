import DataAuthorityFlow from "@/components/landing/data-authority-flow";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { FileInput, ScanSearch } from "lucide-react";

const classifications = [
  "Source code",
  "Secrets and credentials",
  "HR and payroll",
  "Financial information",
  "Legal and M&A",
  "Personal data",
];

const requirements = [
  "Internal use only",
  "No external output",
  "No memory persistence",
  "Redact before use",
  "Human review required",
  "Block all processing",
];

export default function DataAuthoritySection() {
  return (
    <section id="data-authority" className="scroll-mt-24 bg-[#f7f5ff] px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <Reveal>
            <SectionLabel>Data Authority</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-normal text-[#111322] sm:text-4xl lg:text-5xl">
              Classify information <span className="text-[#6d49fd]">at the moment AI uses it.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-7 text-[#655f70] sm:text-base">
              No pre-labeling required. Gödel inspects content in milliseconds as it enters, leaves, or moves through an AI workflow, then derives the handling requirements that policy must enforce.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <DataAuthorityFlow />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#e9f8f1] text-[#0b8c66]">
                <ScanSearch className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0b8c66]">
                  Understand the information
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-normal text-[#1e1927]">
                  What does this interaction contain?
                </h3>
              </div>
            </div>
            <div className="mt-7 divide-y divide-[#ddd6e9] border-y border-[#ddd6e9]">
              {classifications.map((item, index) => (
                <div key={item} className="flex items-center justify-between py-4 text-sm">
                  <span className="font-medium text-[#3c3645]">{item}</span>
                  <span className="text-[10px] font-bold text-[#9b93a8]">C{index + 1}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#eee9ff] text-[#6d49fd]">
                <FileInput className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6d49fd]">
                  Apply required handling
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-normal text-[#1e1927]">
                  How may AI use it right now?
                </h3>
              </div>
            </div>
            <div className="mt-7 divide-y divide-[#ddd6e9] border-y border-[#ddd6e9]">
              {requirements.map((item, index) => (
                <div key={item} className="flex items-center justify-between py-4 text-sm">
                  <span className="font-medium text-[#3c3645]">{item}</span>
                  <span
                    className={`text-[10px] font-bold ${index > 3 ? "text-[#bd3131]" : "text-[#6d49fd]"}`}
                  >
                    {index > 3 ? "ENFORCE" : "REQUIRE"}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 border-l-4 border-[#6d49fd] bg-[#f5f2ff] px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d49fd]">
              Signal & Decision
            </p>
            <p className="mt-2 text-sm font-semibold text-[#24202d] sm:text-base">
              Classification is the signal. Handling policy is the decision.
            </p>
          </div>
          <p className="mt-3 text-sm text-[#696273] sm:mt-0 sm:max-w-[450px] sm:text-right">
            Content, agent, destination, action, device, user, and current threat signals are evaluated together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
