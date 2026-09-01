/**
 * Emits a JSON-LD document.
 *
 * Server-rendered so the markup is present in the initial HTML and does not
 * depend on hydration to be crawled.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from typed content models, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
