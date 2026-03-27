'use client'
import styles from '../styles/about.module.scss'
import ScrollReveal from './ScrollReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  
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
        >
          {t.about.title}
        </ScrollReveal>
      </div>

      {/* Lado Direito: Parágrafo menor */}
      <div className={styles.textWrapper}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          blurStrength={5}
          containerClassName={styles.customP}
        >
          {t.about.description}
        </ScrollReveal>
      </div>
    </section>
  )
}
