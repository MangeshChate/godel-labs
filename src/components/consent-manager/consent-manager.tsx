"use client";

import Script from "next/script";

const MATOMO_BASE_URL = "https://analytics.godel-labs.ai/matomo/";
const MATOMO_SITE_ID = "2";

declare global {
  interface Window {
    silktideConsentManager: {
      init: (config: Record<string, unknown>) => void;
      update: (config: Record<string, unknown>) => void;
      resetConsent: () => void;
      getInstance: () => Record<string, unknown>;
    };
    _paq?: Array<[string, ...unknown[]]>;
    __godelMatomoInitialized?: boolean;
  }
}

function initializeMatomo() {
  if (window.__godelMatomoInitialized) {
    return;
  }

  const paq = (window._paq = window._paq || []);

  paq.push(["setDoNotTrack", true]);
  paq.push(["requireConsent"]);
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
  const handleConsentManagerReady = () => {
    initializeMatomo();

    window.silktideConsentManager.init({
      consentTypes: [
        {
          id: "essential",
          label: "Essential",
          description:
            "These are necessary for the website to function and cannot be switched off.",
          required: true,
        },
        {
          id: "analytics",
          label: "Analytics",
          description:
            "These help us understand how visitors interact with the website by collecting and reporting information anonymously.",
          defaultValue: false,
          matomo: true,
        },
        {
          id: "marketing",
          label: "Marketing",
          description:
            "These are used to deliver personalized advertisements and track advertising campaign performance.",
          defaultValue: false,
          gtag: ["ad_storage", "ad_user_data", "ad_personalization"],
        },
      ],
      prompt: {},
      icon: {
        position: "bottomRight",
      },
    });
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="/consent-manager/silktide-consent-manager.css"
      />
      <Script
        src="/consent-manager/silktide-consent-manager.js"
        strategy="afterInteractive"
        onReady={handleConsentManagerReady}
      />
    </>
  );
}
