// app/[locale]/blog/[slug]/page.tsx — Individual blog post page
// Renders a single blog post by its URL slug (e.g. /fr/blog/fine-dining-in-fez)

import { getTranslations }               from 'next-intl/server'
import Link                              from 'next/link'
import Image                             from 'next/image'
import { notFound }                      from 'next/navigation'
import { PortableText }                  from '@portabletext/react' // Renders Sanity's rich text format
import { sanityFetch }                   from '@/sanity/sanity.client'
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY } from '@/lib/queries'
import { ChevronLeft }                   from 'lucide-react'

// Tell Next.js to pre-build a page for every blog post slug
// This makes post pages static and fast — they load instantly
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(BLOG_SLUGS_QUERY)
  return slugs.map(({ slug }) => ({ slug })) // Returns [{ slug: 'post-1' }, { slug: 'post-2' }, ...]
}

// Generate SEO metadata using the post title
export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const post = await sanityFetch<any>(BLOG_POST_QUERY, { slug })
  const title = post?.title?.[locale] || post?.title?.fr || 'Blog Post'
  return {
    title: `${title} — Riad Sidi`,
    description: title,
  }
}

interface PageProps {
  params: { locale: string; slug: string }
}

export default async function BlogPostPage({ params: { locale, slug } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'blog' })

  // Fetch the post data from Sanity using the slug from the URL
  const post = await sanityFetch<any>(BLOG_POST_QUERY, { slug })

  // If no post found with this slug, show the 404 page
  if (!post) notFound()

  // Get the post content in the current language
  const title   = post.title?.[locale]   || post.title?.fr   || post.title?.en   || ''
  const body    = post.body?.[locale]    || post.body?.fr     || post.body?.en    || []

  return (
    <>
      {/* ── Post hero with cover image ─────────────────────────── */}
      <section className="relative pt-32 pb-16 bg-moroccan-dark min-h-[400px] flex items-end">
        {/* Cover image as background */}
        {post.coverImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={post.coverImageUrl}
              alt={title}
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-moroccan-dark via-moroccan-dark/60 to-moroccan-dark/30" />

        {/* Post title and date */}
        <div className="relative z-10 container-custom pb-8">
          {/* Back to blog link */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-sm mb-6 transition-colors"
          >
            <ChevronLeft size={16} />
            {t('backToBlog')}
          </Link>

          {/* Publish date */}
          <p className="text-gold text-sm mb-3">
            {t('publishedOn')} {new Date(post.publishedAt).toLocaleDateString(
              locale === 'ar' ? 'ar-MA' : locale === 'fr' ? 'fr-FR' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </p>

          {/* Post title */}
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white max-w-3xl">
            {title}
          </h1>
        </div>
      </section>

      {/* ── Post body ─────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          {/* "prose" class from @tailwindcss/typography gives beautiful article typography */}
          <div className="prose prose-lg prose-stone max-w-none
            prose-headings:font-heading prose-headings:text-moroccan-dark
            prose-p:text-moroccan-muted prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-moroccan-dark
          ">
            {/* PortableText renders Sanity's block content (rich text) as HTML */}
            {body.length > 0 ? (
              <PortableText value={body} />
            ) : (
              <p className="text-moroccan-muted italic">
                Content not available in this language.
              </p>
            )}
          </div>

          {/* Back to blog footer link */}
          <div className="mt-12 pt-8 border-t border-gold/20">
            <Link href={`/${locale}/blog`} className="btn-secondary">
              <ChevronLeft size={16} />
              {t('backToBlog')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
