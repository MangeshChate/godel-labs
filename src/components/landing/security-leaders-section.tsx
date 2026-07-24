import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import {
  ArrowUpRight,
  Braces,
  Database,
  FileClock,
  Globe2,
  ScanLine,
  ShieldCheck,
  TerminalSquare,
  TriangleAlert,
} from "lucide-react";

const risks = [
  {
    label: "DATA IS LEAVING TODAY",
    title: "Every unmanaged agent is an open exfiltration path.",
    description:
      "Source code, credentials, customer records — moving through agents your DLP can't see, right now. Gödel inspects and holds them at the moment of exit, on every surface.",
  },
  {
    label: "ATTACKERS ARE ALREADY PROBING",
    title: "One poisoned page can command your agents.",
    description:
      "Injection attacks against agents are live in the wild — and every agent you haven't governed will obey. With Gödel, untrusted content never gains the authority to act.",
  },
  {
    label: "BANNING ISN'T AN OPTION",
    title: "Your teams won't stop. Govern instead of chase.",
    description:
      "Blocked agents go underground; shadow AI is worse than sanctioned AI. Put policy on every agent — approved or not — and turn a blind spot into a governed rollout.",
  },
  {
    label: '"WE DON\'T KNOW" WON\'T HOLD',
    title: "When the board asks, have the record.",
    description:
      "What agents accessed, attempted, and were denied — a full account, from day one. The difference between reporting your AI risk and discovering it in an incident.",
  },
];

const cardLayouts = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

function EgressGraphic() {
  return (
    <div className="relative h-full min-h-[150px] overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035]" aria-hidden="true">
      {[26, 50, 74].map((top, index) => {
        const SourceIcon = [Database, TerminalSquare, Braces][index];

        return (
          <div key={top}>
            <div
              className="absolute left-[12%] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl border border-white/10 bg-[#1d1930] text-white/65"
              style={{ top: `${top}%` }}
            >
              <SourceIcon className="h-4 w-4" />
            </div>
            <div
              className="absolute left-[calc(12%+40px)] right-[30%] h-px -translate-y-1/2 bg-gradient-to-r from-white/20 via-[#8d72ff]/75 to-[#8d72ff]/20"
              style={{ top: `${top}%` }}
            />
          </div>
        );
      })}
      <div className="absolute right-[18%] top-1/2 grid h-20 w-20 -translate-y-1/2 place-items-center rounded-[24px] border border-[#8d72ff]/45 bg-[#191529] text-[#9d89ff] shadow-[0_0_42px_rgba(109,73,253,.24)]">
        <ShieldCheck className="h-9 w-9" strokeWidth={1.6} />
      </div>
      <div className="absolute right-[5%] top-1/2 h-px w-[13%] -translate-y-1/2 bg-gradient-to-r from-[#8d72ff]/50 to-transparent" />
      <ArrowUpRight className="absolute right-[6%] top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
    </div>
  );
}

