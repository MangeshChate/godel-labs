import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">
      <span className="h-2 w-2 rounded-full bg-[#6d49fd] shadow-[0_0_0_5px_rgba(109,73,253,.11)]" />
      {children}
    </div>
  );
}
