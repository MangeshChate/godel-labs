import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail, validateTurnstile } from "@/app/api/submit-demo/route";

type Submission = {
  email?: unknown;
  source?: unknown;
  website?: unknown;
  challengeResponse?: unknown;
  startedAt?: unknown;
};

type DnsResponse = {
  Status?: number;
  Answer?: Array<{ type: number; data: string }>;
};

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com", "dispostable.com", "dropmail.me", "emailondeck.com",
  "fakeinbox.com", "guerrillamail.com", "maildrop.cc", "mailinator.com",
  "mailnesia.com", "moakt.com", "sharklasers.com", "temp-mail.org",
  "tempmail.com", "throwawaymail.com", "trashmail.com", "yopmail.com",
]);
const DOMAIN_TYPOS: Record<string, string> = {
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gmail.co": "gmail.com",
  "hotmal.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "yaho.com": "yahoo.com",
};
const rateLimits = new Map<string, number[]>();
const recentEmails = new Map<string, number>();
const mailDomainCache = new Map<string, { acceptsMail: boolean; checkedAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAIL_DOMAIN_CACHE_MS = 6 * 60 * 60 * 1000;

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

function getClientIp(request: NextRequest) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const attempts = (rateLimits.get(key) || []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  attempts.push(now);
  rateLimits.set(key, attempts);

  if (rateLimits.size > 1_000) {
    for (const [storedKey, storedAttempts] of rateLimits) {
      if (!storedAttempts.some((time) => now - time < RATE_LIMIT_WINDOW_MS)) rateLimits.delete(storedKey);
    }
  }

  return attempts.length > 5;
}

async function hasMailRecords(domain: string) {
  const cached = mailDomainCache.get(domain);
  if (cached && Date.now() - cached.checkedAt < MAIL_DOMAIN_CACHE_MS) return cached.acceptsMail;

  const query = async (type: "MX" | "A") => {
    const response = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
      { headers: { Accept: "application/dns-json" }, signal: AbortSignal.timeout(5_000) },
    );
    if (!response.ok) throw new Error("Email-domain verification is unavailable");
    return response.json() as Promise<DnsResponse>;
  };

  try {
    const [mx, address] = await Promise.all([query("MX"), query("A")]);
    const hasNullMx = mx.Answer?.some((record) => record.type === 15 && record.data.endsWith(" ."));
    const acceptsMail = !hasNullMx && (
      Boolean(mx.Answer?.some((record) => record.type === 15))
      || (address.Status === 0 && Boolean(address.Answer?.some((record) => record.type === 1)))
    );
    mailDomainCache.set(domain, { acceptsMail, checkedAt: Date.now() });
    return acceptsMail;
  } catch (error) {
    console.warn("Email-domain verification skipped:", error);
    return true;
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) return jsonError("Too many attempts. Please try again in 15 minutes.", 429);

  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return jsonError("Invalid request.", 415);
    }

    const body = (await request.json()) as Submission;
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ success: true, message: "Thank you — your message has been sent." });
    }
    if (typeof body.startedAt !== "number" || Date.now() - body.startedAt < 800) {
      return jsonError("Please wait a moment and try again.", 400);
    }
    if (typeof body.email !== "string" || typeof body.challengeResponse !== "string") {
      return jsonError("Please enter a valid work email address.", 400);
    }

    const email = body.email.trim().toLowerCase();
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return jsonError("Please enter a valid work email address.", 400);
    }

    const [localPart, domain] = email.split("@");
    const usesDisposableDomain = [...DISPOSABLE_DOMAINS].some(
      (blockedDomain) => domain === blockedDomain || domain.endsWith(`.${blockedDomain}`),
    );
    if (
      localPart.length > 64
      || localPart.startsWith(".")
      || localPart.endsWith(".")
      || localPart.includes("..")
      || usesDisposableDomain
    ) {
      return jsonError("Please use a permanent work email address.", 400);
    }
    if (DOMAIN_TYPOS[domain]) {
      return jsonError(`Did you mean ${localPart}@${DOMAIN_TYPOS[domain]}?`, 400);
    }

    const verification = await validateTurnstile(body.challengeResponse);
    if (!verification.success || verification.action !== "email_capture") {
      return jsonError("The security check failed. Please try again.", 400);
    }
    if (!(await hasMailRecords(domain))) {
      return jsonError("That email domain doesn't appear to receive email. Please check the address.", 400);
    }

    const duplicateAt = recentEmails.get(email);
    if (duplicateAt && Date.now() - duplicateAt < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json({
        success: true,
        message: "Thank you — we already received your request and will be in touch soon.",
      });
    }

    const source = body.source === "cta" ? "Homepage final CTA" : "Homepage hero";
    const wasSent = await sendNotificationEmail({
      fullName: `Demo Request (${email})`,
      email,
      company: "",
      source,
      isQuickEmail: true,
    });
    if (!wasSent) {
      return jsonError("We couldn't send your request right now. Please try again shortly.", 502);
    }

    recentEmails.set(email, Date.now());
    return NextResponse.json({
      success: true,
      message: "Thank you — your message has been sent. We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Email capture failed:", error);
    return jsonError("We couldn't send your request right now. Please try again shortly.", 500);
  }
}
