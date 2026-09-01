'use client';

import { useEffect, useRef, useState } from 'react';
import { captureLeadSource, getLeadSource, trackEvent } from '@/lib/analytics';

const W3F = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function useEnquiryForm({
  startEvent,
  submitEvent,
}: {
  endpoint?: string;
  startEvent?: string;
  submitEvent: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const mountedAt = useRef<number | null>(null);
  const started = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
    captureLeadSource();
  }, []);

  useEffect(() => {
    if (status === 'error' && formError) errorRef.current?.focus();
    if (status === 'success') successRef.current?.focus();
  }, [status, formError]);

  const onFirstInteraction = () => {
    if (started.current || !startEvent) return;
    started.current = true;
    trackEvent(startEvent);
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Client-side honeypot: silently succeed so bots learn nothing.
    const honeypot = formData.get('website');
    if (honeypot && String(honeypot).length > 0) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setFormError(null);

    const data = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    data.consent = data.consent === 'true';
    if (mountedAt.current !== null) data.renderedAt = Date.now() - mountedAt.current;
    data.sourcePage = window.location.pathname + window.location.search;
    data.leadSource = getLeadSource();

    try {
      const response = await fetch(W3F, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !payload.success) {
        setFormError(
          payload.message ??
            'We could not send your enquiry. Please try again or email us directly.',
        );
        setStatus('error');
        return;
      }

      trackEvent(submitEvent);
      setStatus('success');
      form.reset();
    } catch {
      setFormError(
        'We could not reach the server. Check your connection and try again, or email us directly.',
      );
      setStatus('error');
    }
  }

  return {
    status,
    errors: {} as Record<string, string>,
    formError,
    submit,
    onFirstInteraction,
    errorRef,
    successRef,
    isSubmitting: status === 'submitting',
  };
}
