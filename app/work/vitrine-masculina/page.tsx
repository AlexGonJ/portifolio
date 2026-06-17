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

export default function VitrineMasculinaProject() {
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

      // Laptop 3D animation
      if (
        laptopWrapperRef.current &&
        laptopRef.current &&
        lidRef.current &&
        screenContentRef.current &&
        imageRef.current
      ) {
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
        <main style={{ backgroundColor: '#fbfbfd', position: 'relative', zIndex: 1 }}>
          <Navbar />

          <div className={styles.projectPage}>

            {/* ── HERO WITH BRANDED BACKGROUND ── */}
            <section className={styles.heroWrapper} style={{ backgroundColor: '#0a0a0a' }}>
              <div className={styles.heroBackground}>
                <Image
                  src="/projects/vitrine-masculina/hero.png"
                  alt="Vitrine Masculina DTNA Background"
                  fill
                  priority
                  className={styles.bgImage}
                />
                <div className={styles.heroOverlay} style={{
                  background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.88) 100%)'
                }}></div>
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>E-commerce · Full-Stack Development</p>
                  <h1 className={styles.title}>Vitrine<br/><span style={{ color: '#c4728f' }}>Masculina</span></h1>
                  <p className={styles.subtitle}>
                    Uma loja virtual completa de moda masculina streetwear construída do zero com Medusa v2,
                    integração de pagamentos via Mercado Pago e frontend de alta performance.
                  </p>
                  <a
                    href="https://vitrinemasculinadtna.com.br/br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                    style={{ color: '#0a0a0a', background: '#ffffff' }}
                  >
                    Visitar Loja
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                <div className={`${styles.meta} project-animate`}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Cliente</span>
                    <span className={styles.metaValue}>Vitrine Masculina DTNA</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Serviço</span>
                    <span className={styles.metaValue}>E-commerce · Backend · Gateway de Pagamento · UI/UX</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Dev & Design</span>
                    <span className={styles.metaValue}>Alex Gonçalves</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Ano</span>
                    <span className={styles.metaValue}>2026</span>
                  </div>
                </div>
              </header>
            </section>

            {/* ── SECTION 01 — A Visão + Laptop Mockup ── */}
            <section ref={laptopWrapperRef} className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>01 — A Plataforma</span>
                <h2>E-commerce de<br/>Alta Performance</h2>
                <p>
                  A <strong>Vitrine Masculina DTNA</strong> precisava de muito mais que uma loja virtual genérica.
                  O projeto exigia uma plataforma capaz de gerenciar catálogo, variações de produtos,
                  estoque em tempo real e um fluxo de checkout otimizado para conversão.
                </p>
                <p>
                  Escolhi o <strong>Medusa v2</strong> como engine de e-commerce headless, construindo toda a
                  arquitetura backend e conectando-a a um frontend Next.js totalmente customizado, com
                  experiência de compra fluida e responsiva.
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
                              src="/projects/vitrine-masculina/fullpage.png"
                              alt="Vitrine Masculina Web Experience"
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
                <h2>Arquitetura<br/>Moderna e Escalável</h2>
                <p>
                  Cada peça do ecossistema foi selecionada para garantir performance, flexibilidade
                  e uma experiência de compra premium para o usuário final.
                </p>
              </div>

              <div className={styles.techGrid}>
                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                  <h3>Medusa v2</h3>
                  <p>Engine de e-commerce headless open-source, oferecendo controle total sobre catálogo, pedidos, variantes e fluxos de checkout.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </div>
                  <h3>Mercado Pago</h3>
                  <p>Integração customizada do gateway de pagamento, desenvolvida inteiramente por mim — suportando Pix, cartão e boleto com checkout transparente.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3>Next.js</h3>
                  <p>Frontend com Server-Side Rendering para SEO impecável, carregamento instantâneo e experiência de navegação ultrarrápida.</p>
                </div>

                <div className={styles.techCard}>
                  <div className={styles.techIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3>PostgreSQL</h3>
                  <p>Banco de dados relacional robusto para gestão de produtos, pedidos e sessões de usuário com integridade referencial.</p>
                </div>
              </div>
            </section>

            {/* ── SECTION 03 — Integração Mercado Pago ── */}
            <section className={`${styles.splitSection} ${styles.splitReverse} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>03 — Gateway de Pagamento</span>
                <h2>Integração Mercado<br/>Pago Customizada</h2>
                <p>
                  O maior desafio técnico do projeto foi a integração completa e customizada do sistema
                  de pagamento do Mercado Pago ao Medusa v2. Desenvolvi do zero o módulo de pagamento,
                  conectando a API do Mercado Pago diretamente ao fluxo de checkout do Medusa.
                </p>
                <p>
                  A implementação suporta <strong>Pix instantâneo</strong>, <strong>cartão de crédito</strong> com
                  parcelamento e <strong>boleto bancário</strong>, tudo com checkout transparente — sem redirecionar
                  o cliente para páginas externas, garantindo uma taxa de conversão muito superior.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/vitrine-masculina/product.png"
                    alt="Página de Produto — Vitrine Masculina"
                    width={1400}
                    height={900}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
            </section>

            {/* ── SECTION 04 — Design Visual ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>04 — Design & UX</span>
                <h2>Interface Premium<br/>para Moda Masculina</h2>
                <p>
                  O design da loja foi inteiramente concebido e implementado por mim, priorizando uma
                  estética premium que reflete o universo streetwear e esporte fino do catálogo. A paleta
                  escura com acentos em rosa antigo transmite sofisticação e masculinidade contemporânea.
                </p>
                <p>
                  A navegação por categorias — Esporte Fino, Streetwear, Casual e Fitness — foi projetada
                  para facilitar a descoberta de produtos e otimizar o tempo de decisão do cliente, com
                  imagens de alta resolução e transições suaves.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/vitrine-masculina/categories.png"
                    alt="Categorias — Vitrine Masculina"
                    width={1400}
                    height={900}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
            </section>

            {/* ── FULL WIDTH SHOWCASE ── */}
            <div className={`${styles.showcase} project-animate`}>
              <Image
                src="/projects/vitrine-masculina/hero.png"
                alt="Apresentação Final — Vitrine Masculina DTNA"
                width={1400}
                height={800}
                onLoad={() => ScrollTrigger.refresh()}
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
