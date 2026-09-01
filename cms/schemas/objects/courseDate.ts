import { defineField, defineType } from 'sanity';

/**
 * A scheduled run of a course.
 *
 * Only entries marked `scheduled` are advertised publicly or emitted as
 * CourseInstance schema. Never add a speculative date -- an empty schedule
 * shows an enquiry route, which is better than a date that turns out not to
 * exist.
 */
export const courseDate = defineType({
  name: 'courseDate',
  title: 'Course date',
  type: 'object',
  fields: [
    defineField({ name: 'start', title: 'Start date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'end', title: 'End date', type: 'date' }),
    defineField({
      name: 'location',
      type: 'string',
      initialValue: 'Singapore',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Scheduled (shown publicly)', value: 'scheduled' },
          { title: 'On request (not advertised)', value: 'on-request' },
        ],
        layout: 'radio',
      },
      initialValue: 'on-request',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'start', subtitle: 'location' } },
});
