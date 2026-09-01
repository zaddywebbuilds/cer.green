import { defineField, defineType } from 'sanity';

export const articleCategory = defineType({
  name: 'articleCategory',
  title: 'Insight category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 2, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});
