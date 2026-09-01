import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Eyebrow, Section } from '@/components/ui/primitives';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { buildCrumbs, type Crumb } from '@/lib/seo';
import { slugify } from '@/lib/utils';

export interface LegalSection {
  heading: string;
  body?: string[];
  list?: string[];
  /** Definition rows, for tables of data categories or cookie types. */
  rows?: Array<{ term: string; detail: string }>;
}

/**
 * Shared layout for privacy, terms and cookie pages.
 *
 * Legal content is long and structurally identical across the three pages, so
 * it is described as data and rendered once. Each page supplies its own
 * sections; the contents list, anchors and last-updated line come from here.
 */
export function LegalPage({
  title,
  intro,
  sections,
  lastUpdated,
  crumbLabel,
  href,
  children,
}: {
  title: string;
  intro: string[];
  sections: LegalSection[];
  lastUpdated: string;
  crumbLabel: string;
  href: string;
  children?: React.ReactNode;
}) {
  const crumbs: Crumb[] = buildCrumbs({ label: crumbLabel, href });

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" size="sm" labelledBy="legal-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Legal</Eyebrow>
        <h1 id="legal-h1" className="mt-5 max-w-[20ch] text-h2">
          {title}
        </h1>
        <p className="mt-6 text-sm text-muted-invert">Last updated: {lastUpdated}</p>
      </Section>

      <Section surface="ivory" labelledBy="legal-body">
        <h2 id="legal-body" className="sr-only">
          {title}
        </h2>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-labelledby="legal-toc">
              <h3 id="legal-toc" className="eyebrow text-lime-ink">
                Contents
              </h3>
              <ol className="mt-4 flex flex-col gap-2 border-l border-line pl-4 text-sm">
                {sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="text-muted underline-offset-4 hover:text-forest hover:underline"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="prose-cer">
            {intro.map((paragraph) => (
              <p key={paragraph} className="text-lead">
                {paragraph}
              </p>
            ))}

            {sections.map((section) => {
              const id = slugify(section.heading);
              return (
                <section key={section.heading} aria-labelledby={id}>
                  <h2 id={id}>{section.heading}</h2>
                  {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.list?.length ? (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.rows?.length ? (
                    <div className="not-prose table-scroll my-6">
                      <table className="w-full min-w-[32rem] border-collapse text-left text-[0.95rem]">
                        <tbody>
                          {section.rows.map((row) => (
                            <tr key={row.term} className="border-b border-line align-top">
                              <th
                                scope="row"
                                className="w-1/3 py-3 pr-6 font-heading text-sm font-semibold"
                              >
                                {row.term}
                              </th>
                              <td className="py-3 text-ink-700">{row.detail}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </section>
              );
            })}

            {children}
          </div>
        </div>
      </Section>
    </>
  );
}
