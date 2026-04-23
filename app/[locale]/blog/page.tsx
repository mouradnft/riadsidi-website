// app/[locale]/blog/page.tsx — Blog listing page
// Shows all blog posts sorted newest first, each with cover image, title, date, and excerpt

import { getTranslations }  from 'next-intl/server'
import Link                 from 'next/link'
import Image                from 'next/image'
import { sanityFetch }      from '@/sanity/sanity.client'
import { BLOG_POSTS_QUERY } from '@/lib/queries'
import { ChevronRight }     from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'blog' })
  return { title: `${t('title')} — Riad Sidi` }
}

interface PageProps {
  params: { locale: string }
}

export default async function BlogPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'blog' })

  // Fetch all blog posts from Sanity, sorted newest first
  const posts = await sanityFetch<any[]>(BLOG_POSTS_QUERY)

  return (
    <>
      {/* ── Page hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-moroccan-dark pattern-overlay">
        <div className="container-custom text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Blog</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <div className="divider-gold" />
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Blog posts grid ───────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">

          {posts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link
                  key={post._id}
                  href={`/${locale}/blog/${post.slug?.current}`}
                  className="group block bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  {/* Post cover image */}
                  <div className="relative h-52 overflow-hidden bg-cream-dark">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title?.[locale] || post.title?.fr || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      // Placeholder if no cover image
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                        <span className="text-moroccan-muted text-sm">No image</span>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-moroccan-dark/30 to-transparent" />
                  </div>

                  {/* Post content */}
                  <div className="p-6">
                    {/* Publication date */}
                    <p className="text-moroccan-muted text-xs font-body mb-3">
                      {t('publishedOn')} {new Date(post.publishedAt).toLocaleDateString(
                        locale === 'ar' ? 'ar-MA' : locale === 'fr' ? 'fr-FR' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </p>

                    {/* Post title */}
                    <h2 className="font-heading text-xl font-bold text-moroccan-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title?.[locale] || post.title?.fr || post.title?.en}
                    </h2>

                    {/* Post excerpt */}
                    <p className="text-moroccan-muted text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt?.[locale] || post.excerpt?.fr || post.excerpt?.en}
                    </p>

                    {/* Read more link */}
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                      {t('readPost')} <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Fallback if no blog posts are in Sanity yet
            <div className="text-center py-20 text-moroccan-muted">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
