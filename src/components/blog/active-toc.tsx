"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; title: string };

interface ActiveTocProps {
  toc: TocItem[];
}

export default function ActiveToc({ toc }: ActiveTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length === 0) return;

    // We keep track of active headings by finding the one currently closest to the top of the viewport.
    const handleScroll = () => {
      // If we are at the very top of the page, activate the first heading
      if (window.scrollY < 120) {
        setActiveId(toc[0].id);
        return;
      }

      const scrollPosition = window.scrollY + 120; // offset of navbar
      let currentActiveId = "";

      for (let i = 0; i < toc.length; i++) {
        const element = document.getElementById(toc[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            currentActiveId = toc[i].id;
          } else {
            break;
          }
        }
      }

      if (currentActiveId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to establish active state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 96; // 96px offset for sticky navbar
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav aria-label="Article contents" className="border-l border-[#dcd5e8] pl-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#6d49fd]">On this page</p>
      <ol className="mt-4 space-y-3">
        {toc.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`group grid grid-cols-[20px_minmax(0,1fr)] gap-2 text-[12px] font-medium leading-5 transition-all duration-200 ${
                  isActive
                    ? "text-[#6d49fd] font-semibold translate-x-0.5"
                    : "text-[#686172] hover:text-[#6d49fd]"
                }`}
              >
                <span
                  className={`pt-px font-mono text-[9px] font-normal transition-colors duration-200 ${
                    isActive ? "text-[#6d49fd]" : "text-[#aaa3b4] group-hover:text-[#8a72ef]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
