export interface UseCase {
  slug: string;
  badge: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  videoSrc: string;
  videoPoster?: string;
  videoCaption: string;
  iconName: "Code" | "Globe" | "Cpu" | "ShieldCheck";
  metrics: { value: string; label: string }[];
  keyCapabilities: {
    title: string;
    description: string;
    icon: string;
  }[];
  policyExample: {
    filename: string;
    language: string;
    code: string;
  };
  supportedIntegrations: string[];
}

export const useCasesData: Record<string, UseCase> = {
  "secure-ai-coding-agents": {
    slug: "secure-ai-coding-agents",
    badge: "USE CASE 01",
    title: "Secure AI Coding Agents",
    shortTitle: "AI Coding Agents",
    description:
      "Prevent host compromise, credential leaks, and unauthorized terminal execution when developers use AI coding tools like Claude Code, Cursor, Codex CLI, and GitHub Copilot.",
    shortDescription: "Protect .env, SSH keys, and terminal execution in Claude Code, Cursor & Codex.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Real-time enforcement blocking credential exfiltration during AI coding agent execution.",
    iconName: "Code",
    metrics: [
      { value: "< 3ms", label: "Runtime Interception Latency" },
      { value: "100%", label: "Credential Leak Prevention" },
      { value: "Zero", label: "Codebase Data Leakage" },
    ],
    keyCapabilities: [
      {
        title: "Credential & .env Masking",
        description: "Automatically inspects file access attempts to block agents from reading AWS secrets, .env files, SSH keys, and database tokens.",
        icon: "KeyRound",
      },
      {
        title: "Terminal Command Sandboxing",
        description: "Intercepts shell commands issued by coding agents before execution, blocking dangerous subshell invocations and destructive disk wipes.",
        icon: "Terminal",
      },
      {
        title: "Repository Boundary Control",
        description: "Enforces strict file path boundaries ensuring coding agents cannot read or modify files outside the active workspace directory.",
        icon: "FolderLock",
      },
      {
        title: "Audit & Forensic Logging",
        description: "Generates cryptographic, zero-leak audit logs of all agent file reads, tool executions, and model prompts for compliance auditing.",
        icon: "ShieldAlert",
      },
    ],
    policyExample: {
      filename: "policy-coding-agent.yaml",
      language: "yaml",
      code: `name: secure-coding-policy
version: v1
target:
  agents: ["claude-code", "cursor", "codex-cli"]

rules:
  - id: block-env-credentials
    resource: "**/.env*"
    action: DENY
    reason: "Access to environment secrets restricted by Data Authority"

  - id: sandbox-shell-execution
    command_patterns:
      - "curl * | bash"
      - "rm -rf /"
      - "cat ~/.ssh/*"
    action: BLOCK
    notify_security: true`,
    },
    supportedIntegrations: [
      "Claude Code",
      "Cursor",
      "Codex CLI",
      "GitHub Copilot",
      "Gemini CLI",
      "Windsurf",
    ],
  },

  "secure-browser-agents": {
    slug: "secure-browser-agents",
    badge: "USE CASE 02",
    title: "Secure Browser Agents",
    shortTitle: "Browser Agents",
    description:
      "Runtime Data Loss Prevention (DLP) and Indirect Prompt Injection protection for autonomous web agents operating in Chrome, Edge, and web automation frameworks.",
    shortDescription: "Stop prompt injection & data leakage in autonomous browser agents.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Detecting and blocking indirect prompt injection embedded in untrusted web pages.",
    iconName: "Globe",
    metrics: [
      { value: "Real-time", label: "DOM Content Classification" },
      { value: "100%", label: "Prompt Injection Detection" },
      { value: "SOC 2", label: "Compliant Audit Trails" },
    ],
    keyCapabilities: [
      {
        title: "Indirect Prompt Injection Guard",
        description: "Scans web page DOMs, hidden text, and third-party data inputs to neutralize malicious instructions attempting to hijack agent control flow.",
        icon: "Lock",
      },
      {
        title: "Browser Form & Input DLP",
        description: "Prevents browser agents from pasting sensitive enterprise credentials, PII, or internal tokens into external web forms.",
        icon: "FileSearch",
      },
      {
        title: "Domain & Endpoint Isolation",
        description: "Restricts browser navigation and API requests to explicitly whitelisted corporate domains and approved SaaS tools.",
        icon: "Globe",
      },
      {
        title: "Session Video & Replay Auditing",
        description: "Captures high-fidelity, privacy-preserved session recordings for every automated web navigation step.",
        icon: "Video",
      },
    ],
    policyExample: {
      filename: "policy-browser-agent.yaml",
      language: "yaml",
      code: `name: browser-agent-policy
version: v1
target:
  browsers: ["google-chrome", "microsoft-edge", "brave"]

rules:
  - id: neutralize-indirect-injection
    inspect: "dom_content"
    pattern: "ignore previous instructions"
    action: STRIP_AND_ISOLATE

  - id: restrict-form-submission
    allowed_domains:
      - "*.internal.company.com"
      - "salesforce.com"
    disallowed_fields: ["ssn", "credit_card", "api_key"]
    action: BLOCK`,
    },
    supportedIntegrations: [
      "Google Chrome",
      "Microsoft Edge",
      "Brave Browser",
      "Opera GX",
      "Selenium / Playwright",
    ],
  },

  "secure-ai-frameworks": {
    slug: "secure-ai-frameworks",
    badge: "USE CASE 03",
    title: "Secure AI Frameworks & MCP",
    shortTitle: "Frameworks & MCP",
    description:
      "Govern Model Context Protocol (MCP) server responses, LangChain/LangGraph pipelines, and multi-agent systems with deterministic, zero-trust authorization policies.",
    shortDescription: "Govern MCP tool calls, LangChain pipelines & multi-agent workflows.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Classifying MCP tool arguments and enforcing policy before external action execution.",
    iconName: "Cpu",
    metrics: [
      { value: "0ms", label: "Policy Overhead" },
      { value: "Full", label: "MCP Protocol Support" },
      { value: "Deterministic", label: "Authorization Checks" },
    ],
    keyCapabilities: [
      {
        title: "MCP Response Classification",
        description: "Classifies data returned by MCP servers in real time before it enters agent memory or influences downstream decision-making.",
        icon: "Server",
      },
      {
        title: "Tool Call Authorization",
        description: "Verifies tool arguments against granular policy rules, ensuring agents cannot invoke destructive APIs or exfiltrate state.",
        icon: "Wrench",
      },
      {
        title: "Multi-Agent Memory Isolation",
        description: "Enforces strict memory boundary controls between distinct agent roles in Swarm, CrewAI, and AutoGen orchestrations.",
        icon: "Layers",
      },
      {
        title: "Deterministic Guardrails",
        description: "Replaces probabilistic LLM self-policing with mathematical object-capability verification that cannot be bypassed.",
        icon: "ShieldCheck",
      },
    ],
    policyExample: {
      filename: "policy-mcp-framework.yaml",
      language: "yaml",
      code: `name: mcp-governance-policy
version: v1
target:
  protocols: ["mcp", "langchain", "crewai", "autogen"]

rules:
  - id: enforce-mcp-tool-arguments
    tool_name: "database_query"
    disallowed_tables: ["user_passwords", "payment_info"]
    action: DENY

  - id: multi-agent-data-boundary
    source_agent: "research_agent"
    target_agent: "customer_support_agent"
    content_classification: "CONFIDENTIAL"
    action: REDACT`,
    },
    supportedIntegrations: [
      "Model Context Protocol (MCP)",
      "LangChain & LangGraph",
      "CrewAI",
      "OpenAI Swarm",
      "AutoGen Studio",
      "LlamaIndex",
    ],
  },

  "data-authority-dlp": {
    slug: "data-authority-dlp",
    badge: "USE CASE 04",
    title: "Data Authority & DLP for LLMs",
    shortTitle: "Data Authority & DLP",
    description:
      "Classify unstructured enterprise content across prompts, files, MCP inputs, and outputs, maintaining policy enforcement as data transforms through agentic pipelines.",
    shortDescription: "Real-time content classification & DLP policy enforcement across LLM pipelines.",
    videoSrc: "/video/Product Walkthrough Final.mp4",
    videoCaption: "Tracking data classification tags as content transforms through prompt to output.",
    iconName: "ShieldCheck",
    metrics: [
      { value: "Sub-10ms", label: "Content Inspection Speed" },
      { value: "50+", label: "Built-in PII & Secrets Types" },
      { value: "100%", label: "Context Lineage Tracking" },
    ],
    keyCapabilities: [
      {
        title: "Dynamic Content Classification",
        description: "Automatically tags inputs with sensitivity levels (Restricted, PII, IP, Internal Only) without requiring upfront manual tagging.",
        icon: "FileCheck",
      },
      {
        title: "Context Lineage Tracking",
        description: "Tracks classification tags as data converts from document to prompt to LLM output to tool parameter.",
        icon: "GitBranch",
      },
      {
        title: "Real-Time Redaction & Masking",
        description: "Redacts sensitive identifiers on the fly before data is sent to external cloud LLM providers.",
        icon: "EyeOff",
      },
      {
        title: "SIEM & Audit Integration",
        description: "Streams encrypted audit events and policy decisions into Splunk, Datadog, or your security data lake.",
        icon: "Activity",
      },
    ],
    policyExample: {
      filename: "policy-data-authority.yaml",
      language: "yaml",
      code: `name: data-authority-dlp
version: v1
target:
  all_agent_inputs: true

rules:
  - id: auto-classify-pii
    detectors: ["ssn", "credit_card", "health_record"]
    on_match:
      tag: "RESTRICTED_PII"
      action: MASK

  - id: prevent-external-exfiltration
    condition: "tag == 'RESTRICTED_PII' && destination == 'external_api'"
    action: BLOCK
    alert_channel: "#security-alerts"`,
    },
    supportedIntegrations: [
      "OpenAI GPT-4o",
      "Claude 3.5 Sonnet",
      "Google Gemini 1.5",
      "DeepSeek R1",
      "Llama 3.3 / Local LLMs",
    ],
  },
};
