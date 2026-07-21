import useCasesJson from "./use-cases.json";

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

export const useCasesData = useCasesJson as Record<string, UseCase>;
