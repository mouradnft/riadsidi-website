// app/api/revalidate/route.ts — Sanity webhook handler
// When the owner saves a change in Sanity Studio, Sanity calls this endpoint
// This triggers Next.js to rebuild the affected pages so the site updates live

import { type NextRequest, NextResponse } from 'next/server'
import { revalidatePath }                 from 'next/cache'

export async function POST(request: NextRequest) {
  // Verify the request is genuinely from Sanity (not from a malicious actor)
  // The secret must match the SANITY_REVALIDATE_SECRET environment variable
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    // If the secret doesn't match, reject the request
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    // Parse the webhook body to find out which document type was updated
    const body = await request.json()
    const documentType = body?._type // e.g. 'room', 'menuItem', 'blogPost'

    // Revalidate the relevant pages based on what was changed in Sanity
    // revalidatePath() tells Next.js to rebuild that page on the next visitor request
    switch (documentType) {
      case 'room':
        revalidatePath('/[locale]/rooms', 'page')     // Rebuild rooms page
        revalidatePath('/[locale]', 'page')            // Rebuild homepage (featured rooms)
        break
      case 'menuItem':
        revalidatePath('/[locale]/restaurant', 'page') // Rebuild restaurant/menu page
        break
      case 'blogPost':
        revalidatePath('/[locale]/blog', 'page')       // Rebuild blog list
        revalidatePath('/[locale]/blog/[slug]', 'page') // Rebuild individual post pages
        revalidatePath('/[locale]', 'page')             // Rebuild homepage (blog preview)
        break
      case 'service':
        revalidatePath('/[locale]/services', 'page')   // Rebuild services page
        revalidatePath('/[locale]', 'page')             // Rebuild homepage (services section)
        break
      case 'testimonial':
        revalidatePath('/[locale]', 'page')             // Rebuild homepage (testimonials)
        break
      case 'galleryImage':
        revalidatePath('/[locale]/gallery', 'page')    // Rebuild gallery page
        break
      case 'siteSettings':
        // Site settings affect every page (header, footer, contact info)
        revalidatePath('/[locale]', 'layout')          // Rebuild the whole locale layout
        break
      default:
        // For any other document type, rebuild everything to be safe
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, documentType })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
