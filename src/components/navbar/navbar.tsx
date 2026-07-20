"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Why Gödel", href: "/#why-godel" },
  { label: "Product", href: "/#product" },
  { label: "Use cases", href: "/#use-cases" },
  { label: "Data Authority", href: "/#data-authority" },
  { label: "About us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        const elem = document.getElementById(targetId);
        if (elem) {
          e.preventDefault();
          window.history.pushState(null, "", `/#${targetId}`);
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        layout
        className={`mx-auto max-w-[1240px] overflow-hidden rounded-[18px] border transition-all duration-300 ${
          scrolled || open
            ? "border-[#ddd7eb] bg-[#fbfaff]/90 shadow-[0_12px_38px_rgba(38,24,78,.09)] backdrop-blur-xl"
            : "border-[#e3ddee]/80 bg-[#fbfaff]/72 backdrop-blur-md"
        }`}
        aria-label="Main navigation"
      >
        <div className="relative flex h-[64px] items-center justify-between px-4 sm:px-5 lg:px-6">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center"
            onClick={() => setOpen(false)}
            aria-label="Gödel Labs home"
          >
            <Image
              src="/godel-logo-light.svg"
              alt="Gödel Labs"
              width={2066}
              height={854}
              priority
              unoptimized
              className="h-[38px] w-auto"
            />
          </Link>

          <div className="pointer-events-none hidden lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
            <div className="pointer-events-auto flex items-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[15px] font-medium text-black transition hover:text-[#6d49fd]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="z-10 flex items-center gap-2">
            <div className="hidden lg:flex">
              <Link
                href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#6d49fd] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition duration-150 hover:bg-[#5e32ff] active:scale-[0.97]"
              >
                Install Gödel{" "}
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#ded8eb] bg-white text-[#332d40] transition-transform duration-150 active:scale-[0.97] lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-[#e5dfef] px-4 pb-5 pt-3">
                <div className="flex flex-col">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center justify-between border-b border-[#ebe7f2] py-4 text-[15px] font-medium text-black"
                      >
                        {link.label}
                        <span className="text-[#9b93a8]">0{index + 1}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-[#6d49fd] text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
                >
                  Install Gödel <Download className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
