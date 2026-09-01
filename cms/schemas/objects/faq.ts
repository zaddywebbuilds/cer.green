import { defineField, defineType } from 'sanity';

/** Shared FAQ object. Drives both the on-page accordion and FAQPage schema. */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      description: 'Phrase it the way someone would actually search for it.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'text',
      rows: 4,
      description:
        'Answer it properly. A vague answer here is worse than omitting the question.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'question' } },
});
