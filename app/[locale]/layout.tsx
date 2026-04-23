// app/[locale]/layout.tsx — Language-aware layout
// Wraps every translated page with i18n provider, header, footer, and WhatsApp button
// Sets the correct lang and dir attributes on the <html> element via an inline script

import { NextIntlClientProvider } from 'next-intl'
import { getMessages }            from 'next-intl/server'
import { notFound }               from 'next/navigation'
import type { Metadata }          from 'next'
import Header                     from '@/components/Header'
import Footer                     from '@/components/Footer'
import WhatsAppButton             from '@/components/WhatsAppButton'
import { sanityFetch }            from '@/sanity/sanity.client'
import { SITE_SETTINGS_QUERY }    from '@/lib/queries'

// The three supported locales — any other value returns a 404
const locales = ['fr', 'en', 'ar']

interface LocaleLayoutProps {
  children: React.ReactNode
  params:   { locale: string }
}

// Generate the <html lang="..."> attribute via metadata so Next.js sets it server-side
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    // Other fields can be set here — individual pages override this
    other: {
      // Next.js uses this to set the lang attribute on <html>
      lang: locale,
    },
  }
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  // If someone navigates to /de/ or any unsupported locale, show 404
  if (!locales.includes(locale)) notFound()

  // Load translation strings for the current language (from messages/*.json)
  const messages = await getMessages()

  // Fetch global site settings from Sanity (contact info, WhatsApp, etc.)
  const settings = await sanityFetch<{
    whatsapp:        string
    phones:          string[]
    emails:          string[]
    social:          Record<string, string>
    bookingComUrl:   string
    address:         Record<string, string>
    restaurantHours: string
  }>(SITE_SETTINGS_QUERY)

  // Arabic is right-to-left — all other languages are left-to-right
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <>
      {/*
        Inline script that runs before React hydrates — sets lang and dir on <html>
        This is the correct way to handle RTL in Next.js App Router without nesting <html> tags
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}";document.documentElement.dir="${dir}";`,
        }}
      />

      {/* NextIntlClientProvider makes translations available to all child components */}
      <NextIntlClientProvider locale={locale} messages={messages}>
        {/* Site header — navigation bar with language switcher */}
        <Header locale={locale} settings={settings} />

        {/* Main page content — rendered by each individual page file */}
        <main>{children}</main>

        {/* Site footer — contact info, links, social media */}
        <Footer locale={locale} settings={settings} />

        {/* Floating WhatsApp button — always visible in the bottom corner */}
        {settings?.whatsapp && (
          <WhatsAppButton whatsappNumber={settings.whatsapp} />
        )}
      </NextIntlClientProvider>
    </>
  )
}
