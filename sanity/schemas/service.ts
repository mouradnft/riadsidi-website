// service.ts — Sanity schema for the services offered (transfers, tours, etc.)
// The owner can edit each service's name, description, and photo

import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name:  'service',
  title: 'Service',
  type:  'document',

  fields: [
    // ── Service name in all 3 languages ───────────────────────────────────
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    // ── Service description in all 3 languages ────────────────────────────
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'ar', title: 'Arabic', type: 'text', rows: 3 },
      ],
    }),

    // ── Icon name — used to show an icon on the services page ─────────────
    // Uses Lucide icon names: https://lucide.dev/icons/
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name, e.g. "car", "map", "utensils", "music"',
    }),

    // ── Service photo ─────────────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Service Photo',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── Display order ─────────────────────────────────────────────────────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: { title: 'title.fr', media: 'image' },
  },
})
