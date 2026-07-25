"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

interface ScrollRevealTitleProps {
  text: string;
}

const highlightedKeywords = [
  "runtime",
  "security",
  "every",
  "ai",
  "agent",
  "desktop",
  "browser",
  "terminal",
  "pipeline",
  "pipelines",
  "framework",
  "frameworks",
];

function isHighlighted(word: string) {
  const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
  return highlightedKeywords.includes(clean);
}

export default function ScrollRevealTitle({ text }: ScrollRevealTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the title element over a wider range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "start 50%"],
  });

  // Create a spring-based smooth animation progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 26,
    mass: 0.5,
  });

  // Split input text by newlines to render explicit lines
  const lines = text.split("\n");

  // Pre-calculate lines and sequential global index offsets for animation tracking
  let globalIndex = 0;
  const structuredLines = lines.map((line) => {
    const words = line.split(" ").filter((w) => w.length > 0);
    return words.map((word) => {
      const currentIdx = globalIndex;
      globalIndex++;
      return { word, index: currentIdx };
    });
  });

  const totalWords = globalIndex;

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl px-4 pb-4 pt-2 text-center">
      <h2 className="text-balance text-3xl font-semibold leading-normal tracking-tight sm:text-4xl md:text-[44px] md:leading-[1.25] flex flex-col items-center gap-y-3">
        {structuredLines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap justify-center gap-x-2 gap-y-1 w-full">
            {line.map(({ word, index: idx }) => (
              <AnimatedWord
                key={idx}
                word={word}
                index={idx}
                totalWords={totalWords}
                progress={smoothProgress}
                isHighlighted={isHighlighted(word)}
              />
            ))}
          </div>
        ))}
      </h2>
    </div>
  );
}

interface AnimatedWordProps {
  word: string;
  index: number;
  totalWords: number;
  progress: MotionValue<number>;
  isHighlighted: boolean;
}

function AnimatedWord({ word, index, totalWords, progress, isHighlighted }: AnimatedWordProps) {
  // Calculate reveal timeline for this specific word based on global sequence
  const start = index / totalWords;
  const end = (index + 1) / totalWords;

  // Animate opacity progressively
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  // Animate smooth y-axis translate
  const y = useTransform(progress, [start, end], [6, 0]);

  // Animate blur progressively
  const filter = useTransform(progress, [start, end], ["blur(8px)", "blur(0px)"]);

  const colorClass = isHighlighted ? "text-[#6d49fd]" : "text-[#111322]";

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className={`${colorClass} inline-block select-none font-semibold`}
    >
      {word}
    </motion.span>
  );
}
