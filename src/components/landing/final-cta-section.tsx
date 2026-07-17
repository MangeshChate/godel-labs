import Reveal from "@/components/landing/reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FinalCtaSection() {
  return (
    <section className="px-4 pb-10 sm:px-6 sm:pb-14">
      <Reveal className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] border border-white/20 bg-[#6d49fd] bg-[linear-gradient(180deg,#8d72ff_0%,#6d49fd_46%,#5935df_100%)] px-6 py-16 text-center text-white shadow-[0_40px_100px_rgba(109,73,253,0.24)] sm:px-10 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Deploy in five minutes</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-4xl lg:text-5xl">Put a provable boundary in front of every agent.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/65">Your agents keep shipping. The unsafe actions don&apos;t.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/demo" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#211743] transition hover:-translate-y-0.5 hover:bg-[#111322] hover:text-white">
              Request a demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
