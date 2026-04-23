'use client'
// ContactForm.tsx — Contact form component
// Sends form submissions to the /api/contact route which emails the owner
// Shows success or error feedback to the visitor after submission

import { useState }        from 'react'
import { useForm }         from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

// Type for the form data fields
interface FormData {
  name:    string
  phone:   string
  email:   string
  message: string
}

export default function ContactForm() {
  const t = useTranslations('contact')

  // Track form submission state: idle | loading | success | error
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // react-hook-form manages validation and form state
  const {
    register,       // Connects input fields to the form
    handleSubmit,   // Wraps our submit handler with validation
    formState: { errors }, // Validation error messages
  } = useForm<FormData>()

  // Called when the form is submitted and all fields pass validation
  async function onSubmit(data: FormData) {
    setStatus('loading')

    try {
      // Send the form data to our API route at /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // Convert form data to JSON string
      })

      if (response.ok) {
        setStatus('success') // Email sent — show success message
      } else {
        setStatus('error')   // API returned an error — show error message
      }
    } catch {
      setStatus('error') // Network error — show error message
    }
  }

  // ── Success state — shown after form is successfully submitted ────────
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle size={48} className="text-green-500" />
        <h3 className="font-heading text-xl font-bold text-moroccan-dark">{t('successTitle')}</h3>
        <p className="text-moroccan-muted">{t('successText')}</p>
      </div>
    )
  }

  // ── Normal form state ─────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Error banner — shown when the form submission fails */}
      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p>{t('errorText')}</p>
        </div>
      )}

      {/* ── Name field ───────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-body font-semibold text-moroccan-dark mb-1">
          {t('name')} <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          placeholder={t('namePlaceholder')}
          // register() connects this input to react-hook-form and adds validation rules
          {...register('name', { required: true })}
          className={`
            w-full px-4 py-3 border rounded-sm bg-white font-body text-sm
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            transition-colors
            ${errors.name ? 'border-red-400' : 'border-gold/30 hover:border-gold'}
          `}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">This field is required</p>
        )}
      </div>

      {/* ── Phone field ──────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-body font-semibold text-moroccan-dark mb-1">
          {t('phone')}
        </label>
        <input
          type="tel"
          placeholder={t('phonePlaceholder')}
          {...register('phone')} // Phone is optional — no required rule
          className="w-full px-4 py-3 border border-gold/30 hover:border-gold rounded-sm bg-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
      </div>

      {/* ── Email field ──────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-body font-semibold text-moroccan-dark mb-1">
          {t('email')} <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          placeholder={t('emailPlaceholder')}
          {...register('email', {
            required: true,
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
          className={`
            w-full px-4 py-3 border rounded-sm bg-white font-body text-sm
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors
            ${errors.email ? 'border-red-400' : 'border-gold/30 hover:border-gold'}
          `}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message || 'This field is required'}</p>
        )}
      </div>

      {/* ── Message textarea ─────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-body font-semibold text-moroccan-dark mb-1">
          {t('message')} <span className="text-primary">*</span>
        </label>
        <textarea
          rows={5}
          placeholder={t('messagePlaceholder')}
          {...register('message', { required: true })}
          className={`
            w-full px-4 py-3 border rounded-sm bg-white font-body text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors
            ${errors.message ? 'border-red-400' : 'border-gold/30 hover:border-gold'}
          `}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">This field is required</p>
        )}
      </div>

      {/* ── Submit button ─────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={status === 'loading'} // Disable while sending to prevent double-submission
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={16} />
        {status === 'loading' ? t('sending') : t('send')}
      </button>
    </form>
  )
}
