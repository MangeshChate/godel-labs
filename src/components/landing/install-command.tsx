"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const INSTALL_COMMAND = "curl -sSL get.godel-labs.ai | sh";

export default function InstallCommand({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = INSTALL_COMMAND;
      textarea.setAttribute("readonly", "");
      textarea.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center justify-between gap-4 rounded-full border border-[#dcd5f7] bg-white/80 text-left font-mono text-[#343044] shadow-[0_8px_30px_rgba(38,24,78,.07)] backdrop-blur transition-all duration-150 active:scale-[0.97] hover:-translate-y-0.5 hover:border-[#9f8af6] hover:shadow-[0_14px_36px_rgba(77,47,178,.14)] ${compact ? "px-4 py-3 text-[11px] sm:text-xs" : "w-full max-w-[390px] px-5 py-3.5 text-xs sm:text-[13px]"}`}
      aria-label="Copy install command"
    >
      <span className="truncate"><span className="text-[#6d49fd]">$</span> {INSTALL_COMMAND}</span>
      <span className="flex shrink-0 items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#817a92]" aria-live="polite">
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
