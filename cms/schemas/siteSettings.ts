import { defineField, defineType } from 'sanity';

/**
 * Site settings. Singleton.
 *
 * The company identification fields here are the ones currently missing from
 * CER's published material and marked for verification in `lib/site.ts`. Once
 * completed they flow into the footer, the contact page, the legal pages and
 * the Organization schema. Until then, the front end omits them rather than
 * publishing a placeholder.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'legal', title: 'Legal' },
  ],
  fields: [
    defineField({
      name: 'positioning',
      title: 'Positioning statement',
      type: 'text',
      rows: 2,
      group: 'identity',
      description: 'The five-second answer. Used in metadata and Organization schema.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'descriptor',
      title: 'Supporting descriptor',
      type: 'text',
      rows: 2,
      group: 'identity',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'email',
      title: 'Enquiry email',
      type: 'string',
      group: 'contact',
      description:
        'Shown publicly. The address enquiry forms are delivered to is set separately in an environment variable and is never exposed in the browser.',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telephone',
      type: 'string',
      group: 'contact',
      description:
        'Not currently published by CER. Leave empty rather than guessing -- the front end omits the row and the schema field.',
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
      group: 'contact',
      description: 'LinkedIn is the primary social platform for CER.',
    }),
    defineField({
      name: 'address',
      type: 'object',
      group: 'contact',
      description:
        'A verifiable business address strengthens both credibility and Organization schema.',
      fields: [
        defineField({ name: 'street', title: 'Street address', type: 'string' }),
        defineField({ name: 'locality', title: 'City', type: 'string', initialValue: 'Singapore' }),
        defineField({ name: 'postalCode', type: 'string' }),
        defineField({ name: 'country', type: 'string', initialValue: 'SG' }),
      ],
    }),

    defineField({
      name: 'legalName',
      title: 'Registered company name',
      type: 'string',
      group: 'legal',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'uen',
      title: 'UEN / registration number',
      type: 'string',
      group: 'legal',
      description:
        'Appears in the footer, the terms page and Organization schema once supplied. Leave empty until confirmed.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
