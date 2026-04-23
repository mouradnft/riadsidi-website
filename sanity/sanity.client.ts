// sanity.client.ts — Sanity API connection
// This file creates the connection between Next.js and Sanity's cloud database
// When NEXT_PUBLIC_SANITY_PROJECT_ID is not set, it returns mock data for local preview

import { createClient }  from '@sanity/client'
import imageUrlBuilder   from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import {
  mockSettings, mockRooms, mockMenuItems, mockServices,
  mockTestimonials, mockBlogPosts, mockGalleryImages,
} from '@/lib/mock-data'

// Check if Sanity is configured — if not, we use mock data for local preview
const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

// Create the Sanity client using credentials from environment variables
// Only created when Sanity is actually configured (avoids errors in preview mode)
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01', // API version date — keeps behavior stable
      useCdn:     true,         // Use Sanity's CDN for faster reads (cached)
      token:      process.env.SANITY_API_TOKEN,
    })
  : null

// Create the image URL builder — only when Sanity is configured
const builder = isSanityConfigured && sanityClient
  ? imageUrlBuilder(sanityClient)
  : null

// Helper function to build a Sanity image URL
export function urlFor(source: SanityImageSource) {
  if (!builder) return { url: () => '' } // Return empty URL in preview mode
  return builder.image(source)
}

// Maps GROQ query patterns to the correct mock data array
// This allows pages to call sanityFetch() and get real-looking data without Sanity
function getMockData(query: string): unknown {
  if (query.includes('"siteSettings"')) return mockSettings
  if (query.includes('"room"'))         return mockRooms
  if (query.includes('"menuItem"'))     return mockMenuItems
  if (query.includes('"service"'))      return mockServices
  if (query.includes('"testimonial"'))  return mockTestimonials
  if (query.includes('"blogPost"'))     return mockBlogPosts
  if (query.includes('"galleryImage"')) return mockGalleryImages
  return null
}

// Helper function to run a GROQ query against Sanity (or return mock data)
// Usage: await sanityFetch('*[_type == "room"]')
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  // If Sanity is not configured, return mock data so the site can be previewed locally
  if (!isSanityConfigured || !sanityClient) {
    const mock = getMockData(query)

    // For blog post single-item queries (by slug), find the matching post
    if (query.includes('slug.current == $slug') && params.slug) {
      const posts = mockBlogPosts as any[]
      return (posts.find(p => p.slug.current === params.slug) ?? null) as T
    }

    // For slug-list queries, return just the slug values
    if (query.includes('"slug": slug.current')) {
      const posts = mockBlogPosts as any[]
      return posts.map(p => ({ slug: p.slug.current })) as T
    }

    // For queries that limit to 3 items (homepage featured sections)
    if (query.includes('[0...3]') && Array.isArray(mock)) {
      return (mock as any[]).slice(0, 3) as T
    }

    return mock as T
  }

  // Sanity is configured — run the real query
  return sanityClient.fetch<T>(query, params)
}
