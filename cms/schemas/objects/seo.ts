import { defineField, defineType } from 'sanity';

/**
 * Shared SEO object.
 *
 * Attached to every indexable document type so metadata is edited alongside the
 * content it describes, rather than in a separate settings area where it is
 * forgotten.
 *
 * Field lengths are validated as warnings rather than errors: an over-length
 * title is a judgement call, not a reason to block publishing.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO & social',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description:
        'Shown in search results. Falls back to the document title. "| CER" is appended automatically unless the title already names CER.',
      validation: (rule) =>
        rule.max(60).warning('Titles over about 60 characters are usually truncated in search results.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description:
        'Must be unique across the site. Say what the page covers, who it is for and where CER operates.',
      validation: (rule) => [
        rule.required().error('Every indexable page needs a meta description.'),
        rule.min(140).warning('Aim for at least 140 characters.'),
        rule.max(160).warning('Descriptions over 160 characters are usually truncated.'),
      ],
    }),
    defineField({
      name: 'canonical',
      title: 'Canonical URL',
      type: 'string',
      description:
        'Leave empty unless this page should point at a different URL. Set automatically otherwise.',
    }),
    defineField({ name: 'ogTitle', title: 'Social title', type: 'string' }),
    defineField({ name: 'ogDescription', title: 'Social description', type: 'text', rows: 2 }),
    defineField({
      name: 'ogImage',
      title: 'Social image',
      type: 'image',
      description:
        '1200 x 630. Leave empty to use the branded default, which is generated automatically.',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
      description:
        'Excludes the page from search results and the sitemap. Portal and account routes are always excluded regardless of this setting.',
    }),
    defineField({
      name: 'nofollow',
      title: 'Do not follow links on this page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary search intent',
      type: 'string',
      description:
        'One page, one primary intent. Used for internal tracking, not injected into the page.',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary intents',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
});
