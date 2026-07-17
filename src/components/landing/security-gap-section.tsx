import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { Check, X } from "lucide-react";

const comparisonRows = [
  ["EDR / antivirus", "Looks for malicious binaries", "Agents use normal commands"],
  ["Traditional DLP", "Watches email and uploads", "Data exits through MCP"],
  ["Prompt filters", "Classifies prompt text", "The harm is the action"],
  ["Gödel's Gate", "Inspects every agent action", "Decides before execution"],
] as const;

function GodelsGateLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 638 133"
      className={className}
      role="img"
      aria-label="Gödel's Gate"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="4" y="101" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="550" fontSize="108" fill="#ffffff">g</text>
      <text x="69.99" y="101" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="550" fontSize="108" fill="#ffffff">o</text>
      <text x="135.98" y="101" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="550" fontSize="108" fill="#ffffff">del</text>
      <text x="291.82" y="101" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="550" fontSize="108" fill="#a860ff">’s gate</text>
      <circle cx="87.77" cy="15.01" r="8.84" fill="#a860ff"></circle>
      <circle cx="118.19" cy="15.01" r="8.84" fill="#a860ff"></circle>
    </svg>
  );
}

export default function SecurityGapSection() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-[#11101b] px-5 py-24 text-white sm:px-6 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(109,73,253,.2),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,#000,transparent_78%)]" />

      <div className="relative mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <div className="flex justify-center"><SectionLabel>The gap</SectionLabel></div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">Your security stack can&apos;t see agents.</h2>
          <p className="mx-auto mt-6 max-w-[610px] text-[15px] leading-7 text-white/60">The gap is architectural. You don&apos;t need a smarter text filter — you need an authority inside the execution path.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-[940px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <div className="hidden grid-cols-[1fr_1.15fr_1.15fr] gap-4 border-b border-white/5 bg-white/[0.04] p-5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/40 sm:grid">
            <span className="pl-3">Security Layer</span><span>Detection Method</span><span>Agent Coverage</span>
          </div>
          {comparisonRows.map((row, index) => {
            const isGate = index === comparisonRows.length - 1;
            return (
              <div key={row[0]} className={`grid gap-2 border-b border-white/5 p-5 transition duration-200 last:border-0 sm:grid-cols-[1fr_1.15fr_1.15fr] sm:items-center sm:p-6 ${isGate ? "border-y border-[#6d49fd]/30 bg-[#ede8ff]/10" : "hover:bg-white/[0.02]"}`}>
                <span className={`min-w-0 text-sm font-semibold text-white ${isGate ? "" : "pl-3"}`}>
                  {isGate ? (
                    <span className="inline-flex h-7 min-w-[145px] items-center overflow-visible">
                      <GodelsGateLogo className="h-6 w-auto" />
                    </span>
                  ) : row[0]}
                </span>
                <span className={`text-xs ${isGate ? "font-medium text-white" : "text-white/70"}`}>{row[1]}</span>
                <span className={`flex text-xs font-semibold ${isGate ? "text-[#a58fff]" : "text-red-400"}`}>
                  <span className={`mr-2 grid h-5 w-5 place-items-center rounded-full ${isGate ? "bg-[#6d49fd]/20 text-[#a58fff]" : "bg-red-500/10 text-red-400"}`}>
                    {isGate ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  </span>
                  {row[2]}
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
