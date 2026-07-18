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
    question: "What does Gödel protect?",
    answer: "Gödel protects information while AI is actively using it. It inspects prompts, files, browser pages, MCP responses, tool outputs, model responses, and agent actions as they move through an AI workflow.",
  },
  {
    question: "What does Data Authority mean?",
    answer: "Data Authority does not grant permissions to GitHub, Jira, SaaS applications, or data stores. It classifies content inside AI interactions and enforces how that content may be processed, retained, shared, or used to influence an agent action.",
  },
  {
    question: "Does content need to be classified in advance?",
    answer: "No. Gödel classifies content in real time as it enters, leaves, or moves through an agent session. It can evaluate a prompt, upload, MCP response, tool output, or model response within milliseconds and apply policy immediately.",
  },
  {
    question: "How does Gödel handle prompt injection?",
    answer: "Gödel detects injected instructions across prompts, files, webpages, MCP responses, and tool output. It then evaluates the surrounding content, destination, attempted operation, and policy before allowing, warning, or blocking the interaction.",
  },
  {
    question: "Where is policy enforced?",
    answer: "Policy is delivered to native agent hooks, browser extensions, and framework callbacks. That places enforcement directly in the interaction path across coding agents, browser agents, MCP, and custom agent frameworks.",
  },
  {
    question: "Can telemetry remain inside our environment?",
    answer: "Yes. Gödel can run self-hosted or in a private cloud, and audit records can store hashes rather than sensitive payloads. Events can be forwarded to your existing SIEM or security data platform.",
  },
];
