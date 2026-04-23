// sanity.config.ts — Sanity Studio configuration
// This file configures the admin panel (Sanity Studio) embedded at /studio
// The owner visits yourdomain.com/studio to log in and manage all content

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes }   from './schemas'               // All content types the owner can edit

export default defineConfig({
  // The project ID and dataset from your Sanity account
  // These are public values safe to expose (the secret token stays server-side)
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,

  // The base path where Studio is accessible — matches the Next.js route at app/studio
  basePath: '/studio',

  // Title shown in the browser tab and Studio header
  title: 'Riad Sidi — Admin Panel',

  plugins: [
    structureTool(), // The main content editing interface (left sidebar + document editor)
  ],

  // Register all content types (rooms, menu items, blog posts, etc.)
  schema: {
    types: schemaTypes,
  },
})
