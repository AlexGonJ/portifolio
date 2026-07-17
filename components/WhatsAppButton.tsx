'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from '../styles/whatsapp-button.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

const WHATSAPP_URL = 'https://wa.me/5538999023012'

export default function WhatsAppButton() {
  const { t } = useLanguage()
  const btnRef = useRef<HTMLAnchorElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!btnRef.current) return

    if (isVisible) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }
      )
    } else {
      gsap.to(btnRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [isVisible])

  // Pulse animation loop
  useEffect(() => {
    if (!btnRef.current || !isVisible) return

    const pulse = gsap.to(btnRef.current, {
      boxShadow: '0 0 0 12px rgba(37, 211, 102, 0)',
      duration: 1.8,
      ease: 'power2.out',
      repeat: -1,
      delay: 1,
    })

    return () => { pulse.kill() }
  }, [isVisible])

  return (
    <a
      ref={btnRef}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className={styles.whatsappBtn}
      aria-label="Chat on WhatsApp"
      style={{ opacity: 0, transform: 'scale(0)' }}
      onMouseEnter={() => {
        if (tooltipRef.current) {
          gsap.to(tooltipRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
        }
      }}
      onMouseLeave={() => {
        if (tooltipRef.current) {
          gsap.to(tooltipRef.current, { opacity: 0, x: 8, duration: 0.2, ease: 'power2.in' })
        }
      }}
    >
      <span ref={tooltipRef} className={styles.tooltip} style={{ opacity: 0, transform: 'translateX(8px)' }}>
        {t.hero.whatsappTooltip ?? 'Fale comigo'}
      </span>
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" />
      </svg>
    </a>
  )
}
