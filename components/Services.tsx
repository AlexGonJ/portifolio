'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/services.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.services} aria-labelledby="services-title">
      <div className={styles.intro}>
        <p className={styles.label}>{t.services.label}</p>
        <div className={styles.headingBlock}>
          <h2 id="services-title" className={styles.title}>
            {t.services.title}
          </h2>
          <p className={styles.description}>{t.services.description}</p>
        </div>
      </div>

      {/* Desktop: grid cards */}
      {!isMobile && (
        <div className={styles.grid}>
          {t.services.items.map((service, index) => (
            <article key={service.title} className={styles.item}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className={styles.details}>
                {service.details.map(detail => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      {/* Mobile: accordion */}
      {isMobile && (
        <div className={styles.accordion}>
          {t.services.items.map((service, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={service.title}
                className={`${styles.accordionItem} ${isOpen ? styles.accordionOpen : ''}`}
              >
                <button
                  className={styles.accordionTrigger}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.accordionLeft}>
                    <span className={styles.accordionNum}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.accordionTitle}>{service.title}</span>
                  </div>
                  <span className={styles.accordionIcon}>{isOpen ? '−' : '+'}</span>
                </button>

                <div
                  className={styles.accordionContent}
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className={styles.accordionDesc}>{service.description}</p>
                  <ul className={styles.accordionDetails}>
                    {service.details.map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
