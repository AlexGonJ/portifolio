'use client'

import { useEffect, useState, useRef, Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
import styles from './sobre.module.scss'

export default function Sobre() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef<HTMLDivElement>(null)

  const processSteps = [
    {
      phase: 'FASE 01',
      title: 'Discovery',
      duration: '90 MIN',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      desc: 'Mergulho no modelo de negócios, análise de mercado e definição da arquitetura de informação focada em conversão.',
    },
    {
      phase: 'FASE 02',
      title: 'Demo',
      duration: '2-5 DIAS',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      desc: 'Criação da identidade visual e protótipos interativos de alta fidelidade para validar a direção estética e funcional.',
    },
    {
      phase: 'FASE 03',
      title: 'Build',
      duration: '1-3 SEM',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      desc: 'Transformação do design em código. Performance impecável, SEO técnico avançado e animações fluidas para uma experiência imersiva.',
    },
    {
      phase: 'FASE 04',
      title: 'Validação',
      duration: '30 DIAS',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      desc: 'O lançamento é acompanhado de perto. Monitoramos os primeiros acessos, realizamos ajustes finos e garantimos a estabilidade.',
    },
    {
      phase: 'FASE 05',
      title: 'Evolução',
      duration: 'RECORRENTE',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
          <line x1="12" y1="2" x2="12" y2="12" />
        </svg>
      ),
      desc: 'Análise de métricas reais de uso, testes A/B e evolução contínua do produto para maximizar o retorno sobre investimento (ROI).',
    },
  ]

  useEffect(() => {
    if (isLoading) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      /* ── Entry Animation ── */
      gsap.fromTo(
        '.fade-up',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )

      /* ── Workflow Nodes & Path Drawing ── */
      const nodes = gsap.utils.toArray('.workflow-node')
      nodes.forEach((node: any, i) => {
        // Fade in the node
        gsap.fromTo(
          node,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.8, ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
            }
          }
        )

        // Animate the connecting line (SVG path) if it exists
        const path = node.querySelector('.connection-path')
        if (path) {
          const length = path.getTotalLength()
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
          
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: node,
              start: 'top 60%',
              end: 'bottom 20%',
              scrub: 1,
            }
          })
        }
      })

    }, mainRef)

    setTimeout(() => ScrollTrigger.refresh(), 600)

    return () => {
      ctx.revert()
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main className={styles.aboutPage} ref={mainRef}>
          {/* Continuous Grid Background */}
          <div className={styles.globalGrid} />
          
          <Navbar />

          {/* ══════════════════════════════════════════════════════════════
              1. HERO
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.heroSection}>
            <div className={styles.container}>
              <div className={`${styles.heroHeader} fade-up`}>
                <span className={styles.tag}>Visão Geral</span>
                <h1 className={styles.title}>
                  Onde a Estratégia<br/>
                  encontra a <span>Engenharia.</span>
                </h1>
                <p className={styles.subtitle}>
                  Nós desenhamos e desenvolvemos experiências digitais que elevam marcas e impulsionam o crescimento. Um estúdio onde a comunicação é direta e a qualidade é absoluta.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              2. S-CURVE WORKFLOW
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.workflowSection}>
            <div className={styles.container}>
              <div className={styles.workflowSnake}>
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 1
                  
                  return (
                    <div 
                      key={index} 
                      className={`${styles.workflowNodeWrapper} workflow-node ${isEven ? styles.nodeRight : styles.nodeLeft}`}
                    >
                      {/* SVGs to connect nodes. Except for the last one */}
                      {index < processSteps.length - 1 && (
                        <div className={`${styles.connector} ${isEven ? styles.connectLeft : styles.connectRight}`}>
                          <svg viewBox="0 0 100 200" preserveAspectRatio="none">
                            {isEven ? (
                              <path 
                                className="connection-path" 
                                d="M 100,0 C 100,100 0,100 0,200" 
                                fill="none" 
                                stroke="var(--color-gold)" 
                                strokeWidth="2" 
                                strokeDasharray="6,6"
                              />
                            ) : (
                              <path 
                                className="connection-path" 
                                d="M 0,0 C 0,100 100,100 100,200" 
                                fill="none" 
                                stroke="var(--color-gold)" 
                                strokeWidth="2" 
                                strokeDasharray="6,6"
                              />
                            )}
                          </svg>
                        </div>
                      )}

                      <div className={styles.nodeCircle}>
                        <div className={styles.iconInner}>
                          {step.icon}
                        </div>
                      </div>

                      <div className={styles.nodeText}>
                        <div className={styles.phaseHeader}>
                          <span className={styles.phaseLabel}>{step.phase}</span>
                        </div>
                        <h3>{step.title}</h3>
                        <span className={styles.durationBadge}>{step.duration}</span>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              3. DIRECTOR & ECOSYSTEM (Glassmorphism over grid)
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.agencySection}>
            <div className={styles.container}>
              
              <div className={`${styles.directorCard} fade-up`}>
                <div className={styles.directorPhoto}>
                  <Image
                    src="/heroi.png"
                    alt="Alexander Gonçalves"
                    fill
                    priority
                    className={styles.img}
                  />
                </div>
                <div className={styles.directorInfo}>
                  <span className={styles.tag}>O Diretor Criativo</span>
                  <h2>A visão de um.<br/>A força de muitos.</h2>
                  <p>
                    Sou Alexander Gonçalves, Fundador e Diretor Criativo da Lexon Digital. 
                    Eu coordeno a visão estratégica, o design premium e a arquitetura técnica, 
                    orquestrando parceiros especialistas em cada área.
                  </p>
                  <p>
                    Sem gerentes de projeto bloqueando o caminho, você tem acesso direto 
                    a quem realmente cria e desenvolve, com o peso de uma equipe de alta performance executando o trabalho.
                  </p>
                </div>
              </div>

              <div className={styles.areasGrid}>
                <div className={`${styles.areaCard} fade-up`}>
                  <div className={styles.areaIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <h3>O Core</h3>
                  <p>Design, branding e UX. Liderança criativa direta para garantir conversão e estética impecável.</p>
                </div>

                <div className={`${styles.areaCard} fade-up`}>
                  <div className={styles.areaIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <h3>A Estrutura</h3>
                  <p>Desenvolvimento e sistemas complexos, executados por parceiros focados em performance web.</p>
                </div>

                <div className={`${styles.areaCard} fade-up`}>
                  <div className={styles.areaIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="23 4 23 10 17 10" />
                      <polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                  </div>
                  <h3>O Crescimento</h3>
                  <p>Tráfego, automações e audiovisual, integrando tecnologias para escalar os resultados.</p>
                </div>
              </div>

            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              4. CTA
              ══════════════════════════════════════════════════════════════ */}
          <section className={`${styles.ctaSection} fade-up`}>
            <div className={styles.container}>
              <div className={styles.ctaBox}>
                <h2>Pronto para iniciar<br/>seu próximo projeto?</h2>
                <Link href="/#contato" className={styles.ctaBtn}>
                  Vamos Conversar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
