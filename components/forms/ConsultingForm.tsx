'use client';

import Link from 'next/link';
import {
  ConsentField,
  FormError,
  Honeypot,
  SelectField,
  TextArea,
  TextField,
} from '@/components/forms/fields';
import { useEnquiryForm } from '@/components/forms/useEnquiryForm';
import { AREAS_OF_INTEREST, ORGANISATION_SIZES } from '@/lib/forms/schemas';
import { site } from '@/lib/site';

export function ConsultingForm({ defaultArea }: { defaultArea?: string }) {
  const {
    status,
    errors,
    formError,
    submit,
    onFirstInteraction,
    errorRef,
    successRef,
    isSubmitting,
  } = useEnquiryForm({
    endpoint: '/api/enquiry/consulting/',
    startEvent: 'consultation_form_start',
    submitEvent: 'consultation_form_submit',
  });

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-(--radius-card) border border-line bg-white p-8"
      >
        <h3 className="text-h3">Thank you — your enquiry has been sent.</h3>
        <p className="mt-4 max-w-[60ch] text-ink-700">
          A member of the CER team will respond shortly. We have sent an acknowledgement to the
          email address you provided.
        </p>
        <p className="mt-4 text-ink-700">
          If your enquiry is urgent, email us directly at{' '}
          <a href={`mailto:${site.email}`} className="text-forest underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} onChange={onFirstInteraction} noValidate className="flex flex-col gap-6">
      {formError ? (
        <div ref={errorRef} tabIndex={-1}>
          <FormError id="consulting-form-error" message={formError} />
        </div>
      ) : null}

      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="First name"
          name="firstName"
          autoComplete="given-name"
          required
          error={errors.firstName}
        />
        <TextField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          required
          error={errors.lastName}
        />
      </div>

      <TextField
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={errors.email}
        hint="We use your work email so we can identify your organisation."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
          required
          error={errors.company}
        />
        <TextField
          label="Job title"
          name="jobTitle"
          autoComplete="organization-title"
          required
          error={errors.jobTitle}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Country"
          name="country"
          autoComplete="country-name"
          required
          error={errors.country}
        />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Area of interest"
          name="areaOfInterest"
          options={AREAS_OF_INTEREST}
          required
          error={errors.areaOfInterest}
          key={defaultArea}
        />
        <SelectField
          label="Organisation size"
          name="organisationSize"
          options={ORGANISATION_SIZES}
          error={errors.organisationSize}
        />
      </div>

      <TextArea
        label="How can we help?"
        name="message"
        required
        error={errors.message}
        hint="Tell us what you are working through — the requirement, the deadline, and where you are now."
      />

      <ConsentField name="consent" error={errors.consent}>
        I agree to CER processing my details in order to respond to this enquiry, as described in
        the{' '}
        <Link href="/privacy-policy/" className="text-forest underline underline-offset-4">
          privacy policy
        </Link>
        .
      </ConsentField>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-[3px] bg-forest px-7 font-heading font-semibold text-white transition-colors hover:bg-forest-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Sending…' : 'Send enquiry'}
        </button>
        <p aria-live="polite" className="sr-only">
          {isSubmitting ? 'Sending your enquiry' : ''}
        </p>
      </div>
    </form>
  );
}
