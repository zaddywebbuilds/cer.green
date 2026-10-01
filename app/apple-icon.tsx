import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

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
          background: '#123C32',
          borderRadius: 90,
        }}
      >
        <div
          style={{
            width: 158,
            height: 158,
            borderRadius: 79,
            border: '5px solid #C9A84C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 54,
              fontWeight: 700,
              color: '#C4DE6B',
              letterSpacing: '-2px',
            }}
          >
            CER
          </span>
        </div>
      </div>
    ),
    size,
  );
}
