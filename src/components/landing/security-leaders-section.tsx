import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import {
  ArrowUpRight,
  Ban,
  Braces,
  Database,
  FileClock,
  Fingerprint,
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

function GovernanceField() {
  return (
    <div
      className="relative min-h-[250px] overflow-hidden rounded-[28px] border border-white/10 bg-[#12101e] shadow-[0_28px_80px_rgba(40,25,92,.22)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(109,73,253,.3),transparent_28%),radial-gradient(circle_at_center,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:auto,18px_18px]" />
      <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8c72ff]/60 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#8c72ff]/60 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9c87ff]/25" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#9c87ff]/30" />

      <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[25px] border border-white/20 bg-white text-[#171320] shadow-[0_0_50px_rgba(109,73,253,.45)]">
        <Fingerprint className="h-9 w-9" strokeWidth={1.7} />
      </div>

      <div className="absolute left-[12%] top-[24%] grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/7 text-white/75 backdrop-blur">
        <Database className="h-4.5 w-4.5" />
      </div>
      <div className="absolute right-[12%] top-[24%] grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/7 text-white/75 backdrop-blur">
        <Globe2 className="h-4.5 w-4.5" />
      </div>
      <div className="absolute bottom-[18%] left-[18%] grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/7 text-white/75 backdrop-blur">
        <TerminalSquare className="h-4.5 w-4.5" />
      </div>
      <div className="absolute bottom-[18%] right-[18%] grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/7 text-white/75 backdrop-blur">
        <Braces className="h-4.5 w-4.5" />
      </div>
    </div>
  );
}

function EgressGraphic() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,73,253,.24)_1px,transparent_1px)] [background-size:17px_17px]" />
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
    <div className="relative h-[185px] overflow-hidden rounded-[22px] border border-[#dfd8ec] bg-[#f7f5fb]" aria-hidden="true">
      <div className="absolute inset-x-5 top-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#d9d3e4]" />
        <span className="h-2 w-2 rounded-full bg-[#d9d3e4]" />
        <span className="h-2 w-2 rounded-full bg-[#6d49fd]" />
        <span className="ml-auto h-2 w-16 rounded-full bg-[#e4dfeb]" />
      </div>
      <div className="absolute inset-x-5 top-12 space-y-3">
        <div className="h-2 w-[72%] rounded-full bg-[#e1dce9]" />
        <div className="h-2 w-[88%] rounded-full bg-[#e1dce9]" />
        <div className="flex h-10 items-center gap-3 rounded-xl border border-[#6d49fd]/25 bg-[#eee9ff] px-3 text-[#6d49fd]">
          <TriangleAlert className="h-4 w-4 shrink-0" />
          <span className="h-1.5 w-[68%] rounded-full bg-[#8f76ff]/55" />
          <ScanLine className="ml-auto h-4 w-4" />
        </div>
        <div className="h-2 w-[58%] rounded-full bg-[#e1dce9]" />
      </div>
      <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-1/3 translate-y-1/3 rounded-full border-[18px] border-[#6d49fd]/8" />
    </div>
  );
}

function GovernanceGraphic() {
  return (
    <div className="relative h-[185px] overflow-hidden rounded-[22px] border border-[#dcd2ff] bg-[#eee9ff]" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6d49fd]/15" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#6d49fd]/25" />
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
            className={`absolute grid h-9 w-9 place-items-center rounded-xl border border-white bg-white/80 text-[#6d49fd] shadow-sm ${position}`}
          >
            <AgentIcon className="h-3.5 w-3.5" />
          </div>
        );
      })}
      <Ban className="absolute right-4 top-4 h-4 w-4 text-[#6d49fd]/45" />
    </div>
  );
}

function AuditGraphic() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-[24px] border border-[#e1dbea] bg-[#f8f7fb]" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(109,73,253,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(109,73,253,.045)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute left-[12%] right-[12%] top-1/2 h-px -translate-y-1/2 bg-[#d7cfea]" />
      {[16, 39, 62, 85].map((left, index) => (
        <div key={left} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%` }}>
          <div
            className={`grid place-items-center rounded-full border-4 border-[#f8f7fb] shadow-[0_0_0_1px_rgba(109,73,253,.18)] ${
              index === 3 ? "h-12 w-12 bg-[#6d49fd] text-white" : "h-9 w-9 bg-white text-[#6d49fd]"
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
    <section className="relative scroll-mt-0 overflow-hidden border-t border-[#e5dff0] bg-[#f6f5f9] px-5 py-24 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(109,73,253,.08),transparent_26%),radial-gradient(circle_at_88%_42%,rgba(109,73,253,.06),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(109,73,253,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(109,73,253,.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_68%)]" />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <SectionLabel>FOR SECURITY LEADERS</SectionLabel>
            <h2 className="mt-5 max-w-[760px] text-balance text-4xl font-bold leading-[1.06] tracking-tight text-[#111322] sm:text-5xl lg:text-[58px]">
              Every surface. Every agent.<br />
              <span className="text-[#6d49fd]">Every action — governed.</span>
            </h2>
            <p className="mt-6 max-w-[680px] text-[15px] leading-7 text-[#625d6e] sm:text-base sm:leading-7">
              Sanctioned or not, agents are reading your code and touching your data today.
              <br className="hidden sm:inline" />
              These are the risks running unmanaged right now — and what closing them looks like.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.08}>
            <GovernanceField />
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {risks.map((risk, index) => {
            const isDark = index === 0;
            const isWide = index === 0 || index === 3;

            return (
              <Reveal key={risk.title} delay={index * 0.07} className={cardLayouts[index]}>
                <article
                  className={`group relative h-full min-h-[410px] overflow-hidden rounded-[28px] border p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 sm:p-6 ${
                    isDark
                      ? "border-[#28223c] bg-[#13111e] shadow-[0_24px_70px_rgba(31,21,67,.18)] hover:border-[#6d49fd]/50 hover:shadow-[0_30px_80px_rgba(31,21,67,.25)]"
                      : "border-[#e1dbea] bg-white shadow-[0_16px_50px_rgba(43,31,82,.055)] hover:border-[#6d49fd]/35 hover:shadow-[0_24px_64px_rgba(43,31,82,.1)]"
                  }`}
                >
                  <div className={`grid h-full gap-6 ${isWide ? "md:grid-cols-[minmax(0,1fr)_minmax(230px,.88fr)] md:items-stretch" : "grid-rows-[185px_1fr]"}`}>
                    <div className={isWide ? "order-2 md:order-1" : ""}>
                      <RiskGraphic index={index} />
                    </div>

                    <div className={`flex flex-col ${isWide ? "order-1 justify-end md:order-2 md:py-2" : "justify-end px-1 pb-1"}`}>
                      <h3 className={`text-[10px] font-bold uppercase tracking-[0.16em] ${isDark ? "text-[#9d89ff]" : "text-[#6d49fd]"}`}>
                        {risk.label}
                      </h3>
                      <h4 className={`mt-4 text-balance text-xl font-bold leading-snug sm:text-[22px] ${isDark ? "text-white" : "text-[#111322]"}`}>
                        {risk.title}
                      </h4>
                      <p className={`mt-4 text-[14px] leading-[26px] sm:text-[15px] sm:leading-7 ${isDark ? "text-white/60" : "text-[#625d6e]"}`}>
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
