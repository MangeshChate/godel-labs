import Footer from "@/components/footer/footer";
import FinalCtaSection from "@/components/landing/final-cta-section";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import Navbar from "@/components/navbar/navbar";

const manifesto = [
  {
    title: "Protect information while AI is using it.",
    description:
      "The critical moment is no longer only where data rests or travels. It is when an agent is reasoning over information and turning it into an action.",
  },
  {
    title: "Content is data. It is not authority.",
    description:
      "A document, tool response, or webpage may inform an agent. It should never acquire the right to direct privileged behavior simply because a model read it.",
  },
  {
    title: "Policy belongs in the execution path.",
    description:
      "Reports after the fact are not control. Security must understand the content, destination, operation, and threat context before the interaction proceeds.",
  },
  {
    title: "Enterprise control should accelerate builders.",
    description:
      "The right security layer makes ambitious AI programs possible. It gives teams a reliable boundary for moving quickly without surrendering institutional trust.",
  },
  {
    title: "Trust should be inspectable.",
    description:
      "Open systems create better primitives, sharper scrutiny, and stronger communities. The infrastructure beneath agentic software should be open to examination.",
  },
  {
    title: "The future needs new primitives, not renamed categories.",
    description:
      "Agentic systems collapse reading, reasoning, tools, and action into one loop. Securing that loop requires architecture designed for it from first principles.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      <section className="relative px-5 pb-24 pt-36 sm:px-6 sm:pb-28 sm:pt-44">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <SectionLabel>Gödel Labs / About</SectionLabel>
            <h1 className="max-w-[1040px] text-balance text-[42px] font-semibold leading-[1.01] tracking-[-0.05em] sm:text-6xl lg:text-[68px]">
              We have built the hard layers before. <span className="text-[#6d49fd]">Now we are building the one AI will need.</span>
            </h1>
            <p className="mt-12 max-w-2xl border-t border-[#dcd6e6] pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#3b3544] sm:text-sm">
              Founders who have built from the kernel to the category.
            </p>
          </Reveal>
        </div>

        {/* Solid Zigzag Cut-out Bottom Teeth (Matching Section 1 BG Color #f7f5ff, No Border) */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-3 w-full overflow-hidden pointer-events-none translate-y-[99%]">
          <svg
            className="block h-full w-full text-[#f7f5ff]"
            viewBox="0 0 1200 12"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 L10,12 L20,0 L30,12 L40,0 L50,12 L60,0 L70,12 L80,0 L90,12 L100,0 L110,12 L120,0 L130,12 L140,0 L150,12 L160,0 L170,12 L180,0 L190,12 L200,0 L210,12 L220,0 L230,12 L240,0 L250,12 L260,0 L270,12 L280,0 L290,12 L300,0 L310,12 L320,0 L330,12 L340,0 L350,12 L360,0 L370,12 L380,0 L390,12 L400,0 L410,12 L420,0 L430,12 L440,0 L450,12 L460,0 L470,12 L480,0 L490,12 L500,0 L510,12 L520,0 L530,12 L540,0 L550,12 L560,0 L570,12 L580,0 L590,12 L600,0 L610,12 L620,0 L630,12 L640,0 L650,12 L660,0 L670,12 L680,0 L690,12 L700,0 L710,12 L720,0 L730,12 L740,0 L750,12 L760,0 L770,12 L780,0 L790,12 L800,0 L810,12 L820,0 L830,12 L840,0 L850,12 L860,0 L870,12 L880,0 L890,12 L900,0 L910,12 L920,0 L930,12 L940,0 L950,12 L960,0 L970,12 L980,0 L990,12 L1000,0 L1010,12 L1020,0 L1030,12 L1040,0 L1050,12 L1060,0 L1070,12 L1080,0 L1090,12 L1100,0 L1110,12 L1120,0 L1130,12 L1140,0 L1150,12 L1160,0 L1170,12 L1180,0 L1190,12 L1200,0 V0 H0 Z" />
          </svg>
        </div>
      </section>

      <section className="relative bg-[#f4f3f8] px-5 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Collective experience</SectionLabel>
              <h2 className="max-w-lg text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl">
                Built in the places where security categories get made.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-[700px] text-[15px] leading-7 text-[#6d6676] sm:text-base">
                We have founded companies, shipped category-defining products, worked inside global security leaders, and partnered with Fortune 500 teams. That history gives us a long memory for what survives contact with the enterprise across Deepfence, Palo Alto Networks, and FireEye.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Solid Zigzag Cut-out Bottom Teeth (Matching Section BG Color #f4f3f8, No Border) */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-3 w-full overflow-hidden pointer-events-none translate-y-[99%]">
          <svg
            className="block h-full w-full text-[#f4f3f8]"
            viewBox="0 0 1200 12"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 L10,12 L20,0 L30,12 L40,0 L50,12 L60,0 L70,12 L80,0 L90,12 L100,0 L110,12 L120,0 L130,12 L140,0 L150,12 L160,0 L170,12 L180,0 L190,12 L200,0 L210,12 L220,0 L230,12 L240,0 L250,12 L260,0 L270,12 L280,0 L290,12 L300,0 L310,12 L320,0 L330,12 L340,0 L350,12 L360,0 L370,12 L380,0 L390,12 L400,0 L410,12 L420,0 L430,12 L440,0 L450,12 L460,0 L470,12 L480,0 L490,12 L500,0 L510,12 L520,0 L530,12 L540,0 L550,12 L560,0 L570,12 L580,0 L590,12 L600,0 L610,12 L620,0 L630,12 L640,0 L650,12 L660,0 L670,12 L680,0 L690,12 L700,0 L710,12 L720,0 L730,12 L740,0 L750,12 L760,0 L770,12 L780,0 L790,12 L800,0 L810,12 L820,0 L830,12 L840,0 L850,12 L860,0 L870,12 L880,0 L890,12 L900,0 L910,12 L920,0 L930,12 L940,0 L950,12 L960,0 L970,12 L980,0 L990,12 L1000,0 L1010,12 L1020,0 L1030,12 L1040,0 L1050,12 L1060,0 L1070,12 L1080,0 L1090,12 L1100,0 L1110,12 L1120,0 L1130,12 L1140,0 L1150,12 L1160,0 L1170,12 L1180,0 L1190,12 L1200,0 V0 H0 Z" />
          </svg>
        </div>
      </section>

      <section id="manifesto" className="scroll-mt-24 border-t border-[#dcd6e6] bg-white px-5 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="grid gap-8 border-b border-[#ddd7e7] pb-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <SectionLabel>Our manifesto</SectionLabel>
              <h2 className="max-w-lg text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl">
                Software is becoming agency. Security must move with it.
              </h2>
            </div>
            <p className="max-w-[700px] text-[15px] leading-7 text-[#6d6676] sm:text-base">
              Agents collapse reading, reasoning, tools, and action into a single execution path. That is not a feature update. It is a new computing boundary, and it demands security designed from first principles.
            </p>
          </Reveal>

          <div>
            {manifesto.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 0.03}>
                <article className="grid gap-4 border-b border-[#ddd7e7] py-8 sm:grid-cols-[64px_.9fr_1.1fr] sm:gap-8 sm:py-10">
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-[#6d49fd]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold leading-7 text-[#211d2c] sm:text-xl">{item.title}</h3>
                  <p className="max-w-xl text-sm leading-7 text-[#746e7c] sm:text-[15px]">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection
        heading="We are not watching the future arrive. We are building the part it is missing."
        description="Join us in building the security foundation the agentic era will assume exists."
        buttonLabel="Build with us"
      />

      <Footer />
    </main>
  );
}
