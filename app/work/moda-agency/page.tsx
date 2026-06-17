'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/project-page.module.scss'

export default function ModaAgency() {
  const [isLoading, setIsLoading] = useState(true)

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

            {/* ── HERO WITH BRANDED BACKGROUND ── */}
            <section className={styles.heroWrapper} style={{ backgroundColor: '#0f0f11' }}>
              <div className={styles.heroBackground}>
                <Image
                  src="/projects/moda-hero.jpg"
                  alt="Moda Agency Hero Background"
                  fill
                  priority
                  className={styles.bgImage}
                  style={{ opacity: 0.45, filter: 'blur(3px) grayscale(0.2)' }}
                />
                <div className={styles.heroOverlay} style={{ background: 'linear-gradient(to bottom, rgba(15,15,17,0.4) 0%, rgba(15,15,17,0.9) 100%)' }}></div>
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>Case Study</p>
                  <h1 className={styles.title}>Moda<br />Agency</h1>
                  <p className={styles.subtitle}>
                    Um editorial de moda interativo transformado em plataforma digital. 
                    Design minimalista de alto contraste com transições sofisticadas de alta performance.
                  </p>
                  <a
                    href="https://moda-agency.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                    style={{ color: '#0f0f11' }}
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
                    <span className={styles.metaValue}>Moda Agency</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Serviço</span>
                    <span className={styles.metaValue}>UI/UX · Frontend Dev · GSAP</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Parceria</span>
                    <span className={styles.metaValue}>Lexon</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Ano</span>
                    <span className={styles.metaValue}>2026</span>
                  </div>
                </div>
              </header>
            </section>

            {/* ── SECTION 01 — Vision ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>01 — A Visão</span>
                <h2>Estética Editorial<br />e Fluidez</h2>
                <p>
                  Para a Moda Agency, o desafio principal foi traduzir visualmente o refinamento e a 
                  sofisticação característicos do mercado de moda de luxo. A plataforma não poderia se 
                  comportar como um portfólio comum; ela precisava proporcionar a sensação tátil e o 
                  ritmo visual de um editorial impresso.
                </p>
                <p>
                  Priorizando imagens em alta definição, tipografia de alto contraste (Syne e Inter) e o uso 
                  estratégico de espaços vazios, criamos uma narrativa visual imersiva e livre de atritos. 
                  As transições guiam o usuário de forma fluida pelas seções de sobre, portfólios e contatos.
                </p>
              </div>

              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/moda-second.jpg"
                    alt="Moda Agency Brand Experience"
                    width={1400}
                    height={900}
                    priority
                  />
                </div>
              </div>
            </section>

            {/* ── TECH SHOWCASE ── */}
            <section className={`${styles.techShowcase} project-animate`}>
              <div className={styles.techHeader}>
                <span className={styles.sectionTag}>02 — Stack Tecnológico</span>
                <h2>Construído com<br />precisão digital</h2>
                <p>
                  Cada ferramenta foi escolhida cuidadosamente para suportar o carregamento ágil de 
                  mídias pesadas mantendo animações fluidas a 60fps constantes.
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
                  <p>Renderização híbrida via SSR que garante SEO impecável e carregamento instantâneo de páginas.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9"/>
                    </svg>
                  </div>
                  <h3>GSAP</h3>
                  <p>Orquestração avançada de micro-interações, efeitos paralaxe e animações de scroll customizadas.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3>Framer Motion</h3>
                  <p>Responsável pelas transições de página fluidas e a suave animação em curva do menu lateral.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </div>
                  <h3>Sass (SCSS)</h3>
                  <p>Estilização modular altamente escalável, facilitando a fidelidade ao design original e responsividade perfeita.</p>
                </div>
              </div>
            </section>

            {/* ── SECTION 03 — Design details ── */}
            <section className={`${styles.splitSection} ${styles.splitReverse} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>03 — Direção de Arte</span>
                <h2>Ritmo, Tipografia<br />e Contraste</h2>
                <p>
                  As transições entre as seções de projetos mostram marcas renomadas que a Moda Agency atende, 
                  como Animale, Farm Rio e Osklen. Cada item de portfólio interage de forma dinâmica com o cursor, 
                  revelando imagens correspondentes e gerando curiosidade visual.
                </p>
                <p>
                  A paleta de cores monocromática permite que os ensaios fotográficos se destaquem com máxima força, 
                  criando uma atmosfera sofisticada e premium que eleva a percepção de valor dos serviços da agência.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/moda-third.jpg"
                    alt="Moda Agency Design Details"
                    width={1400}
                    height={900}
                  />
                </div>
              </div>
            </section>

            {/* ── FULL WIDTH IMAGE ── */}
            <div className={`${styles.showcase} project-animate`}>
              <Image
                src="/projects/moda-home.png"
                alt="Moda Agency Full Experience Showcase"
                width={1400}
                height={800}
              />
            </div>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Próximo Projeto</span>
              <Link href="/work/localiza-multas" className={styles.nextLink}>
                Localiza Multas
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
