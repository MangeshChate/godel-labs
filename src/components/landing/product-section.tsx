import AgentNetworkFlow from "@/components/landing/agent-network-flow";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";

export default function ProductSection() {
  return (
    <section id="product" className="relative scroll-mt-24 overflow-hidden bg-[#11101b] px-5 py-28 text-white sm:px-8 sm:py-36 lg:px-10 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(109,73,253,.2),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,#000,transparent_78%)]" />
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <div className="flex justify-center"><SectionLabel>Inside the product</SectionLabel></div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">See every agent.<br /><span className="text-[#a58fff]">Control every outcome.</span></h2>
          <p className="mx-auto mt-6 max-w-[610px] text-[15px] leading-7 text-white/60">Follow each action from identity to agent, through the exact data or tool it touches, and into a deterministic runtime decision.</p>
        </Reveal>
        <Reveal className="mx-auto w-full max-w-[1160px]"><AgentNetworkFlow /></Reveal>
      </div>
    </section>
  );
}
