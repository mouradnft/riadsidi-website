// middleware.ts — URL language routing middleware
// This file runs on every request and handles redirecting users to the correct language URL
// e.g. visiting "/" redirects to "/fr/" (French is the default language)

import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // All supported languages — order matters for the language switcher display
  locales: ['fr', 'en', 'ar'],

  // Default language — users with no language preference go here
  // French is default because the primary market is Moroccan/French-speaking
  defaultLocale: 'fr',

  // Always show the locale prefix in the URL (e.g. /fr/, /en/, /ar/)
  // This makes URLs clear and shareable across languages
  localePrefix: 'always',
})

// Tell Next.js which routes this middleware should run on
// Excludes: API routes, Sanity Studio, static files, image files
export const config = {
  matcher: [
    '/((?!api|studio|_next|_vercel|.*\\..*).*)',
  ],
}
