'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { Honeypot } from '@/components/forms/fields';
import { trackEvent } from '@/lib/analytics';

/** Newsletter signup. Sits in the footer on a dark surface. */
export function NewsletterForm() {
  const id = useId();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, unknown>;
    data.consent = data.consent === 'true';
    data.sourcePage = window.location.pathname;

    try {
      const response = await fetch('/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.errors?.email ?? payload.message ?? 'Please check your email address.');
        setStatus('error');
        return;
      }

      trackEvent('newsletter_signup');
      setStatus('success');
      form.reset();
    } catch {
      setError('We could not reach the server. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
      <div>
        <h2 className="font-heading text-h4 font-semibold text-white">
          Regulatory and technical updates
        </h2>
        <p className="mt-2 max-w-[52ch] text-sm text-muted-invert">
          Occasional analysis on carbon, ESG and sustainability requirements affecting
          organisations in Singapore and across Asia. No marketing sequences.
        </p>
      </div>

      {status === 'success' ? (
        <p role="status" className="text-sm text-lime">
          Thank you — please check your inbox to confirm your subscription.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
          <Honeypot />
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor={id} className="sr-only">
                Work email address
              </label>
              <input
                id={id}
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                autoComplete="email"
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className="min-h-12 w-full rounded-[3px] border border-line-invert bg-forest-700 px-3.5 py-3 text-white placeholder:text-muted-invert/70"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex min-h-12 items-center justify-center rounded-[3px] bg-lime px-6 font-heading font-semibold text-forest-900 transition-colors hover:bg-white disabled:opacity-70"
            >
              {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>

          <div className="flex gap-2.5">
            <input
              id={`${id}-consent`}
              name="consent"
              type="checkbox"
              value="true"
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[--color-lime]"
            />
            <label htmlFor={`${id}-consent`} className="text-xs text-muted-invert">
              I agree to receive email updates from CER and understand I can unsubscribe at any
              time. See the{' '}
              <Link href="/privacy-policy/" className="underline underline-offset-4">
                privacy policy
              </Link>
              .
            </label>
          </div>

          {error ? (
            <p id={`${id}-error`} role="alert" className="text-sm text-lime">
              {error}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
