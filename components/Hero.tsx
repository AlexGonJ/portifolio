'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SplitText from './SplitText'
import styles from '../styles/hero.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

const WHATSAPP_URL = 'https://wa.me/38999023012'

interface HeroProps {
  start: boolean
}

export default function Hero({ start }: HeroProps) {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check() // check on mount
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Control video play when start is true (page loaded)
  useEffect(() => {
    if (start && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err)
      })
    }
  }, [start])

  useEffect(() => {
    let ctx: gsap.Context | undefined
    let removeMoveListener: (() => void) | undefined

      ; (async () => {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          const isDesktop = window.innerWidth > 900

          if (isDesktop && !prefersReducedMotion && videoRef.current) {
            const xTo = gsap.quickTo(videoRef.current, 'x', { duration: 0.55, ease: 'power2.out' })
            const yTo = gsap.quickTo(videoRef.current, 'y', { duration: 0.55, ease: 'power2.out' })

            const move = (e: MouseEvent) => {
              const x = (e.clientX / window.innerWidth - 0.5) * 18
              const y = (e.clientY / window.innerHeight - 0.5) * 18
              xTo(x)
              yTo(y)
            }

            window.addEventListener('mousemove', move, { passive: true })
            removeMoveListener = () => window.removeEventListener('mousemove', move)
          }

          // Vídeo sobe pouco no scroll
          gsap.to(videoRef.current, {
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

            // Scroll indicator
            gsap.fromTo(
              scrollRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: 'power2.out', delay: 2 }
            )

            // Bounce loop for scroll indicator
            gsap.to(scrollRef.current, {
              y: 8,
              duration: 1.4,
              ease: 'power1.inOut',
              yoyo: true,
              repeat: -1,
              delay: 2.5
            })
          }
        }, sectionRef)

      })()

    return () => {
      ctx?.revert()
      removeMoveListener?.()
    }
  }, [start])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.heroBg}
        src={isMobile ? "/mobilehero.mp4" : "/herovideo.mp4"}
        muted
        playsInline
        preload="auto"
      />

      <div className={styles.overlayNoise} />

      <div className={styles.content} ref={textRef}>
        <h1>
          <SplitText key={lang} animate={start}>
            {t.hero.title1} <br />
            {t.hero.title2}
          </SplitText>
        </h1>

        <p ref={pRef} style={{ opacity: 0 }}>
          {t.hero.description}
        </p>

        <div ref={ctaRef} className={styles.actions} style={{ opacity: 0 }}>
          <a href="#contato" className={styles.cta}>
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

          <a href="#projetos" className={styles.ctaSecondary}>
            {t.hero.ctaSecondaryLabel}
            <svg viewBox="0 0 24 24" className={styles.ctaSecondaryIcon}>
              <path d="M7 17 17 7M8.5 7H17v8.5" />
            </svg>
          </a>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollIndicator} style={{ opacity: 0 }}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>{t.hero.scrollText}</span>
      </div>
    </section>
  )
}
