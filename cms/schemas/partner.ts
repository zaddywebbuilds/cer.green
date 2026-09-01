import { defineField, defineType } from 'sanity';

/**
 * A partner organisation.
 *
 * The relationship type is required and there is deliberately no "client"
 * option: a partner is not a client, and implying otherwise misrepresents both
 * organisations. Client references belong in case studies, with approval.
 */
export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'relationship',
      type: 'string',
      options: {
        list: [
          'Strategic Partner',
          'Training Partner',
          'Technology Partner',
          'Project Partner',
          'Academic Partner',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'What the collaboration actually involves.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      description:
        'SVG or high-resolution PNG, supplied and approved by the partner. Do not use a logo scraped from their website.',
    }),
    defineField({ name: 'url', title: 'Website', type: 'url' }),
  ],
  preview: { select: { title: 'name', subtitle: 'relationship', media: 'logo' } },
});
