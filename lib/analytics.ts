/**
 * Analytics event helpers.
 *
 * Events are pushed to the GTM dataLayer when it exists, and to gtag when GA4
 * is loaded directly. Both are no-ops until the visitor has consented to
 * analytics cookies -- see `components/layout/CookieBanner.tsx`.
 *
 * Field values from forms are never sent. Only the fact of an interaction, the
 * page it happened on, and non-identifying context such as the selected area of
 * interest.
 */

export type AnalyticsEvent =
  | 'consultation_cta_click'
  | 'consultation_form_start'
  | 'consultation_form_submit'
  | 'academy_cta_click'
  | 'course_view'
  | 'course_enquiry_submit'
  | 'corporate_training_cta_click'
  | 'corporate_training_submit'
  | 'brochure_download'
  | 'case_study_view'
  | 'expert_profile_view'
  | 'partner_outbound_click'
  | 'article_view'
  | 'article_75_percent_scroll'
  | 'newsletter_signup'
  | 'portal_click'
  | 'phone_click'
  | 'email_click'
  | 'solutions_cta_click'
  | 'contact_cta_click'
  | 'search_performed';

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent | string, payload: EventPayload = {}): void {
  if (typeof window === 'undefined') return;

  const data = {
    event,
    page_path: window.location.pathname,
    ...payload,
  };

  window.dataLayer?.push(data);
  window.gtag?.('event', event, payload);
}

/** UTM and referrer capture, so a form submission carries its lead source. */
export interface LeadSource {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

const STORAGE_KEY = 'cer_lead_source';

/** Records first-touch attribution once per browser session. */
export function captureLeadSource(): void {
  if (typeof window === 'undefined') return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const source: LeadSource = {
      landingPage: window.location.pathname,
      referrer: document.referrer || undefined,
      utmSource: params.get('utm_source') ?? undefined,
      utmMedium: params.get('utm_medium') ?? undefined,
      utmCampaign: params.get('utm_campaign') ?? undefined,
      utmTerm: params.get('utm_term') ?? undefined,
      utmContent: params.get('utm_content') ?? undefined,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(source));
  } catch {
    // Storage can be unavailable in private modes. Attribution is optional.
  }
}

export function getLeadSource(): LeadSource {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadSource) : {};
  } catch {
    return {};
  }
}
