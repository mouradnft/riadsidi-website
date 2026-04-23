// room.ts — Sanity schema for hotel rooms
// Defines all the fields the owner can edit for each room in the admin panel
// Each room card on the website is built from this data

import { defineType, defineField } from 'sanity'

export const roomSchema = defineType({
  name:  'room',   // Internal identifier used in GROQ queries
  title: 'Room',   // Label shown in the Sanity Studio sidebar
  type:  'document',

  fields: [
    // ── Room name in all 3 languages ─────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Room Name',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },   // e.g. "Suite Deluxe"
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    // ── Room description in all 3 languages ──────────────────────────────
    defineField({
      name: 'description',
      title: 'Room Description',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'ar', title: 'Arabic', type: 'text', rows: 4 },
      ],
    }),

    // ── Price — shown on the website as "from $XX/night" ─────────────────
    defineField({
      name: 'price',
      title: 'Price (USD per night)',
      type: 'number',
      description: 'Leave empty to show "Contact us for pricing" instead of a number',
    }),

    // ── Short note displayed next to the price ────────────────────────────
    defineField({
      name: 'priceNote',
      title: 'Price Note',
      type: 'string',
      initialValue: 'per night',   // Default text shown below the price
    }),

    // ── Room photos — drag and drop to upload, drag to reorder ───────────
    defineField({
      name: 'images',
      title: 'Room Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],  // hotspot allows cropping focus
      description: 'First image is used as the main room thumbnail',
    }),

    // ── Feature list — bullet points like "Private bathroom", "WiFi" ─────
    defineField({
      name: 'features',
      title: 'Room Features',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French features', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'English features', type: 'array', of: [{ type: 'string' }] },
        { name: 'ar', title: 'Arabic features', type: 'array', of: [{ type: 'string' }] },
      ],
    }),

    // ── Link to the Booking.com listing for this specific room ───────────
    defineField({
      name: 'bookingUrl',
      title: 'Booking.com URL',
      type: 'url',
      description: 'Paste the full Booking.com link for this room',
    }),

    // ── Display order — lower number = appears first on the website ───────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],

  // How this room appears in the Sanity Studio list (shows the French name)
  preview: {
    select: { title: 'title.fr', media: 'images.0' },
  },
})
