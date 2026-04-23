// tailwind.config.js — Tailwind CSS configuration
// Defines the custom color palette, fonts, and plugins for the Riad Sidi design system

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names (unused classes are removed in production)
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ── Custom color palette (Moroccan-inspired) ────────────────────────
      colors: {
        primary: {
          DEFAULT: '#8B1A1A', // Deep Moroccan red — main CTAs and accents
          light:   '#A52020', // Lighter red for hover states
          dark:    '#6B1313', // Darker red for pressed states
        },
        gold: {
          DEFAULT: '#C9A84C', // Warm gold — decorative borders and highlights
          light:   '#DFC06E', // Light gold for subtle backgrounds
          dark:    '#A88A30', // Deep gold for text on light backgrounds
        },
        cream: {
          DEFAULT: '#FDF8F0', // Main page background — warm ivory
          dark:    '#F0E8D8', // Slightly darker cream for section alternation
        },
        terracotta: '#C17F4A', // Earthy orange-brown — decorative accents
        moroccan: {
          dark:  '#1C0A00', // Very dark brown — primary text color
          muted: '#7A6248', // Warm brown — secondary/muted text
        },
      },

      // ── Custom fonts ────────────────────────────────────────────────────
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],     // Playfair Display
        body:    ['var(--font-body)', 'Helvetica Neue', 'sans-serif'], // Lato
        arabic:  ['var(--font-arabic)', 'Arial', 'sans-serif'],   // Amiri
      },

      // ── Custom spacing ──────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // ── Custom breakpoints ──────────────────────────────────────────────
      screens: {
        'xs': '475px',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'), // Adds "prose" classes for blog post body text
  ],
}
