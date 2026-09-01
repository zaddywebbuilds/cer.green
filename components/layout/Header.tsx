'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/navigation';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { cta } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Sticky primary navigation.
 *
 * Accessibility decisions worth knowing about:
 *   - Mega menu triggers are `<button>` with `aria-expanded` and `aria-controls`.
 *     A keyboard user opens with Enter or Space, and the panel is a plain list
 *     of links, so Tab moves through it in reading order.
 *   - Hover opens the panel for pointer users, but hover alone never traps
 *     focus and never blocks the trigger from being activated.
 *   - Escape closes the open panel and returns focus to its trigger.
 *   - Focus leaving the header closes any open panel, so tabbing past the nav
 *     does not leave an orphaned panel on screen.
 */
export function Header({ nav }: { nav: NavItem[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuIdBase = useId();
  const pathname = usePathname();

  // Route change closes everything; a panel must not survive navigation.
  // Adjusted during render rather than in an effect, so the menu is already
  // closed on the first paint of the new route instead of flashing open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(
    (returnFocus?: string) => {
      setOpenMenu(null);
      if (returnFocus) triggerRefs.current[returnFocus]?.focus();
    },
    [],
  );

  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close(openMenu);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openMenu, close]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Small delay so the pointer can cross the gap between trigger and panel.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenMenu(null);
      }}
      className={cn(
        'sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur-sm transition-shadow duration-200',
        scrolled ? 'border-line shadow-[0_1px_16px_rgba(22,26,24,0.06)]' : 'border-transparent',
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-6 md:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const menuId = `${menuIdBase}-${item.label}`;
              const hasPanel = Boolean(item.columns?.length);
              const isOpen = openMenu === item.label;

              if (!hasPanel) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-11 items-center rounded-[2px] px-3.5 font-heading text-[0.95rem] font-medium',
                        isCurrent(item.href) ? 'text-forest' : 'text-ink-700 hover:text-forest',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.label}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[item.label] = el;
                    }}
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={cn(
                      'inline-flex min-h-11 items-center gap-1.5 rounded-[2px] px-3.5 font-heading text-[0.95rem] font-medium',
                      isCurrent(item.href) || isOpen
                        ? 'text-forest'
                        : 'text-ink-700 hover:text-forest',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'text-[0.6em] transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                    >
                      &#9660;
                    </span>
                  </button>

                  {isOpen ? (
                    <div
                      id={menuId}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className="absolute inset-x-0 top-full border-y border-line bg-white shadow-[0_20px_40px_-24px_rgba(22,26,24,0.25)]"
                    >
                      <div className="shell grid gap-10 py-10 lg:grid-cols-[1fr_auto]">
                        <div
                          className={cn(
                            'grid gap-x-10 gap-y-8',
                            (item.columns?.length ?? 0) > 2 ? 'lg:grid-cols-4' : 'lg:grid-cols-2',
                          )}
                        >
                          {item.columns?.map((column) => (
                            <div key={column.heading}>
                              <h2 className="eyebrow mb-4 text-lime-ink">
                                <Link href={column.href} className="hover:underline">
                                  {column.heading}
                                </Link>
                              </h2>
                              <ul className="flex flex-col gap-1">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="block rounded-[2px] py-1.5 text-[0.95rem] text-ink-700 hover:text-forest"
                                    >
                                      {link.label}
                                      {link.description ? (
                                        <span className="mt-0.5 block text-sm text-muted">
                                          {link.description}
                                        </span>
                                      ) : null}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {item.featured ? (
                          <div className="max-w-xs rounded-(--radius-card) bg-forest p-7 text-white lg:w-80">
                            <p className="font-heading text-h4 font-semibold">
                              {item.featured.title}
                            </p>
                            <p className="mt-3 text-sm text-muted-invert">{item.featured.body}</p>
                            <Link
                              href={item.featured.cta.href}
                              className="mt-5 inline-flex min-h-11 items-center font-heading text-[0.95rem] font-semibold text-lime hover:text-white"
                            >
                              {item.featured.cta.label}{' '}
                              <span aria-hidden="true" className="ml-2">
                                &rarr;
                              </span>
                            </Link>
                          </div>
                        ) : null}
                      </div>

                      {item.viewAll ? (
                        <div className="border-t border-line bg-ivory">
                          <div className="shell py-4">
                            <Link
                              href={item.viewAll.href}
                              className="inline-flex min-h-11 items-center font-heading text-[0.95rem] font-semibold text-forest hover:text-lime-ink"
                            >
                              {item.viewAll.label}{' '}
                              <span aria-hidden="true" className="ml-2">
                                &rarr;
                              </span>
                            </Link>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/portal/"
            onClick={() => trackEvent('portal_click')}
            className="font-heading text-[0.95rem] font-medium text-ink-700 hover:text-forest"
          >
            Client Portal
          </Link>
          <Link
            href={cta.consulting.href}
            onClick={() => trackEvent('consultation_cta_click', { location: 'header' })}
            className="inline-flex min-h-11 items-center rounded-[3px] bg-forest px-5 font-heading text-[0.95rem] font-semibold text-white hover:bg-forest-500"
          >
            {cta.consulting.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[2px] font-heading text-[0.95rem] font-semibold text-forest lg:hidden"
        >
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
          </span>
          Menu
        </button>
      </div>

      <MobileMenu nav={nav} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
