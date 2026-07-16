'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import styles from '../styles/result-cards.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

/**
 * Parses a display string like "60+", "+32%", "3x", "5+"
 * into { prefix, numericValue, suffix }
 */
function parseNumber(display: string) {
  const match = display.match(/^([+]?)(\d+)(.*)$/)
  if (!match) return { prefix: '', numericValue: 0, suffix: display }
  return {
    prefix: match[1],
    numericValue: parseInt(match[2], 10),
    suffix: match[3],
  }
}

function CountUp({
  target,
  duration = 2,
  started,
}: {
  target: string
  duration?: number
  started: boolean
}) {
  const { prefix, numericValue, suffix } = parseNumber(target)
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number>(0)

  const animate = useCallback(() => {
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * numericValue))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [duration, numericValue])

  useEffect(() => {
    if (started) {
      animate()
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started, animate])

  if (!started) return <>{target}</>

  return (
    <>
      {prefix}
      {current}
      {suffix}
    </>
  )
}

export default function ResultCards() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [countStarted, setCountStarted] = useState(false)

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
              once: true,
              onEnter: () => setCountStarted(true),
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
            <span className={styles.number}>
              <CountUp target={card.number} duration={2.2} started={countStarted} />
            </span>
            <span className={styles.label}>{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
