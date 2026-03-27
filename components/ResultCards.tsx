'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/result-cards.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function ResultCards() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-card]',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        )
      }, containerRef)
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <div className={styles.resultCards} ref={containerRef}>
      <div className={styles.grid}>
        {t.resultCards.cards.map((card, i) => (
          <div key={i} className={styles.card} data-card>
            <span className={styles.number}>{card.number}</span>
            <span className={styles.label}>{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
