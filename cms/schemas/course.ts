import { defineField, defineType } from 'sanity';

/**
 * A CER Academy programme.
 *
 * Two fields carry particular risk and are called out in their descriptions:
 *
 *   certification -- must describe exactly what a participant receives. Never
 *   imply accreditation, endorsement or a partner-issued certificate that has
 *   not been confirmed in writing.
 *
 *   upcoming -- only real, confirmed dates. An empty schedule is fine; the page
 *   shows an enquiry route instead. A date that turns out not to exist is not.
 */
export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'delivery', title: 'Delivery & dates' },
    { name: 'related', title: 'Related content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 60 },
      description: 'Becomes /academy/courses/<slug>/.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'courseCategory' }],
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'outcome',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'One sentence: what the participant can do afterwards.',
      validation: (r) => r.required().max(200),
    }),
    defineField({ name: 'summary', type: 'text', rows: 3, group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      description: 'Explain the course plainly. Two or three paragraphs.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'whoShouldAttend',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description: 'Specific roles, not "anyone interested in sustainability".',
      validation: (r) => r.required().min(3),
    }),
    defineField({
      name: 'learningOutcomes',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description: 'Start each with a verb the participant can demonstrate.',
      validation: (r) => r.required().min(4),
    }),
    defineField({
      name: 'modules',
      type: 'array',
      of: [{ type: 'courseModule' }],
      group: 'content',
      validation: (r) => r.required().min(2),
    }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faq' }], group: 'content' }),

    defineField({
      name: 'duration',
      type: 'string',
      group: 'delivery',
      description: 'For example "Half day", "1 day", "2 days".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'formats',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'delivery',
      options: { list: ['In person', 'Virtual live', 'In-house'] },
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'location', type: 'string', group: 'delivery', initialValue: 'Singapore' }),
    defineField({
      name: 'upcoming',
      title: 'Scheduled dates',
      type: 'array',
      of: [{ type: 'courseDate' }],
      group: 'delivery',
      description:
        'Only confirmed dates. Leave empty if none are set -- the page then shows an enquiry route rather than a date.',
    }),
    defineField({
      name: 'price',
      type: 'object',
      group: 'delivery',
      description: 'Leave empty to price on enquiry.',
      fields: [
        defineField({ name: 'amount', type: 'number' }),
        defineField({ name: 'currency', type: 'string', initialValue: 'SGD' }),
        defineField({ name: 'note', type: 'string' }),
      ],
    }),
    defineField({
      name: 'certification',
      title: 'What participants receive',
      type: 'text',
      rows: 3,
      group: 'delivery',
      description:
        'Optional. Describe exactly what is awarded. Never imply accreditation or a partner-issued certificate that has not been confirmed in writing. The award depends on the delivery partner, so leave this empty unless it is settled for this course: the page then tells the reader to confirm on enquiry, which is better than naming the wrong certificate.',
    }),
    defineField({
      name: 'corporateAvailable',
      title: 'Available for private in-house delivery',
      type: 'boolean',
      group: 'delivery',
      initialValue: true,
    }),
    defineField({
      name: 'registration',
      type: 'string',
      group: 'delivery',
      options: {
        list: [
          { title: 'Open for registration', value: 'open' },
          { title: 'Enquire for dates', value: 'enquire' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'enquire',
    }),

    defineField({
      name: 'instructors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'expert' }] }],
      group: 'related',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'relatedCourses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }],
      group: 'related',
    }),
    defineField({
      name: 'relatedSolutions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      group: 'related',
    }),

    defineField({ name: 'seo', type: 'seo', group: 'seo', validation: (r) => r.required() }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft (not visible on the site)', value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', duration: 'duration', status: 'status' },
    prepare: ({ title, duration, status }) => ({
      title,
      subtitle: `${duration ?? ''}${status === 'draft' ? ', DRAFT' : ''}`,
    }),
  },
});
