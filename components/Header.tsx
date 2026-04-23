'use client'
// Header.tsx — Site navigation bar
// Shows the logo, nav links, language switcher, and "Book Now" CTA button
// Becomes sticky on scroll and adds a background blur effect

import { useState, useEffect } from 'react'
import Link                    from 'next/link'
import { useTranslations }     from 'next-intl'
import { Menu, X, Phone }      from 'lucide-react'
import LanguageSwitcher        from './LanguageSwitcher'

interface HeaderProps {
  locale:   string
  settings: {
    phones:        string[]
    bookingComUrl: string
    social:        Record<string, string>
  } | null
}

export default function Header({ locale, settings }: HeaderProps) {
  const t = useTranslations('nav') // Load navigation translation strings

  // Track whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false)

  // Track whether the page has been scrolled (to change header appearance)
  const [scrolled, setScrolled] = useState(false)

  // Listen for scroll events — add background when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // Cleanup on unmount
  }, [])

  // Close mobile menu when screen is resized to desktop size
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // All navigation links — label comes from translations, href is language-prefixed
  const navLinks = [
    { label: t('home'),       href: `/${locale}` },
    { label: t('about'),      href: `/${locale}/about` },
    { label: t('rooms'),      href: `/${locale}/rooms` },
    { label: t('restaurant'), href: `/${locale}/restaurant` },
    { label: t('services'),   href: `/${locale}/services` },
    { label: t('gallery'),    href: `/${locale}/gallery` },
    { label: t('blog'),       href: `/${locale}/blog` },
    { label: t('contact'),    href: `/${locale}/contact` },
  ]

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-moroccan-dark/95 backdrop-blur-sm shadow-lg py-3'  // Scrolled: dark bg
          : 'bg-transparent py-5'                                    // Top: transparent
        }
      `}
    >
      <div className="container-custom flex items-center justify-between">

        {/* ── Logo / Brand Name ─────────────────────────────────────── */}
        <Link href={`/${locale}`} className="flex flex-col leading-tight group">
          <span className="font-heading text-xl font-bold text-white group-hover:text-gold transition-colors">
            Riad Sidi
          </span>
          <span className="text-gold text-xs font-body tracking-widest uppercase">
            Fes, Morocco
          </span>
        </Link>

        {/* ── Desktop Navigation ────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-gold font-body text-sm tracking-wide transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right side: Language switcher + Book Now button ──────── */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language switcher — switches between EN / FR / AR */}
          <LanguageSwitcher currentLocale={locale} />

          {/* "Book Now" button — links to Booking.com */}
          {settings?.bookingComUrl && (
            <a
              href={settings.bookingComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-4"
            >
              {t('bookNow')}
            </a>
          )}
        </div>

        {/* ── Mobile: Hamburger menu button ────────────────────────── */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile dropdown menu ──────────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden bg-moroccan-dark/98 backdrop-blur-sm border-t border-white/10">
          <div className="container-custom py-4 flex flex-col gap-1">

            {/* Mobile nav links */}
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)} // Close menu on link click
                className="text-white/90 hover:text-gold py-3 font-body border-b border-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile language switcher */}
            <div className="pt-4">
              <LanguageSwitcher currentLocale={locale} />
            </div>

            {/* Mobile Book Now button */}
            {settings?.bookingComUrl && (
              <a
                href={settings.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 justify-center"
              >
                {t('bookNow')}
              </a>
            )}

            {/* Mobile phone number — click to call */}
            {settings?.phones?.[0] && (
              <a
                href={`tel:${settings.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-gold mt-2 py-2 font-body text-sm"
              >
                <Phone size={16} />
                {settings.phones[0]}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
