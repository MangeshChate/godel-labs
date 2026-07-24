import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";

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

export default function SecurityLeadersSection() {
  return (
    <section className="scroll-mt-0 border-t border-[#e5dff0] bg-[#f8f9fc] px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-[860px] text-center">
          <div className="flex justify-center">
            <SectionLabel>FOR SECURITY LEADERS</SectionLabel>
          </div>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-[#111322] sm:text-5xl lg:text-[54px] leading-[1.08]">
            Every surface. Every agent.<br />
            <span className="text-[#6d49fd]">Every action — governed.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[700px] text-[15px] leading-7 text-[#625d6e] sm:text-base sm:leading-7">
            Sanctioned or not, agents are reading your code and touching your data today.
            <br className="hidden sm:inline" />
            These are the risks running unmanaged right now — and what closing them looks like.
          </p>
        </Reveal>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {risks.map((risk, index) => (
            <Reveal
              key={risk.title}
              delay={index * 0.1}
              className="flex flex-col rounded-[20px] bg-white p-7 shadow-[0_12px_40px_rgba(58,35,123,0.03)] border border-[#e2daee] transition-all duration-300 hover:shadow-[0_18px_50px_rgba(58,35,123,0.08)] hover:border-[#6d49fd]/30 sm:p-8"
            >
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d49fd]">
                {risk.label}
              </h3>
              <h4 className="mb-4 text-balance text-lg font-bold leading-snug text-[#111322] sm:text-xl">
                {risk.title}
              </h4>
              <p className="text-[14px] leading-[26px] text-[#625d6e] sm:text-[15px] sm:leading-7">
                {risk.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
