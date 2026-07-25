"use client";

import { useState, useSyncExternalStore } from "react";
import { Link2, Check } from "lucide-react";
import { LinkedinIcon, XIcon } from "@/components/icons/brand";

interface SocialShareProps {
  title: string;
}

const subscribeToLocation = () => () => {};
const getLocationSnapshot = () => window.location.href;
const getServerLocationSnapshot = () => "";

export default function SocialShare({ title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useSyncExternalStore(
    subscribeToLocation,
    getLocationSnapshot,
    getServerLocationSnapshot,
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">Share Article</p>
      <div className="flex items-center gap-2">
        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ded8eb] bg-white text-[#686172] transition-all hover:-translate-y-0.5 hover:border-[#6d49fd] hover:text-[#6d49fd] active:scale-[0.95]"
          title="Share on X (Twitter)"
        >
          <XIcon className="h-3.5 w-3.5" />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ded8eb] bg-white text-[#686172] transition-all hover:-translate-y-0.5 hover:border-[#6d49fd] hover:text-[#6d49fd] active:scale-[0.95]"
          title="Share on LinkedIn"
        >
          <LinkedinIcon className="h-3.5 w-3.5" />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ded8eb] bg-white text-[#686172] transition-all hover:-translate-y-0.5 hover:border-[#6d49fd] hover:text-[#6d49fd] active:scale-[0.95]"
          title={copied ? "Copied!" : "Copy Link"}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Link2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
