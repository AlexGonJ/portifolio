'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import styles from '../styles/contact-form.module.scss'
import { useLanguage } from '../i18n/LanguageContext'
import { trackPixelEvent } from '@/lib/pixel'

const SERVICE_OPTIONS = [
  { id: 'website', labelKey: 'serviceWebsite' },
  { id: 'branding', labelKey: 'serviceBranding' },
  { id: 'marketing', labelKey: 'serviceMarketing' },
  { id: 'other', labelKey: 'serviceOther' },
] as const

const COUNTRY_CODES = [
  { code: '+55', flag: '🇧🇷', name: 'Brasil', dddLength: 2 },
  { code: '+1', flag: '🇺🇸', name: 'Estados Unidos / Canadá', dddLength: 3 },
  { code: '+351', flag: '🇵🇹', name: 'Portugal', dddLength: 2 },
  { code: '+34', flag: '🇪🇸', name: 'Espanha', dddLength: 2 },
  { code: '+44', flag: '🇬🇧', name: 'Reino Unido', dddLength: 3 },
  { code: '+54', flag: '🇦🇷', name: 'Argentina', dddLength: 2 },
  { code: '+598', flag: '🇺🇾', name: 'Uruguai', dddLength: 2 },
  { code: '+595', flag: '🇵🇾', name: 'Paraguai', dddLength: 2 },
  { code: '+56', flag: '🇨🇱', name: 'Chile', dddLength: 2 },
  { code: '+49', flag: '🇩🇪', name: 'Alemanha', dddLength: 3 },
  { code: '+33', flag: '🇫🇷', name: 'França', dddLength: 2 },
  { code: '+39', flag: '🇮🇹', name: 'Itália', dddLength: 3 },
  { code: '+52', flag: '🇲🇽', name: 'México', dddLength: 2 },
  { code: '+41', flag: '🇨🇭', name: 'Suíça', dddLength: 2 },
  { code: '+61', flag: '🇦🇺', name: 'Austrália', dddLength: 2 },
  { code: '+81', flag: '🇯🇵', name: 'Japão', dddLength: 2 },
  { code: '+244', flag: '🇦🇴', name: 'Angola', dddLength: 2 },
  { code: '+258', flag: '🇲🇿', name: 'Moçambique', dddLength: 2 },
] as const

