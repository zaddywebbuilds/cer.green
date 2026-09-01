import { defineField, defineType } from 'sanity';

/**
 * An industry page.
 *
 * Only publish a sector where CER has genuine capability or experience, and
 * only with content specific to that sector. A page that swaps the noun and
 * keeps the copy is a doorway page: it will not rank, and it misrepresents
 * capability to anyone who reads it.
 */
export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'navTitle', title: 'Menu label', type: 'string' }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'Becomes /industries/<slug>/.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'The sector problem',
      type: 'text',
      rows: 2,
      description:
        'The real operating problem in this sector, in one line. This is what appears on the card -- not a generic label.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'summary', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({
      name: 'context',
      title: 'What makes this sector different',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description:
        'Must be genuinely sector-specific. If this could be pasted onto another industry page unchanged, it is not ready.',
      validation: (r) => r.required().min(2),
    }),
    defineField({
      name: 'priorities',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(4),
    }),
    defineField({
      name: 'solutions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'courses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }],
    }),
    defineField({ name: 'seo', type: 'seo', validation: (r) => r.required() }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft (not visible on the site)', value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'challenge' } },
});
