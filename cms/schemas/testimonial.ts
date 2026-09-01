import { defineField, defineType } from 'sanity';

/**
 * A testimonial.
 *
 * `approved` gates publication and defaults to false. The front end renders
 * only approved testimonials, and omits the whole section when there are none.
 * Do not tick it without written permission from the named individual and
 * their organisation on file.
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'organisation', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'approved',
      title: 'Written permission held',
      type: 'boolean',
      initialValue: false,
      description:
        'Only tick this when written permission from the person and their organisation is on file. Untick to remove from the site immediately.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'organisation', approved: 'approved' },
    prepare: ({ title, subtitle, approved }) => ({
      title,
      subtitle: `${subtitle}${approved ? '' : ' — NOT APPROVED, hidden'}`,
    }),
  },
});
