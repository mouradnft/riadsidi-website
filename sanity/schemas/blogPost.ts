// blogPost.ts — Sanity schema for blog articles
// The owner can write, edit, and publish blog posts from the admin panel
// Blog posts support rich text (bold, images, links) in all 3 languages

import { defineType, defineField } from 'sanity'

export const blogPostSchema = defineType({
  name:  'blogPost',
  title: 'Blog Post',
  type:  'document',

  fields: [
    // ── Post title in all 3 languages ─────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    // ── URL slug — auto-generated from the French title ───────────────────
    // e.g. "Fine dining in Fez" → "/blog/fine-dining-in-fez"
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title.fr', maxLength: 96 }, // Auto-generates from French title
      validation: Rule => Rule.required(),
    }),

    // ── Publication date ──────────────────────────────────────────────────
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(), // Defaults to today
    }),

    // ── Cover image shown at the top of the post and in the blog list ─────
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── Short summary shown on the blog list page (not the full article) ──
    defineField({
      name: 'excerpt',
      title: 'Short Summary',
      type: 'object',
      description: 'Shown on the blog list page — keep it under 2 sentences',
      fields: [
        { name: 'fr', title: 'French', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'ar', title: 'Arabic', type: 'text', rows: 3 },
      ],
    }),

    // ── Full article body — rich text editor in all 3 languages ──────────
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'object',
      fields: [
        {
          name: 'fr', title: 'French',
          type: 'array',
          // "block" is Sanity's rich text format — supports bold, italic, headings, links
          of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
        },
        {
          name: 'en', title: 'English',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
        },
        {
          name: 'ar', title: 'Arabic',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
        },
      ],
    }),
  ],

  // In the Sanity Studio list: shows title + cover image + publish date
  preview: {
    select: {
      title:    'title.fr',
      subtitle: 'publishedAt',
      media:    'coverImage',
    },
  },
})
