"use client";

import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerBorderProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  duration?: string;
}

export const ShimmerBorder: FC<ShimmerBorderProps> = ({
  children,
  className,
  innerClassName,
  duration = "4s",
}) => {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] shadow-sm transition-transform duration-200 hover:scale-[1.015]",
        className
      )}
    >
      {/* Very light gray animated shimmer border sweep */}
      <span
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite]"
        style={{
          animationDuration: duration,
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent 0%, rgba(190, 184, 206, 0.3) 35%, rgba(245, 243, 252, 1) 50%, rgba(190, 184, 206, 0.3) 65%, transparent 100%)",
        }}
      />

      {/* Inner pill */}
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-[#e2daee]/80 bg-white/90 px-4.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#554f65] backdrop-blur-xl sm:text-[11px]",
          innerClassName
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default ShimmerBorder;
