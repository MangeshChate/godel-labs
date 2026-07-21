"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Menu, X, Building2, Mail, BookOpen, Newspaper, ExternalLink, Code, Scroll } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { NavMegaPanel } from "@/components/ui/navigation-menu";

const standardLinks = [
  { label: "Product", href: "/#product" },
  { label: "Use cases", href: "/#use-cases" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"resources" | "company" | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

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
    setActiveDropdown(null);

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

  const handleMouseEnter = (dropdown: "resources" | "company") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        layout
        className={`relative mx-auto max-w-[1240px] rounded-[20px] border transition-all duration-300 ${
          scrolled || open || activeDropdown !== null
            ? "border-[#ddd7eb] bg-[#fbfaff]/95 shadow-[0_12px_38px_rgba(38,24,78,.09)] backdrop-blur-xl"
            : "border-[#e3ddee]/80 bg-[#fbfaff]/72 backdrop-blur-md"
        }`}
        aria-label="Main navigation"
      >
        <div className="relative flex h-[64px] items-center justify-between px-4 sm:px-5 lg:px-6">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center"
            onClick={() => {
              setOpen(false);
              setActiveDropdown(null);
            }}
            aria-label="Gödel Labs home"
          >
            <Image
              src="/godel-logo-light.svg"
              alt="Gödel Labs"
              width={2066}
              height={854}
              priority
              unoptimized
              className="h-[36px] sm:h-[38px] w-auto"
            />
          </Link>

          {/* Desktop & Tablet Navigation Links & Triggers */}
          <div className="pointer-events-none hidden lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
            <div className="pointer-events-auto flex items-center gap-1.5 lg:gap-2">
              {standardLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setActiveDropdown(null)}
                  className="rounded-full px-3.5 py-1.5 text-[15px] font-medium text-black transition hover:text-[#6d49fd]"
                >
                  {link.label}
                </Link>
              ))}

              {/* Resources Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("resources")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "resources" ? null : "resources")
                  }
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[15px] font-medium transition-all duration-200 ${
                    activeDropdown === "resources"
                      ? "bg-[#6d49fd]/10 font-semibold text-[#6d49fd]"
                      : "text-black hover:text-[#6d49fd]"
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === "resources" ? "rotate-180 text-[#6d49fd]" : "text-[#7b7489]"
                    }`}
                  />
                </button>
              </div>

              {/* Company Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("company")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "company" ? null : "company")
                  }
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[15px] font-medium transition-all duration-200 ${
                    activeDropdown === "company"
                      ? "bg-[#6d49fd]/10 font-semibold text-[#6d49fd]"
                      : "text-black hover:text-[#6d49fd]"
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === "company" ? "rotate-180 text-[#6d49fd]" : "text-[#7b7489]"
                    }`}
                  />
                </button>
              </div>

              {/* Why Gödel */}
              <Link
                href="/#why-godel"
                onClick={(e) => handleNavClick(e, "/#why-godel")}
                onMouseEnter={() => setActiveDropdown(null)}
                className="rounded-full px-3.5 py-1.5 text-[15px] font-medium text-black transition hover:text-[#6d49fd]"
              >
                Why Gödel
              </Link>

              {/* FAQ */}
              <Link
                href="/#faq"
                onClick={(e) => handleNavClick(e, "/#faq")}
                onMouseEnter={() => setActiveDropdown(null)}
                className="rounded-full px-3.5 py-1.5 text-[15px] font-medium text-black transition hover:text-[#6d49fd]"
              >
                FAQ
              </Link>
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

        {/* Desktop Seamless Mega Panel */}
        <div className="hidden lg:block">
          <NavMegaPanel
            isOpen={activeDropdown !== null}
            activeKey={activeDropdown}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            onClose={() => setActiveDropdown(null)}
          />
        </div>

        {/* Improved Mobile & Tablet Navigation Drawer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-[#e8e2f2] px-4 pb-6 pt-4">
                <div className="flex flex-col gap-1.5">
                  {/* Product Link */}
                  <Link
                    href="/#product"
                    onClick={(e) => handleNavClick(e, "/#product")}
                    className="flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold text-[#1c1825] transition hover:bg-[#f4f0fc] hover:text-[#6d49fd]"
                  >
                    Product
                  </Link>

                  {/* Use Cases Link */}
                  <Link
                    href="/#use-cases"
                    onClick={(e) => handleNavClick(e, "/#use-cases")}
                    className="flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold text-[#1c1825] transition hover:bg-[#f4f0fc] hover:text-[#6d49fd]"
                  >
                    Use cases
                  </Link>

                  {/* Resources Mobile Accordion Card */}
                  <div className="rounded-2xl border border-[#ece6f7] bg-[#f9f8fe] p-2.5">
                    <button
                      type="button"
                      onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                      className="flex w-full items-center justify-between px-2 py-1.5 text-base font-semibold text-[#1c1825]"
                    >
                      <span className="flex items-center gap-2.5">
                        <BookOpen className="h-4.5 w-4.5 text-[#6d49fd]" /> Resources
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileResourcesOpen ? "rotate-180 text-[#6d49fd]" : "text-[#8a8298]"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileResourcesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 flex flex-col gap-1.5 border-t border-[#e8e1f5] pt-2.5">
                            <Link
                              href="/blog"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm transition active:scale-[0.98]"
                            >
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd]">
                                <BookOpen className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[#1c1825]">Blog</p>
                                <p className="text-[11px] text-[#736c7e]">Research & updates</p>
                              </div>
                            </Link>

                            <Link
                              href="/blog"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm transition active:scale-[0.98]"
                            >
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd]">
                                <Newspaper className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[#1c1825]">News</p>
                                <p className="text-[11px] text-[#736c7e]">Latest announcements</p>
                              </div>
                            </Link>

                            <Link
                              href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm transition active:scale-[0.98]"
                            >
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd]">
                                <Code className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="flex items-center gap-1 text-sm font-semibold text-[#1c1825]">
                                  Docs <ExternalLink className="h-3 w-3 text-[#9b93a8]" />
                                </p>
                                <p className="text-[11px] text-[#736c7e]">Installation & guides</p>
                              </div>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company Mobile Accordion Card */}
                  <div className="rounded-2xl border border-[#ece6f7] bg-[#f9f8fe] p-2.5">
                    <button
                      type="button"
                      onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                      className="flex w-full items-center justify-between px-2 py-1.5 text-base font-semibold text-[#1c1825]"
                    >
                      <span className="flex items-center gap-2.5">
                        <Building2 className="h-4.5 w-4.5 text-[#6d49fd]" /> Company
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileCompanyOpen ? "rotate-180 text-[#6d49fd]" : "text-[#8a8298]"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileCompanyOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 flex flex-col gap-1.5 border-t border-[#e8e1f5] pt-2.5">
                            <Link
                              href="/about-us"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm transition active:scale-[0.98]"
                            >
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd]">
                                <Building2 className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[#1c1825]">About Us</p>
                                <p className="text-[11px] text-[#736c7e]">Mission & team</p>
                              </div>
                            </Link>

                            <Link
                              href="/about-us#manifesto"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm transition active:scale-[0.98]"
                            >
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd]">
                                <Scroll className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[#1c1825]">Manifesto</p>
                                <p className="text-[11px] text-[#736c7e]">Core principles</p>
                              </div>
                            </Link>

                            <Link
                              href="/demo"
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm transition active:scale-[0.98]"
                            >
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eee9ff] text-[#6d49fd]">
                                <Mail className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[#1c1825]">Contact Us</p>
                                <p className="text-[11px] text-[#736c7e]">Talk to our team</p>
                              </div>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Why Gödel Link */}
                  <Link
                    href="/#why-godel"
                    onClick={(e) => handleNavClick(e, "/#why-godel")}
                    className="flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold text-[#1c1825] transition hover:bg-[#f4f0fc] hover:text-[#6d49fd]"
                  >
                    Why Gödel
                  </Link>

                  {/* FAQ Link */}
                  <Link
                    href="/#faq"
                    onClick={(e) => handleNavClick(e, "/#faq")}
                    className="flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold text-[#1c1825] transition hover:bg-[#f4f0fc] hover:text-[#6d49fd]"
                  >
                    FAQ
                  </Link>
                </div>

                <Link
                  href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#6d49fd] text-base font-semibold text-white shadow-[0_8px_20px_rgba(109,73,253,0.3)] transition-transform duration-150 active:scale-[0.97]"
                >
                  Install Gödel <Download className="h-4.5 w-4.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
