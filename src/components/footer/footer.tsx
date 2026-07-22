"use client";

import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, DiscordIcon, SlackIcon, XIcon, type BrandIcon } from "@/components/icons/brand";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      ["Use cases", "/use-cases"],
      ["Product", "/#product"],
      ["Gödel's Sieve", "https://sieve.godel-labs.ai"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Documentation", "https://godels-gate.godel-labs.ai/docs"],
      ["Blog", "/blog"],
      ["GitHub", "https://github.com/godellabs-ai"],
      ["Slack", "https://join.slack.com/t/godellabscommunity/shared_invite/zt-3qhv7u46o-1A1hwp1xnGQQkL8DtLyjHw"],
      ["Community", "https://discord.gg/HGXeCxJ532"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about-us"],
      ["Contact", "/demo"],
      ["Request a demo", "/demo"],
      ["Privacy", "/privacy-policy"],
      ["Terms", "/terms-of-service"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0b16] px-4 pb-4 pt-16 text-white sm:px-6 sm:pb-6 sm:pt-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.25fr_1fr] lg:pb-20">
          <div>
            <Image src="/godel-logo-dark.svg" alt="Gödel Labs" width={2066} height={854} unoptimized className="h-8 w-auto" />
            <h2 className="mt-8 max-w-xl text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl">
              Runtime security for the agents already inside your business.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/45">Every agent accountable to an identity, every action checked against policy, every decision auditable — on every surface your agents touch.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                [GithubIcon, "https://github.com/godellabs-ai", "GitHub"],
                [XIcon, "https://x.com/godellabs", "X"],
                [LinkedinIcon, "https://www.linkedin.com/company/godel-labs/", "LinkedIn"],
                [SlackIcon, "https://join.slack.com/t/godellabscommunity/shared_invite/zt-3qhv7u46o-1A1hwp1xnGQQkL8DtLyjHw", "Slack"],
                [DiscordIcon, "https://discord.gg/HGXeCxJ532", "Discord"],
              ].map(([Icon, href, label]) => {
                const I = Icon as BrandIcon;
                return <Link key={String(label)} href={String(href)} target="_blank" rel="noreferrer" aria-label={String(label)} className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-white/55 transition hover:-translate-y-0.5 hover:border-[#8e75f8] hover:bg-[#6d49fd] hover:text-white"><I className="h-4 w-4" /></Link>;
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">{column.title}</h3>
                <ul className="mt-6 space-y-4">
                  {column.links.map(([label, href]) => {
                    const external = href.startsWith("http");
                    return <li key={label}><Link href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="group inline-flex items-center gap-1.5 text-sm text-white/58 transition hover:text-white">{label}{external && <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />}</Link></li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-[11px] text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gödel Labs, Inc. All rights reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-fit transition hover:text-white">Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
