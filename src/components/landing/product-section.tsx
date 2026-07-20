import AgentNetworkFlow from "@/components/landing/agent-network-flow";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";

export default function ProductSection() {
  return (
    <section id="product" className="relative scroll-mt-0 overflow-hidden bg-[#11101b] px-5 py-28 text-white sm:px-8 sm:py-36 lg:px-10 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(109,73,253,.2),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,#000,transparent_78%)]" />
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <div className="flex justify-center"><SectionLabel>One view of the AI data path</SectionLabel></div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-normal text-white sm:text-4xl lg:text-5xl">
            Know what every agent touched.<br />
            <span className="text-[#a58fff]">See what happened next.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-[15px] leading-7 text-white/60">
            Map every user, device, agent, content classification, source and decision in one chain. Drill from fleet activity into the exact session, signal, tool call and verdict.
          </p>
        </Reveal>
        <Reveal className="mx-auto w-full max-w-[1160px]"><AgentNetworkFlow /></Reveal>
      </div>
    </section>
  );
}
