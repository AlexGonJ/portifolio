'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/faq.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

export default function Faq() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.faq}>
      <div className={styles.faqContainer}>
        <div className={styles.header}>
          <p className={styles.label}>{t.faq.label}</p>
          <h2 className={styles.title}>{t.faq.title}</h2>
        </div>

        <div className={styles.list}>
          {t.faq.questions.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div key={index} className={styles.item}>
                <button 
                  className={styles.questionBtn} 
                  onClick={() => toggleOpen(index)}
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
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
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
      </div>
    </section>
  )
}
