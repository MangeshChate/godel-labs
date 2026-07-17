import { AppWindow, Code2, Laptop, Workflow, Shield, ShieldAlert, type LucideIcon } from "lucide-react";

export interface AgentIntegration {
  name: string;
  icon: string;
}

export interface UseCase {
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  featured: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const agentIntegrations: AgentIntegration[] = [
  { name: "CLAUDE CODE", icon: "anthropic" },
  { name: "CURSOR", icon: "cursor" },
  { name: "CODEX", icon: "openai" },
  { name: "COPILOT", icon: "githubcopilot" },
  { name: "GEMINI CLI", icon: "googlegemini" },
  { name: "WINDSURF", icon: "windsurf" },
  { name: "LANGCHAIN", icon: "langchain" },
  { name: "MCP", icon: "modelcontextprotocol" },
];

export const useCases: UseCase[] = [
  {
    eyebrow: "01 / CODE",
    title: "Coding agents",
    body: "Claude Code, Cursor, and Codex read repositories and run shells. Gate blocks secret exfiltration, reverse shells, and poisoned dependencies without slowing the loop.",
    icon: Code2,
    featured: true,
  },
  {
    eyebrow: "02 / BROWSER",
    title: "Browser agents",
    body: "Protect logged-in sessions across assistants and agentic browsers. Sensitive data is classified on-device before it leaves in a prompt, paste, or upload.",
    icon: AppWindow,
    featured: false,
  },
  {
    eyebrow: "03 / ENDPOINT",
    title: "Desktop agents",
    body: "One collector gives every action a verdict across macOS, Windows, and Linux — files, credentials, cloud CLIs, and everything in between.",
    icon: Laptop,
    featured: false,
  },
  {
    eyebrow: "04 / CUSTOM",
    title: "Custom agents",
    body: "Wrap LangChain, LangGraph, CrewAI, or raw MCP once. Every tool call flows through the same gate with per-action authority built in.",
    icon: Workflow,
    featured: true,
  },
  {
    eyebrow: "05 / DLP",
    title: "DLP for coding agents",
    body: "AI DLP built for how agents actually leak: on-device classification of secrets, PII, source code, and deal data — enforced on every MCP call, paste, and upload, with L0–L4 sensitivity levels per file.",
    icon: Shield,
    featured: false,
  },
  {
    eyebrow: "06 / RISK",
    title: "OWASP agentic risk protection",
    body: "Every detection is mapped to the OWASP Top 10 for LLM Applications and OWASP Agentic risks — prompt injection, tool misuse, privilege compromise, memory poisoning — so findings land in language your security team already speaks.",
    icon: ShieldAlert,
    featured: true,
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What is AI agent security?",
    answer: "Runtime protection for autonomous AI agents. Instead of scanning code or filtering prompts, it inspects what an agent actually does — every prompt, tool call, file read, and shell command — and enforces policy before the action executes.",
  },
  {
    question: "How is Gödel's Gate different from EDR or DLP?",
    answer: "EDR hunts malware; agents often run normal commands. DLP watches familiar channels; agent data can leave through MCP tools. Gate tracks the provenance of everything an agent reads and decides whether that data has authority to drive a side effect.",
  },
  {
    question: "Does it stop prompt injection?",
    answer: "Yes — by construction. A hidden instruction can make an agent want to exfiltrate a secret, but it cannot give that action authority. On the AgentDojo benchmark, 25/25 action-harming injections were blocked while legitimate tasks were preserved.",
  },
  {
    question: "What about MCP security?",
    answer: "Gate sits between every agent and every MCP server. It inventories servers and tools, classifies the data flowing through them, and gives every tool call an explicit authority decision.",
  },
  {
    question: "Is this another set of AI guardrails?",
    answer: "No. Guardrails are probabilistic classifiers. Gate makes deterministic decisions with no LLM in the enforcement path and logs each decision tamper-evidently.",
  },
  {
    question: "How do I install it?",
    answer: "One command per endpoint. The console discovers local agents automatically, and telemetry can remain self-hosted inside your environment.",
  },
];
