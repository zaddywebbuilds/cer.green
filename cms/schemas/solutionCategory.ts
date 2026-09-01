import { defineField, defineType } from 'sanity';

/** One of the four CER Solutions pillars. */
export const solutionCategory = defineType({
  name: 'solutionCategory',
  title: 'Solution category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'navTitle', title: 'Menu label', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'Becomes /solutions/<slug>/.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
      description: 'One line. Used on cards and the homepage.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'problem',
      title: 'The business problem',
      type: 'text',
      rows: 4,
      description: 'What organisations are actually struggling with in this area.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'capability',
      title: 'What CER does',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'outcome',
      title: 'Likely outcome',
      type: 'text',
      rows: 3,
      description: 'What the client ends up with. Be concrete.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'seo', type: 'seo', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'summary' } },
});
