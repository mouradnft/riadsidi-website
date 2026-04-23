// RoomCard.tsx — Individual room display card
// Used on the homepage (3 featured rooms) and the full rooms page
// Shows room photo, name, price, and two action buttons

import Image           from 'next/image'
import Link            from 'next/link'
import { ExternalLink, Phone } from 'lucide-react'
import { useTranslations }     from 'next-intl'

interface RoomCardProps {
  room: {
    _id:          string
    title:        Record<string, string>  // { fr: '...', en: '...', ar: '...' }
    price?:       number                  // Optional — shows "Contact us" if missing
    priceNote?:   string                  // e.g. "per night"
    image?:       string                  // Image URL from Sanity CDN
    images?:      string[]               // Multiple images (rooms page variant)
    features?:    Record<string, string[]> // Features list per language
    bookingUrl?:  string                  // Booking.com URL
  }
  locale:  string
  variant?: 'card' | 'full' // 'card' = homepage thumbnail, 'full' = rooms page with details
}

export default function RoomCard({ room, locale, variant = 'card' }: RoomCardProps) {
  const t = useTranslations('rooms')

  // Get the room name in the current language, with English as fallback
  const title = room.title?.[locale] || room.title?.en || room.title?.fr || 'Room'

  // Get the primary image URL (first image in the array, or the single image field)
  const imageUrl = room.image || room.images?.[0]

  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">

      {/* ── Room photo ──────────────────────────────────────────────── */}
      <div className="relative h-56 overflow-hidden bg-cream-dark">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title} // Alt text uses the room name for accessibility
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Placeholder shown when no image is uploaded yet in Sanity
          <div className="w-full h-full flex items-center justify-center bg-cream-dark text-moroccan-muted text-sm">
            No image yet
          </div>
        )}

        {/* Gold overlay gradient at the bottom of the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-moroccan-dark/40 to-transparent" />
      </div>

      {/* ── Room info ────────────────────────────────────────────────── */}
      <div className="p-5">

        {/* Room name */}
        <h3 className="font-heading text-xl font-bold text-moroccan-dark mb-2">
          {title}
        </h3>

        {/* Gold divider line */}
        <div className="w-8 h-0.5 bg-gold mb-3" />

        {/* Room features list — only shown in 'full' variant (rooms page) */}
        {variant === 'full' && room.features && (
          <ul className="mb-4 flex flex-col gap-1">
            {(room.features[locale] || room.features.en || []).map((feature: string) => (
              <li key={feature} className="flex items-center gap-2 text-moroccan-muted text-sm">
                <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Price — shows "from $XX/night" or "Contact us for pricing" if empty */}
        <div className="mb-5">
          {room.price ? (
            <div className="flex items-baseline gap-1">
              <span className="text-moroccan-muted text-sm">{t('from')}</span>
              <span className="text-primary font-heading text-2xl font-bold">
                ${room.price}
              </span>
              <span className="text-moroccan-muted text-sm">/{t('perNight')}</span>
            </div>
          ) : (
            // No price set in Sanity — show contact message instead of $0
            <p className="text-moroccan-muted text-sm italic">{t('contactForPrice')}</p>
          )}
        </div>

        {/* ── Action buttons ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-2">

          {/* Book on Booking.com — external link */}
          {room.bookingUrl && (
            <a
              href={room.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 flex-1 justify-center"
            >
              <ExternalLink size={14} />
              {t('bookOnBooking')}
            </a>
          )}

          {/* Contact to Book — links to the contact page */}
          <Link
            href={`/${locale}/contact`}
            className="btn-secondary text-sm py-2 flex-1 justify-center"
          >
            <Phone size={14} />
            {t('contactToBook')}
          </Link>
        </div>
      </div>
    </div>
  )
}
