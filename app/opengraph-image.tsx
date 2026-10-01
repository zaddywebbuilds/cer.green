import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Default social sharing image.
 *
 * Generated at build time as a real PNG, so it works everywhere OG images are
 * consumed (LinkedIn in particular does not render SVG). Using the file
 * convention means Next fingerprints the URL and emits the meta tags, and no
 * binary asset has to be committed to the repository.
 *
 * A page can override this by setting `seo.ogImage`.
 */
export const alt = `${site.name}: ${site.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#123C32',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#C4DE6B',
              borderRadius: '6px',
              padding: '14px 16px',
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: '#123C32' }} />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: '#123C32',
                opacity: 0.7,
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: '#123C32',
                opacity: 0.45,
              }}
            />
          </div>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 46,
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            CER
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: '#FFFFFF',
            fontSize: 60,
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            fontWeight: 600,
            maxWidth: '950px',
          }}
        >
          Turning sustainability requirements into measurable business action.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid #23493E',
            paddingTop: '28px',
            color: '#A8BDB2',
            fontSize: 26,
          }}
        >
          <div style={{ display: 'flex' }}>Singapore-based. Asia-focused.</div>
          <div style={{ display: 'flex', color: '#C4DE6B' }}>cer.green</div>
        </div>
      </div>
    ),
    size,
  );
}
