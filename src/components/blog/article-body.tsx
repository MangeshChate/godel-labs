"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ArticleBodyProps {
  html: string;
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  // Start at 100% default size. Limits are 85% to 140%
  const [fontSize, setFontSize] = useState(100);

  const handleZoomIn = () => {
    setFontSize((prev) => Math.min(prev + 5, 140));
  };

  const handleZoomOut = () => {
    setFontSize((prev) => Math.max(prev - 5, 85));
  };

  const handleReset = () => {
    setFontSize(100);
  };

  return (
    <div className="space-y-6">
      {/* Sizing Controls Pill */}
      <div className="flex items-center gap-1.5 rounded-full border border-[#ded8eb] bg-white/70 px-3 py-1.5 w-fit backdrop-blur-sm">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#777082] pl-1.5 pr-2 select-none">
          Text Size
        </span>
        
        {/* Decrease */}
        <button
          onClick={handleZoomOut}
          disabled={fontSize <= 85}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#686172] transition hover:bg-[#ede8ff] hover:text-[#6d49fd] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#686172] cursor-pointer"
          title="Decrease size"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>

        {/* Display Current percentage */}
        <span className="text-xs font-mono font-bold text-[#181522] min-w-[38px] text-center select-none">
          {fontSize}%
        </span>

        {/* Increase */}
        <button
          onClick={handleZoomIn}
          disabled={fontSize >= 140}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#686172] transition hover:bg-[#ede8ff] hover:text-[#6d49fd] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#686172] cursor-pointer"
          title="Increase size"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>

        <div className="w-[1px] h-3.5 bg-[#e4deeb] mx-1" />

        {/* Reset / Proper Fit */}
        <button
          onClick={handleReset}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#686172] transition hover:bg-[#ede8ff] hover:text-[#6d49fd] cursor-pointer"
          title="Reset to default fit"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Styled Article Prose Container */}
      <div
        className="prose max-w-none leading-[1.8] text-[#5f596a] [overflow-wrap:anywhere]
          prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-[-0.025em] prose-headings:text-[#181522]
          prose-h1:text-xl sm:prose-h1:text-2xl prose-h2:mb-3 prose-h2:mt-9 prose-h2:text-[22px] prose-h2:leading-[1.2] sm:prose-h2:mt-10 sm:prose-h2:text-[24px]
          prose-h3:mb-2 prose-h3:mt-7 prose-h3:text-[18px] prose-h3:leading-snug sm:prose-h3:mt-8 sm:prose-h3:text-[19px]
          prose-p:my-3.5 prose-p:leading-[1.8] prose-p:text-[#625c6d]
          prose-li:my-1 prose-li:leading-7 prose-ul:my-4 prose-ol:my-4
          prose-a:text-[#6d49fd] prose-a:no-underline hover:prose-a:underline
          prose-strong:font-semibold prose-strong:text-[#262230]
          prose-blockquote:border-[#8e75f8] prose-blockquote:bg-white/60 prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:not-italic
          prose-img:rounded-[16px] prose-img:border prose-img:border-[#e1dbea]
          prose-code:rounded prose-code:bg-[#eeeafd] prose-code:px-1 prose-code:py-0.5 prose-code:text-[12px] prose-code:text-[#5140a7]
          prose-pre:overflow-x-auto prose-pre:rounded-[16px] prose-pre:bg-[#11101b] prose-pre:text-[12px] [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto"
        style={{ fontSize: `${fontSize}%` }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
