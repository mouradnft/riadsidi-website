// app/[locale]/gallery/page.tsx — Gallery page
// Displays all property photos in a masonry grid with category filters and lightbox

import { getTranslations } from 'next-intl/server'
import { sanityFetch }     from '@/sanity/sanity.client'
import { GALLERY_QUERY }   from '@/lib/queries'
import GalleryGrid         from '@/components/GalleryGrid'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'gallery' })
  return { title: `${t('title')} — Riad Sidi` }
}

interface PageProps {
  params: { locale: string }
}

export default async function GalleryPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'gallery' })

  // Fetch all gallery images from Sanity, ordered by the display order field
  const images = await sanityFetch<any[]>(GALLERY_QUERY)

  return (
    <>
      {/* ── Page hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-moroccan-dark pattern-overlay">
        <div className="container-custom text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Gallery</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <div className="divider-gold" />
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Gallery grid with filters and lightbox ───────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {images?.length > 0 ? (
            // GalleryGrid is a client component (needs click handlers for lightbox)
            <GalleryGrid images={images} locale={locale} />
          ) : (
            // Fallback if no images are uploaded in Sanity yet
            <div className="text-center py-20 text-moroccan-muted">
              <p>Photos coming soon. Please visit us in Fes!</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
