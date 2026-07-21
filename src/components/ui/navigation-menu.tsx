"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  BookOpen,
  Building2,
  Mail,
  Code,
  Newspaper,
  ExternalLink,
  MessageCircle,
  FileText,
  Sparkles,
  Scroll,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
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
          <div className="relative w-[840px] overflow-hidden rounded-[24px] border border-[#e2daee]/90 bg-white p-5 shadow-[0_24px_60px_rgba(24,14,50,.11)] backdrop-blur-2xl">
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

// ── Company Dropdown Content (Clickable Card & Footer Social Links) ───────────
export function CompanyMegaContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-6">
      {/* Left Featured Card (Entire Card Clickable, Same Dimensions as Resources) */}
      <Link
        href="/about-us"
        onClick={onClose}
        className="group flex w-[310px] shrink-0 flex-col justify-between rounded-[18px] border border-[#eee9f8] bg-[#f9f8fe] p-6 transition-all duration-200 hover:border-[#6d49fd]/40 hover:bg-[#f5f1fd]"
      >
        <div className="flex flex-1 flex-col justify-center">
          <h4 className="text-[19px] font-semibold leading-[1.38] tracking-tight text-[#171320] transition group-hover:text-[#6d49fd]">
            “Software is becoming agency. Security must move with it.”
          </h4>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd]">
          <span>Learn about our mission</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Link>

      {/* Right 2-Column Grid */}
      <div className="grid flex-1 grid-cols-2 gap-6 py-1">
        {/* Column 1: Company */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
            COMPANY
          </span>
          <div className="mt-3 flex flex-col gap-2">
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
              href="/about-us#manifesto"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <Scroll className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  Manifesto
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Core principles</p>
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

        {/* Column 2: Connect / Social Media (Replaced Manifesto & Open Source) */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
            CONNECT
          </span>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="https://github.com/godellabs-ai"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <GithubIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  GitHub <ExternalLink className="h-3 w-3 text-[#a098ae]" />
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Open source & repos</p>
              </div>
            </Link>

            <Link
              href="https://www.linkedin.com/company/godel-labs/"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <LinkedinIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  LinkedIn <ExternalLink className="h-3 w-3 text-[#a098ae]" />
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Company updates</p>
              </div>
            </Link>

            <Link
              href="https://discord.gg/HGXeCxJ532"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#f5f2fd]"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                  Discord <ExternalLink className="h-3 w-3 text-[#a098ae]" />
                </p>
                <p className="mt-0.5 text-xs text-[#736c7e]">Join AI community</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Resources Dropdown Content (Clickable Card, Compact Size) ─────────────────
export function ResourcesMegaContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-6">
      {/* Left Featured Card (Entire Card Clickable, Same Dimensions as Company) */}
      <Link
        href="/blog/securing-ai-coding-agents-in-sandbox-environments"
        onClick={onClose}
        className="group flex w-[310px] shrink-0 flex-col justify-between rounded-[18px] border border-[#eee9f8] bg-[#f9f8fe] p-5 transition-all duration-200 hover:border-[#6d49fd]/40 hover:bg-[#f5f1fd]"
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
            LATEST BLOG
          </span>
          <h4 className="mt-2.5 text-base font-semibold leading-6 tracking-tight text-[#1c1825] transition group-hover:text-[#6d49fd]">
            Securing AI Coding Agents in Sandbox Environments
          </h4>
          <p className="mt-2 text-xs leading-5 text-[#6e6878]">
            Analyzing execution paths of autonomous coding agents and preventing host compromise.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd]">
          <span>Read blog post</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Link>

      {/* Right 2-Column Grid */}
      <div className="grid flex-1 grid-cols-2 gap-6 py-1">
        {/* Column 1: Resources */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
            RESOURCES
          </span>
          <div className="mt-3 flex flex-col gap-2">
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
          <div className="mt-3 flex flex-col gap-2">
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
