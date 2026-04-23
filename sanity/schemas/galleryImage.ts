// galleryImage.ts — Sanity schema for the photo gallery
// The owner can upload, remove, caption, and reorder gallery photos from the admin panel
// Alt text is REQUIRED on every image for accessibility and Google search ranking

import { defineType, defineField } from 'sanity'

export const galleryImageSchema = defineType({
  name:  'galleryImage',
  title: 'Gallery Image',
  type:  'document',

  fields: [
    // ── The actual image file — uploaded directly in the admin ────────────
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true }, // Allows setting a focal point for smart cropping
      validation: Rule => Rule.required(),
    }),

    // ── Alt text — REQUIRED for every image (SEO + accessibility) ─────────
    // Screen readers and Google use this text to understand what the image shows
    defineField({
      name: 'alt',
      title: 'Alt Text (describe the photo)',
      type: 'object',
      description: 'Required — describe what is shown in the photo for Google and screen readers',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    // ── Optional caption shown in the lightbox when someone clicks the photo
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
    }),

    // ── Category — used for the gallery filter tabs (All / Rooms / etc.) ──
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Rooms',      value: 'rooms' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Exterior',   value: 'exterior' },
          { title: 'Food',       value: 'food' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),

    // ── Display order — drag to reorder in the admin ───────────────────────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title:    'alt.fr',   // Shows the French alt text as the image label in the admin
      subtitle: 'category',
      media:    'image',
    },
  },
})
