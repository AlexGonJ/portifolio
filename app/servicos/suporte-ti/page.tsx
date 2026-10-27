'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePixelCustomEvent } from '@/hooks/usePixelCustomEvent'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/project-page.module.scss'

export default function SuporteTiPage() {
  const [isLoading, setIsLoading] = useState(true)

  usePixelCustomEvent('ViewSuporteTI')

  useEffect(() => {
    if (isLoading) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
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
        <main style={{ backgroundColor: '#F5F3EF', position: 'relative', zIndex: 1 }}>
          <Navbar isProjectPage={true} />

          <div className={styles.projectPage}>
            {/* ── HERO ── */}
            <section className={styles.heroWrapper} style={{ backgroundColor: '#0B0D10' }}>
              <div className={styles.heroBackground}>
                <Image
                  src="/illustrations/domenico-loia-hGV2TfOh0ns-unsplash.jpg"
                  alt="Suporte de TI e Sustentação de Sistemas"
                  fill
                  className={styles.bgImage}
                />
                <div
                  className={styles.heroOverlay}
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(11, 13, 16, 0.55) 0%, rgba(11, 13, 16, 0.98) 100%)',
                  }}
                />
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>Continuidade & Estabilidade</p>
                  <h1 className={styles.title}>
                    Suporte de TI & <br />
                    <span style={{ color: '#C9A84C' }}>Sistemas</span>
                  </h1>
                  <p className={styles.subtitle}>
                    Acompanhamento técnico, manutenção preventiva e evolução contínua para manter os sistemas e a operação digital da sua empresa sempre estáveis.
                  </p>
                  <a
                    href="/#contato"
                    className={styles.cta}
                  >
                    Falar sobre Suporte
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17 17 7M8.5 7H17v8.5" />
                    </svg>
                  </a>
                </div>
              </header>
            </section>

            {/* ── SUSTENTAÇÃO DE SISTEMAS ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>Engenharia & Continuidade</span>
                <h2>
                  Manutenção e Evolução
                  <br />
                  de Sistemas e Plataformas
                </h2>
                <p>
                  Seu sistema web, ERP, portal ou plataforma precisa acompanhar o ritmo do seu negócio. Cuidamos da manutenção preventiva, correções, otimização de banco de dados, atualizações de segurança e desenvolvimento de novas funcionalidades.
                </p>
                <p>
                  Monitoramos disponibilidade, performance e integrações (APIs, meios de pagamento, emissão fiscal) para garantir estabilidade contínua no dia a dia.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/illustrations/web_design_code.png"
                    width={800}
                    height={600}
                    alt="Manutenção de Sistemas e Código"
                  />
                </div>
              </div>
            </section>

            {/* ── SUPORTE DE TI EMPRESARIAL ── */}
            <section className={`${styles.splitSection} ${styles.splitReverse} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>Suporte & Infraestrutura</span>
                <h2>
                  Apoio Técnico para
                  <br />
                  Empresas e Equipes
                </h2>
                <p>
                  Atendimento próximo e estruturado para apoiar a rotina tecnológica da sua empresa com agilidade e clareza.
                </p>
                <p>
                  Auxiliamos no suporte à equipe, configuração de ambientes em nuvem, gestão de acessos, rotinas de backup e organização da infraestrutura digital do seu negócio.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/fiscal-team.png"
                    width={800}
                    height={600}
                    alt="Equipe e Suporte de TI Empresarial"
                  />
                </div>
              </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className={`${styles.splitSection} project-animate`} style={{ textAlign: 'center', display: 'block' }}>
              <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
                <span className={styles.sectionTag}>Atendimento Ágil</span>
                <h2 style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                  Sua operação acompanhada de perto.
                </h2>
                <p style={{ marginBottom: '2rem' }}>
                  Conte com suporte técnico contínuo ou sob demanda para manter seus sistemas e sua estrutura funcionando sem imprevistos.
                </p>
                <a
                  href="/#contato"
                  className={styles.cta}
                >
                  Solicitar Atendimento
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8.5 7H17v8.5" />
                  </svg>
                </a>
              </div>
            </section>
          </div>

          <Footer />
        </main>
      </div>
    </>
  )
}
