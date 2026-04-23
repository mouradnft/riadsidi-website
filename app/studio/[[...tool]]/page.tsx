'use client'
// app/studio/[[...tool]]/page.tsx — Embedded Sanity Studio admin panel
// The owner navigates to yourdomain.com/studio to log in and manage all content
// The [[...tool]] catch-all route lets Sanity Studio handle its own internal routing

import { NextStudio } from 'next-sanity/studio' // Renders Sanity Studio inside Next.js
import config         from '@/sanity/sanity.config' // Our Sanity configuration (schemas, project ID, etc.)

// Sanity Studio needs the full viewport height — remove the default page padding
export const dynamic = 'force-dynamic' // Always render fresh (not cached)

export default function StudioPage() {
  // NextStudio renders the complete Sanity Studio admin interface
  // Authentication is handled by Sanity — only logged-in Sanity users can access the content
  return <NextStudio config={config} />
}
