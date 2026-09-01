/**
 * Transactional email.
 *
 * Uses Resend over HTTP so there is no SDK dependency and no SMTP credential in
 * the runtime. Swapping to Postmark is a change to `send()` alone.
 *
 * The recipient address lives in a server-only environment variable and is
 * never sent to the browser -- the client posts to an internal route handler,
 * which is what knows where the enquiry goes.
 *
 * With no API key configured (local development), messages are logged rather
 * than sent, so forms can be exercised end to end without a provider account.
 */

import { site } from '@/lib/site';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

interface SendArgs {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

interface SendResult {
  ok: boolean;
  /** True when the message was logged instead of sent. */
  simulated?: boolean;
}

async function send({ to, subject, text, replyTo }: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[email] RESEND_API_KEY or EMAIL_FROM is not configured.');
      return { ok: false };
    }
    console.info(`[email:simulated] to=${to} subject=${subject}\n${text}`);
    return { ok: true, simulated: true };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!response.ok) {
      // Provider responses can contain the recipient address; keep it out of logs.
      console.error(`[email] Provider responded ${response.status}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (error) {
    console.error('[email] Send failed', error instanceof Error ? error.message : error);
    return { ok: false };
  }
}

function recipient(): string {
  return process.env.ENQUIRY_RECIPIENT ?? site.email;
}

/** Renders `label: value` lines, omitting anything empty. */
function lines(fields: Array<[string, unknown]>): string {
  return fields
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([label, value]) => `${label}: ${String(value)}`)
    .join('\n');
}

export interface NotificationArgs {
  subject: string;
  /** Ordered label/value pairs shown in the notification body. */
  fields: Array<[string, unknown]>;
  sourcePage?: string;
  replyTo?: string;
}

/** Structured notification to CER. */
export async function sendNotification({
  subject,
  fields,
  sourcePage,
  replyTo,
}: NotificationArgs): Promise<SendResult> {
  const body = [
    lines(fields),
    '',
    '---',
    lines([
      ['Source page', sourcePage],
      ['Received', new Date().toISOString()],
    ]),
  ].join('\n');

  return send({ to: recipient(), subject, text: body, replyTo });
}

/** Acknowledgement to the person who submitted the form. */
export async function sendAcknowledgement(
  to: string,
  name: string,
  context: 'consulting' | 'academy',
): Promise<SendResult> {
  const subject =
    context === 'academy'
      ? 'We have received your training enquiry -- CER'
      : 'We have received your enquiry -- CER';

  const body = [
    `Dear ${name},`,
    '',
    'Thank you for contacting CER. We have received your enquiry and a member of the team will respond shortly.',
    '',
    context === 'academy'
      ? 'If your enquiry relates to a specific programme, we will come back to you with available dates, delivery formats and, where relevant, options for running the programme in-house.'
      : 'If it would help to speak sooner, reply to this email and we will arrange a time.',
    '',
    'Kind regards',
    'CER',
    site.url,
  ].join('\n');

  return send({ to, subject, text: body });
}
