'use client';

import Script from 'next/script';
import { useSyncExternalStore } from 'react';
import { getServerSnapshot, getSnapshot, subscribe } from '@/lib/consent';

/**
 * Analytics loader.
 *
 * The GA4 or GTM script is not injected at all until the visitor has consented
 * to analytics cookies. Consent mode alone is not relied on -- the simplest way
 * to guarantee nothing fires early is not to load the tag.
 *
 * Both GA4 (measurement id) and GTM (container id) are supported; configure
 * whichever CER uses. Neither loads when its environment variable is unset, so
 * local development and preview builds stay clean.
 */
export function Analytics() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;

  if (!consent?.analytics) return null;

  return (
    <>
      {gtm ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      ) : null}

      {ga4 && !gtm ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('consent', 'default', {
  ad_storage: '${consent.marketing ? 'granted' : 'denied'}',
  ad_user_data: '${consent.marketing ? 'granted' : 'denied'}',
  ad_personalization: '${consent.marketing ? 'granted' : 'denied'}',
  analytics_storage: 'granted'
});
gtag('config', '${ga4}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}
    </>
  );
}
