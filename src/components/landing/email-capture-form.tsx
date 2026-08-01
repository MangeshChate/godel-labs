"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

type EmailCaptureFormProps = {
  source: "hero" | "cta";
  buttonLabel: string;
  theme?: "light" | "purple";
};

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function EmailCaptureForm({
  source,
  buttonLabel,
  theme = "light",
}: EmailCaptureFormProps) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const pendingSubmissionRef = useRef(false);
  const mountedAtRef = useRef(0);
  const emailRef = useRef("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submitEmail = async (turnstileToken: string) => {
    const form = formRef.current;
    if (!form) return;
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current.trim(),
          source,
          website: new FormData(form).get("website"),
          challengeResponse: turnstileToken,
          startedAt: mountedAtRef.current,
        }),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "We couldn't send your request. Please try again.");

      setStatus("success");
      setMessage(result.message || "Thank you — your message has been sent. We'll be in touch soon.");
      setEmail("");
      emailRef.current = "";
      mountedAtRef.current = Date.now();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We couldn't send your request. Please try again.");
    } finally {
      pendingSubmissionRef.current = false;
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    }
  };

  useEffect(() => {
    let cancelled = false;
    mountedAtRef.current = Date.now();
    const renderWidget = () => {
      if (cancelled || !turnstileRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000BB",
        size: "invisible",
        execution: "execute",
        appearance: "execute",
        action: "email_capture",
        callback: (token) => {
          if (pendingSubmissionRef.current) void submitEmail(token);
        },
        "error-callback": () => {
          pendingSubmissionRef.current = false;
          setStatus("error");
          setMessage("The security check failed. Please try again.");
        },
        "expired-callback": () => {
          pendingSubmissionRef.current = false;
          setStatus("idle");
        },
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const selector = 'script[src*="challenges.cloudflare.com/turnstile"]';
      let script = document.querySelector<HTMLScriptElement>(selector);
      if (!script) {
        script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", renderWidget);
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
    // The widget is intentionally created once per mounted form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "verifying" || status === "sending") return;

    const trimmedEmail = email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail) || trimmedEmail.length > 254) {
      setStatus("error");
      setMessage("Please enter a valid work email address.");
      return;
    }
    if (!widgetIdRef.current || !window.turnstile) {
      setStatus("error");
      setMessage("The security check is still loading. Please try again in a moment.");
      return;
    }

    emailRef.current = trimmedEmail;
    pendingSubmissionRef.current = true;
    setStatus("verifying");
    setMessage("");
    window.turnstile.execute(widgetIdRef.current);
  };

  const isPurple = theme === "purple";
  const isBusy = status === "verifying" || status === "sending";

  if (status === "success") {
    return (
      <div role="status" className={`flex min-h-[52px] w-full items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold ${isPurple ? "border-white/40 bg-white/15 text-white" : "border-emerald-200 bg-emerald-50/90 text-emerald-800"}`}>
        <Check className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className={`group/form relative flex w-full items-center rounded-full border p-1.5 shadow-xl backdrop-blur-xl transition-all ${isPurple ? "border-white/35 bg-white/15 focus-within:border-white focus-within:bg-white/25 hover:border-white/50" : "border-[#ddd7eb] bg-white/90 shadow-[0_10px_30px_rgba(109,73,253,0.08)] focus-within:border-[#6d49fd] focus-within:shadow-[0_12px_36px_rgba(109,73,253,0.18)] hover:border-[#b9a9ed]"}`}
      >
        <label htmlFor={formId} className="sr-only">Work email</label>
        <input
          id={formId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            emailRef.current = event.target.value;
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="Enter your work email"
          aria-describedby={`${formId}-message`}
          aria-invalid={status === "error"}
          className={`w-full min-w-0 flex-1 bg-transparent px-4 py-2.5 text-xs outline-none sm:px-5 sm:text-sm ${isPurple ? "text-white placeholder:text-white/70" : "text-[#111322] placeholder:text-[#918a9e]"}`}
        />
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0" />
        <div ref={turnstileRef} className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={isBusy}
          className={`group/btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold shadow-md transition-all duration-300 disabled:cursor-wait disabled:opacity-70 sm:px-5 ${isPurple ? "bg-white text-[#6d49fd] hover:bg-[#111322] hover:text-white" : "bg-[#6d49fd] py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(109,73,253,0.25)] hover:bg-[#5e32ff] hover:shadow-[0_8px_25px_rgba(109,73,253,0.35)] active:scale-[0.98]"}`}
        >
          <span>{isBusy ? (status === "verifying" ? "Checking…" : "Sending…") : buttonLabel}</span>
          {isBusy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${isPurple ? "" : "rotate-45 group-hover/btn:rotate-0"}`} aria-hidden="true" />}
        </button>
      </form>
      <p id={`${formId}-message`} role={status === "error" ? "alert" : "status"} className={`mt-2 min-h-4 px-4 text-xs ${status === "error" ? (isPurple ? "text-white" : "text-rose-600") : "sr-only"}`}>
        {message}
      </p>
    </div>
  );
}
