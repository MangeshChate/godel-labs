import useCasesJson from "./use-cases.json";

export interface SupportedTool {
  name: string;
  icon?: string;
}

export interface ThreatScenario {
  title: string;
  chipType: "blocked" | "redacted" | "held" | "logged";
  chipText: string;
  command: string;
  description: string;
}

export interface ControlItem {
  title: string;
  description: string;
}

export interface UseCase {
  slug: string;
  badge: string;
  title: string;
  shortTitle: string;
  heroHeading: string;
  description: string;
  shortDescription: string;
  videoSrc: string;
  videoCaption: string;
  supportedTools?: SupportedTool[];
  threatScenarios?: ThreatScenario[];
  controls?: ControlItem[];
  detailedParagraphs: string[];
}

export const useCasesData = useCasesJson as Record<string, UseCase>;
