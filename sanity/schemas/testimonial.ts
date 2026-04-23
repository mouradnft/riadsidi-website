// testimonial.ts — Sanity schema for guest reviews / testimonials
// The owner can add new testimonials or edit existing ones from the admin panel

import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name:  'testimonial',
  title: 'Testimonial',
  type:  'document',

  fields: [
    // ── Guest name ────────────────────────────────────────────────────────
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    // ── The review quote in all 3 languages ───────────────────────────────
    defineField({
      name: 'quote',
      title: 'Review Quote',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'ar', title: 'Arabic', type: 'text', rows: 4 },
      ],
      validation: Rule => Rule.required(),
    }),

    // ── Review source (TripAdvisor, Google, Booking.com, etc.) ───────────
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'TripAdvisor', value: 'TripAdvisor' },
          { title: 'Google',      value: 'Google' },
          { title: 'Booking.com', value: 'Booking.com' },
          { title: 'Direct',      value: 'Direct' },
        ],
      },
    }),

    // ── Star rating (1 to 5) ──────────────────────────────────────────────
    defineField({
      name: 'rating',
      title: 'Star Rating (1–5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 5,
    }),

    // ── Review date ───────────────────────────────────────────────────────
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
    }),
  ],

  preview: {
    select: {
      title:    'guestName',
      subtitle: 'source',
    },
  },
})
