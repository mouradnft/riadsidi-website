// lib/queries.ts — All GROQ queries for fetching data from Sanity
// GROQ is Sanity's query language (similar to SQL but for JSON documents)
// Centralizing queries here makes them easy to find and update

// ── Fetch all rooms ordered by display order ──────────────────────────────────
// Returns: array of room objects with title, description, price, images, features
export const ROOMS_QUERY = `
  *[_type == "room"] | order(order asc) {
    _id,
    title,
    description,
    price,
    priceNote,
    "images": images[].asset->url,
    features,
    bookingUrl,
    order
  }
`

// ── Fetch all menu items grouped by category ──────────────────────────────────
// Returns: all menu items sorted by order within each category
export const MENU_QUERY = `
  *[_type == "menuItem"] | order(order asc) {
    _id,
    name,
    description,
    category,
    subcategory,
    isNew,
    isVegetarian,
    "imageUrl": image.asset->url,
    availableInPackages
  }
`

// ── Fetch menu items for a specific category ──────────────────────────────────
// Usage: sanityFetch(MENU_BY_CATEGORY_QUERY, { category: 'tajine' })
export const MENU_BY_CATEGORY_QUERY = `
  *[_type == "menuItem" && category == $category] | order(order asc) {
    _id,
    name,
    description,
    isNew,
    isVegetarian,
    "imageUrl": image.asset->url
  }
`

// ── Fetch all blog posts sorted newest first ──────────────────────────────────
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "coverImageUrl": coverImage.asset->url
  }
`

// ── Fetch a single blog post by its URL slug ──────────────────────────────────
// Usage: sanityFetch(BLOG_POST_QUERY, { slug: 'fine-dining-in-fez' })
export const BLOG_POST_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    body,
    "coverImageUrl": coverImage.asset->url
  }
`

// ── Fetch all slugs — used by Next.js to pre-build blog post pages ────────────
export const BLOG_SLUGS_QUERY = `
  *[_type == "blogPost"] { "slug": slug.current }
`

// ── Fetch all services sorted by display order ────────────────────────────────
export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    "imageUrl": image.asset->url
  }
`

// ── Fetch all testimonials sorted newest first ────────────────────────────────
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(date desc) {
    _id,
    guestName,
    quote,
    source,
    rating,
    date
  }
`

// ── Fetch all gallery images sorted by display order ─────────────────────────
export const GALLERY_QUERY = `
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    "imageUrl": image.asset->url,
    alt,
    caption,
    category
  }
`

// ── Fetch the global site settings singleton ──────────────────────────────────
// [0] at the end gets the first (and only) document of this type
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    phones,
    whatsapp,
    emails,
    address,
    googleMapsUrl,
    restaurantHours,
    social,
    bookingComUrl,
    defaultSeo,
    "restaurantImageUrl": restaurantImage.asset->url
  }
`

// ── Fetch the 3 most recent blog posts for the homepage preview ───────────────
export const LATEST_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "coverImageUrl": coverImage.asset->url
  }
`

// ── Fetch the first 3 rooms for the homepage rooms section ────────────────────
export const FEATURED_ROOMS_QUERY = `
  *[_type == "room"] | order(order asc)[0...3] {
    _id,
    title,
    price,
    priceNote,
    "image": images[0].asset->url,
    bookingUrl
  }
`
