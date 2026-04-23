// next.config.mjs — Next.js configuration file
// This file controls how Next.js builds and serves the website

import createNextIntlPlugin from 'next-intl/plugin' // Plugin that adds multilingual (EN/FR/AR) support

// Wrap Next.js config with the i18n plugin, pointing it to our i18n setup file
const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Next.js to optimize images that come from Sanity's CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Sanity stores all uploaded images here
      },
    ],
  },
}

// Export the config wrapped with the multilingual plugin
export default withNextIntl(nextConfig)
