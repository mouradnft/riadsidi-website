// Footer.tsx — Site footer
// Shows logo, description, quick links, contact info, social links, and copyright
// All contact data comes from Sanity site settings (editable without code changes)

import Link                from 'next/link'
import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'

interface FooterProps {
  locale: string
  settings: {
    phones:          string[]
    emails:          string[]
    address:         Record<string, string>
    restaurantHours: string
    social:          Record<string, string>
    bookingComUrl:   string
  } | null
}

export default function Footer({ locale, settings }: FooterProps) {
  const t    = useTranslations('footer')
  const tNav = useTranslations('nav')

  // Quick links shown in the footer — mirrors the main navigation
  const footerLinks = [
    { label: tNav('home'),       href: `/${locale}` },
    { label: tNav('about'),      href: `/${locale}/about` },
    { label: tNav('rooms'),      href: `/${locale}/rooms` },
    { label: tNav('restaurant'), href: `/${locale}/restaurant` },
    { label: tNav('services'),   href: `/${locale}/services` },
    { label: tNav('gallery'),    href: `/${locale}/gallery` },
    { label: tNav('blog'),       href: `/${locale}/blog` },
    { label: tNav('contact'),    href: `/${locale}/contact` },
  ]

  // Social media platforms to show in the footer
  const socialLinks = [
    { name: 'Facebook',    key: 'facebook' },
    { name: 'Instagram',   key: 'instagram' },
    { name: 'TripAdvisor', key: 'tripadvisor' },
    { name: 'YouTube',     key: 'youtube' },
  ]

  // The address string in the current language (falls back to English if not set)
  const address = settings?.address?.[locale] || settings?.address?.en || ''

  return (
    <footer className="bg-moroccan-dark text-white">

      {/* ── Main footer content ──────────────────────────────────────── */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand + description */}
          <div className="lg:col-span-1">
            <div className="font-heading text-2xl font-bold text-white mb-1">Riad Sidi</div>
            <div className="text-gold text-xs tracking-widest uppercase mb-4">Fes, Morocco</div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>

            {/* Booking.com CTA in the footer */}
            {settings?.bookingComUrl && (
              <a
                href={settings.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm hover:text-gold-light transition-colors"
              >
                <ExternalLink size={14} />
                {t('bookingCom')}
              </a>
            )}
          </div>

          {/* Column 2: Quick navigation links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-5">
              {t('quickLinks')}
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact information */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-5">
              {t('contactInfo')}
            </h3>
            <ul className="flex flex-col gap-3">

              {/* Physical address */}
              {address && (
                <li className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                  <span>{address}</span>
                </li>
              )}

              {/* Restaurant hours */}
              {settings?.restaurantHours && (
                <li className="flex items-center gap-3 text-white/60 text-sm">
                  <Clock size={16} className="text-gold shrink-0" />
                  <span>{settings.restaurantHours}</span>
                </li>
              )}

              {/* Phone numbers — each is a clickable "tel:" link */}
              {settings?.phones?.map(phone => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={16} className="text-gold shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}

              {/* Email addresses — each is a clickable "mailto:" link */}
              {settings?.emails?.map(email => (
                <li key={email} className="flex items-center gap-3">
                  <Mail size={16} className="text-gold shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social media links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-5">
              {t('followUs')}
            </h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map(social => {
                const url = settings?.social?.[social.key]
                if (!url) return null // Skip if URL is not set in Sanity
                return (
                  <li key={social.key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-gold text-sm transition-colors"
                    >
                      {social.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Riad Sidi. {t('rights')}
          </p>
          <p className="text-white/40 text-xs">
            60 Bis Ain Azliten, Fes 30110, Morocco
          </p>
        </div>
      </div>
    </footer>
  )
}
