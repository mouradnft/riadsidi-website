// menuItem.ts — Sanity schema for restaurant menu dishes
// The owner uses this to add, remove, or edit any dish on the menu
// Each dish belongs to a category (appetizer, tajine, etc.)

import { defineType, defineField } from 'sanity'

export const menuItemSchema = defineType({
  name:  'menuItem',
  title: 'Menu Item',
  type:  'document',

  fields: [
    // ── Dish name in all 3 languages ──────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Dish Name',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'string' },   // e.g. "Tajine Poulet aux Olives"
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),

    // ── Dish description / ingredients ────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Description / Ingredients',
      type: 'object',
      fields: [
        { name: 'fr', title: 'French', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'ar', title: 'Arabic', type: 'text', rows: 3 },
      ],
    }),

    // ── Category — controls which section of the menu this dish appears in
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Appetizer / Entrée',  value: 'appetizer' },
          { title: 'Moroccan Tajine',     value: 'tajine' },
          { title: 'Fassi Specialty',     value: 'fassi' },
          { title: 'Dessert',             value: 'dessert' },
          { title: 'Beverage',            value: 'beverage' },
        ],
        layout: 'radio', // Shows as radio buttons in the admin for clarity
      },
      validation: Rule => Rule.required(),
    }),

    // ── Sub-category for beverages (juice, hot drink, soda, water) ────────
    defineField({
      name: 'subcategory',
      title: 'Beverage Sub-category',
      type: 'string',
      description: 'Only fill this for beverages',
      options: {
        list: [
          { title: 'Fresh Juice', value: 'juice' },
          { title: 'Hot Drink',   value: 'hot-drink' },
          { title: 'Soda / Water', value: 'soda' },
        ],
      },
      hidden: ({ document }) => document?.category !== 'beverage', // Only shows for beverages
    }),

    // ── "NEW" badge — tick this to show a "NEW" label on the dish ─────────
    defineField({
      name: 'isNew',
      title: 'Mark as NEW',
      type: 'boolean',
      initialValue: false,
      description: 'Shows a "NEW" badge on this dish in the menu',
    }),

    // ── Vegetarian flag — shows a vegetarian indicator on the dish ────────
    defineField({
      name: 'isVegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      initialValue: false,
    }),

    // ── Optional dish photo ───────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Dish Photo (optional)',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── Which dining packages include this dish ───────────────────────────
    defineField({
      name: 'availableInPackages',
      title: 'Available in Packages',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Simple Menu (à la carte)', value: 'simple' },
          { title: 'Special Menu (set menu)',  value: 'special' },
          { title: 'Special Menu with Show',   value: 'show' },
        ],
      },
      initialValue: ['simple', 'special', 'show'], // By default, dishes are in all packages
    }),

    // ── Display order within the category ────────────────────────────────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title:    'name.fr',   // Shows French name in the Sanity Studio list
      subtitle: 'category',
      media:    'image',
    },
  },
})
