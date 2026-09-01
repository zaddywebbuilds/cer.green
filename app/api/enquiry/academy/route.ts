import { NextResponse } from 'next/server';
import { academyEnquirySchema, fieldErrors } from '@/lib/forms/schemas';
import {
  ATTEMPT_LIMIT,
  SEND_LIMIT,
  WINDOW_MS,
  clientKey,
  looksAutomated,
  rateLimit,
} from '@/lib/forms/rate-limit';
import { sendAcknowledgement, sendNotification } from '@/lib/forms/email';
import { getCourse } from '@/lib/content';

/** Academy and corporate training enquiry handler. See the consulting route
 *  for the rationale behind the order of controls. */

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const attempts = rateLimit(clientKey(request, 'academy:attempt'), ATTEMPT_LIMIT, WINDOW_MS);
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

  const parsed = academyEnquirySchema.safeParse(body);
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

  if (data.website || looksAutomated(data.renderedAt)) {
    return NextResponse.json({ ok: true });
  }

  const sends = rateLimit(clientKey(request, 'academy:send'), SEND_LIMIT, WINDOW_MS);
  if (!sends.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many enquiries from this connection. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(sends.retryAfter) } },
    );
  }

  // The course field carries a slug when submitted from a course page. Resolve
  // it to a title so the notification is readable without a lookup.
  const course = getCourse(data.course);
  const programme = course?.title ?? data.course;
  const isCorporate = data.participantType === 'Corporate / group';

  const notification = await sendNotification({
    subject: `${isCorporate ? 'Corporate training' : 'Course'} enquiry — ${programme} — ${data.company}`,
    replyTo: data.email,
    sourcePage: data.sourcePage,
    fields: [
      ['Name', data.name],
      ['Work email', data.email],
      ['Company', data.company],
      ['Job title', data.jobTitle],
      ['Country', data.country],
      ['Phone', data.phone],
      ['Programme', programme],
      ['Enquiry type', data.participantType],
      ['Participants', data.participants],
      ['Preferred date', data.preferredDate],
      ['Message', data.message ? `\n${data.message}` : undefined],
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

  await sendAcknowledgement(data.email, data.name.split(' ')[0] ?? data.name, 'academy');

  return NextResponse.json({ ok: true });
}
