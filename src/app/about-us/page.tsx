import type { Metadata } from "next";

import AboutPage from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About Gödel Labs | Built for the Agentic Era",
  description:
    "Gödel Labs brings together deeply technical founders, enterprise product builders, and open-source market makers to build the security foundation for AI agents.",
};

export default function AboutUsPage() {
  return <AboutPage />;
}
