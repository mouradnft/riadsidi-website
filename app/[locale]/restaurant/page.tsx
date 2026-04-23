// app/[locale]/restaurant/page.tsx — Restaurant Soultana page
// Full restaurant section: about, dining packages, and complete menu

import { getTranslations } from 'next-intl/server'
import Link                from 'next/link'
import Image               from 'next/image'
import { sanityFetch }     from '@/sanity/sanity.client'
import { MENU_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import MenuSection         from '@/components/MenuSection'
import { ChevronRight, Star, Music, Utensils } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'restaurant' })
  return {
    title: `${t('title')} — Riad Sidi`,
    description: t('aboutText').slice(0, 160),
  }
}

interface PageProps {
  params: { locale: string }
}

export default async function RestaurantPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'restaurant' })

  // Fetch menu items and site settings (for restaurant photo)
  const menuItems   = await sanityFetch<any[]>(MENU_QUERY)
  const settings    = await sanityFetch<any>(SITE_SETTINGS_QUERY)
  const restaurantImageUrl = settings?.restaurantImageUrl ?? null

  // The 3 dining packages — static content (structure doesn't change, only dishes do)
  const packages = [
    {
      icon: Utensils,
      title: t('simpleMenu'),
      desc: t('simpleMenuDesc'),
      includes: [
        locale === 'fr' ? 'Choix libre à la carte' : locale === 'ar' ? 'الطلب الحر من القائمة' : 'Free à la carte ordering',
      ],
    },
    {
      icon: Star,
      title: t('specialMenu'),
      desc: t('specialMenuDesc'),
      includes: [
        locale === 'fr' ? 'Salade Marocaine' : locale === 'ar' ? 'سلطة مغربية' : 'Moroccan Salad',
        locale === 'fr' ? 'Plat principal au choix (12 options)' : locale === 'ar' ? 'طبق رئيسي من اختيارك (12 خياراً)' : 'Main dish of choice (12 options)',
        locale === 'fr' ? 'Fruits de Saison' : locale === 'ar' ? 'فواكه موسمية' : 'Seasonal Fruit',
        locale === 'fr' ? 'Thé à la Menthe' : locale === 'ar' ? 'شاي بالنعناع' : 'Moroccan Mint Tea',
      ],
    },
    {
      icon: Music,
      title: t('showMenu'),
      desc: t('showMenuDesc'),
      includes: [
        locale === 'fr' ? 'Tout inclus du Menu Spécial' : locale === 'ar' ? 'كل ما يشمله المنيو المميز' : 'Everything in Special Menu',
        locale === 'fr' ? 'Spectacle musical live' : locale === 'ar' ? 'عرض موسيقي حي' : 'Live music performance',
        locale === 'fr' ? 'Spectacle culturel' : locale === 'ar' ? 'عرض ثقافي' : 'Cultural performance',
      ],
    },
  ]

  return (
    <>
      {/* ── Page hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-moroccan-dark pattern-overlay">
        <div className="container-custom text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Restaurant</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <div className="divider-gold" />
          <p className="text-white/70 mt-4 max-w-xl mx-auto italic font-heading text-lg">
            "{t('subtitle')}"
          </p>
        </div>
      </section>

      {/* ── About the restaurant ─────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className={`flex flex-col ${restaurantImageUrl ? 'lg:flex-row' : ''} gap-12 items-center`}>
            {/* Text side */}
            <div className={`${restaurantImageUrl ? 'lg:w-1/2' : 'max-w-3xl mx-auto'} text-center lg:text-left`}>
              <h2 className="section-title">{t('aboutTitle')}</h2>
              <div className="divider-gold" />
              <p className="text-moroccan-muted text-lg leading-relaxed mt-6">
                {t('aboutText')}
              </p>
              <Link href={`/${locale}/contact`} className="btn-primary mt-8 inline-flex">
                {t('reserveTable')} <ChevronRight size={16} />
              </Link>
            </div>

            {/* Photo side — only shown when a photo is uploaded in admin */}
            {restaurantImageUrl && (
              <div className="lg:w-1/2 relative h-80 lg:h-96 w-full rounded-sm overflow-hidden">
                <Image
                  src={restaurantImageUrl}
                  alt="Restaurant Soultana"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Dining packages ───────────────────────────────────────── */}
      <section className="section-padding bg-moroccan-dark pattern-overlay">
        <div className="container-custom">
          <h2 className="section-title text-white">{t('packagesTitle')}</h2>
          <div className="divider-gold mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`p-8 rounded-sm border ${i === 1 ? 'border-gold bg-white/5' : 'border-white/10'} flex flex-col`}
              >
                {/* Package icon */}
                <pkg.icon size={32} className="text-gold mb-4" />

                {/* Package name */}
                <h3 className="font-heading text-xl font-bold text-white mb-2">{pkg.title}</h3>

                {/* Gold divider */}
                <div className="w-8 h-0.5 bg-gold mb-4" />

                {/* Package description */}
                <p className="text-white/60 text-sm leading-relaxed mb-5">{pkg.desc}</p>

                {/* What's included list */}
                <ul className="mt-auto space-y-2">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Price note */}
          <p className="text-center text-white/40 text-sm mt-8 italic">
            {t('contactForPrice')}
          </p>
        </div>
      </section>

      {/* ── Full menu ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title">{t('menuTitle')}</h2>
          <div className="divider-gold mb-12" />

          {/* MenuSection component handles grouping dishes by category */}
          {menuItems?.length > 0 ? (
            <MenuSection items={menuItems} locale={locale} />
          ) : (
            // Fallback if no dishes are in Sanity yet
            <p className="text-center text-moroccan-muted py-12">
              Menu coming soon. Please contact us for details.
            </p>
          )}

          {/* Price disclaimer */}
          <p className="text-center text-moroccan-muted text-sm mt-12 italic">
            {t('contactForPrice')}
          </p>
        </div>
      </section>
    </>
  )
}
