import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll/smooth-scroll";
import ConsentManager from "@/components/consent-manager/consent-manager";

const geistSans = localFont({
  src: [
    {
      path: "../fonts/Geist-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Geist-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Geist-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Geist-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Geist-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Geist-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Geist-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Geist-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Geist-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://godel-labs.ai"),
  title: "Gödel Labs — AI Agent Security at Runtime",
  description: "Runtime security for coding, browser, desktop, and custom AI agents. Inspect every prompt, tool call, and action before it executes.",
  icons: {
    icon: [
      { url: "/godel-labs-logo/favicon/dark/favicon-dark.svg", type: "image/svg+xml" },
      { url: "/godel-labs-logo/favicon/dark/favicon-dark-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/godel-labs-logo/favicon/dark/favicon-dark-512.png",
    apple: "/godel-labs-logo/favicon/dark/favicon-dark-512.png",
  },
  openGraph: {
    title: "Every agent. Every action. Guarded at runtime.",
    description: "Deterministic runtime security, MCP protection, and AI DLP for every agent.",
    type: "website",
    siteName: "Gödel Labs",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Every agent. Every action. Guarded at runtime." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Every agent. Every action. Guarded at runtime.",
    description: "Deterministic runtime security, MCP protection, and AI DLP for every agent.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <ConsentManager />
      </body>
    </html>
  );
}
