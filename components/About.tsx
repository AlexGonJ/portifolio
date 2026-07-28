'use client'
import styles from '../styles/about.module.scss'
import ScrollReveal from './ScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className={styles.about}>
      {/* Lado Esquerdo: Título com ScrollReveal */}
      <div className={styles.titleWrapper}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          containerClassName={styles.customH2}
          startOffset="top 95%"
        >
          {t.about.title}
        </ScrollReveal>
      </div>

      {/* Lado Direito: Texto + CTA */}
      <div className={styles.textWrapper}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          blurStrength={5}
          containerClassName={styles.customP}
          startOffset="top 95%"
        >
          {t.about.description}
        </ScrollReveal>

        <div className={styles.aboutFooter}>
          <a href="/sobre" className={styles.aboutCta} aria-label={t.about.ctaText}>
            <span className={styles.ctaText}>{t.about.ctaText}</span>
            <span className={styles.ctaIconWrapper}>
              <svg viewBox="0 0 24 24" className={styles.aboutCtaIcon} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
