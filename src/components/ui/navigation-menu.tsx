"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Sparkles, BookOpen, Building2, Users, Mail, Code, Newspaper, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavDropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: ReactNode;
}

export function NavDropdown({
  label,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  children,
}: NavDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[15px] font-medium transition-all duration-200 ${
          isOpen
            ? "bg-[#6d49fd]/10 text-[#6d49fd] font-semibold"
            : "text-black hover:text-[#6d49fd]"
        }`}
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#6d49fd]" : "text-[#7b7489]"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2"
          >
            {/* Top triangle pointer indicator */}
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[#e2daee] bg-white" />

            {/* Dropdown panel container */}
            <div className="relative w-[780px] overflow-hidden rounded-[24px] border border-[#e2daee] bg-white p-5 shadow-[0_20px_50px_rgba(38,24,78,.14)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Company Dropdown Mega Content ─────────────────────────────────────────────
export function CompanyMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-[1.1fr_1.4fr] gap-6">
      {/* Left Column: Featured Card */}
      <div className="flex flex-col justify-between rounded-[18px] border border-[#ece6f7] bg-[#f8f6fd] p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d49fd]">
            COMPANY
          </span>
          <h4 className="mt-2 text-base font-semibold leading-6 tracking-tight text-[#1c1825]">
            An AI-native team building the runtime security layer for an AI-native world.
          </h4>
        </div>

        <div className="mt-6 rounded-[14px] border border-[#e4dcfa] bg-white p-4 shadow-sm transition hover:border-[#6d49fd]/40">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0b8c66]">
            TALK WITH US
          </span>
          <h5 className="mt-1 text-sm font-semibold text-[#1c1825]">
            Build With Gödel
          </h5>
          <p className="mt-1 text-xs text-[#6e6878] leading-5">
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

      {/* Right Column: 2 Grid Columns */}
      <div className="grid grid-cols-2 gap-6 py-1">
        {/* Sub-column 1: Company */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a098ae]">
            COMPANY
          </span>
          <div className="mt-3 flex flex-col gap-4">
            <Link
              href="/about-us"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Building2 className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd]">
                  About Us
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Mission & team</p>
              </div>
            </Link>

            <Link
              href="/demo"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd]">
                  Contact
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Talk to our team</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sub-column 2: Community & Manifesto */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a098ae]">
            COMMUNITY & CAREERS
          </span>
          <div className="mt-3 flex flex-col gap-4">
            <Link
              href="/about-us#manifesto"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd]">
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
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Code className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd] flex items-center gap-1">
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

// ── Resources Dropdown Mega Content ───────────────────────────────────────────
export function ResourcesMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-[1.1fr_1.4fr] gap-6">
      {/* Left Column: Featured Blog Preview */}
      <div className="flex flex-col justify-between rounded-[18px] border border-[#ece6f7] bg-[#f8f6fd] p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d49fd]">
            LATEST RESEARCH
          </span>
          <h4 className="mt-2 text-base font-semibold leading-6 tracking-tight text-[#1c1825]">
            Detecting PII Leaks in LLM Pipeline Streams
          </h4>
          <p className="mt-2 text-xs text-[#6e6878] leading-5">
            How runtime context inspection prevents sensitive data exposure in real-time LLM outputs.
          </p>
        </div>

        <Link
          href="/blog/detecting-pii-leaks-in-llm-pipeline-streams"
          onClick={onClose}
          className="mt-4 rounded-[14px] border border-[#e4dcfa] bg-white p-3.5 shadow-sm transition hover:border-[#6d49fd]/40 flex items-center justify-between"
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

      {/* Right Column: 2 Grid Columns */}
      <div className="grid grid-cols-2 gap-6 py-1">
        {/* Sub-column 1: Resources */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a098ae]">
            RESOURCES
          </span>
          <div className="mt-3 flex flex-col gap-4">
            <Link
              href="/blog"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd]">
                  Blog
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Research & updates</p>
              </div>
            </Link>

            <Link
              href="/blog"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Newspaper className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd]">
                  News
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Latest announcements</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sub-column 2: Documentation */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a098ae]">
            DOCUMENTATION
          </span>
          <div className="mt-3 flex flex-col gap-4">
            <Link
              href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Code className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd] flex items-center gap-1">
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
              className="group flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Users className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] group-hover:text-[#6d49fd] flex items-center gap-1">
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
