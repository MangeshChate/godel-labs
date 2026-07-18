"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { forwardRef, useRef } from "react";
import { Cloud, Monitor, Package, Terminal, Waypoints } from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";

type IconNodeProps = {
  children: ReactNode;
  className?: string;
};

const IconNode = forwardRef<HTMLDivElement, IconNodeProps>(({ children, className = "" }, ref) => (
  <div
    ref={ref}
    className={`relative z-10 grid size-10 place-items-center rounded-full bg-white [&_svg]:size-[18px] ${className}`}
  >
    {children}
  </div>
));

IconNode.displayName = "IconNode";

export default function DataAuthorityFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<HTMLDivElement>(null);

  const claudeRef = useRef<HTMLDivElement>(null);
  const codexRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cliRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const gitRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const mcpRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const slackRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative mx-auto flex h-[304px] w-full max-w-[580px] items-center overflow-visible px-2 sm:px-5">
      <div className="relative z-10 flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <IconNode ref={claudeRef}>
            <Image src="/logos/claude.svg" alt="Claude Code" width={20} height={20} />
          </IconNode>
          <IconNode ref={codexRef}>
            <Image src="/logos/openai.svg" alt="OpenAI Codex" width={20} height={20} />
          </IconNode>
          <IconNode ref={cursorRef}>
            <Image src="/logos/cursor.svg" alt="Cursor" width={20} height={20} />
          </IconNode>
          <IconNode ref={cliRef} className="text-[#25222c]">
            <Terminal />
          </IconNode>
          <IconNode ref={browserRef}>
            <Image src="/logos/browser-agnets.svg" alt="Browser agents" width={20} height={20} />
          </IconNode>
          <IconNode ref={desktopRef} className="text-[#3578f6]">
            <Monitor />
          </IconNode>
        </div>

        <div
          ref={runtimeRef}
          className="relative z-20 grid size-24 place-items-center rounded-full bg-white sm:size-28"
        >
          <div className="flex flex-col items-center">
            <Image
              src="/godel-labs-logo/logo/godel-logo-light.png"
              alt="Gödel"
              width={112}
              height={34}
              className="h-auto w-[66px] sm:w-[76px]"
            />
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#6d49fd] sm:text-[10px]">
              Runtime
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <IconNode ref={gitRef}>
            <Image src="/logos/github.svg" alt="Git repositories" width={20} height={20} />
          </IconNode>
          <IconNode ref={shellRef} className="text-[#25222c]">
            <Terminal />
          </IconNode>
          <IconNode ref={mcpRef} className="text-[#6d49fd]">
            <Waypoints />
          </IconNode>
          <IconNode ref={cloudRef} className="text-[#3478ef]">
            <Cloud />
          </IconNode>
          <IconNode ref={slackRef}>
            <Image src="/logos/slack-logo.svg" alt="Slack and email" width={20} height={20} />
          </IconNode>
          <IconNode ref={packageRef} className="text-[#16a367]">
            <Package />
          </IconNode>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={claudeRef} toRef={runtimeRef} duration={3.2} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={codexRef} toRef={runtimeRef} duration={3.4} delay={0.12} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={cursorRef} toRef={runtimeRef} duration={3.6} delay={0.24} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={cliRef} toRef={runtimeRef} duration={3.8} delay={0.36} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={browserRef} toRef={runtimeRef} duration={4} delay={0.48} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={desktopRef} toRef={runtimeRef} duration={4.2} delay={0.6} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />

      <AnimatedBeam containerRef={containerRef} fromRef={gitRef} toRef={runtimeRef} duration={3.3} delay={0.1} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={shellRef} toRef={runtimeRef} duration={3.5} delay={0.22} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={mcpRef} toRef={runtimeRef} duration={3.7} delay={0.34} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={cloudRef} toRef={runtimeRef} duration={3.9} delay={0.46} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={slackRef} toRef={runtimeRef} duration={4.1} delay={0.58} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={packageRef} toRef={runtimeRef} duration={4.3} delay={0.7} pathWidth={1.5} pathColor="#ddd8e7" pathOpacity={0.8} />
    </div>
  );
}
