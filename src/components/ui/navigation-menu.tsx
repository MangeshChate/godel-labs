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
  FileText,
  Sparkles,
  Scroll,
  Globe,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, DiscordIcon } from "@/components/icons/brand";
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
  activeKey: "use-cases" | "resources" | "company" | null;
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
              {activeKey === "use-cases" ? (
                <motion.div
                  key="use-cases"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                >
                  <UseCasesMegaContent onClose={onClose} />
                </motion.div>
              ) : activeKey === "company" ? (
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

// ── Use Cases Dropdown Content ────────────────────────────────────────────────
export function UseCasesMegaContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-6">
      {/* Left Featured Card */}
      <div className="flex w-[290px] shrink-0 flex-col justify-between rounded-[18px] border border-[#eee9f8] bg-[#f9f8fe] p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
            ENTERPRISE SECURITY
          </span>
          <h4 className="mt-2.5 text-base font-semibold leading-6 tracking-tight text-[#1c1825]">
            Zero-Trust Data Authority for AI Agents
          </h4>
          <p className="mt-2 text-xs leading-5 text-[#6e6878]">
            Enforce real-time policies across coding agents, browser automation, MCP tools, and LLM pipelines.
          </p>
        </div>

        <Link
          href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd] hover:underline"
        >
          <span>Explore documentation</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Right 2-Column Use Cases Grid */}
      <div className="grid flex-1 grid-cols-2 gap-4 py-1">
        <Link
          href="/use-cases/secure-ai-coding-agents"
          onClick={onClose}
          className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#f5f2fd]"
        >
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
            <Code className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
              AI Coding Agents
            </p>
            <p className="mt-0.5 text-xs text-[#736c7e]">
              Protect .env, keys & terminals in Claude Code, Cursor & Codex
            </p>
          </div>
        </Link>

        <Link
          href="/use-cases/secure-browser-agents"
          onClick={onClose}
          className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#f5f2fd]"
        >
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
            <Globe className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
              Browser Agents
            </p>
            <p className="mt-0.5 text-xs text-[#736c7e]">
              Prevent prompt injection & DLP leaks in web automation
            </p>
          </div>
        </Link>

        <Link
          href="/use-cases/secure-ai-frameworks"
          onClick={onClose}
          className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#f5f2fd]"
        >
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
            <Cpu className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
              Frameworks & MCP
            </p>
            <p className="mt-0.5 text-xs text-[#736c7e]">
              Govern MCP tools, LangChain & agent workflows
            </p>
          </div>
        </Link>

        <Link
          href="/use-cases/data-authority-dlp"
          onClick={onClose}
          className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#f5f2fd]"
        >
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
            <ShieldCheck className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
              Data Authority & DLP
            </p>
            <p className="mt-0.5 text-xs text-[#736c7e]">
              Real-time classification for LLM prompts & responses
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

// ── Company Dropdown Content (Clickable Card & Company Links) ───────────
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

      {/* Right Column: Company (Only About Us and Contact) */}
      <div className="flex flex-1 flex-col justify-start py-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a098ae]">
          COMPANY
        </span>
        <div className="mt-3 flex flex-col gap-2">
          <Link
            href="/about-us"
            onClick={onClose}
            className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#f5f2fd]"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
              <Building2 className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                About Us
              </p>
              <p className="mt-0.5 text-xs text-[#736c7e]">Our mission, team & story</p>
            </div>
          </Link>

          <Link
            href="/demo"
            onClick={onClose}
            className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#f5f2fd]"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eee9ff] text-[#6d49fd] transition group-hover:bg-[#6d49fd] group-hover:text-white">
              <Mail className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#211c2a] transition group-hover:text-[#6d49fd]">
                Contact
              </p>
              <p className="mt-0.5 text-xs text-[#736c7e]">Get in touch with our team</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Resources Dropdown Content (Clickable Card, Resources & Connect Links) ─────────────────
export function ResourcesMegaContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-6">
      {/* Left Featured Card (Entire Card Clickable, Same Dimensions as Company) */}
      <Link
        href="/blog/why-claude-code-can-read-your-env-ssh-keys-and-cloud-credentials-and-what-to-do-about-it"
        onClick={onClose}
        className="group flex w-[310px] shrink-0 flex-col justify-between rounded-[18px] border border-[#eee9f8] bg-[#f9f8fe] p-5 transition-all duration-200 hover:border-[#6d49fd]/40 hover:bg-[#f5f1fd]"
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
            LATEST BLOG
          </span>
          <h4 className="mt-2.5 text-[15px] font-semibold leading-5 tracking-tight text-[#1c1825] transition group-hover:text-[#6d49fd]">
            Why Claude Code Can Read Your .env, SSH Keys, and Cloud Credentials
          </h4>
          <p className="mt-2 text-xs leading-5 text-[#6e6878]">
            Your coding agent can read your secret keys right now. Here is how to prevent credential exposure.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd]">
          <span>Read blog post</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Link>

      {/* Right 2-Column Grid */}
      <div className="grid flex-1 grid-cols-2 gap-6 py-1">
        {/* Column 1: Resources & Docs */}
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
          </div>
        </div>

        {/* Column 2: Connect Social Icons */}
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
                <DiscordIcon className="h-4 w-4" />
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
