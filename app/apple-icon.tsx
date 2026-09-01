import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

/**
 * Apple touch icon.
 *
 * Generated as a PNG at build time. iOS does not accept SVG for the home
 * screen icon, and generating it avoids committing a binary asset.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          background: '#123C32',
        }}
      >
        <div style={{ width: 26, height: 26, borderRadius: 13, background: '#C4DE6B' }} />
        <div
          style={{ width: 26, height: 26, borderRadius: 13, background: '#F6F4EE', opacity: 0.85 }}
        />
        <div
          style={{ width: 26, height: 26, borderRadius: 13, background: '#F6F4EE', opacity: 0.55 }}
        />
      </div>
    ),
    size,
  );
}
