'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/faq.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function Faq() {
  const { t, lang } = useLanguage()
  const isPt = lang === 'pt'
  const [isSectionOpen, setIsSectionOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const refreshScrollTrigger = useCallback(async () => {
    if (typeof window === 'undefined') return
    try {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      ScrollTrigger.refresh()
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event('layoutComplete'))
  }, [])

  const toggleSection = () => {
    setIsSectionOpen((prev) => !prev)
  }

  const toggleOpen = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className={`${styles.faq} ${isSectionOpen ? styles.faqOpen : ''}`}>
      <div className={styles.faqContainer}>
        <div className={`${styles.accordionCard} ${isSectionOpen ? styles.accordionCardOpen : ''}`}>
          <button
            type="button"
            className={styles.sectionHeaderBtn}
            onClick={toggleSection}
            aria-expanded={isSectionOpen}
            aria-controls="faq-section-content"
          >
            <div className={styles.headerInfo}>
              <span className={styles.label}>{t.faq.label}</span>
              <h2 className={styles.title}>{t.faq.title}</h2>
            </div>

            <div className={styles.indicatorWrapper}>
              <span
                className={`${styles.indicatorBtn} ${!isSectionOpen ? styles.indicatorBtnClosed : ''}`}
              >
                <span className={styles.indicatorText}>
                  {isSectionOpen
                    ? (isPt ? 'Recolher' : 'Close')
                    : (isPt ? 'Ver perguntas' : 'View questions')}
                </span>
                <motion.span
                  className={styles.indicatorIcon}
                  animate={{ rotate: isSectionOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.span>
              </span>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isSectionOpen && (
              <motion.div
                id="faq-section-content"
                className={styles.sectionContent}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={refreshScrollTrigger}
              >
                <div className={styles.contentDivider} />

                <div className={styles.list}>
                  {t.faq.questions.map((faq, index) => {
                    const isOpen = openIndex === index

                    return (
                      <div key={index} className={styles.item}>
                        <button
                          type="button"
                          className={styles.questionBtn}
                          onClick={() => {
                            toggleOpen(index)
                            setTimeout(refreshScrollTrigger, 400)
                          }}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.questionText}>{faq.q}</span>
                          <motion.span
                            className={styles.icon}
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                          >
                            +
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              className={styles.contentWrapper}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                              onAnimationComplete={refreshScrollTrigger}
                            >
                              <div className={styles.answer}>
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>

                <div className={styles.faqCta}>
                  <a href="#contato" className={styles.faqCtaLink}>
                    {t.faq.ctaText}
                    <svg viewBox="0 0 24 24" className={styles.faqCtaIcon}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
