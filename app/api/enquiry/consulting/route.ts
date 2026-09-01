import { NextResponse } from 'next/server';
import { consultingEnquirySchema, fieldErrors } from '@/lib/forms/schemas';
import {
  ATTEMPT_LIMIT,
  SEND_LIMIT,
  WINDOW_MS,
  clientKey,
  looksAutomated,
  rateLimit,
} from '@/lib/forms/rate-limit';
import { sendAcknowledgement, sendNotification } from '@/lib/forms/email';

/**
 * Consulting enquiry handler.
 *
 * Order of controls, cheapest first:
 *   1. Attempt rate limit by client IP -- generous, so a person correcting
 *      genuine validation mistakes is not locked out, but tight enough that a
 *      script cannot probe the schema indefinitely.
 *   2. Schema validation. Nothing downstream sees an unparsed body.
 *   3. Honeypot and timing check. Both return success, so an automated sender
 *      learns nothing about why its submission went nowhere.
 *   4. Send rate limit -- the tighter limit, applied only to submissions that
 *      would actually result in an email.
 *   5. Notification to CER, then acknowledgement to the sender.
 *
 * The recipient address is server-side only and never reaches the browser.
 */

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const attempts = rateLimit(clientKey(request, 'consulting:attempt'), ATTEMPT_LIMIT, WINDOW_MS);
  if (!attempts.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many submissions from this connection. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(attempts.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = consultingEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: fieldErrors(parsed.error),
        message: 'Please check the highlighted fields and try again.',
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot filled, or submitted faster than a human can type. Report success
  // so the sender learns nothing, and send nothing.
  if (data.website || looksAutomated(data.renderedAt)) {
    return NextResponse.json({ ok: true });
  }

  const sends = rateLimit(clientKey(request, 'consulting:send'), SEND_LIMIT, WINDOW_MS);
  if (!sends.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many enquiries from this connection. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(sends.retryAfter) } },
    );
  }

  const notification = await sendNotification({
    subject: `Consulting enquiry — ${data.company} (${data.areaOfInterest})`,
    replyTo: data.email,
    sourcePage: data.sourcePage,
    fields: [
      ['Name', `${data.firstName} ${data.lastName}`],
      ['Work email', data.email],
      ['Company', data.company],
      ['Job title', data.jobTitle],
      ['Country', data.country],
      ['Phone', data.phone],
      ['Area of interest', data.areaOfInterest],
      ['Organisation size', data.organisationSize],
      ['Message', `\n${data.message}`],
      ['Campaign source', data.leadSource?.utmSource],
      ['Campaign medium', data.leadSource?.utmMedium],
      ['Campaign name', data.leadSource?.utmCampaign],
      ['Landing page', data.leadSource?.landingPage],
      ['Referrer', data.leadSource?.referrer],
    ],
  });

  if (!notification.ok) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not send your enquiry just now. Please email enquiry@cer.green and we will pick it up directly.',
      },
      { status: 502 },
    );
  }

  // A failed acknowledgement must not fail the submission -- CER already has
  // the enquiry, which is the part that matters.
  await sendAcknowledgement(data.email, data.firstName, 'consulting');

  return NextResponse.json({ ok: true });
}
