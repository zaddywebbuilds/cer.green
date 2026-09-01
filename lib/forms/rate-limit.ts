/**
 * Fixed-window rate limiter.
 *
 * In-memory, and therefore per-instance. That is adequate for form abuse on a
 * marketing site: an attacker distributing across instances still lands well
 * inside what the email provider will absorb, and the honeypot plus timing
 * check catch the bulk of automated traffic before this point.
 *
 * If CER later needs a hard guarantee -- or runs many instances -- replace the
 * Map with Upstash Redis or Vercel KV. The interface does not change.
 */

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/** Bounds memory if a large number of distinct keys are seen. */
const MAX_KEYS = 10_000;

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. Sent as `Retry-After` when blocked. */
  retryAfter: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    if (windows.size >= MAX_KEYS) {
      for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
      if (windows.size >= MAX_KEYS) windows.clear();
    }
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }

  return { ok: true, remaining: limit - existing.count, retryAfter };
}

/**
 * Best-effort client identifier. Behind a proxy the leftmost `x-forwarded-for`
 * entry is the client; it is spoofable, which is why this is one control among
 * several rather than the only one.
 */
export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip =
    forwarded?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  return `${scope}:${ip}`;
}

/**
 * Submission limits.
 *
 * `ATTEMPT_LIMIT` covers every request that reaches a form endpoint, including
 * ones that fail validation, so a script cannot probe the schema for free.
 * It is set high enough that a person correcting several genuine mistakes will
 * not be locked out.
 *
 * `SEND_LIMIT` covers submissions that actually pass validation and result in
 * an email, and is the tighter of the two.
 */
export const ATTEMPT_LIMIT = 20;
export const SEND_LIMIT = 5;
export const WINDOW_MS = 10 * 60 * 1000;

/** Rejects submissions completed faster than a human can fill the form. */
export const MIN_FORM_FILL_MS = 3000;

export function looksAutomated(renderedAt: number | undefined): boolean {
  if (typeof renderedAt !== 'number') return false;
  return renderedAt < MIN_FORM_FILL_MS;
}
