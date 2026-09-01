import { defineField, defineType } from 'sanity';

/**
 * A case study.
 *
 * Publication rules, which are not negotiable:
 *   - The client must have approved what is said about them, including the
 *     display name. Where they will not be named, tick "confidential" and use a
 *     descriptive name such as "Regional financial institution".
 *   - Every figure under Results must have been measured. Directional figures
 *     must be marked illustrative, which labels them on the page.
 *   - A quote requires written permission from the named individual.
 */
export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'results', title: 'Results' },
    { name: 'related', title: 'Related content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      description: 'Describe the outcome, not the client.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'clientDisplayName',
      type: 'string',
      group: 'content',
      description:
        'Exactly as the client approved it, or an anonymised descriptor if they will not be named.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'confidential',
      title: 'Client anonymised',
      type: 'boolean',
      group: 'content',
      initialValue: true,
    }),
    defineField({
      name: 'industry',
      type: 'reference',
      to: [{ type: 'industry' }],
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'projectType',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'outcomeSummary',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'One sentence stating what changed. Verified only.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'context',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'challenge',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'approach',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'implementation',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      description: 'What was actually done, in sequence. This is where capability is demonstrated.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'outcome',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      validation: (r) => r.required().min(1),
    }),

    defineField({
      name: 'metrics',
      title: 'Results',
      type: 'array',
      of: [{ type: 'metric' }],
      group: 'results',
      description: 'Measured figures only. Leave empty rather than estimating.',
    }),
    defineField({
      name: 'quote',
      type: 'object',
      group: 'results',
      description: 'Requires written permission from the named individual.',
      fields: [
        defineField({ name: 'text', type: 'text', rows: 3 }),
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'role', type: 'string' }),
        defineField({ name: 'organisation', type: 'string' }),
      ],
    }),
    defineField({
      name: 'frameworks',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'results',
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'solutions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      group: 'related',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'experts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'expert' }] }],
      group: 'related',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'related',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
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
      description: 'Do not publish until the client has approved the content in writing.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'clientDisplayName', status: 'status' },
    prepare: ({ title, subtitle, status }) => ({
      title,
      subtitle: `${subtitle}${status === 'draft' ? ' - DRAFT' : ''}`,
    }),
  },
});
