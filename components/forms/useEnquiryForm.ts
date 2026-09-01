'use client';

import { useEffect, useRef, useState } from 'react';
import { captureLeadSource, getLeadSource, trackEvent } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Shared submission behaviour for every enquiry form.
 *
 * Covers the cases the QA checklist requires: double submission is blocked
 * while a request is in flight, network failure produces a readable message
 * rather than an unhandled rejection, server-side field errors are mapped back
 * onto their inputs, and the time the form spent on screen is sent so the
 * server can reject submissions completed faster than a human could type.
 */
export function useEnquiryForm({
  endpoint,
  startEvent,
  submitEvent,
}: {
  endpoint: string;
  startEvent?: string;
  submitEvent: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  // Set on mount rather than during render: reading the clock while rendering
  // is impure, and the value is only ever needed once the form is submitted.
  const mountedAt = useRef<number | null>(null);
  const started = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
    captureLeadSource();
  }, []);

  // Move focus to the message so the outcome is announced, not just displayed.
  useEffect(() => {
    if (status === 'error' && formError) errorRef.current?.focus();
    if (status === 'success') successRef.current?.focus();
  }, [status, formError]);

  /** Fires once, when the visitor first interacts with any field. */
  const onFirstInteraction = () => {
    if (started.current || !startEvent) return;
    started.current = true;
    trackEvent(startEvent);
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrors({});
    setFormError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, unknown>;

    // Checkboxes are absent from FormData when unchecked.
    data.consent = data.consent === 'true';
    data.renderedAt = mountedAt.current === null ? undefined : Date.now() - mountedAt.current;
    data.sourcePage = window.location.pathname + window.location.search;
    data.leadSource = getLeadSource();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? {});
        setFormError(
          payload.message ??
            (response.status === 429
              ? 'Too many submissions from this connection. Please try again shortly.'
              : 'We could not send your enquiry. Please check the highlighted fields and try again.'),
        );
        setStatus('error');
        return;
      }

      trackEvent(submitEvent);
      setStatus('success');
      form.reset();
    } catch {
      setFormError(
        `We could not reach the server. Check your connection and try again, or email us directly.`,
      );
      setStatus('error');
    }
  }

  return {
    status,
    errors,
    formError,
    submit,
    onFirstInteraction,
    errorRef,
    successRef,
    isSubmitting: status === 'submitting',
  };
}
