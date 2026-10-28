'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CircularTestimonials, { Testimonial } from '@/components/ui/circular-testimonials'
import styles from '../styles/testimonials.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

const DEFAULT_PORTRAITS: Record<string, string> = {
  'Joanna Dias': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=75&w=160&auto=format&fit=crop',
  'Rafael Martins': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=75&w=160&auto=format&fit=crop',
  'Camila Souza': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=75&w=160&auto=format&fit=crop',
}

export default function Testimonials() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const items: Testimonial[] = (t.testimonials?.items ?? []).map((item) => ({
    quote: item.quote,
    name: item.name,
    designation: item.role,
    src: (item as { src?: string }).src || DEFAULT_PORTRAITS[item.name] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=160&auto=format&fit=crop',
  }))

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

  if (items.length === 0) return null

  return (
    <section ref={sectionRef} className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header} data-testimonial-header>
          <p className={styles.label}>{t.testimonials?.label}</p>
          <h2 className={styles.title}>{t.testimonials?.title}</h2>
        </div>

        <div data-testimonial-card className={styles.carouselWrapper}>
          <CircularTestimonials
            testimonials={items}
            autoplay={true}
            colors={{
              name: '#0b0b0e',
              designation: '#8c7b68',
              testimony: '#2b2b30',
              arrowBackground: '#111114',
              arrowForeground: '#f5f5f7',
              arrowHoverBackground: '#8c7b68',
            }}
            fontSizes={{
              name: '1.75rem',
              designation: '0.95rem',
              quote: '1.15rem',
            }}
          />
        </div>

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
