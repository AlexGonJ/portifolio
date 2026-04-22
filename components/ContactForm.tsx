'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/contact-form.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function ContactForm() {
  const { t } = useLanguage()
  const btnRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

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
        action={endpoint}
        method="POST"
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
          className={`${styles.submitBtn} gsap-form-item`}
        >
          {t.contactForm.submit}
        </button>
      </form>
    </div>
  )
}
