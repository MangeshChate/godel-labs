"use client";

import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerBorderProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  shimmerColor?: string;
  duration?: string;
}

export const ShimmerBorder: FC<ShimmerBorderProps> = ({
  children,
  className,
  innerClassName,
  shimmerColor = "#6d49fd",
  duration = "3.5s",
}) => {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] shadow-sm transition-transform duration-200 hover:scale-[1.02]",
        className
      )}
    >
      {/* Animated rotating conic gradient shimmer */}
      <span
        className="absolute inset-[-1000%] animate-[spin_3.5s_linear_infinite]"
        style={{
          animationDuration: duration,
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${shimmerColor} 45%, #a58fff 55%, transparent 100%)`,
        }}
      />

      {/* Inner container */}
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-[#dcd5f7]/60 bg-white/90 px-4.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#554f65] backdrop-blur-xl sm:text-[11px]",
          innerClassName
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default ShimmerBorder;
