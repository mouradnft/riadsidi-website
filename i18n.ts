// i18n.ts — Internationalization (multilingual) configuration
// This file tells next-intl how to load translation strings for each language

import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  // Return the locale back so next-intl knows which language is active
  locale,
  // Load the translation file for the current language
  // e.g. if the URL is /fr/rooms → loads messages/fr.json
  // e.g. if the URL is /ar/rooms → loads messages/ar.json
  messages: (await import(`./messages/${locale}.json`)).default,
}))
