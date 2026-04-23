// app/[locale]/services/page.tsx — Services page
// Lists all services offered by Riad Sidi with descriptions and contact CTA

import { getTranslations } from 'next-intl/server'
import Link                from 'next/link'
import { sanityFetch }     from '@/sanity/sanity.client'
import { SERVICES_QUERY }  from '@/lib/queries'
import { Car, Map, ChefHat, Music, Bus, ChevronRight } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'services' })
  return { title: `${t('title')} — Riad Sidi` }
}

interface PageProps {
  params: { locale: string }
}

// Maps Sanity icon field values to actual Lucide React icon components
const ICON_MAP: Record<string, React.ElementType> = {
  car:      Car,
  map:      Map,
  chef:     ChefHat,
  music:    Music,
  bus:      Bus,
  default:  ChevronRight,
}

export default async function ServicesPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'services' })

  // Fetch services from Sanity
  const services = await sanityFetch<any[]>(SERVICES_QUERY)

  return (
    <>
      {/* ── Page hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-moroccan-dark pattern-overlay">
        <div className="container-custom text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Services</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <div className="divider-gold" />
          <p className="text-white/70 mt-4">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────────────── */}
      <section className="section-padding bg-cream pattern-overlay">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services?.map(service => {
              // Get the icon component for this service (fallback to ChevronRight)
              const IconComponent = ICON_MAP[service.icon] || ICON_MAP.default

              return (
                <div
                  key={service._id}
                  className="bg-white rounded-sm p-8 shadow-md border-l-4 border-gold hover:shadow-lg transition-shadow"
                >
                  {/* Service icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <IconComponent size={22} className="text-primary" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-moroccan-dark">
                      {service.title?.[locale] || service.title?.fr}
                    </h2>
                  </div>

                  {/* Service description */}
                  <p className="text-moroccan-muted leading-relaxed mb-5">
                    {service.description?.[locale] || service.description?.fr}
                  </p>

                  {/* Contact link */}
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:text-primary-light transition-colors"
                  >
                    {t('contactForInfo')} <ChevronRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Fallback if no services in Sanity yet */}
          {(!services || services.length === 0) && (
            <div className="text-center py-20 text-moroccan-muted">
              Services details coming soon. Please contact us.
            </div>
          )}
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            {locale === 'fr' ? 'Besoin d\'un service personnalisé ?' : locale === 'ar' ? 'هل تحتاج خدمة مخصصة؟' : 'Need a custom service?'}
          </h2>
          <p className="text-white/80 mb-6">
            {locale === 'fr' ? 'Contactez-nous — nous sommes là pour répondre à tous vos besoins.' : locale === 'ar' ? 'تواصل معنا — نحن هنا لتلبية جميع احتياجاتك.' : 'Contact us — we are here to meet all your needs.'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-ghost">
            {t('contactUs')}
          </Link>
        </div>
      </section>
    </>
  )
}
