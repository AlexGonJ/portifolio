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

export default function DesenvolvimentoPage() {
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
                  <p className={styles.eyebrow}>Serviço · Web</p>
                  <h1 className={styles.title}>Desenvolvimento<br/><span style={{ color: '#c9a84c' }}>Personalizado</span></h1>
                  <p className={styles.subtitle}>
                    Sites institucionais, landing pages e sistemas sob medida com aparência premium, performance e foco em conversão.
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
                <span className={styles.sectionTag}>01 — A Abordagem</span>
                <h2>Experiências Web<br/>de Alta Performance</h2>
                <p>
                  A maioria dos sites são lentos, genéricos e não convertem visitantes em clientes. Um site ou sistema mal construído custa caro em tráfego perdido e oportunidades desperdiçadas.
                </p>
                <p>
                  Eu desenvolvo soluções web sob medida utilizando as tecnologias mais modernas do mercado (React, Next.js, Node), garantindo carregamento ultrarrápido, otimização para SEO e uma experiência de usuário impecável em qualquer dispositivo.
                </p>
              </div>
              <div className={styles.splitMedia} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '400px', backgroundColor: '#e5e5e5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  [Placeholder: Código ou Interface Web]
                </div>
              </div>
            </section>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Outro Serviço</span>
              <Link href="/servicos/sistema-fiscal" className={styles.nextLink}>
                Sistema Fiscal
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
