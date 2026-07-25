"use client";

import { useEffect, useState } from "react";
import { Cookie, X, Check } from "lucide-react";
import Link from "next/link";

const MATOMO_BASE_URL = "https://analytics.godel-labs.ai/matomo/";
const MATOMO_SITE_ID = "2";

declare global {
  interface Window {
    _paq?: Array<[string, ...unknown[]]>;
    __godelMatomoInitialized?: boolean;
  }
}

function initializeMatomo() {
  if (typeof window === "undefined" || window.__godelMatomoInitialized) return;

  const paq = (window._paq = window._paq || []);
  paq.push(["setDoNotTrack", true]);
  paq.push(["trackPageView"]);
  paq.push(["enableLinkTracking"]);
  paq.push(["setTrackerUrl", `${MATOMO_BASE_URL}matomo.php`]);
  paq.push(["setSiteId", MATOMO_SITE_ID]);

  const script = document.createElement("script");
  script.async = true;
  script.src = `${MATOMO_BASE_URL}matomo.js`;

  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  window.__godelMatomoInitialized = true;
}

export default function ConsentManager() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("godel_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      initializeMatomo();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("godel_cookie_consent", "accepted");
    setShowBanner(false);
    initializeMatomo();
  };

  const handleDecline = () => {
    localStorage.setItem("godel_cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie Preferences"
      className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-[1180px] overflow-hidden rounded-2xl border border-[#e2daee] bg-white/95 p-4 sm:p-5 shadow-[0_20px_60px_rgba(38,24,78,0.14)] backdrop-blur-xl transition-all duration-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left Side: Cookie Icon & Copy */}
          <div className="flex items-start gap-3 md:items-center">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f4efff] text-[#6d49fd]">
              <Cookie className="h-4.5 w-4.5" />
            </span>
            <p className="text-xs leading-5 text-[#5e5768] sm:text-sm">
              We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-[#6d49fd] underline hover:text-[#5e32ff]"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex shrink-0 items-center gap-2.5 self-end md:self-auto">
            <button
              onClick={handleDecline}
              className="rounded-full border border-[#e2daee] bg-white px-4 py-2 text-xs font-semibold text-[#484054] transition hover:bg-[#faf9fd] hover:text-[#111322]"
            >
              Essential only
            </button>
            <button
              onClick={handleAccept}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#6d49fd] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#5e32ff] active:scale-[0.97]"
            >
              <span>Accept all</span>
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleDecline}
              className="grid h-8 w-8 place-items-center rounded-full text-[#746e7f] transition hover:bg-[#f4f3f8] hover:text-[#111322]"
              aria-label="Close cookie preferences"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
