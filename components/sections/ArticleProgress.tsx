'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Article engagement tracking.
 *
 * Fires `article_view` on mount and `article_75_percent_scroll` once, when the
 * reader passes three quarters of the page. Uses a passive scroll listener and
 * detaches as soon as the milestone is reached, so it costs nothing for the
 * rest of the session.
 *
 * Both events are no-ops until analytics consent has been given -- see
 * `trackEvent`, which only reaches a dataLayer that the consent gate created.
 */
export function ArticleProgress({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent('article_view', { article: slug });

    let fired = false;

    const onScroll = () => {
      if (fired) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      if (progress >= 0.75) {
        fired = true;
        trackEvent('article_75_percent_scroll', { article: slug });
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  return null;
}
