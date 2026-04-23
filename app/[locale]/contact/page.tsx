// app/[locale]/contact/page.tsx — Contact page
// Shows the contact form, all contact details, WhatsApp button, map link, and social links

import { getTranslations }   from 'next-intl/server'
import { sanityFetch }       from '@/sanity/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import ContactForm           from '@/components/ContactForm'
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: `${t('title')} — Riad Sidi` }
}

interface PageProps {
  params: { locale: string }
}

export default async function ContactPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'contact' })

  // Fetch site settings from Sanity (phones, emails, WhatsApp, address, hours)
  const settings = await sanityFetch<any>(SITE_SETTINGS_QUERY)

  // Get address in the current language
  const address = settings?.address?.[locale] || settings?.address?.en || '60 Bis Ain Azliten, Fes 30110, Morocco'

  // Social media platforms to link in the contact page
  const socialLinks = [
    { name: 'Facebook',    key: 'facebook' },
    { name: 'Instagram',   key: 'instagram' },
    { name: 'Twitter / X', key: 'twitter' },
    { name: 'TripAdvisor', key: 'tripadvisor' },
    { name: 'YouTube',     key: 'youtube' },
  ]

  return (
    <>
      {/* ── Page hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-moroccan-dark pattern-overlay">
        <div className="container-custom text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Contact</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <div className="divider-gold" />
          <p className="text-white/70 mt-4">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Contact content: form + info ─────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* ── Left column: Contact form (wider) ────────────── */}
            <div className="lg:col-span-3 bg-white rounded-sm p-8 shadow-md">
              <h2 className="font-heading text-2xl font-bold text-moroccan-dark mb-2">
                {t('formTitle')}
              </h2>
              <div className="w-8 h-0.5 bg-gold mb-6" />

              {/* ContactForm is a client component (needs JS for validation and submission) */}
              <ContactForm />
            </div>

            {/* ── Right column: Contact information ────────────── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Direct contact info */}
              <div>
                <h2 className="font-heading text-xl font-bold text-moroccan-dark mb-5">
                  {t('orContact')}
                </h2>

                <div className="space-y-4">

                  {/* Phone numbers — click to call */}
                  {settings?.phones?.map((phone: string) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-moroccan-muted hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone size={18} className="text-primary" />
                      </div>
                      <span className="font-body text-sm">{phone}</span>
                    </a>
                  ))}

                  {/* WhatsApp button — opens chat directly */}
                  {settings?.whatsapp && (
                    <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-moroccan-muted hover:text-[#25D366] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                        <MessageCircle size={18} className="text-[#25D366]" />
                      </div>
                      <span className="font-body text-sm">WhatsApp</span>
                    </a>
                  )}

                  {/* Email addresses — click to email */}
                  {settings?.emails?.map((email: string) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 text-moroccan-muted hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Mail size={18} className="text-primary" />
                      </div>
                      <span className="font-body text-sm break-all">{email}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-moroccan-dark mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-gold" />
                  {t('address')}
                </h3>
                <p className="text-moroccan-muted text-sm leading-relaxed mb-3">{address}</p>
                {settings?.googleMapsUrl && (
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:text-primary-light transition-colors"
                  >
                    <ExternalLink size={14} />
                    {t('getDirections')}
                  </a>
                )}
              </div>

              {/* Restaurant hours */}
              {settings?.restaurantHours && (
                <div>
                  <h3 className="font-heading text-lg font-semibold text-moroccan-dark mb-3 flex items-center gap-2">
                    <Clock size={18} className="text-gold" />
                    {t('hours')}
                  </h3>
                  <p className="text-moroccan-muted text-sm">
                    Restaurant Soultana: {settings.restaurantHours}
                  </p>
                </div>
              )}

              {/* Social media links */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-moroccan-dark mb-3">
                  {t('followUs')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(social => {
                    const url = settings?.social?.[social.key]
                    if (!url) return null
                    return (
                      <a
                        key={social.key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 border border-gold/40 text-moroccan-muted hover:border-gold hover:text-primary text-xs font-body rounded transition-colors"
                      >
                        {social.name}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
