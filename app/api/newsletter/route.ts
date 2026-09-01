import { NextResponse } from 'next/server';
import { fieldErrors, newsletterSchema } from '@/lib/forms/schemas';
import { ATTEMPT_LIMIT, WINDOW_MS, clientKey, rateLimit } from '@/lib/forms/rate-limit';
import { sendNotification } from '@/lib/forms/email';

/**
 * Newsletter signup.
 *
 * Records the request with CER rather than writing directly to a mailing list,
 * because CER has not yet selected an email platform. When one is chosen, add
 * the provider call here -- the client contract does not change.
 *
 * Note this is a single opt-in record. Confirmed opt-in (sending a confirmation
 * link before subscribing) should be handled by the email platform.
 */

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, 'newsletter'), ATTEMPT_LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many attempts. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });

  const result = await sendNotification({
    subject: `Newsletter signup — ${data.email}`,
    sourcePage: data.sourcePage,
    fields: [
      ['Email', data.email],
      ['Consent given', 'Yes'],
    ],
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: 'We could not complete your subscription. Please try again.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
