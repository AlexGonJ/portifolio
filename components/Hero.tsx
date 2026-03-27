'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from './SplitText'
import styles from '../styles/hero.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

interface HeroProps {
  start: boolean
}

export default function Hero({ start }: HeroProps) {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

useEffect(() => {
  let ctx: gsap.Context | undefined

  const move = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30
    const y = (e.clientY / window.innerHeight - 0.5) * 30

    gsap.to(imageRef.current, {
      x, y,
      duration: 1.2,
      ease: 'power3.out',
    })
  }

  ;(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      // Imagem sobe pouco
      gsap.to(imageRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Texto sobe bem mais — defasagem evidente
      gsap.to(textRef.current, {
        y: '-34%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      if (start) {
        gsap.fromTo(
          pRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
        )

        gsap.fromTo(
          ctaRef.current,
          { y: 24, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', delay: 1.35 }
        )
      }
    }, sectionRef)

    window.addEventListener('mousemove', move)
  })()

  return () => {
    ctx?.revert()
    window.removeEventListener('mousemove', move)
  }
}, [start])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <img
        ref={imageRef}
        className={styles.heroBg}
        src="./heroi1.png"
        alt="Hero background"
      />

      <div className={styles.overlayNoise} />

      <div className={styles.content} ref={textRef}>
        <h1>
          <SplitText animate={start}>
            {t.hero.title1} <br />
            {t.hero.title2}
          </SplitText>
        </h1>

        <p ref={pRef} style={{ opacity: 0 }}>
          {t.hero.description}
        </p>

        <div className={styles.actions}>
          <a ref={ctaRef} href="#projetos" className={styles.cta}>
            <span className={styles.ctaSurface}>
              <span className={styles.ctaEyebrow}>{t.hero.ctaEyebrow}</span>
              <span className={styles.ctaLabel}>{t.hero.ctaLabel}</span>
            </span>

            <span className={styles.ctaIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 17 17 7M8.5 7H17v8.5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
