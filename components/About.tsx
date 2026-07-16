'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/about.module.scss'
import ScrollReveal from './ScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const [imgError, setImgError] = useState(false)

  return (
    <section id="sobre" className={styles.about}>
      {/* Lado Esquerdo: Título maior */}
      <div className={styles.titleWrapper}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10} // Reduzi levemente para não pesar no mobile
          containerClassName={styles.customH2}
          startOffset="top 95%"
        >
          {t.about.title}
        </ScrollReveal>
      </div>

      {/* Lado Direito: Texto + Foto + CTA */}
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
          <div className={styles.authorBadge}>
            <div className={styles.authorAvatar}>
              {imgError ? (
                <span className={styles.avatarFallback}>AG</span>
              ) : (
                <Image
                  src="/heroi1.png"
                  alt="Alex Gonçalves"
                  width={56}
                  height={56}
                  className={styles.avatarImg}
                  onError={() => setImgError(true)}
                />
              )}
            </div>
            <div className={styles.authorMeta}>
              <span className={styles.authorName}>Alex Gonçalves</span>
              <span className={styles.authorTitle}>Designer & Developer</span>
            </div>
            <div className={styles.availabilityBadge}>
              <span className={styles.availabilityDot} />
              <span className={styles.availabilityText}>{t.about.availableText ?? 'Disponível'}</span>
            </div>
          </div>

          <a href="#contato" className={styles.aboutCta}>
            {t.about.ctaText}
            <svg viewBox="0 0 24 24" className={styles.aboutCtaIcon}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

