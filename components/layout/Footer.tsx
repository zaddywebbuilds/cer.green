import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { footerNav, legalNav } from '@/lib/navigation';
import { site } from '@/lib/site';
import { IfVerified } from '@/components/ui/Verify';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white on-dark" data-surface="dark">
      <div className="shell py-(--spacing-section-sm)">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="max-w-sm">
            <Logo onDark />
            <p className="mt-5 text-muted-invert">{site.positioning}</p>
            <p className="mt-4 text-sm text-muted-invert">{site.descriptor}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((column) => (
              <nav key={column.heading} aria-labelledby={`footer-${column.heading}`}>
                <h2 id={`footer-${column.heading}`} className="eyebrow text-lime">
                  {column.heading}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.95rem] text-muted-invert hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 id="footer-connect" className="eyebrow text-lime">
                Connect
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[0.95rem] text-muted-invert hover:text-white"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-[0.95rem] text-muted-invert hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <Link href="/portal/" className="text-[0.95rem] text-muted-invert hover:text-white">
                    Client Portal login
                  </Link>
                </li>
              </ul>

              <address className="mt-5 text-[0.95rem] not-italic text-muted-invert">
                <IfVerified value={site.address.street}>
                  {(street) => (
                    <>
                      {street}
                      <br />
                    </>
                  )}
                </IfVerified>
                {site.address.locality}
                <IfVerified value={site.address.postalCode}>
                  {(postal) => <> {postal}</>}
                </IfVerified>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line-invert pt-10">
          <NewsletterForm />
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line-invert pt-8 text-sm text-muted-invert md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p>
              &copy; {year} {site.legalName}. All rights reserved.
            </p>
            <IfVerified value={site.uen}>
              {(uen) => <p>UEN {uen}</p>}
            </IfVerified>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
