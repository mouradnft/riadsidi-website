// app/[locale]/page.tsx — Homepage
// The main landing page with hero, rooms preview, restaurant teaser,
// services overview, testimonials, blog preview, and contact CTA

import Image               from 'next/image'
import Link                from 'next/link'
import { getTranslations } from 'next-intl/server'
import { sanityFetch }     from '@/sanity/sanity.client'
import {
  FEATURED_ROOMS_QUERY,
  TESTIMONIALS_QUERY,
  LATEST_POSTS_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/lib/queries'
import RoomCard from '@/components/RoomCard'
import { Star, ChevronRight, MapPin } from 'lucide-react'

// Next.js reads this to generate proper HTML <title> and <meta> tags for SEO
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: 'Riad Sidi — Luxury Riad & Restaurant Soultana, Fes Morocco',
    description: t('welcomeText').slice(0, 160), // Use the first 160 chars of the welcome text
  }
}

interface PageProps {
  params: { locale: string }
}

export default async function HomePage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'home' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  // Fetch all data in parallel — faster than fetching one by one
  const [rooms, testimonials, posts, services, settings] = await Promise.all([
    sanityFetch<any[]>(FEATURED_ROOMS_QUERY),   // Top 3 rooms for the homepage
    sanityFetch<any[]>(TESTIMONIALS_QUERY),      // All guest reviews
    sanityFetch<any[]>(LATEST_POSTS_QUERY),      // Latest 3 blog posts
    sanityFetch<any[]>(SERVICES_QUERY),          // All services
    sanityFetch<any>(SITE_SETTINGS_QUERY),       // Site settings (restaurant photo, etc.)
  ])
  const restaurantImageUrl = settings?.restaurantImageUrl ?? null

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Full-screen image with the property name, tagline, and CTAs
          ════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

        {/* Hero background image — replace the src with your actual hero photo */}
        <div className="absolute inset-0 bg-moroccan-dark">
          {/* The hero image from Sanity would go here — using a placeholder bg for now */}
          <div className="w-full h-full bg-gradient-to-br from-moroccan-dark via-primary/80 to-moroccan-dark pattern-overlay" />
        </div>

        {/* Dark overlay to ensure text is readable over the image */}
        <div className="absolute inset-0 bg-moroccan-dark/50" />

        {/* Hero text content — centered */}
        <div className="relative z-10 text-center container-custom">

          {/* Location badge */}
          <div className="flex items-center justify-center gap-2 text-gold text-sm font-body tracking-widest uppercase mb-6">
            <MapPin size={14} />
            <span>Fes, Morocco</span>
          </div>

          {/* Property name — the largest element on the page */}
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Riad Sidi
          </h1>

          {/* Gold decorative divider */}
          <div className="divider-gold" />

          {/* Tagline from translations */}
          <p className="font-heading text-xl md:text-2xl text-white/90 italic mb-3 mt-6">
            {t('heroTagline')}
          </p>

          {/* Subtitle */}
          <p className="text-white/70 font-body text-base md:text-lg mb-10 max-w-xl mx-auto">
            {t('heroSubtitle')}
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/rooms`} className="btn-primary px-8 py-4 text-base">
              {t('discoverRooms')}
              <ChevronRight size={18} />
            </Link>
            <Link href={`/${locale}/restaurant`} className="btn-ghost px-8 py-4 text-base">
              {t('reserveTable')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator — animated chevron at the bottom of the hero */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronRight size={24} className="rotate-90" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — WELCOME / ABOUT SNIPPET
          Brief introduction to Riad Sidi with decorative elements
          ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream pattern-overlay">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-4">Bienvenue · Welcome · أهلاً</p>
          <h2 className="section-title">{t('welcomeTitle')}</h2>
          <div className="divider-gold" />
          <p className="text-moroccan-muted text-lg leading-relaxed mt-6 mb-8">
            {t('welcomeText')}
          </p>
          <Link href={`/${locale}/about`} className="btn-secondary">
            {tCommon('learnMore')}
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — FEATURED ROOMS
          3 room cards pulled from Sanity
          ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <p className="text-gold font-body text-sm tracking-widest uppercase text-center mb-3">Accommodation</p>
          <h2 className="section-title">{t('roomsTitle')}</h2>
          <p className="section-subtitle">{t('roomsSubtitle')}</p>

          {/* Room cards grid — 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {rooms?.map(room => (
              <RoomCard key={room._id} room={room} locale={locale} />
            ))}
          </div>

          {/* Link to the full rooms page */}
          <div className="text-center">
            <Link href={`/${locale}/rooms`} className="btn-secondary">
              {tCommon('learnMore')} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — RESTAURANT SOULTANA TEASER
          Split layout: description text on one side, visual on the other
          ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text content */}
            <div>
              <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Restaurant</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-moroccan-dark mb-4">
                {t('restaurantTitle')}
              </h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-moroccan-muted text-lg leading-relaxed mb-6 italic font-heading">
                "{t('restaurantSubtitle')}"
              </p>
              <p className="text-moroccan-muted leading-relaxed mb-8">
                {t('restaurantText')}
              </p>
              <Link href={`/${locale}/restaurant`} className="btn-primary">
                {t('viewMenu')} <ChevronRight size={16} />
              </Link>
            </div>

            {/* Right: Restaurant photo from admin panel, or placeholder if not yet uploaded */}
            <div className="relative h-80 lg:h-96 rounded-sm overflow-hidden bg-moroccan-dark/10">
              {restaurantImageUrl ? (
                <Image
                  src={restaurantImageUrl}
                  alt="Restaurant Soultana"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-heading text-4xl font-bold text-moroccan-dark/30 mb-2">
                      Restaurant Soultana
                    </div>
                    <div className="text-moroccan-muted text-sm">Add photo in admin panel → Site Settings → Restaurant Photo</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 — SERVICES OVERVIEW
          Icon grid of all services from Sanity
          ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-moroccan-dark">
        <div className="container-custom">
          <p className="text-gold font-body text-sm tracking-widest uppercase text-center mb-3">Services</p>
          <h2 className="section-title text-white">{t('servicesTitle')}</h2>
          <p className="section-subtitle text-white/60">{t('servicesSubtitle')}</p>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services?.slice(0, 6).map(service => (
              <div
                key={service._id}
                className="p-6 border border-white/10 rounded-sm hover:border-gold/40 transition-colors group"
              >
                <div className="w-10 h-0.5 bg-gold mb-4" />
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                  {service.title?.[locale] || service.title?.fr}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {service.description?.[locale] || service.description?.fr}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href={`/${locale}/services`} className="btn-ghost">
              {tCommon('learnMore')} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 6 — TESTIMONIALS
          Guest review cards with star ratings
          ════════════════════════════════════════════════════════════ */}
      {testimonials?.length > 0 && (
        <section className="section-padding bg-cream pattern-overlay">
          <div className="container-custom">
            <p className="text-gold font-body text-sm tracking-widest uppercase text-center mb-3">Reviews</p>
            <h2 className="section-title">{t('testimonialsTitle')}</h2>
            <div className="divider-gold mb-12" />

            {/* Testimonial cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map(testimonial => (
                <div
                  key={testimonial._id}
                  className="bg-white p-6 rounded-sm shadow-md border-t-2 border-gold"
                >
                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-moroccan-muted text-sm leading-relaxed mb-4 italic">
                    "{testimonial.quote?.[locale] || testimonial.quote?.fr || testimonial.quote?.en}"
                  </blockquote>

                  {/* Guest name and source */}
                  <div className="flex items-center justify-between">
                    <span className="font-body font-semibold text-moroccan-dark text-sm">
                      {testimonial.guestName}
                    </span>
                    {testimonial.source && (
                      <span className="text-moroccan-muted text-xs bg-cream px-2 py-1 rounded">
                        {testimonial.source}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 7 — LATEST BLOG POSTS
          3 most recent articles from Sanity
          ════════════════════════════════════════════════════════════ */}
      {posts?.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <p className="text-gold font-body text-sm tracking-widest uppercase text-center mb-3">Blog</p>
            <h2 className="section-title">{t('blogTitle')}</h2>
            <p className="section-subtitle">{t('blogSubtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {posts.map(post => (
                <Link
                  key={post._id}
                  href={`/${locale}/blog/${post.slug?.current}`}
                  className="group block bg-cream rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Post cover image */}
                  {post.coverImageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title?.[locale] || post.title?.fr || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Post date */}
                    <p className="text-moroccan-muted text-xs mb-2">
                      {new Date(post.publishedAt).toLocaleDateString(locale, {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>

                    {/* Post title */}
                    <h3 className="font-heading text-lg font-semibold text-moroccan-dark mb-2 group-hover:text-primary transition-colors">
                      {post.title?.[locale] || post.title?.fr || post.title?.en}
                    </h3>

                    {/* Short excerpt */}
                    <p className="text-moroccan-muted text-sm line-clamp-2">
                      {post.excerpt?.[locale] || post.excerpt?.fr || post.excerpt?.en}
                    </p>

                    <span className="inline-flex items-center gap-1 text-primary text-sm mt-3 font-semibold">
                      {t('readMore')} <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href={`/${locale}/blog`} className="btn-secondary">
                {tCommon('learnMore')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 8 — CONTACT CTA BANNER
          Big call-to-action strip at the bottom encouraging contact
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pattern-overlay opacity-20" />

        <div className="container-custom relative z-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            {t('ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/contact`} className="btn-ghost px-8 py-4">
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
