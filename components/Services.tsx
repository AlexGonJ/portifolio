'use client'

import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/services.module.scss'
import { useLanguage } from '../i18n/LanguageContext'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import StarBorder from './StarBorder'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Only apply GSAP scroll trigger on desktop
      if (window.innerWidth > 768 && sectionRef.current && gridRef.current && gridContainerRef.current) {

        // Calculate the exact amount we need to scroll to see all cards
        const getScrollAmount = () => {
          let containerWidth = gridContainerRef.current?.offsetWidth || window.innerWidth;
          let gridWidth = gridRef.current?.scrollWidth || 0;
          return -(gridWidth - containerWidth);
        }

        const tween = gsap.to(gridRef.current, {
          x: getScrollAmount,
          ease: 'none',
        })

        ScrollTrigger.create({
          trigger: gridContainerRef.current,
          start: 'bottom bottom', // Ensures cards are fully visible and centered before pinning
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  // Custom cursor logic for service cards
  useEffect(() => {
    if (isMobile) return

    const cursor = cursorRef.current
    const section = sectionRef.current
    if (!cursor || !section) return

    gsap.set(cursor, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 })

    let mouseX = 0, mouseY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      gsap.set(cursor, { x: mouseX, y: mouseY })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  const handleMouseEnter = () => {
    if (isMobile || !cursorRef.current) return
    gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' })
  }

  const handleMouseLeave = () => {
    if (isMobile || !cursorRef.current) return
    gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power3.in' })
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Scroll function for the large overlay buttons
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (isMobile) {
      if (gridRef.current) {
        const amount = window.innerWidth * 0.8;
        gridRef.current.scrollBy({
          left: direction === 'right' ? amount : -amount,
          behavior: 'smooth'
        });
      }
      return;
    }

    // In a pinned ScrollTrigger, horizontal progress is driven by vertical window scroll.
    // So we translate the click into a vertical scroll adjustment.
    const amount = window.innerWidth * 0.4;
    window.scrollBy({
      top: direction === 'right' ? amount : -amount,
      behavior: 'smooth'
    });
  }

  return (
    <section id="servicos" ref={sectionRef} className={styles.services} aria-labelledby="services-title">
      <div className={styles.intro}>
        <p className={styles.label}>{t.services.label}</p>
        <div className={styles.headingBlock}>
          <h2 id="services-title" className={styles.title}>
            {t.services.title}
          </h2>
          <p className={styles.description}>{t.services.description}</p>
        </div>
      </div>

      {/* Horizontal Scroll Cards (GSAP on desktop, Native CSS on mobile) */}
      <div className={styles.gridContainer} ref={gridContainerRef}>

        {/* Overlay Navigation Buttons */}
        <button
          className={`${styles.navOverlayBtn} ${styles.navOverlayLeft}`}
          onClick={() => scrollCarousel('left')}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <button
          className={`${styles.navOverlayBtn} ${styles.navOverlayRight}`}
          onClick={() => scrollCarousel('right')}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        <div className={styles.grid} ref={gridRef}>
          {t.services.items.map((service, index) => {
            const isExternal = (service as any).isExternal;
            const link = (service as any).link;
            const bgImage = (service as any).bgImage;

            const cardContent = (
              <>
                {bgImage && (
                  <div
                    className={styles.cardBgImage}
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />
                )}
                <div className={styles.indexWatermark}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.itemContent}>
                  <div className={styles.cardHeader}>
                    <span className={styles.indexLabel}>Serviço {String(index + 1).padStart(2, '0')}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <p className={styles.cardDesc}>{service.description}</p>
                  <ul className={styles.details}>
                    {service.details.map((detail: string) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <StarBorder as="div" className={styles.cardLinkWrapper} color="yellow" speed="4s">
                    <div className={styles.cardLink}>
                      <span>Ver Detalhes</span>
                      <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </StarBorder>
                </div>
              </>
            );

            return isExternal ? (
              <a
                key={service.title}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
                data-service-item
                style={{ cursor: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={service.title}
                href={link}
                className={styles.item}
                data-service-item
                style={{ cursor: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {cardContent}
              </Link>
            )
          })}
        </div>
      </div>

      <div className={styles.servicesCta}>
        <a href="#contato" className={styles.servicesCtaLink}>
          {t.services.ctaText}
          <svg viewBox="0 0 24 24" className={styles.servicesCtaIcon}>
            <path d="M7 17 17 7M8.5 7H17v8.5" />
          </svg>
        </a>
      </div>

      {!isMobile && (
        <div ref={cursorRef} className={styles.serviceCursor} aria-hidden="true">
          <div className={styles.serviceCursorInner}>
            <svg viewBox="0 0 24 24" className={styles.cursorArrow} fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={styles.cursorText}>Ver Mais</span>
          </div>
        </div>
      )}
    </section>
  )
}
