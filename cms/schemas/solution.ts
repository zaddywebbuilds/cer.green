import { defineField, defineType } from 'sanity';

/**
 * A CER Solutions service page.
 *
 * The required fields mirror the high-converting page template: business
 * context, what CER does, what the client receives, who it is for, and FAQs.
 * They are required because a service page missing any of them is a thin page,
 * and thin service pages are explicitly not published on this site -- the
 * content belongs on the category page until it can carry its own.
 */
export const solution = defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'related', title: 'Related content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 60 },
      description: 'Lowercase, hyphenated. Becomes /solutions/<slug>/. Do not change after launch without adding a redirect.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navTitle',
      title: 'Menu label',
      type: 'string',
      group: 'content',
      description: 'Shorter label for the mega menu, where the full title is too long.',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'solutionCategory' }],
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroStatement',
      title: 'Hero statement',
      type: 'text',
      rows: 2,
      group: 'content',
      description:
        'One sentence, outcome-oriented. What the client ends up able to do -- not what the service is called.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Used on cards and in the mega menu.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'businessContext',
      title: 'Business context',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      description:
        'Why this matters, who it affects and the regulatory or market context. State the problem plainly; do not use fear as a selling device.',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'components',
      title: 'How CER helps',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description: 'The specific components of the engagement.',
      validation: (rule) => rule.required().min(4),
    }),
    defineField({
      name: 'deliverables',
      title: 'What you receive',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description:
        'Concrete deliverables only. If CER does not reliably produce it, it does not belong on this list.',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'frameworks',
      title: 'Frameworks and standards',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      options: { layout: 'tags' },
      description:
        'Only name a framework genuinely relevant to this service. Naming a standard implies competence in it.',
    }),
    defineField({
      name: 'audience',
      title: 'Who this is for',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faq' }],
      group: 'content',
      description: 'Four to eight questions matching what people actually search for.',
      validation: (rule) => rule.required().min(3).max(10),
    }),

    defineField({
      name: 'relatedSolutions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      group: 'related',
    }),
    defineField({
      name: 'relatedIndustries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
      group: 'related',
    }),
    defineField({
      name: 'experts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'expert' }] }],
      group: 'related',
      description: 'The people who deliver this service. Drives the expertise section.',
    }),

    defineField({ name: 'seo', type: 'seo', group: 'seo', validation: (rule) => rule.required() }),
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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title', status: 'status' },
    prepare: ({ title, subtitle, status }) => ({
      title,
      subtitle: `${subtitle ?? 'No category'}${status === 'draft' ? ', DRAFT' : ''}`,
    }),
  },
});
