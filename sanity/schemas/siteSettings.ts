// siteSettings.ts — Sanity schema for global site settings
// This is a SINGLETON — there is only ONE document of this type
// Any change here updates the phone number, email, social links, etc. everywhere on the site

import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name:  'siteSettings',
  title: 'Site Settings',
  type:  'document',

  fields: [
    // ── Phone numbers — shown in the header, footer, and contact page ─────
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add all phone numbers. First one is displayed most prominently.',
      initialValue: ['+212 6 61 57 36 00', '+212 674-361550', '+212 535-634712'],
    }),

    // ── WhatsApp number — used for the floating WhatsApp chat button ───────
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code without spaces, e.g. 212701773013',
      initialValue: '212701773013',
    }),

    // ── Email addresses ───────────────────────────────────────────────────
    defineField({
      name: 'emails',
      title: 'Email Addresses',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['info@riadsidi.com', 'contact@soultanarestaurant.com'],
    }),

    // ── Physical address in all 3 languages ───────────────────────────────
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string', initialValue: '60 Bis Ain Azliten, Fès 30110, Maroc' },
        { name: 'en', title: 'English', type: 'string', initialValue: '60 Bis Ain Azliten, Fes 30110, Morocco' },
        { name: 'ar', title: 'Arabic', type: 'string', initialValue: '60 بيس عين أزليتن، فاس 30110، المغرب' },
      ],
    }),

    // ── Google Maps URL ───────────────────────────────────────────────────
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
      initialValue: 'https://goo.gl/z3d9QjnSZYRjMExB9',
    }),

    // ── Restaurant opening hours ──────────────────────────────────────────
    defineField({
      name: 'restaurantHours',
      title: 'Restaurant Hours',
      type: 'string',
      initialValue: '10:00 – 00:00',
    }),

    // ── Social media URLs ─────────────────────────────────────────────────
    defineField({
      name: 'social',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook',    title: 'Facebook URL',    type: 'url' },
        { name: 'instagram',   title: 'Instagram URL',   type: 'url' },
        { name: 'twitter',     title: 'Twitter/X URL',   type: 'url' },
        { name: 'tripadvisor', title: 'TripAdvisor URL', type: 'url' },
        { name: 'youtube',     title: 'YouTube URL',     type: 'url' },
      ],
    }),

    // ── Restaurant section photo ──────────────────────────────────────────
    defineField({
      name: 'restaurantImage',
      title: 'Restaurant Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo shown in the "About the Restaurant" section on the Restaurant page',
    }),

    // ── Main Booking.com property page URL ───────────────────────────────
    defineField({
      name: 'bookingComUrl',
      title: 'Booking.com Property URL',
      type: 'url',
      description: 'The main Booking.com page for Riad Sidi (not individual rooms)',
    }),

    // ── Default SEO settings — used on pages with no custom SEO ──────────
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'title', title: 'Default Page Title',
          type: 'object',
          fields: [
            { name: 'fr', title: 'French', type: 'string', initialValue: 'Riad Sidi — Riad de Luxe & Restaurant Soultana, Fès' },
            { name: 'en', title: 'English', type: 'string', initialValue: 'Riad Sidi — Luxury Riad & Restaurant Soultana, Fes' },
            { name: 'ar', title: 'Arabic', type: 'string', initialValue: 'رياض سيدي — رياض فاخر ومطعم سلطانة، فاس' },
          ],
        },
        {
          name: 'description', title: 'Default Meta Description',
          type: 'object',
          fields: [
            { name: 'fr', title: 'French', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
            { name: 'ar', title: 'Arabic', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'ogImage', title: 'Default Social Share Image',
          type: 'image',
          description: 'Image shown when the site link is shared on social media',
        },
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Site Settings' }), // Always shows "Site Settings" in the admin
  },
})
