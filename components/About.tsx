'use client'
import styles from '../styles/about.module.scss'
import ScrollReveal from './ScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className={styles.about}>
      <h2 className="sr-only">Sobre a Lexon Digital • Posicionamento Estratégico</h2>
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
            <span>{t.about.ctaText}</span>
            <svg viewBox="0 0 24 24" className={styles.aboutCtaIcon}>
              <path d="M7 17 17 7M8.5 7H17v8.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
