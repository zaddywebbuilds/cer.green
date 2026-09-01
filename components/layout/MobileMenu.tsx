'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { NavItem } from '@/lib/navigation';
import { Logo } from '@/components/layout/Logo';
import { cta } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

/**
 * Full-screen mobile navigation.
 *
 * Behaves as a modal dialog: page scroll is locked while open, focus is moved
 * into the panel and trapped inside it, Escape closes, and focus returns to the
 * element that opened it. Sub-navigation uses native `<details>` so the
 * hierarchy is operable without additional scripting.
 */
export function MobileMenu({
  nav,
  open,
  onClose,
}: {
  nav: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Lock scroll without the layout shift a scrollbar removal would cause.
    const { body } = document;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ivory lg:hidden"
    >
      <div className="shell flex h-18 shrink-0 items-center justify-between border-b border-line">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 font-heading text-[0.95rem] font-semibold text-forest"
        >
          Close
          <span aria-hidden="true" className="text-lg leading-none">
            &times;
          </span>
        </button>
      </div>

      <nav aria-label="Primary" className="shell flex-1 py-6">
        <ul className="flex flex-col divide-y divide-line">
          {nav.map((item) =>
            item.columns?.length ? (
              <li key={item.label}>
                <details className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-heading text-h4 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 place-items-center rounded-full border border-line text-lime-ink transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-5">
                    <Link
                      href={item.href}
                      className="mb-3 inline-flex min-h-11 items-center font-heading text-[0.95rem] font-semibold text-forest"
                    >
                      {`Overview: ${item.label}`}
                    </Link>
                    {item.columns.map((column) => (
                      <div key={column.heading} className="mb-5">
                        <p className="eyebrow mb-2 text-muted">{column.heading}</p>
                        <ul className="flex flex-col">
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="flex min-h-11 items-center text-ink-700"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex min-h-14 items-center font-heading text-h4 font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
          <li>
            <Link
              href="/portal/"
              onClick={() => trackEvent('portal_click')}
              className="flex min-h-14 items-center font-heading text-h4 font-semibold"
            >
              Client Portal
            </Link>
          </li>
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={cta.consulting.href}
            onClick={() => trackEvent('consultation_cta_click', { location: 'mobile_menu' })}
            className="inline-flex min-h-12 items-center justify-center rounded-[3px] bg-forest px-6 font-heading font-semibold text-white"
          >
            {cta.consulting.label}
          </Link>
          <Link
            href={cta.courses.href}
            className="inline-flex min-h-12 items-center justify-center rounded-[3px] border border-forest/25 px-6 font-heading font-semibold text-forest"
          >
            {cta.courses.label}
          </Link>
        </div>
      </nav>
    </div>
  );
}
