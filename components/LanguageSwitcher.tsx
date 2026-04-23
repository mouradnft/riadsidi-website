'use client'
// LanguageSwitcher.tsx — Language toggle component (EN / FR / AR)
// Clicking a language redirects the user to the same page in the selected language
// The current language is highlighted so the user knows what's active

import { usePathname, useRouter } from 'next/navigation'

interface LanguageSwitcherProps {
  currentLocale: string // The language currently active (e.g. 'fr')
}

// The three supported languages with their labels and locale codes
const LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'ع'  }, // Arabic letter as the label
]

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname() // Current URL path, e.g. "/fr/rooms"
  const router   = useRouter()

  // Switch to a different language while staying on the same page
  // e.g. clicking "EN" on "/fr/rooms" → navigates to "/en/rooms"
  function switchLocale(newLocale: string) {
    // Replace the current locale prefix in the URL with the new one
    // pathname starts with /<currentLocale>/, so we replace that segment
    const segments = pathname.split('/')
    segments[1] = newLocale // segments[0] is empty, segments[1] is the locale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          {/* Language button — highlighted when it matches the current locale */}
          <button
            onClick={() => switchLocale(lang.code)}
            disabled={lang.code === currentLocale} // Disable the button for the active language
            className={`
              px-2 py-1 text-xs font-body font-semibold tracking-wider transition-colors
              ${lang.code === currentLocale
                ? 'text-gold cursor-default'          // Active language — gold color
                : 'text-white/70 hover:text-white'    // Inactive — dimmed, brightens on hover
              }
            `}
          >
            {lang.label}
          </button>

          {/* Separator between language options — not shown after the last one */}
          {index < LANGUAGES.length - 1 && (
            <span className="text-white/30 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
