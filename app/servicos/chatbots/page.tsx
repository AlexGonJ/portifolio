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

export default function ChatbotsPage() {
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
                  <p className={styles.eyebrow}>Serviço · Automação</p>
                  <h1 className={styles.title}>Chatbots<br/><span style={{ color: '#c9a84c' }}>Inteligentes</span></h1>
                  <p className={styles.subtitle}>
                    Atendimento automatizado 24h via WhatsApp e site. Responda clientes, qualifique leads e venda no piloto automático.
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
                <span className={styles.sectionTag}>01 — O Impacto</span>
                <h2>Venda Enquanto<br/>Você Dorme</h2>
                <p>
                  Quantos clientes você perde porque sua equipe não conseguiu responder a tempo? Um atendimento demorado esfria o lead e faz você perder a venda para o concorrente.
                </p>
                <p>
                  Com um chatbot inteligente, você oferece atendimento instantâneo, 24 horas por dia. O bot qualifica o contato, tira dúvidas frequentes e até fecha a venda, transferindo para um humano apenas quando necessário.
                </p>
              </div>
              <div className={styles.splitMedia} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '400px', backgroundColor: '#e5e5e5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  [Placeholder: Demonstração do Chatbot]
                </div>
              </div>
            </section>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Outro Serviço</span>
              <Link href="/servicos/branding" className={styles.nextLink}>
                Serviços de Branding
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
