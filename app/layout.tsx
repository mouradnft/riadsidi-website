// app/layout.tsx — Root layout
// This is the outermost wrapper for the entire application
// It loads Google Fonts and sets up the HTML document shell

import type { Metadata } from 'next'
import './globals.css' // Global CSS styles (Tailwind base)

// Load Google Fonts — Playfair Display for headings, Lato for body, Amiri for Arabic
import { Playfair_Display, Lato, Amiri } from 'next/font/google'

// Playfair Display — elegant serif font used for all headings (h1, h2, h3)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading', // CSS variable so Tailwind can reference it
  display: 'swap',            // "swap" prevents flash of invisible text during load
})

// Lato — clean sans-serif font used for body text and UI elements
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'], // Only load the weights we actually use
  variable: '--font-body',
  display: 'swap',
})

// Amiri — traditional Arabic calligraphic font used when locale is 'ar'
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

// Default metadata — overridden by individual pages
export const metadata: Metadata = {
  title: 'Riad Sidi — Luxury Riad & Restaurant Soultana, Fes Morocco',
  description: 'A luxury traditional riad and authentic Moroccan restaurant in the heart of Fes, Morocco.',
}

// Root layout — wraps every page in the app
// The {children} is replaced by whatever page is being rendered
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Root layout passes font CSS variables to the body
  // lang and dir are set inside [locale]/layout.tsx which knows the active language
  // suppressHydrationWarning prevents React warnings when the locale layout updates these attributes
  return (
    <html suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${lato.variable} ${amiri.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
