'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ConsentField,
  FormError,
  Honeypot,
  SelectField,
  TextArea,
  TextField,
} from '@/components/forms/fields';
import { useEnquiryForm } from '@/components/forms/useEnquiryForm';
import { PARTICIPANT_TYPES } from '@/lib/forms/schemas';
import { site } from '@/lib/site';

/**
 * Academy enquiry form.
 *
 * Used on course pages (with the course pre-selected) and on the contact page
 * as a general training enquiry. Participant count only appears once a
 * corporate enquiry is chosen, so an individual is not asked an irrelevant
 * question.
 */
export function AcademyForm({
  courseOptions,
  defaultCourse,
  defaultParticipantType,
}: {
  courseOptions: string[];
  defaultCourse?: string;
  defaultParticipantType?: (typeof PARTICIPANT_TYPES)[number];
}) {
  const [participantType, setParticipantType] = useState<string>(
    defaultParticipantType ?? '',
  );

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
    startEvent: 'course_enquiry_start',
    submitEvent:
      participantType === 'Corporate / group' ? 'corporate_training_submit' : 'course_enquiry_submit',
  });

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-(--radius-card) border border-line bg-white p-8"
      >
        <h3 className="text-h3">Thank you. Your training enquiry has been sent.</h3>
        <p className="mt-4 max-w-[60ch] text-ink-700">
          CER Academy will come back to you with available dates, delivery formats and, where
          relevant, options for running the programme in-house.
        </p>
        <p className="mt-4 text-ink-700">
          You can reach us directly at{' '}
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
          <FormError id="academy-form-error" message={formError} />
        </div>
      ) : null}

      <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''} />
      <input type="hidden" name="subject" value="New Academy enquiry (CER)" />
      <Honeypot />

      <TextField label="Name" name="name" autoComplete="name" required error={errors.name} />

      <TextField
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={errors.email}
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

      {defaultCourse ? (
        <input type="hidden" name="course" value={defaultCourse} />
      ) : (
        <SelectField
          label="Programme"
          name="course"
          options={courseOptions}
          required
          error={errors.course}
          placeholder="Select a programme"
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Individual or corporate"
          name="participantType"
          options={PARTICIPANT_TYPES}
          required
          error={errors.participantType}
          onValueChange={setParticipantType}
        />

        {participantType === 'Corporate / group' ? (
          <TextField
            label="Approximate number of participants"
            name="participants"
            error={errors.participants}
          />
        ) : null}
      </div>

      <TextField
        label="Preferred date or timeframe"
        name="preferredDate"
        error={errors.preferredDate}
        hint="For example: Q1 2027, or a specific month."
      />

      <TextArea
        label="Anything else we should know?"
        name="message"
        rows={4}
        error={errors.message}
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
          {isSubmitting ? 'Sending…' : 'Submit training enquiry'}
        </button>
      </div>
    </form>
  );
}
