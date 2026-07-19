'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
import styles from './sobre.module.scss'

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
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    desc: 'Transformação do design em código. Performance impecável, SEO técnico avançado e animações fluidas.',
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
    desc: 'Monitoramento dos primeiros acessos, ajustes finos de usabilidade e garantia de estabilidade total.',
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
    desc: 'Análise de métricas reais, testes A/B e evolução contínua para maximizar o retorno sobre investimento.',
  },
]

const teamAreas = [
  {
    title: 'Design & UX',
    desc: 'Interfaces premium focadas em conversão, identidade visual e branding que posiciona.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Desenvolvimento',
    desc: 'Front-end e back-end de alta performance com tecnologias modernas e arquitetura escalável.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Marketing Digital',
    desc: 'Estratégias de tráfego, campanhas visuais e automações para escalar seus resultados.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    title: 'Audiovisual',
    desc: 'Produção de vídeos, reels e conteúdo visual que gera engajamento e fortalece a marca.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <line x1="17" y1="17" x2="22" y2="17" />
      </svg>
    ),
  },
]

const featuredProjects = [
  {
    src: '/projects/vitrine-masculina/hero.png',
    label: 'Vitrine Masculina',
    href: '/work/vitrine-masculina',
  },
  {
    src: '/projects/via-bike/cap.jpg',
    label: 'Via Bike',
    href: '/work/via-bike',
  },
  {
    src: '/projects/post-car1.png',
    label: 'Localiza Multas',
    href: '/work/localiza-multas',
  },
]

