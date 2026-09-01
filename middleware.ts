import { NextResponse, type NextRequest } from 'next/server';
import { isGone } from '@/lib/redirects';

/**
 * Edge middleware.
 *
 * Two jobs:
 *
 * 1. Return 410 Gone for the workflow, upload-step and WordPress URLs that the
 *    previous site exposed to search engines. A 410 removes them from the index
 *    decisively; a redirect would keep them alive as ranking signals for pages
 *    that should never have been public.
 *
 * 2. Keep staging out of the index. When DEPLOY_ENV is not `production` every
 *    response carries `X-Robots-Tag: noindex`, so a preview deployment cannot
 *    be crawled even if someone links to it.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isGone(pathname)) {
    return new NextResponse(
      'This page has been permanently removed.',
      {
        status: 410,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
          'Cache-Control': 'public, max-age=3600',
        },
      },
    );
  }

  const response = NextResponse.next();

  if (process.env.DEPLOY_ENV !== 'production') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  return response;
}

export const config = {
  // Static assets and image optimisation are excluded; they do not need either
  // behaviour and matching them would cost latency on every asset.
  matcher: ['/((?!_next/static|_next/image|favicon.svg|og/|brand/).*)'],
};
