'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/editorial-break.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function EditorialBreak() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        if (!trackRef.current) return

        gsap.fromTo(
          trackRef.current,
          { xPercent: -25 },
          {
            xPercent: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      }, sectionRef)
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.breakSection}>
      <p className={styles.label}>{t.editorialBreak.label}</p>
      <div ref={trackRef} className={styles.track}>
        <span>{t.editorialBreak.track1}</span>
        <span>{t.editorialBreak.track2}</span>
        <span>{t.editorialBreak.track3}</span>
      </div>
      <div className={styles.statement}>
        <p>{t.editorialBreak.statement1}</p>
        <p>{t.editorialBreak.statement2}</p>
      </div>
      <p className={styles.support}>
        {t.editorialBreak.support}
      </p>
    </section>
  )
}
