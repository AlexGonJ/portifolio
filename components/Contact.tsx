'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import ContactForm from './ContactForm'
import DiagonalMarqueeCarousel from '@/components/ui/great-ui-diagonal-marquee-carousel'
import styles from '../styles/contact.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [parallaxY, setParallaxY] = useState(0)
  const parallaxStyle = { '--parallax-y': `${parallaxY}px` } as CSSProperties

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.08)
        frame = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section id="contato" className={styles.contact} style={parallaxStyle}>
      {/* ── Background: Great UI Diagonal Marquee Carousel com as imagens reais da Lexon ── */}
      <div className={styles.carouselBackdrop} aria-hidden="true">
        <DiagonalMarqueeCarousel
          animated={false}
          baseSpeed={72}
          angle={-22}
          className="absolute -inset-16 h-[calc(100%+8rem)] max-h-none w-[calc(100%+8rem)] max-w-none"
        />
        <div className={styles.carouselOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <div className={styles.editorialColumn}>
            <p className={styles.label}>{t.contact.label}</p>
            <h2 className={styles.title}>
              <span className={styles.line1}>{t.contact.title1}</span>
              <span className={styles.line2}>{t.contact.title2}</span>
            </h2>

            <p className={styles.asideLead}>{t.contact.asideLead}</p>

            <div className={styles.responseInfo}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>{t.contactForm.trust24h}</span>
            </div>

            <div className={styles.directChannel}>
              <span className={styles.directLabel}>{t.contactForm.phoneOrWhatsappLabel}</span>
              <div className={styles.directActions}>
                <a
                  href="/whatsapp"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.whatsappLink}
                >
                  <svg viewBox="0 0 24 24" className={styles.whatsappIcon}>
                    <path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" />
                  </svg>
                  <span>{t.contactForm.whatsappLabel}</span>
                  <span className={styles.whatsappArrow} aria-hidden="true">↗</span>
                </a>

                <a
                  href="tel:+5538999023012"
                  className={styles.phoneLink}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.phoneIcon}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+55 (38) 99902-3012</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.formColumn}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
