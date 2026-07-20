"use client";

import type { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 140,
}) => {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "animate-shiny-text inline-flex items-center justify-center bg-clip-text text-transparent bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%]",
        "bg-[linear-gradient(110deg,#3b3544_0%,#3b3544_30%,#6d49fd_50%,#3b3544_70%,#3b3544_100%)]",
        className
      )}
    >
      {children}
    </span>
  );
};

export default AnimatedShinyText;
