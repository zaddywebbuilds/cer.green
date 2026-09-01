import { defineField, defineType } from 'sanity';

/**
 * A CER expert.
 *
 * These profiles carry most of the site's E-E-A-T weight and drive Person
 * schema, so every credential must be verifiable. Photographs must be real
 * professional images supplied by the individual -- AI-generated headshots are
 * not used on this site. Where no photograph exists, leave it empty and the
 * front end renders a typographic monogram.
 */
export const expert = defineType({
  name: 'expert',
  title: 'Expert',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'credentials', title: 'Credentials' },
    { name: 'related', title: 'Related content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', group: 'profile', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'profile',
      options: { source: 'name' },
      description: 'Becomes /about/experts/<slug>/.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', type: 'string', group: 'profile', validation: (r) => r.required() }),
    defineField({
      name: 'photo',
      type: 'image',
      group: 'profile',
      options: { hotspot: true },
      description:
        'A real professional photograph supplied by the individual. Never an AI-generated headshot. Leave empty if none is available.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          description: 'Describe the person, for example "Raymond Cheung, Advisor and Lead Trainer at CER".',
        }),
      ],
    }),
    defineField({
      name: 'shortBio',
      type: 'text',
      rows: 3,
      group: 'profile',
      description: 'One or two sentences, used on cards.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'longBio',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'profile',
      validation: (r) => r.required().min(1),
    }),

    defineField({
      name: 'expertise',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'credentials',
      options: { layout: 'tags' },
      validation: (r) => r.required().min(3),
    }),
    defineField({
      name: 'qualifications',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'credentials',
      description: 'Degrees and formal qualifications. Must be verifiable.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'credentials',
      title: 'Professional experience',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'credentials',
      description: 'Years of experience and professional credentials. Only what can be evidenced.',
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
      group: 'credentials',
      description: 'Strengthens Person schema. Use the full profile URL.',
    }),

    defineField({
      name: 'industries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
      group: 'related',
    }),
    defineField({
      name: 'solutions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      group: 'related',
    }),
    defineField({
      name: 'courses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }],
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
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
});
