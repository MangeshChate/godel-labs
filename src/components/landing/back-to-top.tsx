"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function BackToTop() {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      frameRef.current = null;

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      setIsVisible(window.scrollY > window.innerHeight * 1.75);
    };

    const handleScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const progressOffset = RING_CIRCUMFERENCE * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={scrollToTop}
          className="group fixed bottom-4 right-4 z-[80] grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/60 bg-white/65 text-[#171320] shadow-[0_12px_36px_rgba(31,20,70,.2)] backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[0_16px_42px_rgba(31,20,70,.26)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6d49fd] sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
          aria-label="Back to top"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(109,73,253,.14)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r={RING_RADIUS}
              fill="none"
              stroke="#6d49fd"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={progressOffset}
              className="transition-[stroke-dashoffset] duration-100"
            />
          </svg>
          <ArrowUp className="relative h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2.2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
