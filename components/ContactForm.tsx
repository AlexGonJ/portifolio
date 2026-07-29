'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from '../styles/contact-form.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

const WHATSAPP_URL = '/whatsapp'

const SERVICE_OPTIONS = [
  { id: 'website', labelKey: 'serviceWebsite' },
  { id: 'branding', labelKey: 'serviceBranding' },
  { id: 'marketing', labelKey: 'serviceMarketing' },
  { id: 'other', labelKey: 'serviceOther' },
] as const

export default function ContactForm() {
  const { t } = useLanguage()
  const btnRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
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
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  // Floating Magnetic Button Effect (same aesthetic as SelectedWork)
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

  // Reveal Animation
  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.gsap-form-item',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%'
            }
          }
        )
      }, formRef)
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <div className={styles.formContainer}>
      <form 
        ref={formRef}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={`${styles.inputGroup} gsap-form-item`}>
          <input 
            type="text" 
            name="name" 
            id="name" 
            className={styles.input} 
            placeholder={t.contactForm.namePlaceholder} 
            required 
          />
        </div>

        <div className={`${styles.inputGroup} gsap-form-item`}>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className={styles.input} 
            placeholder={t.contactForm.emailPlaceholder} 
            required 
          />
        </div>

        <div className={`${styles.serviceSelector} gsap-form-item`}>
          <p className={styles.serviceLabel}>{t.contactForm.serviceLabel}</p>
          <div className={styles.serviceChips}>
            {SERVICE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`${styles.serviceChip} ${selectedService === opt.id ? styles.serviceChipActive : ''}`}
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
            rows={2}
            required 
          />
        </div>

        <button 
          ref={btnRef} 
          type="submit" 
          disabled={status === 'submitting'}
          className={`${styles.submitBtn} gsap-form-item`}
        >
          {status === 'submitting' ? t.contactForm.sending : t.contactForm.submit}
        </button>

        <div className={`${styles.trustRow} gsap-form-item`}>
          <span className={styles.trustItem}>
            <svg viewBox="0 0 16 16" className={styles.trustIcon}>
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm3.03 5.28-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06L7 8.69l2.97-2.97a.75.75 0 0 1 1.06 1.06Z" />
            </svg>
            {t.contactForm.trustFree}
          </span>
          <span className={styles.trustItem}>
            <svg viewBox="0 0 16 16" className={styles.trustIcon}>
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm3.03 5.28-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06L7 8.69l2.97-2.97a.75.75 0 0 1 1.06 1.06Z" />
            </svg>
            {t.contactForm.trust24h}
          </span>
          <span className={styles.trustItem}>
            <svg viewBox="0 0 16 16" className={styles.trustIcon}>
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm3.03 5.28-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06L7 8.69l2.97-2.97a.75.75 0 0 1 1.06 1.06Z" />
            </svg>
            {t.contactForm.trustNoStrings}
          </span>
        </div>

        <div className={`${styles.dividerRow} gsap-form-item`}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>{t.contactForm.orWhatsapp}</span>
          <span className={styles.dividerLine} />
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className={`${styles.whatsappAlt} gsap-form-item`}
        >
          <svg viewBox="0 0 24 24" className={styles.whatsappIcon}>
            <path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" />
          </svg>
          {t.contactForm.whatsappLabel}
        </a>

        {status === 'success' && (
          <div className={styles.successMessage}>
            {t.contactForm.success}
          </div>
        )}

        {status === 'error' && (
          <div className={styles.errorMessage}>
            {t.contactForm.error}
          </div>
        )}
      </form>
    </div>
  )
}
