"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function DemoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    const emailParam = searchParams?.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Prevent double rendering in React Strict Mode
    if (isRendered.current) return;

    const renderTurnstile = () => {
      if (turnstileRef.current && window.turnstile && !widgetId.current) {
        try {
          widgetId.current = window.turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            'error-callback': () => {
              setTurnstileToken("");
            },
            theme: 'light',
            size: window.innerWidth < 380 ? 'compact' : 'normal',
          });
          isRendered.current = true;
        } catch (error) {
          console.error('Failed to render Turnstile:', error);
        }
      }
    };

    // Check if script is already loaded
    if (window.turnstile) {
      renderTurnstile();
    } else {
      // Load Turnstile script
      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
      if (existingScript) {
        existingScript.addEventListener('load', renderTurnstile);
      } else {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        script.onload = renderTurnstile;
        document.head.appendChild(script);
      }
    }

    return () => {
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
          widgetId.current = null;
          isRendered.current = false;
        } catch (error) {
          console.error('Failed to remove Turnstile:', error);
        }
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      setSubmitMessage({ type: 'error', text: 'Please complete the security check' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      building: formData.get('building'),
      source: formData.get('source'),
      turnstileToken,
    };

    try {
      const response = await fetch('/api/submit-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Thank you! We\'ll be in touch within 24 hours.' });

        try {
          form.reset();
          setTurnstileToken("");
          if (widgetId.current && window.turnstile) {
            window.turnstile.reset(widgetId.current);
          }

          // Redirect to home after 3 seconds
          setTimeout(() => {
            router.push('/');
          }, 3000);
        } catch (resetError) {
          console.error('Error resetting form:', resetError);
        }
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage({ type: 'error', text: 'There was an error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName = "w-full rounded-[14px] border border-[#ded8eb] bg-[#fbfaff] px-4 py-3 text-sm text-[#211d2c] outline-none transition placeholder:text-[#aaa3b5] hover:border-[#c9c0df] focus:border-[#6d49fd] focus:bg-white focus:ring-4 focus:ring-[#6d49fd]/10";
  const labelClassName = "block text-[10px] font-bold uppercase tracking-[0.12em] text-[#777082]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      <section className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_50%_15%,rgba(109,73,253,.18),transparent_58%)]" />

        <div className="relative mx-auto max-w-[760px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="rounded-[26px] border border-[#dcd5ed] bg-white/80 px-5 py-7 shadow-[0_28px_85px_rgba(53,34,112,.11)] backdrop-blur-xl sm:rounded-[32px] sm:px-9 sm:py-9">
            <div className="mb-6 flex items-center justify-between border-b border-[#e7e1ef] pb-5">
              <Link href="/" className="group inline-flex min-h-9 items-center gap-2 rounded-full border border-[#ddd6eb] bg-white/70 px-3.5 text-[11px] font-semibold text-[#777082] transition hover:border-[#b9a9ed] hover:text-[#6d49fd]">
                <span className="transition group-hover:-translate-x-0.5">←</span> Back
              </Link>
              <h1 className="text-base font-semibold tracking-[-0.025em] text-[#211d2c] sm:text-lg">Request a demo</h1>
              <span className="w-[68px]" aria-hidden="true" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className={labelClassName}>Full name <span className="text-[#6d49fd]">*</span></label>
                    <input type="text" id="fullName" name="fullName" required autoComplete="name" className={fieldClassName} placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className={labelClassName}>Work email <span className="text-[#6d49fd]">*</span></label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={fieldClassName} placeholder="jane@company.com" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="company" className={labelClassName}>Company <span className="text-[#6d49fd]">*</span></label>
                    <input type="text" id="company" name="company" required autoComplete="organization" className={fieldClassName} placeholder="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className={labelClassName}>Phone <span className="font-medium normal-case tracking-normal text-[#aaa3b5]">Optional</span></label>
                    <input type="tel" id="phone" name="phone" autoComplete="tel" pattern="[+]?[0-9\s\-()]{7,20}" title="Please enter a valid phone number" className={fieldClassName} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="building" className={labelClassName}>What are you building?</label>
                  <textarea id="building" name="building" rows={4} className={`${fieldClassName} resize-none`} placeholder="Tell us about your agents, sensitive data, tools, or security requirements." />
                </div>

                <div className="space-y-2">
                  <label htmlFor="source" className={labelClassName}>How did you hear about us?</label>
                  <div className="relative">
                    <select id="source" name="source" defaultValue="" className={`${fieldClassName} appearance-none pr-10`}>
                      <option value="" disabled>Select an option</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">Twitter / X</option>
                      <option value="hackernews">Hacker News</option>
                      <option value="github">GitHub</option>
                      <option value="search">Search engine</option>
                      <option value="colleague">Colleague / Friend</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#8f879b]">⌄</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={labelClassName}>Security check</span>
                  <div className="overflow-x-auto rounded-[14px] border border-[#e4deef] bg-[#fbfaff] p-2.5"><div ref={turnstileRef} className="flex min-h-[65px] items-center justify-center" /></div>
                </div>

                <button type="submit" disabled={isSubmitting || !turnstileToken} className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#6d49fd] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(109,73,253,.22)] transition hover:-translate-y-0.5 hover:bg-[#5e32ff] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0">
                  {isSubmitting ? "Submitting…" : "Request my demo"}<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
            </form>

            {submitMessage && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status" className={`mt-5 rounded-[16px] border p-4 ${submitMessage.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
                <p className="text-sm font-semibold">{submitMessage.text}</p>
                {submitMessage.type === "success" && <p className="mt-1 text-xs opacity-75">Redirecting to the homepage…</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={null}>
      <DemoForm />
    </Suspense>
  );
}
