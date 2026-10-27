'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/services.module.scss'
import { useLanguage } from '../i18n/LanguageContext'
import StarBorder from './StarBorder'

export default function Services() {
  const { t, lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="servicos" className={styles.services} aria-labelledby="services-title">
      <div className={styles.servicesLayout}>
        {/* Coluna da Esquerda: Textos e CTA */}
        <div className={styles.leftColumn}>
          <p className={styles.label}>{t.services.label}</p>
          <h2 id="services-title" className={styles.title}>
            {t.services.title}
          </h2>
          <p className={styles.description}>{t.services.description}</p>

          <div className={styles.servicesCta}>
            <a href="#contato" className={styles.servicesCtaLink}>
              {t.services.ctaText}
              <svg viewBox="0 0 24 24" className={styles.servicesCtaIcon}>
                <path d="M7 17 17 7M8.5 7H17v8.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Coluna da Direita: Cards em Acordeão */}
        <div className={styles.accordionColumn}>
          {t.services.items.map((service, index) => {
            const isOpen = openIndex === index
            const isExternal = (service as { isExternal?: boolean }).isExternal
            const link = (service as { link: string }).link
            const num = String(index + 1).padStart(2, '0')

            const detailsLinkContent = (
              <StarBorder as="div" className={styles.cardLinkWrapper} color="rgba(212, 212, 220, 0.75)" speed="4s">
                <div className={styles.cardLink}>
                  <span>{lang === 'pt' ? 'Ver Detalhes' : 'View Details'}</span>
                  <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </StarBorder>
            )

            return (
              <div
                key={service.title}
                className={`${styles.accordionCard} ${isOpen ? styles.accordionCardOpen : ''}`}
              >
                <div className={styles.indexWatermark} aria-hidden="true">
                  {num}
                </div>

                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleCard(index)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.headerText}>
                    <span className={styles.indexLabel}>
                      {lang === 'pt' ? `Serviço ${num}` : `Service ${num}`}
                    </span>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                  </div>

                  <span className={styles.toggleBtn} aria-hidden="true">
                    <svg viewBox="0 0 24 24" className={styles.toggleIcon}>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <div className={styles.accordionBody} aria-hidden={!isOpen}>
                  <div className={styles.accordionBodyInner}>
                    <div className={styles.expandedContent}>
                      {service.description && (
                        <p className={styles.serviceDescription}>{service.description}</p>
                      )}

                      <ul className={styles.details}>
                        {service.details.map((detail: string) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>

                      <div className={styles.cardAction}>
                        {isExternal ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionAnchor}
                          >
                            {detailsLinkContent}
                          </a>
                        ) : (
                          <Link href={link} className={styles.actionAnchor}>
                            {detailsLinkContent}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
