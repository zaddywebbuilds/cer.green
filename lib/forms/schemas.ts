/**
 * Form schemas.
 *
 * The same schema validates on the client and on the server. Client validation
 * is a convenience; the server-side parse is the one that matters, and no route
 * handler trusts a request body that has not passed through it.
 */

import { z } from 'zod';

/** Rejects free-mail domains so that "work email" means what it says. */
const FREE_MAIL = new Set([
  'gmail.com',
  'yahoo.com',
  'yahoo.com.sg',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'qq.com',
  '163.com',
]);

const workEmail = z
  .string()
  .trim()
  .min(1, 'Enter your work email address')
  .max(254, 'That email address is too long')
  .email('Enter a valid email address')
  .refine(
    (value) => !FREE_MAIL.has(value.split('@')[1]?.toLowerCase() ?? ''),
    'Please use your work email address',
  );

const shortText = (label: string, max = 100) =>
  z.string().trim().min(1, `Enter ${label}`).max(max, `${label} is too long`);

const optionalText = (max = 100) => z.string().trim().max(max).optional().or(z.literal(''));

const message = z
  .string()
  .trim()
  .min(10, 'Please tell us a little more -- at least 10 characters')
  .max(4000, 'Please keep your message under 4000 characters');

const consent = z.literal(true, {
  errorMap: () => ({ message: 'Please confirm you accept the privacy policy' }),
});

/**
 * Honeypot. A real browser leaves this empty because it is hidden from view and
 * from assistive technology; automated submissions routinely fill it. This is
 * the primary spam control, in preference to a CAPTCHA that costs every genuine
 * visitor time and creates an accessibility barrier.
 *
 * Deliberately permissive: a filled honeypot must NOT fail validation, because
 * a field-level error would tell the sender the trap exists. The route handler
 * accepts the submission, returns success, and silently discards it.
 */
const honeypot = z.string().max(2000).optional();

/** Milliseconds since the form was rendered. Submissions faster than the
 *  minimum are not human. */
const renderedAt = z.number().int().nonnegative().optional();

const leadSource = z
  .object({
    landingPage: optionalText(500),
    referrer: optionalText(500),
    utmSource: optionalText(200),
    utmMedium: optionalText(200),
    utmCampaign: optionalText(200),
    utmTerm: optionalText(200),
    utmContent: optionalText(200),
  })
  .partial()
  .optional();

export const AREAS_OF_INTEREST = [
  'Carbon & Climate',
  'ESG & Sustainability',
  'Compliance & Standards',
  'Sustainable Finance',
  'Other',
] as const;

export const ORGANISATION_SIZES = [
  'Fewer than 50 employees',
  '50-250 employees',
  '251-1,000 employees',
  'More than 1,000 employees',
] as const;

export const consultingEnquirySchema = z.object({
  firstName: shortText('your first name', 80),
  lastName: shortText('your last name', 80),
  email: workEmail,
  company: shortText('your company name', 160),
  jobTitle: shortText('your job title', 120),
  country: shortText('your country', 80),
  phone: optionalText(40),
  areaOfInterest: z.enum(AREAS_OF_INTEREST, {
    errorMap: () => ({ message: 'Select an area of interest' }),
  }),
  organisationSize: z.enum(ORGANISATION_SIZES).optional(),
  message,
  consent,
  sourcePage: optionalText(500),
  leadSource,
  website: honeypot,
  renderedAt,
});

export type ConsultingEnquiry = z.infer<typeof consultingEnquirySchema>;

export const PARTICIPANT_TYPES = ['Individual', 'Corporate / group'] as const;

export const academyEnquirySchema = z.object({
  name: shortText('your name', 160),
  email: workEmail,
  company: shortText('your company name', 160),
  jobTitle: shortText('your job title', 120),
  country: shortText('your country', 80),
  phone: optionalText(40),
  /** Course slug, or 'general' for an unspecified Academy enquiry. */
  course: shortText('the programme you are interested in', 160),
  participantType: z.enum(PARTICIPANT_TYPES, {
    errorMap: () => ({ message: 'Select whether this is an individual or corporate enquiry' }),
  }),
  participants: z
    .union([z.coerce.number().int().min(1).max(10000), z.literal('')])
    .optional(),
  preferredDate: optionalText(60),
  message: message.or(z.literal('')).optional(),
  consent,
  sourcePage: optionalText(500),
  leadSource,
  website: honeypot,
  renderedAt,
});

export type AcademyEnquiry = z.infer<typeof academyEnquirySchema>;

export const newsletterSchema = z.object({
  email: workEmail,
  consent,
  sourcePage: optionalText(500),
  website: honeypot,
});

export type NewsletterSignup = z.infer<typeof newsletterSchema>;

/** Formats a ZodError into a field-keyed map the form components render. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