export default function ContactForm() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const btnRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [selectedService, setSelectedService] = useState<string | null>(null)

  // Telefone aprimorado: Prefixo + DDD + Número
  const [countryCode, setCountryCode] = useState('+55')
  const [ddd, setDdd] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const dddInputRef = useRef<HTMLInputElement>(null)
  const numberInputRef = useRef<HTMLInputElement>(null)

  const fullPhone = ddd && phoneNumber
    ? `${countryCode} (${ddd}) ${phoneNumber}`
    : phoneNumber
      ? `${countryCode} ${phoneNumber}`
      : ''

  const handlePastedFullNumber = (rawDigits: string) => {
    let digits = rawDigits.replace(/\D/g, '')
    if (digits.startsWith('55') && digits.length >= 12) {
      setCountryCode('+55')
      digits = digits.slice(2)
    }
    const dddVal = digits.slice(0, 2)
    const numVal = digits.slice(2, 11)
    setDdd(dddVal)
    if (numVal.length <= 4) {
      setPhoneNumber(numVal)
    } else if (numVal.length <= 8) {
      setPhoneNumber(`${numVal.slice(0, 4)}-${numVal.slice(4)}`)
    } else {
      setPhoneNumber(`${numVal.slice(0, 5)}-${numVal.slice(5)}`)
    }
    if (numberInputRef.current) {
      numberInputRef.current.focus()
    }
  }

  const handleDddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0]
    const maxDdd = selectedCountry.dddLength

    if (raw.length > maxDdd + 4) {
      handlePastedFullNumber(raw)
      return
    }

    const val = raw.slice(0, maxDdd)
    setDdd(val)
    if (val.length === maxDdd && numberInputRef.current) {
      numberInputRef.current.focus()
    }
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')

    if (raw.length > 10 && ddd.length === 0) {
      handlePastedFullNumber(raw)
      return
    }

    const digits = raw.slice(0, 9)
    if (digits.length <= 4) {
      setPhoneNumber(digits)
    } else if (digits.length <= 8) {
      setPhoneNumber(`${digits.slice(0, 4)}-${digits.slice(4)}`)
    } else {
      setPhoneNumber(`${digits.slice(0, 5)}-${digits.slice(5)}`)
    }
  }

  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && phoneNumber === '' && dddInputRef.current) {
      dddInputRef.current.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: fullPhone || formData.get('phone'),
      service: selectedService,
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setStatus('success')
      trackPixelEvent('Lead', {
        content_name: selectedService || 'General Inquiry',
        currency: 'BRL',
      })

      if (formRef.current) {
        formRef.current.reset()
        setDdd('')
        setPhoneNumber('')
      }

      setTimeout(() => {
        router.push('/contato-recebido')
      }, 500)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const strength = 0.2

    const move = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power3.out',
      })
    }

    const leave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    btn.addEventListener('mousemove', move)
    btn.addEventListener('mouseleave', leave)

    return () => {
      btn.removeEventListener('mousemove', move)
      btn.removeEventListener('mouseleave', leave)
    }
  }, [])

  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.gsap-form-item',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
            },
          }
        )
      }, formRef)
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <div className={styles.formContainer}>
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.inputRow} gsap-form-item`}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              placeholder={t.contactForm.namePlaceholder}
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              placeholder={t.contactForm.emailPlaceholder}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className={`${styles.inputGroup} gsap-form-item`}>
          <div className={styles.phoneRow}>
            {/* Prefixo Selecionável */}
            <div className={styles.countrySelectWrapper}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={styles.countrySelect}
                aria-label="Prefixo do país"
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code + country.name} value={country.code}>
                    {country.flag} {country.code} — {country.name}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.countryChevron}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            <span className={styles.phoneDivider} aria-hidden="true" />

            {/* DDD */}
            <div className={styles.dddWrapper}>
              <input
                ref={dddInputRef}
                type="tel"
                inputMode="numeric"
                id="phone-ddd"
                value={ddd}
                onChange={handleDddChange}
                placeholder="DDD"
                maxLength={countryCode === '+1' ? 3 : 2}
                className={styles.dddInput}
                autoComplete="tel-area-code"
                required
                aria-label="Código DDD"
              />
            </div>

            <span className={styles.phoneDivider} aria-hidden="true" />

            {/* Número */}
            <input
              ref={numberInputRef}
              type="tel"
              inputMode="numeric"
              name="phone"
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onKeyDown={handleNumberKeyDown}
              placeholder={countryCode === '+55' ? '99999-9999' : 'Número do telefone'}
              className={styles.numberInput}
              autoComplete="tel-local"
              required
              aria-label="Número de telefone ou WhatsApp"
            />
          </div>
          <input type="hidden" name="full_phone" value={fullPhone} />
        </div>

        <div className={`${styles.serviceSelector} gsap-form-item`}>
          <p className={styles.serviceLabel}>{t.contactForm.serviceLabel}</p>
          <div className={styles.serviceOptions}>
            {SERVICE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`${styles.serviceOption} ${
                  selectedService === opt.id ? styles.serviceOptionActive : ''
                }`}
                onClick={() => setSelectedService(selectedService === opt.id ? null : opt.id)}
              >
                {(t.contactForm as Record<string, string>)[opt.labelKey]}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.inputGroup} gsap-form-item`}>
          <textarea
            name="message"
            id="message"
            className={styles.input}
            placeholder={t.contactForm.messagePlaceholder}
            rows={3}
            required
          />
        </div>

        <div className={`${styles.formFooter} gsap-form-item`}>
          <button
            ref={btnRef}
            type="submit"
            disabled={status === 'submitting'}
            className={styles.submitBtn}
          >
            {status === 'submitting' ? t.contactForm.sending : t.contactForm.submit}
          </button>

          <div className={styles.footerMeta}>
            <span className={styles.responseBadge}>{t.contactForm.trust24h}</span>
            <p className={styles.privacyNotice}>
              {lang === 'pt' ? (
                <>
                  Ao enviar, você concorda com nossa{' '}
                  <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
                </>
              ) : (
                <>
                  By submitting, you agree to our{' '}
                  <Link href="/politica-de-privacidade">Privacy Policy</Link>.
                </>
              )}
            </p>
          </div>
        </div>

        {status === 'success' && (
          <div className={styles.successMessage}>{t.contactForm.success}</div>
        )}

        {status === 'error' && (
          <div className={styles.errorMessage}>{t.contactForm.error}</div>
        )}
      </form>
    </div>
  )
}
