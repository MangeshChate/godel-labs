import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { AppWindow, Code2, Workflow, ArrowRight } from "lucide-react";

const surfaces = [
  {
    icon: Code2,
    label: "Coding agents",
    title: "Inside the loop, not around it",
    body: "Every prompt, file, and action a coding agent touches is checked against policy before it executes — across Claude Code, Codex, Cursor, Gemini CLI, and other coding agents.",
  },
  {
    icon: AppWindow,
    label: "Browser agents",
    title: "One policy across web AI",
    body: "The same content and handling policies follow your teams wherever they meet AI on the web — ChatGPT, agentic browsers, uploads, pasted content, and browser-driven actions.",
  },
  {
    icon: Workflow,
    label: "Agent frameworks",
    title: "Coverage for whatever you build",
    body: "LangChain, LangGraph, CrewAI, OpenAI agents, or fully custom — policy travels with the agent across inputs, outputs, tools, and handoffs.",
  },
] as const;

export default function DeploymentSection() {
  return (
    <section id="deployment" className="scroll-mt-0 bg-white px-5 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-28">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-[800px] text-center">
          <div className="flex justify-center">
            <SectionLabel>Enforced inside the workflow</SectionLabel>
          </div>
          <h2 className="mt-3.5 text-balance text-3xl font-semibold leading-[1.08] tracking-normal text-[#111322] sm:text-4xl lg:text-5xl">
            Policy reaches agents <span className="text-[#6d49fd]">where the work happens.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[650px] text-[15px] leading-7 text-[#686170]">
            Gödel enforces from inside each agent's own workflow — the same content and threat policies on every AI surface, applied at the moment an agent acts, not after. How it gets there is the part you'll want to see live.
          </p>
        </Reveal>

        {/* 3 Compact Surface Columns */}
        <div className="mt-10 grid gap-8 border-y border-[#ded7e9] py-9 md:grid-cols-3 md:divide-x md:divide-[#ded7e9]">
          {surfaces.map((surface, index) => (
            <Reveal key={surface.label} delay={index * 0.07} className="md:px-8 first:md:pl-0 last:md:pr-0">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eee9ff] text-[#6d49fd]">
                <surface.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d49fd]">{surface.label}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-normal text-[#211c29]">{surface.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6c6574]">{surface.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Bottom Feature List */}
        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-[#6c6574]">
          <span>No proxy in the traffic path</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c8c0d8] sm:inline-block" />
          <span>No code rewrites</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c8c0d8] sm:inline-block" />
          <span>No agent left uncovered</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c8c0d8] sm:inline-block" />
          <a href="/demo" className="flex items-center gap-1.5 text-[#6d49fd] hover:underline">
            The rest is the demo <ArrowRight className="h-3 w-3" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
