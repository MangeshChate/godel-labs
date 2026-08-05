export interface AgentIntegration {
  name: string;
  icon: string;
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

export const faqItems: FaqItem[] = [
  {
    question: "Where is Gödel hosted? Is it SaaS or self-hosted?",
    answer: "<strong>Both.</strong> Gödel is available as a <strong>managed SaaS</strong> (we host and run the control plane for you) <em>and</em> <strong>fully self-hosted</strong> in your own environment, including private cloud and air-gapped. In every deployment, content inspection and classification run <strong>on-device on the endpoint</strong>; what differs is only where the control plane lives, our cloud or yours.",
  },
  {
    question: "What does Data Authority mean?",
    answer: "Data Authority governs agent execution by trust. Trusted data becomes context; untrusted data doesn’t. And only trusted context can change the agent’s behavior, so a hidden instruction buried in a page or a ticket can be read but never obeyed.",
  },
  {
    question: "Does my data leave my premises? Does Gödel work air-gapped?",
    answer: "<strong>Your content never leaves for processing and with self-hosting nothing leaves at all.</strong> In every deployment, detection, classification and enforcement run <strong>on-device</strong>; your source code, documents, prompts and secret values are never sent to Gödel for classification. With the <strong>self-hosted</strong> option, everything, content, findings and audit, stays entirely within your environment so Gödel is eligible for <strong>air-gapped, data-sovereign and regulated</strong> deployments (threat-intel and rule updates can arrive as an offline bundle). With <strong>managed SaaS</strong>, only policy configuration and findings <em>metadata</em> (content labels, action verdicts, secret hashes, never your content or secret values) sync to the control plane. Either way, the security tool itself can never become a data-exfiltration path.",
  },
  {
    question: "Are you using a frontier model for any functionality?",
    answer: "<strong>No.</strong> Detection and classification run on <strong>small, on-device models</strong> plus deterministic scanners. <strong>No frontier LLM ever sees your scanned content.</strong> This is a deliberate design choice as it keeps your data in your boundary and keeps latency and cost low.",
  },
  {
    question: "Do you train models on my data?",
    answer: "<strong>No.</strong> Gödel does not use your content to train models. Models ship pre-trained; your data stays local and is not collected.",
  },
  {
    question: "Do you store my documents, code or secrets?",
    answer: "<strong>No.</strong> Content is classified in place and not retained by Gödel. When a secret or credential is detected, Gödel records a <strong>hash and location</strong> for the finding, never the secret value itself.",
  },
  {
    question: "Which operating systems are supported?",
    answer: "The developer app is available for <strong>macOS, Linux and Windows</strong>.",
  },
  {
    question: "Do you use a proxy or man-in-the-middle my traffic?",
    answer: "<strong>No.</strong> Enforcement happens inside the agent loop. There is no MITM proxy, no certificate installation and no rerouting of your network.",
  },
  {
    question: "Does it integrate with my SIEM / SOAR?",
    answer: "Yes, findings and the audit trail export to your existing security tooling.",
  },
  {
    question: "Does enforcement happen before or after the action?",
    answer: "<strong>Before.</strong> Gödel evaluates content and planned actions <strong>pre-execution</strong>, including before content is sent to any cloud. Blocking <em>before the send</em> is only possible from an independent, on-device layer.",
  },
  {
    question: "Will it slow down my agent or get in the way?",
    answer: "It's built to be <strong>quiet and low-latency</strong>, on-device inference, minimal friction and tuned for low false positives. Gödel stays out of the way and surfaces things only when they matter.",
  },
  {
    question: "How is Gödel different from DLP, EDR or an AI gateway?",
    answer: "DLP watches data movement; EDR watches endpoint processes; an AI gateway sits on the network. Gödel sits <strong>inside the agent's execution loop</strong>, understanding the <em>content</em> an agent processes, mapping it to the <em>action</em> it causes and enforcing <strong>on-device, before the action fires, across every agent you run.</strong> It's the security layer of the agent itself and not a perimeter around it.",
  },
  {
    question: "How long does it take to get value?",
    answer: "Minutes, install and immediately see your agent's activity. Enterprise deployment is designed for fast time-to-first-finding without re-architecting your network.",
  },
  {
    question: "How do you help with EU AI Act / DPDP / other AI-governance obligations?",
    answer: "Gödel produces the <strong>evidence and control layer</strong> those frameworks ask for: an on-device record of what content agents processed and sent to LLMs, which data influenced which action, redaction/minimization and access-and-action audit trails, all retained in your environment.",
  },
];
