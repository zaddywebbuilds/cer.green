import { defineField, defineType } from 'sanity';

/** A course module and the points covered within it. */
export const courseModule = defineType({
  name: 'courseModule',
  title: 'Module',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'points',
      title: 'Covered in this module',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: 'title' } },
});
