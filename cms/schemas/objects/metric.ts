import { defineField, defineType } from 'sanity';

/**
 * A case study result.
 *
 * NEVER enter a figure that has not been measured and confirmed by the client.
 * If a number is directional rather than measured, tick "illustrative" -- the
 * page then labels it as such on the front end.
 */
export const metric = defineType({
  name: 'metric',
  title: 'Result',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      type: 'string',
      description: 'For example "23%" or "14 sites".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      type: 'string',
      description: 'What the figure measures.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'illustrative',
      title: 'Illustrative, not measured',
      type: 'boolean',
      initialValue: false,
      description: 'Tick if this figure is indicative rather than a confirmed measured result.',
    }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
});
