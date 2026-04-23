// schemas/index.ts — Registers all Sanity content types
// Sanity Studio reads this file to know which content types the owner can manage
// Add a new import + entry here whenever you create a new schema

import { roomSchema }         from './room'
import { menuItemSchema }     from './menuItem'
import { blogPostSchema }     from './blogPost'
import { serviceSchema }      from './service'
import { testimonialSchema }  from './testimonial'
import { galleryImageSchema } from './galleryImage'
import { siteSettingsSchema } from './siteSettings'

// All schema types exported as an array — Sanity reads this list
export const schemaTypes = [
  siteSettingsSchema, // Global settings (contact info, social, SEO)
  roomSchema,         // Hotel rooms
  menuItemSchema,     // Restaurant menu dishes
  blogPostSchema,     // Blog articles
  serviceSchema,      // Services (transfers, tours, cooking classes, etc.)
  testimonialSchema,  // Guest reviews
  galleryImageSchema, // Photo gallery images
]
