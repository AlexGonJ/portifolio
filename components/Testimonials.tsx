'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TestimonialCards from '@/components/ui/testimonial'
import styles from '../styles/testimonials.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const testimonials = t.testimonials?.items ?? []

  // Scroll-triggered stagger animation
  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      ctx = gsap.context(() => {
        // Header animation
        gsap.fromTo(
          '[data-testimonial-header]',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )

        // Cards stagger
        gsap.fromTo(
          '[data-testimonial-card]',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )

        // CTA animation
        gsap.fromTo(
          '[data-testimonial-cta]',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '[data-testimonial-cta]',
              start: 'top 90%',
              once: true,
            },
          }
        )
      }, sectionRef)
    })()

    return () => ctx?.revert()
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section ref={sectionRef} className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header} data-testimonial-header>
          <p className={styles.label}>{t.testimonials?.label}</p>
          <h2 className={styles.title}>{t.testimonials?.title}</h2>
        </div>

        <TestimonialCards items={testimonials} />

        <div className={styles.ctaWrapper} data-testimonial-cta>
          <a href="#contato" className={styles.ctaLink}>
            {t.testimonials?.ctaText}
            <svg viewBox="0 0 24 24" className={styles.ctaIcon}>
              <path d="M7 17 17 7M8.5 7H17v8.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
