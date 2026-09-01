import { defineField, defineType } from 'sanity';

/**
 * An Insights article.
 *
 * Sections are structured rather than free rich text, because each section
 * heading becomes an anchor and a table-of-contents entry, and that only works
 * reliably if the structure is explicit.
 *
 * Regulatory content dates quickly. Where an article states a timeline or a
 * threshold, say that it should be confirmed against the regulator, and keep
 * the "Updated" date current.
 */
export const article = defineType({
  name: 'article',
  title: 'Insight',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Publishing' },
    { name: 'related', title: 'Related content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 70 },
      description: 'Becomes /insights/<slug>/. No dates or IDs in the slug.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Used on cards and as the social description fallback.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'intro',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'content',
      description: 'Two or three paragraphs before the first heading.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'articleSection',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'id',
              title: 'Anchor',
              type: 'slug',
              description:
                'Used for the table of contents link. Generate it from the heading.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'body',
              type: 'array',
              of: [{ type: 'text', rows: 4 }],
              validation: (r) => r.required().min(1),
            }),
            defineField({
              name: 'list',
              title: 'Bulleted list',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
      validation: (r) => r.required().min(2),
    }),

    defineField({
      name: 'type',
      type: 'string',
      group: 'meta',
      options: {
        list: ['Article', 'Guide', 'Regulatory Update', 'White Paper', 'Report'],
      },
      initialValue: 'Article',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'articleCategory' }],
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'expert' }],
      group: 'meta',
      description:
        'Drives the byline and Person schema. Attribution to a named expert matters for search credibility.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'updatedAt',
      type: 'date',
      group: 'meta',
      description:
        'Set whenever the content changes materially, particularly on regulatory pieces.',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          description: 'Describe the image in context. Never use the filename.',
        }),
      ],
    }),

    defineField({
      name: 'relatedSolutions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      group: 'related',
      description: 'Every article should link to at least one commercial page.',
    }),
    defineField({
      name: 'relatedArticles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
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
    }),
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', status: 'status' },
    prepare: ({ title, date, status }) => ({
      title,
      subtitle: `${date ?? ''}${status === 'draft' ? ' - DRAFT' : ''}`,
    }),
  },
});
