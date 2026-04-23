'use client'
// WhatsAppButton.tsx — Floating WhatsApp chat button
// Always visible in the bottom corner of every page
// Clicking it opens a WhatsApp chat directly with the riad's number

import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  whatsappNumber: string // e.g. "212701773013" (no spaces, no +)
}

export default function WhatsAppButton({ whatsappNumber }: WhatsAppButtonProps) {
  // Build the WhatsApp direct link URL
  // wa.me/<number> opens WhatsApp with that contact pre-selected
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      // Fixed position — stays in the corner regardless of scrolling
      // rtl:left-6 rtl:right-auto — flips to the left corner for Arabic layout
      className="
        fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#25D366] text-white shadow-lg
        hover:bg-[#20BA5A] hover:scale-110
        transition-all duration-200
      "
    >
      {/* WhatsApp icon */}
      <MessageCircle size={26} fill="currentColor" />
    </a>
  )
}