function InjectionGraphic() {
  return (
    <div className="relative h-full overflow-hidden rounded-[18px] border border-white/10 bg-[#191625]" aria-hidden="true">
      <div className="absolute inset-x-5 top-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-[#6d49fd]" />
        <span className="ml-auto h-2 w-16 rounded-full bg-white/10" />
      </div>
      <div className="absolute inset-x-5 top-12 space-y-3">
        <div className="h-2 w-[72%] rounded-full bg-white/10" />
        <div className="flex h-10 items-center gap-3 rounded-xl border border-[#8f76ff]/35 bg-[#6d49fd]/12 px-3 text-[#a58fff]">
          <TriangleAlert className="h-4 w-4 shrink-0" />
          <span className="h-1.5 w-[68%] rounded-full bg-[#8f76ff]/55" />
          <ScanLine className="ml-auto h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function GovernanceGraphic() {
  return (
    <div className="relative h-full overflow-hidden rounded-[18px] border border-white/10 bg-[#191625]" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8f76ff]/20" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#8f76ff]/30" />
      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[18px] bg-[#6d49fd] text-white shadow-[0_14px_30px_rgba(109,73,253,.3)]">
        <ShieldCheck className="h-7 w-7" />
      </div>
      {[
        "left-[14%] top-[22%]",
        "right-[14%] top-[22%]",
        "bottom-[16%] left-[18%]",
        "bottom-[16%] right-[18%]",
      ].map((position, index) => {
        const AgentIcon = [TerminalSquare, Globe2, Braces, Database][index];

        return (
          <div
            key={position}
            className={`absolute grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[#a58fff] ${position}`}
          >
            <AgentIcon className="h-3.5 w-3.5" />
          </div>
        );
      })}
    </div>
  );
}

function AuditGraphic() {
  return (
    <div className="relative h-full min-h-[150px] overflow-hidden rounded-[20px] border border-white/10 bg-[#191625]" aria-hidden="true">
      <div className="absolute left-[12%] right-[12%] top-1/2 h-px -translate-y-1/2 bg-white/15" />
      {[16, 39, 62, 85].map((left, index) => (
        <div key={left} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%` }}>
          <div
            className={`grid place-items-center rounded-full border-4 border-[#191625] shadow-[0_0_0_1px_rgba(143,118,255,.35)] ${
              index === 3 ? "h-12 w-12 bg-[#6d49fd] text-white" : "h-9 w-9 bg-[#242033] text-[#a58fff]"
            }`}
          >
            {index === 3 ? <FileClock className="h-5 w-5" /> : <span className="h-2 w-2 rounded-full bg-current" />}
          </div>
          <div
            className={`absolute left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-[#b8a9eb] to-transparent ${
              index % 2 === 0 ? "bottom-full" : "top-full rotate-180"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

function RiskGraphic({ index }: { index: number }) {
  if (index === 0) return <EgressGraphic />;
  if (index === 1) return <InjectionGraphic />;
  if (index === 2) return <GovernanceGraphic />;
  return <AuditGraphic />;
}

export default function SecurityLeadersSection() {
  return (
    <section className="relative scroll-mt-0 overflow-hidden bg-[#11101b] px-5 py-24 text-white sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(109,73,253,.16),transparent_40%)]" />

      <div className="relative mx-auto max-w-[1180px]">
        <Reveal className="max-w-[850px]">
          <SectionLabel>FOR SECURITY LEADERS</SectionLabel>
          <h2 className="mt-5 max-w-[780px] text-balance text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Every surface. Every agent.<br />
            <span className="text-[#a58fff]">Every action — governed.</span>
          </h2>
          <p className="mt-6 max-w-[700px] text-[15px] leading-7 text-white/60 sm:text-base sm:leading-7">
            Sanctioned or not, agents are reading your code and touching your data today.
            <br className="hidden sm:inline" />
            These are the risks running unmanaged right now — and what closing them looks like.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {risks.map((risk, index) => {
            const isWide = index === 0 || index === 3;

            return (
              <Reveal key={risk.title} delay={index * 0.07} className={cardLayouts[index]}>
                <article
                  className="group relative h-full min-h-[310px] overflow-hidden rounded-[24px] border border-white/10 bg-[#141220] p-5 shadow-[0_20px_50px_rgba(0,0,0,.18)] transition-[border-color,background-color] duration-300 hover:border-[#8f76ff]/35 hover:bg-[#161323]"
                >
                  <div className={`grid h-full gap-4 ${isWide ? "md:grid-cols-[minmax(0,1.08fr)_minmax(210px,.72fr)] md:items-stretch" : "grid-rows-[140px_1fr]"}`}>
                    <div className={isWide ? "order-2" : "px-2 pt-2"}>
                      <RiskGraphic index={index} />
                    </div>

                    <div className={`flex flex-col ${isWide ? "order-1 justify-end md:py-1" : "justify-end px-1 pb-1"}`}>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9d89ff]">
                        {risk.label}
                      </h3>
                      <h4 className="mt-3 text-balance text-xl font-bold leading-snug text-white sm:text-[21px]">
                        {risk.title}
                      </h4>
                      <p className="mt-3 text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-[26px]">
                        {risk.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
