// app/[locale]/rooms/page.tsx — Rooms page
// Shows all hotel rooms with full details, features, pricing, and booking buttons

import { getTranslations } from 'next-intl/server'
import { sanityFetch }     from '@/sanity/sanity.client'
import { ROOMS_QUERY }     from '@/lib/queries'
import RoomCard            from '@/components/RoomCard'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'rooms' })
  return {
    title: `${t('title')} — Riad Sidi`,
    description: t('allRooms'),
  }
}

interface PageProps {
  params: { locale: string }
}

export default async function RoomsPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'rooms' })

  // Fetch all rooms from Sanity, ordered by the display order field
  const rooms = await sanityFetch<any[]>(ROOMS_QUERY)

  return (
    <>
      {/* ── Page hero banner ─────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-moroccan-dark pattern-overlay">
        <div className="container-custom text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Accommodation</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <div className="divider-gold" />
          <p className="text-white/70 mt-4 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Rooms grid ───────────────────────────────────────────── */}
      <section className="section-padding bg-cream pattern-overlay">
        <div className="container-custom">

          {/* Info banner about all rooms */}
          <p className="text-center text-moroccan-muted text-sm mb-10 italic">
            {t('allRooms')}
          </p>

          {/* Room cards — uses 'full' variant to show the feature list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms?.map(room => (
              <RoomCard
                key={room._id}
                room={room}
                locale={locale}
                variant="full" // Show full details including features list
              />
            ))}
          </div>

          {/* Fallback if no rooms are in Sanity yet */}
          {(!rooms || rooms.length === 0) && (
            <div className="text-center py-20 text-moroccan-muted">
              <p>Room details coming soon. Please contact us directly.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
