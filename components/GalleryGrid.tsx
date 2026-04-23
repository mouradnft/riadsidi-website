'use client'
// GalleryGrid.tsx — Photo gallery with filter tabs and lightbox
// Visitors can filter photos by category (Rooms, Restaurant, etc.)
// Clicking a photo opens it in a full-screen lightbox

import { useState }        from 'react'
import Image               from 'next/image'
import { useTranslations } from 'next-intl'
import Lightbox            from 'yet-another-react-lightbox' // Full-screen photo viewer
import 'yet-another-react-lightbox/styles.css'               // Lightbox styles

interface GalleryImage {
  _id:      string
  imageUrl: string
  alt:      Record<string, string>
  caption?: Record<string, string>
  category: string
}

interface GalleryGridProps {
  images: GalleryImage[]
  locale: string
}

// Filter tab categories — "all" shows every image
const FILTERS = ['all', 'rooms', 'restaurant', 'exterior', 'food'] as const

export default function GalleryGrid({ images, locale }: GalleryGridProps) {
  const t = useTranslations('gallery')

  // Track which category filter is active (default: show all photos)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Track which photo is open in the lightbox (-1 = lightbox closed)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  // Filter images based on the active category tab
  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter(img => img.category === activeFilter)

  // Convert images to the format expected by the lightbox library
  const lightboxSlides = filteredImages.map(img => ({
    src:         img.imageUrl,
    alt:         img.alt?.[locale] || img.alt?.en || '',
    description: img.caption?.[locale] || img.caption?.en || '',
  }))

  return (
    <div>
      {/* ── Filter tabs ──────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`
              px-5 py-2 text-sm font-body font-semibold rounded-full border transition-colors
              ${activeFilter === filter
                ? 'bg-primary border-primary text-white'       // Active filter
                : 'border-gold text-moroccan-muted hover:border-primary hover:text-primary' // Inactive
              }
            `}
          >
            {/* Map filter key to translation string (e.g. 'rooms' → "Chambres" in French) */}
            {filter === 'all' ? t('all') : t(filter as 'rooms' | 'restaurant' | 'exterior' | 'food')}
          </button>
        ))}
      </div>

      {/* ── Photo grid ───────────────────────────────────────────── */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filteredImages.map((image, index) => (
          <div
            key={image._id}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm"
            onClick={() => setLightboxIndex(index)} // Open lightbox at this photo's index
          >
            {/* Photo — uses masonry layout via CSS columns */}
            <Image
              src={image.imageUrl}
              alt={image.alt?.[locale] || image.alt?.en || ''}
              width={400}
              height={300}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Hover overlay with magnify hint */}
            <div className="absolute inset-0 bg-moroccan-dark/0 group-hover:bg-moroccan-dark/30 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-body">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox — full screen photo viewer ──────────────────── */}
      {/* Opens when lightboxIndex >= 0, closes when index is set to -1 */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </div>
  )
}
