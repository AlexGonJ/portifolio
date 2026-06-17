'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/project-page.module.scss'

export default function LocalizaMultas() {
  const [isLoading, setIsLoading] = useState(true)

  const laptopWrapperRef = useRef<HTMLDivElement>(null)
  const laptopRef = useRef<HTMLDivElement>(null)
  const lidRef = useRef<HTMLDivElement>(null)
  const screenContentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

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

      // Laptop 3D animation — inline with grid, NO pin
      if (
        laptopWrapperRef.current &&
        laptopRef.current &&
        lidRef.current &&
        screenContentRef.current &&
        imageRef.current
      ) {
        // Initial: closed, angled from behind
        gsap.set(laptopRef.current, { rotateY: 135, rotateX: 10, rotateZ: -5, scale: 0.8 })
        gsap.set(lidRef.current, { rotateX: -20 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: laptopWrapperRef.current,
            start: 'center center',
            end: '+=2000', 
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            pinType: document.querySelector('.smooth-wrapper') ? 'transform' : 'fixed'
          }
        })

        // Phase 1 — Spin to front + open lid
        tl.to(laptopRef.current, {
          rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1,
          duration: 1.5, ease: 'power2.inOut'
        }, 0)
        tl.to(lidRef.current, {
          rotateX: 0, duration: 1.5, ease: 'power2.inOut'
        }, 0)

        // Phase 2 — Scroll the screenshot inside
        tl.to(imageRef.current, {
          y: () => -(imageRef.current!.offsetHeight - screenContentRef.current!.offsetHeight),
          duration: 2, ease: 'none'
        }, 1.2)
      }
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
        {/* main uses INLINE styles for the footer parallax reveal — same as home page */}
        <main style={{ backgroundColor: '#fbfbfd', position: 'relative', zIndex: 1 }}>
          <Navbar />

          <div className={styles.projectPage}>

          {/* ── HERO WITH BRANDED BACKGROUND ── */}
          <section className={styles.heroWrapper}>
            <div className={styles.heroBackground}>
              <Image
                src="/projects/localiza.png"
                alt="Localiza Multas Background"
                fill
                priority
                className={styles.bgImage}
              />
              <div className={styles.heroOverlay}></div>
            </div>

            <header className={styles.hero}>
              <div className={`${styles.heroInner} project-animate`}>
                <p className={styles.eyebrow}>Case Study</p>
                <h1 className={styles.title}>Localiza<br/>Multas</h1>
                <p className={styles.subtitle}>
                  Uma plataforma unificada que transforma a burocracia de recursos
                  de multas em uma jornada ágil e transparente.
                </p>
                <a
                  href="https://localizamultas.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cta}
                >
                  Visitar Site
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              <div className={`${styles.meta} project-animate`}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Cliente</span>
                  <span className={styles.metaValue}>Localiza Multas</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Serviço</span>
                  <span className={styles.metaValue}>UI/UX · Full-stack Dev</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Parceria</span>
                  <span className={styles.metaValue}>Wyre</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Ano</span>
                  <span className={styles.metaValue}>2025</span>
                </div>
              </div>
            </header>
          </section>

            {/* ── SECTION 01 — Vision + Laptop Mockup ── */}
            <section ref={laptopWrapperRef} className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>01 — A Visão</span>
                <h2>Descomplicando<br/>o Burocrático</h2>
                <p>
                  Como líder deste projeto, o desafio desde o dia um foi desenhar mais do que um simples
                  site institucional. A Localiza Multas precisava de uma ponte real entre o seu serviço
                  e o cliente final — uma plataforma que transmitisse extrema confiança e facilitasse o
                  acompanhamento de processos.
                </p>
                <p>
                  O nosso objetivo foi traduzir essa necessidade em uma experiência de usuário onde
                  a complexidade legal se transformasse em uma interface fluida, transparente e
                  livre de atritos para qualquer perfil de usuário.
                </p>
              </div>

              <div className={styles.splitMedia}>
                <div className={styles.laptopStage}>
                  <div ref={laptopRef} className={styles.laptopAssembly}>
                    <div ref={lidRef} className={styles.laptopLid}>
                      <div className={styles.lidBack}>
                        <div className={styles.appleLogo} />
                      </div>
                      <div className={styles.lidScreen}>
                        <div className={styles.laptopScreenInner}>
                          <div ref={screenContentRef} className={styles.screenContent}>
                            <img
                              ref={imageRef}
                              src="/localizaa.png"
                              alt="Localiza Multas Web Experience"
                              className={styles.scrollingImage}
                              onLoad={() => ScrollTrigger.refresh()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.laptopBase}>
                      <div className={styles.baseTop}>
                        <div className={styles.keyboard} />
                        <div className={styles.trackpad} />
                      </div>
                      <div className={styles.baseBottom} />
                      <div className={styles.baseFront} />
                      <div className={styles.baseBack} />
                      <div className={styles.baseLeft} />
                      <div className={styles.baseRight} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── TECH SHOWCASE ── */}
            <section className={`${styles.techShowcase} project-animate`}>
              <div className={styles.techHeader}>
                <span className={styles.sectionTag}>02 — Stack Tecnológico</span>
                <h2>Construído para<br/>escalar</h2>
                <p>
                  Cada tecnologia foi escolhida estrategicamente para resolver um problema
                  específico do ecossistema Localiza Multas.
                </p>
              </div>

              <div className={styles.techGrid}>
                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3>Next.js</h3>
                  <p>Framework React com SSR para SEO impecável e carregamento instantâneo — essencial para captar leads orgânicos.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9"/>
                    </svg>
                  </div>
                  <h3>Figma</h3>
                  <p>Design System completo com prototipação de alta fidelidade, garantindo consistência entre a visão do designer e o código final.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3>Firebase</h3>
                  <p>Backend serverless para autenticação, banco de dados em tempo real e hosting — reduzindo o time-to-market em 40%.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </div>
                  <h3>Google Auth</h3>
                  <p>Autenticação segura e familiar para os usuários, eliminando fricção no login e garantindo integridade dos dados do ERP.</p>
                </div>
              </div>
            </section>

            {/* ── SECTION 02 — Integration Detail ── */}
            <section className={`${styles.splitSection} ${styles.splitReverse} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>03 — Integração</span>
                <h2>O ERP que<br/>conversa com o site</h2>
                <p>
                  O verdadeiro coração do sistema é a busca de status pelo cliente, que precisava
                  conversar diretamente com um ERP exclusivo — também desenvolvido por nós.
                </p>
                <p>
                  Através do Firebase e Google Authentication, criamos uma arquitetura sólida e segura,
                  garantindo autoridade e escalabilidade para toda a operação.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/mockup.jpeg"
                    alt="Mockup Localiza Multas Detalhes"
                    width={1400}
                    height={900}
                  />
                </div>
              </div>
            </section>

            {/* ── FULL WIDTH IMAGE ── */}
            <div className={`${styles.showcase} project-animate`}>
              <Image
                src="/projects/post-car1.png"
                alt="Apresentação Final Localiza Multas"
                width={1400}
                height={800}
              />
            </div>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Próximo Projeto</span>
              <Link href="/work/aline-goncalves" className={styles.nextLink}>
                Dra. Aline Gonçalves
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