export default function Sobre() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoading) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      /* ── Hero entrance ── */
      gsap.fromTo(
        '.about-animate',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      )

      /* ── Scroll-triggered sections ── */
      const sections = gsap.utils.toArray('.about-reveal')
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
            },
          }
        )
      })

      /* ── Process cards stagger ── */
      gsap.fromTo(
        '.process-card',
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-grid',
            start: 'top 80%',
          },
        }
      )

      /* ── Team cards stagger ── */
      gsap.fromTo(
        '.team-card',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
          },
        }
      )

      /* ── Project thumbnails ── */
      gsap.fromTo(
        '.project-thumb',
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-gallery',
            start: 'top 80%',
          },
        }
      )
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
          <Navbar />

          {/* ══════════════════════════════════════════════════════════════
              1. HERO — Dark Immersive
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.heroWrapper}>
            <div className={styles.heroBackground}>
              <Image
                src="/heroi1.png"
                alt="Lexon Digital — Alexander Gonçalves"
                fill
                priority
                className={styles.heroBgImage}
              />
              <div className={styles.heroOverlay} />
            </div>

            <header className={styles.hero}>
              <div className={`${styles.heroInner} about-animate`}>
                <p className={styles.eyebrow}>Sobre Nós</p>
                <h1 className={styles.heroTitle}>
                  Lexon<br /><span>Digital</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Estratégia visual, tecnologia e design premium reunidos para transformar negócios. 
                  Construímos marcas que vendem e experiências digitais que convertem.
                </p>
              </div>

              <div className={`${styles.meta} about-animate`}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Fundação</span>
                  <span className={styles.metaValue}>2022</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Local</span>
                  <span className={styles.metaValue}>Brasil · Remoto</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Foco</span>
                  <span className={styles.metaValue}>Design & Tecnologia</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Projetos</span>
                  <span className={styles.metaValue}>60+</span>
                </div>
              </div>
            </header>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              2. ABOUT THE AGENCY
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.agencyIntro}>
            <div className={styles.container}>
              <div className={styles.agencyGrid}>
                <div className={`${styles.agencyText} about-reveal`}>
                  <span className={styles.tag}>A Agência</span>
                  <h2>
                    Design que <span>vende.</span><br />
                    Tecnologia que <span>escala.</span>
                  </h2>
                  <p>
                    A <strong>Lexon Digital</strong> nasceu de uma premissa simples: design bonito sem estratégia é desperdício. Cada projeto que entregamos começa com uma análise profunda do negócio do cliente — seu público, seus concorrentes, seus gargalos de conversão.
                  </p>
                  <p>
                    Unimos estética premium com engenharia de alta performance para criar soluções que não apenas impressionam, mas geram resultado mensurável. Sites que rankeiam, marcas que justificam preços mais altos e sistemas que organizam operações inteiras.
                  </p>
                  <p>
                    Nosso diferencial é a comunicação direta: sem gerentes de projeto bloqueando o caminho, você fala direto com quem cria e desenvolve.
                  </p>
                </div>

                <div className={`${styles.agencyVisual} about-reveal`}>
                  {[
                    { label: 'Web Design', icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    )},
                    { label: 'Branding', icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )},
                    { label: 'Sistemas', icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    )},
                    { label: 'Marketing', icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    )},
                  ].map((item, i) => (
                    <div key={i} className={styles.visualCard}>
                      <div className={styles.visualCardIcon}>{item.icon}</div>
                      <span className={styles.visualCardLabel}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              3. PROCESS
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.processSection}>
            <div className={styles.container}>
              <div className={`${styles.sectionHeader} about-reveal`}>
                <span className={styles.tag}>Nosso Processo</span>
                <h2>Da estratégia ao resultado.</h2>
                <p>
                  Um método claro e estruturado para entregar projetos que geram impacto real no seu negócio.
                </p>
              </div>

              <div className={`${styles.processGrid} process-grid`}>
                {processSteps.map((step, index) => (
                  <div key={index} className={`${styles.processCard} process-card`}>
                    <span className={styles.processPhase}>{step.phase}</span>
                    <div className={styles.processIcon}>{step.icon}</div>
                    <h3>{step.title}</h3>
                    <span className={styles.processDuration}>{step.duration}</span>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              4. FOUNDER CARD
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.founderSection}>
            <div className={styles.container}>
              <div className={`${styles.founderCard} about-reveal`}>
                <div className={styles.founderPhoto}>
                  <Image
                    src="/heroi.png"
                    alt="Alexander Gonçalves — Fundador e Diretor Criativo"
                    fill
                    priority
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
                <div className={styles.founderInfo}>
                  <span className={styles.tag}>O Fundador</span>
                  <h2>Alexander<br />Gonçalves</h2>
                  <p>
                    Fundador e Diretor Criativo da Lexon Digital. Atuo na interseção entre design estratégico e engenharia de software, coordenando cada projeto desde a concepção visual até o código em produção.
                  </p>
                  <p>
                    Minha abordagem combina visão de negócio com execução técnica: antes de abrir qualquer ferramenta de design, eu entendo o modelo de receita do cliente, seus gargalos de conversão e o posicionamento da concorrência.
                  </p>
                  <span className={styles.founderRole}>Diretor Criativo & Full-Stack Developer</span>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              5. ASSOCIATED TEAM
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.teamSection}>
            <div className={styles.container}>
              <div className={styles.teamInner}>
                <div className={`${styles.teamHeader} about-reveal`}>
                  <span className={styles.tag}>Equipe Associada</span>
                  <h2>A força de muitos.<br />A qualidade de poucos.</h2>
                  <p>
                    Por trás de cada entrega existe uma rede de designers e programadores associados, 
                    especialistas em suas áreas e prontos para atender com a mais alta qualidade. 
                    Cada projeto recebe o time ideal para o desafio.
                  </p>
                </div>

                <div className={`${styles.teamGrid} team-grid`}>
                  {teamAreas.map((area, index) => (
                    <div key={index} className={`${styles.teamCard} team-card`}>
                      <div className={styles.teamCardIcon}>{area.icon}</div>
                      <h3>{area.title}</h3>
                      <p>{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              6. PROJECTS — See Our Work
              ══════════════════════════════════════════════════════════════ */}
          <section className={styles.projectsCta}>
            <div className={styles.container}>
              <div className={`${styles.projectsHeader} about-reveal`}>
                <span className={styles.tag}>Portfólio</span>
                <h2>Veja alguns dos nossos projetos.</h2>
              </div>

              <div className={`${styles.projectsGallery} projects-gallery`}>
                {featuredProjects.map((project, index) => (
                  <Link key={index} href={project.href} className={`${styles.projectThumb} project-thumb`}>
                    <Image
                      src={project.src}
                      alt={project.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                    <div className={styles.projectThumbOverlay}>
                      <span className={styles.projectThumbLabel}>{project.label}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className={styles.projectsAction}>
                <Link href="/work" className={styles.projectsBtn}>
                  Ver todos os projetos
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              7. CTA FINAL
              ══════════════════════════════════════════════════════════════ */}
          <section className={`${styles.ctaSection} about-reveal`}>
            <div className={styles.container}>
              <div className={styles.ctaBox}>
                <h2>Pronto para iniciar<br />seu próximo projeto?</h2>
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
