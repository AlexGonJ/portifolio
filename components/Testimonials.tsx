'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/testimonials.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={styles.star}>
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={styles.avatar}>
      <span>{initials}</span>
    </div>
  )
}

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

        <div className={styles.grid}>
          {testimonials.map((item, i) => (
            <div key={i} className={styles.card} data-testimonial-card>
              <div className={styles.cardTop}>
                <StarRating count={5} />
              </div>

              <blockquote className={styles.quote}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className={styles.author}>
                <Avatar name={item.name} />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{item.name}</span>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
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
