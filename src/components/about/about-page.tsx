import Footer from "@/components/footer/footer";
import FinalCtaSection from "@/components/landing/final-cta-section";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import Navbar from "@/components/navbar/navbar";

const operatingMuscles = [
  {
    title: "Systems depth",
    description:
      "Kernel infrastructure, exploit detection, cloud-native runtime security, distributed systems, and AI. We have built where abstractions end and consequences begin.",
  },
  {
    title: "Product judgment",
    description:
      "From first prototype to category-scale enterprise platforms, we know how to turn difficult technology into a product operators can trust and teams can adopt.",
  },
  {
    title: "Enterprise reality",
    description:
      "We have built with and for Fortune 500 security, infrastructure, and engineering teams where integration, reliability, governance, and proof all matter.",
  },
  {
    title: "Market building",
    description:
      "Open-source communities, developer-led adoption, bottom-up go-to-market, and enterprise expansion. We know new categories are earned from both directions.",
  },
] as const;

const experience = [
  "Deepfence",
  "Palo Alto Networks",
  "FireEye",
  "Juniper Networks",
  "Enterprise security",
  "Open source",
] as const;

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

      <section className="px-5 pb-24 pt-36 sm:px-6 sm:pb-28 sm:pt-44">
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
      </section>

      <section className="border-t border-[#dcd6e6] bg-white px-5 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <Reveal>
              <SectionLabel>One team</SectionLabel>
              <h2 className="max-w-md text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl">
                Four operating muscles. No handoffs between them.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="max-w-[700px] space-y-5 text-[15px] leading-7 text-[#6d6676] sm:text-base">
                <p>
                  Gödel Labs brings together deeply technical entrepreneurs, enterprise product builders, and market makers. Across decades, we have built low-level security systems, scaled products for demanding global enterprises, grown open-source communities, and created bottom-up go-to-market engines.
                </p>
                <p>
                  New infrastructure companies fail when technology, product, enterprise adoption, and market creation are treated as separate disciplines. Our founding team has operated across all four.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid border-t border-[#ddd7e7] md:grid-cols-2 lg:grid-cols-4">
            {operatingMuscles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="border-b border-[#ddd7e7] py-7 md:px-6 md:nth-[2n]:border-l lg:min-h-[260px] lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0">
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-[#a099aa]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-lg font-semibold text-[#211d2c]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#746e7c]">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dcd6e6] px-5 py-24 sm:px-6 sm:py-28">
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
                We have founded companies, shipped category-defining products, worked inside global security leaders, and partnered with Fortune 500 teams. That history gives us a long memory for what survives contact with the enterprise.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-12 grid grid-cols-2 gap-px border border-[#ddd7e7] bg-[#ddd7e7] md:grid-cols-3 lg:grid-cols-6">
            {experience.map((item, index) => (
              <article key={item} className="flex min-h-28 items-center gap-4 bg-[#f7f5ff] px-5 py-6 transition-colors hover:bg-white sm:px-6">
                <h3 className="min-w-0 flex-1 text-sm font-semibold leading-5 text-[#282330] sm:text-[15px]">{item}</h3>
                <span className="shrink-0 text-[9px] font-semibold tracking-[0.14em] text-[#a099aa]">{String(index + 1).padStart(2, "0")}</span>
              </article>
            ))}
          </Reveal>
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
