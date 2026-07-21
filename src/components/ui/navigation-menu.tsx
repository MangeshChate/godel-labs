"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  BookOpen,
  Building2,
  Mail,
  Code,
  Newspaper,
  ExternalLink,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Shared Mega Panel Container for Seamless Transitions ──────────────────────
export function NavMegaPanel({
  isOpen,
  activeKey,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: {
  isOpen: boolean;
  activeKey: "resources" | "company" | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && activeKey && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.985 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-full z-50 pt-3.5 -translate-x-1/2"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Subtle top indicator triangle */}
          <div className="absolute top-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-[#e2daee] bg-white" />

          {/* Wide & Minimalist Panel Card (840px wide) */}
          <div className="relative w-[840px] overflow-hidden rounded-[24px] border border-[#e2daee]/90 bg-white p-6 shadow-[0_24px_60px_rgba(24,14,50,.11)] backdrop-blur-2xl">
            <AnimatePresence mode="wait">
              {activeKey === "company" ? (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  <CompanyMegaContent onClose={onClose} />
                </motion.div>
              ) : (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                >
                  <ResourcesMegaContent onClose={onClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Company Dropdown Content (Minimalist & Wide) ─────────────────────────────
export function CompanyMegaContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-7">
      {/* Left Featured Banner */}
      <div className="flex w-[320px] shrink-0 flex-col justify-between rounded-[18px] border border-[#eee9f8] bg-[#f9f8fe] p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
            COMPANY
          </span>
          <h4 className="mt-2 text-base font-semibold leading-6 tracking-tight text-[#1c1825]">
            An AI-native team building the control layer for an AI-native world.
          </h4>
        </div>

        <div className="mt-6 rounded-[14px] border border-[#e5dffa] bg-white p-4 shadow-sm transition hover:border-[#6d49fd]/40">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0b8c66]">
            TALK WITH US
          </span>
          <h5 className="mt-1 text-sm font-semibold text-[#1c1825]">
            Build With Gödel
          </h5>
          <p className="mt-1 text-xs leading-5 text-[#6e6878]">
            Partner with our security team to protect ambitious AI programs.
          </p>
          <Link
            href="/demo"
            onClick={onClose}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd] hover:underline"
          >
            Request a demo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Right 2-Column Grid */}
      <div className="grid flex-1 grid-cols-2 gap-6 py-1">
        {/* Column 1: Company */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
            COMPANY
          </span>
          <div className="mt-3.5 flex flex-col gap-2">
            <Link
              href="/about-us"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Building2 className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  About Us
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Mission & team</p>
              </div>
            </Link>

            <Link
              href="/demo"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  Contact
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Talk to our team</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Column 2: Community & Principles */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
            COMMUNITY & CAREERS
          </span>
          <div className="mt-3.5 flex flex-col gap-2">
            <Link
              href="/about-us#manifesto"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  Our Manifesto
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Core principles</p>
              </div>
            </Link>

            <Link
              href="https://github.com/godellabs-ai"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Code className="h-4 w-4" />
              </span>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  Open Source <ExternalLink className="h-3 w-3 text-[#a098ae]" />
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Inspectable primitives</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Resources Dropdown Content (Minimalist & Wide) ───────────────────────────
export function ResourcesMegaContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-7">
      {/* Left Featured Banner */}
      <div className="flex w-[320px] shrink-0 flex-col justify-between rounded-[18px] border border-[#eee9f8] bg-[#f9f8fe] p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
            LATEST RESEARCH
          </span>
          <h4 className="mt-2 text-base font-semibold leading-6 tracking-tight text-[#1c1825]">
            Detecting PII Leaks in LLM Pipeline Streams
          </h4>
          <p className="mt-2 text-xs leading-5 text-[#6e6878]">
            How runtime context inspection prevents sensitive data exposure in real-time LLM outputs.
          </p>
        </div>

        <Link
          href="/blog/detecting-pii-leaks-in-llm-pipeline-streams"
          onClick={onClose}
          className="mt-4 flex items-center justify-between rounded-[14px] border border-[#e5dffa] bg-white p-3.5 shadow-sm transition hover:border-[#6d49fd]/40"
        >
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
              READ ARTICLE
            </span>
            <p className="text-xs font-semibold text-[#211c2a]">
              Full research paper & benchmark
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#6d49fd]" />
        </Link>
      </div>

      {/* Right 2-Column Grid */}
      <div className="grid flex-1 grid-cols-2 gap-6 py-1">
        {/* Column 1: Resources */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
            RESOURCES
          </span>
          <div className="mt-3.5 flex flex-col gap-2">
            <Link
              href="/blog"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  Blog
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Research & updates</p>
              </div>
            </Link>

            <Link
              href="/blog"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Newspaper className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  News
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Latest announcements</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Column 2: Documentation */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
            DOCUMENTATION
          </span>
          <div className="mt-3.5 flex flex-col gap-2">
            <Link
              href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  Docs <ExternalLink className="h-3 w-3 text-[#a098ae]" />
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Installation & guides</p>
              </div>
            </Link>

            <Link
              href="https://github.com/godellabs-ai"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Code className="h-4 w-4" />
              </span>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  GitHub <ExternalLink className="h-3 w-3 text-[#a098ae]" />
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Repositories & code</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
