// MenuSection.tsx — Restaurant menu display component
// Groups menu items by category and renders them in labeled sections
// Handles the "NEW" badge and vegetarian indicator

import { useTranslations } from 'next-intl'
import { Leaf }            from 'lucide-react'
import Image               from 'next/image'

// Type matching the Sanity menuItem schema
interface MenuItem {
  _id:                  string
  name:                 Record<string, string>
  description:          Record<string, string>
  category:             string
  subcategory?:         string
  isNew:                boolean
  isVegetarian:         boolean
  imageUrl?:            string
  availableInPackages:  string[]
}

interface MenuSectionProps {
  items:  MenuItem[]  // All menu items fetched from Sanity
  locale: string      // Current language for displaying names and descriptions
}

// Maps category codes to translation keys and their display order
const CATEGORIES = [
  { key: 'appetizer', labelKey: 'appetizers' as const },
  { key: 'tajine',    labelKey: 'tajines'    as const },
  { key: 'fassi',     labelKey: 'fassi'      as const },
  { key: 'dessert',   labelKey: 'desserts'   as const },
  { key: 'beverage',  labelKey: 'beverages'  as const },
]

export default function MenuSection({ items, locale }: MenuSectionProps) {
  const t = useTranslations('restaurant')

  return (
    <div className="space-y-16">
      {CATEGORIES.map(category => {
        // Filter items for this category
        const categoryItems = items.filter(item => item.category === category.key)

        // Skip the category entirely if there are no dishes in it
        if (categoryItems.length === 0) return null

        return (
          <section key={category.key}>

            {/* ── Category heading ─────────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-heading text-2xl font-bold text-moroccan-dark">
                {t(category.labelKey)}
              </h2>
              {/* Gold line extending from the heading */}
              <div className="flex-1 h-px bg-gold/30" />
            </div>

            {/* ── Dish grid ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryItems.map(item => {
                // Get dish name and description in the current language
                const name = item.name?.[locale] || item.name?.fr || item.name?.en || ''
                const desc = item.description?.[locale] || item.description?.fr || item.description?.en || ''

                return (
                  <div
                    key={item._id}
                    className="flex gap-4 p-4 rounded-sm bg-cream border border-gold/10 hover:border-gold/30 transition-colors"
                  >
                    {/* Dish photo — only shown if an image was uploaded in Sanity */}
                    {item.imageUrl && (
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    )}

                    {/* Dish name, badges, and description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1 flex-wrap">

                        {/* Dish name */}
                        <h3 className="font-heading font-semibold text-moroccan-dark text-base leading-tight">
                          {name}
                        </h3>

                        {/* "NEW" badge — shown when isNew is true in Sanity */}
                        {item.isNew && (
                          <span className="shrink-0 text-xs font-body font-bold bg-primary text-white px-2 py-0.5 rounded-full">
                            {t('new')}
                          </span>
                        )}

                        {/* Vegetarian indicator — shown when isVegetarian is true */}
                        {item.isVegetarian && (
                          <span className="shrink-0 flex items-center gap-1 text-xs font-body text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                            <Leaf size={10} />
                            {t('vegetarian')}
                          </span>
                        )}
                      </div>

                      {/* Dish description / ingredients */}
                      {desc && (
                        <p className="text-moroccan-muted text-sm leading-relaxed line-clamp-2">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
