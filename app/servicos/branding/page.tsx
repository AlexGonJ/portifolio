'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/project-page.module.scss'
import { useLanguage } from '@/i18n/LanguageContext'

export default function BrandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    if (isLoading) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        '.project-animate',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      )
    })

    setTimeout(() => ScrollTrigger.refresh(), 600)

    return () => {
      ctx.revert()
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main style={{ backgroundColor: '#fbfbfd', position: 'relative', zIndex: 1 }}>
          <Navbar isProjectPage={true} />

          <div className={styles.projectPage}>
            
            {/* ── HERO ── */}
            <section className={styles.heroWrapper} style={{ backgroundColor: '#1a1a1a' }}>
              <div className={styles.heroBackground}>
                <div className={styles.heroOverlay} style={{
                  background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.4) 0%, rgba(26, 26, 26, 1) 100%)'
                }}></div>
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>Serviço · Identidade Visual</p>
                  <h1 className={styles.title}>Serviços de<br/><span style={{ color: '#c9a84c' }}>Branding</span></h1>
                  <p className={styles.subtitle}>
                    Identidades visuais que dão voz, presença e valor percebido maior para o seu negócio em todos os pontos de contato.
                  </p>
                  <a
                    href="/#contato"
                    className={styles.cta}
                    style={{ color: '#1a1a1a', background: '#c9a84c' }}
                  >
                    Solicitar Orçamento
                  </a>
                </div>
              </header>
            </section>

            {/* ── SECTION 01 ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>01 — Posicionamento</span>
                <h2>Sua Marca é seu<br/>Melhor Vendedor</h2>
                <p>
                  Muitas empresas perdem vendas simplesmente porque sua identidade visual parece amadora. O design não é apenas estética; é a forma como o mercado percebe o seu valor antes mesmo de você abrir a boca.
                </p>
                <p>
                  Eu construo marcas fortes que transmitem confiança, justificam preços mais altos e conectam-se emocionalmente com o seu público-alvo, através de um sistema visual coerente (logo, cores, tipografia e diretrizes).
                </p>
              </div>
              <div className={styles.splitMedia} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '400px', backgroundColor: '#e5e5e5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  [Placeholder: Apresentação de Branding]
                </div>
              </div>
            </section>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Outro Serviço</span>
              <Link href="/servicos/desenvolvimento" className={styles.nextLink}>
                Desenvolvimento Personalizado
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
