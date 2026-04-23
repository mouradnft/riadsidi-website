// app/api/contact/route.ts — Contact form email API
// This server-side route receives form data from the contact form
// and sends it as an email to the owner using Resend

import { NextRequest, NextResponse } from 'next/server'
import { Resend }                    from 'resend'

// Initialize the Resend email client using the API key from environment variables
// RESEND_API_KEY must be set in .env.local and Vercel dashboard
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body sent by the contact form component
    const { name, phone, email, message } = await request.json()

    // Basic validation — name, email, and message are required
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 } // 400 = Bad Request
      )
    }

    // Send the email via Resend
    await resend.emails.send({
      from: 'Riad Sidi Website <noreply@riadsidi.com>', // Sender shown in the inbox
      to:   process.env.CONTACT_EMAIL!,                  // Owner's email from env variable
      reply_to: email,                                    // Replying goes directly to the visitor
      subject: `New Contact Form Message from ${name}`,

      // HTML email body — nicely formatted for readability
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #8B1A1A; border-bottom: 2px solid #C9A84C; padding-bottom: 12px;">
            New Message — Riad Sidi Contact Form
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #7A6248; font-size: 14px; width: 100px;">Name:</td>
              <td style="padding: 8px 0; color: #1C0A00; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7A6248; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #1C0A00;">
                <a href="mailto:${email}" style="color: #8B1A1A;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #7A6248; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: #1C0A00;">${phone}</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 20px; padding: 16px; background: #FDF8F0; border-left: 3px solid #C9A84C;">
            <p style="color: #7A6248; font-size: 14px; margin: 0 0 8px 0;">Message:</p>
            <p style="color: #1C0A00; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 24px; color: #7A6248; font-size: 12px;">
            Sent from the Riad Sidi website contact form
          </p>
        </div>
      `,
    })

    // Return success response to the contact form component
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    // Log the error server-side for debugging, but don't expose details to the visitor
    console.error('Contact form email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 } // 500 = Internal Server Error
    )
  }
}
