'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/via-project.module.scss'

export default function ViaBikeProject() {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlayingVideo1, setIsPlayingVideo1] = useState(false)
  const [isPlayingVideo2, setIsPlayingVideo2] = useState(false)
  const [isPlayingVideo3, setIsPlayingVideo3] = useState(false)

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
        <main style={{ backgroundColor: '#0b0c10', position: 'relative', zIndex: 1 }}>
          <Navbar isProjectPage={true} />

          <div className={styles.projectPage}>

            {/* ── HERO WITH BRANDED BACKGROUND ── */}
            <section className={styles.heroWrapper}>
              <div className={styles.heroBackground}>
                <Image
                  src="/projects/via-bike/logo.png"
                  alt="Via Bike Hero Background"
                  fill
                  priority
                  className={styles.bgImage}
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <div className={styles.heroOverlay}></div>
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>Rebranding & Fachada Comercial</p>
                  <h1 className={styles.title}>Via<br /><span>Bike</span></h1>
                  <p className={styles.subtitle}>
                    Um rebranding completo para revolucionar o posicionamento de uma loja e oficina de ciclismo.
                    Desde a identidade visual moderna até o desenho técnico da fachada e materiais de marketing físico.
                  </p>
                </div>

                <div className={`${styles.meta} project-animate`}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Cliente</span>
                    <span className={styles.metaValue}>Via Bike</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Serviço</span>
                    <span className={styles.metaValue}>Branding · Fachada Comercial · Comunicação Física · Vídeos</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Design Autoral</span>
                    <span className={styles.metaValue}>Alex Gonçalves</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Ano</span>
                    <span className={styles.metaValue}>2026</span>
                  </div>
                </div>
              </header>
            </section>

            {/* ── SECTION 01 — O Rebranding ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>01 — Identidade Visual</span>
                <h2>Sólido, Veloz<br />e Tecnológico</h2>
                <p>
                  O rebranding da <strong>Via Bike</strong> nasceu da necessidade de alinhar a imagem da loja ao alto padrão das bicicletas e serviços que ela comercializa. O logo antigo deu lugar a uma marca construída sobre geometria pura, tipografia moderna de alta legibilidade e um forte contraste.
                </p>
                <p>
                  Criamos um sistema visual clean com tons profundos e acentos esportivos em verde-lima vibrante, simbolizando a energia, o dinamismo do ciclismo de performance e a precisão técnica da oficina mecânica especializada.
                </p>
              </div>

              <div className={styles.splitMedia}>
                <div className={styles.imageFrame} style={{ padding: '40px', background: '#07080b', display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src="/projects/via-bike/logo.png"
                    alt="Via Bike Logo Transparente"
                    width={500}
                    height={250}
                    style={{ objectFit: 'contain', width: '100%', height: 'auto', maxWidth: '350px' }}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
            </section>

            {/* ── SECTION 02 — Fachada da Loja (Storefront Facade) ── */}
            <section className={`${styles.facadeGridSection} project-animate`}>
              <div className={styles.facadeHeader}>
                <span className={styles.sectionTag}>02 — Arquitetura de Marca</span>
                <h2>Fachada Comercial Autoral</h2>
                <p>
                  Projetada e desenhada inteiramente por mim, a nova fachada da Via Bike foi pensada para se destacar na paisagem urbana e comunicar profissionalismo imediatamente. Criei um layout limpo que integra painéis metálicos, sinalização luminosa em LED embutida e uma vitrine ampla e convidativa.
                </p>
              </div>

              <div className={styles.facadeGrid}>
                <div className={styles.facadeCard}>
                  <div className={styles.facadeImageWrapper}>
                    <Image
                      src="/projects/via-bike/fachada.jpeg"
                      alt="Fachada Desenho e Proposta 1"
                      fill
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </div>
                  <div className={styles.facadeCardBody}>
                    <h3>Conceito da Fachada</h3>
                    <p>Visualização 3D da fachada destacando as linhas retas modernas e a distribuição equilibrada dos elementos de marca.</p>
                  </div>
                </div>

                <div className={styles.facadeCard}>
                  <div className={styles.facadeImageWrapper}>
                    <Image
                      src="/projects/via-bike/facade2.png"
                      alt="Detalhes e Ângulo Alternativo da Fachada"
                      fill
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </div>
                  <div className={styles.facadeCardBody}>
                    <h3>Integração Urbana</h3>
                    <p>Estudo cromático de materiais texturizados e iluminação para garantir contraste visual tanto de dia quanto à noite.</p>
                  </div>
                </div>

                <div className={styles.facadeCard}>
                  <div className={styles.facadeImageWrapper}>
                    <Image
                      src="/projects/via-bike/facade3.png"
                      alt="Estudo de Fachada 3"
                      fill
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </div>
                  <div className={styles.facadeCardBody}>
                    <h3>Estudo de Proporções</h3>
                    <p>Posicionamento estratégico do letreiro principal e entrada para melhor fluxo de clientes na calçada.</p>
                  </div>
                </div>

                <div className={styles.facadeCard}>
                  <div className={styles.facadeImageWrapper}>
                    <Image
                      src="/projects/via-bike/frente.JPEG"
                      alt="Fachada Opção Finalizada"
                      fill
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </div>
                  <div className={styles.facadeCardBody}>
                    <h3>Visual Final e Iluminação</h3>
                    <p>Simulação realística de materiais e painéis escuros contrastando com a logo retroiluminada.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 03 — Comunicação Visual & Banners ── */}
            <section className={`${styles.splitSection} ${styles.splitReverse} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>03 — Marketing Físico</span>
                <h2>Sinalização e Materiais de Ponto de Venda</h2>
                <p>
                  A experiência de marca da Via Bike se estende para a calçada e o interior da loja. Desenvolvemos cartazes promocionais, mostruários de serviços de manutenção e placas externas direcionais.
                </p>
                <p>
                  Estes materiais de PDV usam grids rígidos inspirados no ciclismo de estrada e nas montanhas, facilitando a leitura rápida por pedestres e motoristas que passam em frente ao estabelecimento.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/via-bike/poster-stand.png"
                    alt="Banners e Placas Externas da Via Bike"
                    width={1400}
                    height={900}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
            </section>

            {/* ── SECTION 04 — Produção de Vídeos e Reels ── */}
            <section className={styles.videoSection}>
              <div className={styles.videoContainer}>
                <div className={`${styles.videoHeader} project-animate`}>
                  <span className={styles.sectionTag}>04 — Mídia Digital</span>
                  <h2>Produção de Vídeo e Reels de Alta Performance</h2>
                  <p>
                    Com foco no engajamento online do público-alvo, criamos Reels dinâmicos para o Instagram. Estes materiais de vídeo exibem o dia a dia da oficina, montagens customizadas de alta gama e tutoriais úteis de manutenção.
                  </p>
                </div>

                <div className={`${styles.videoGrid} project-animate`}>
                  <div 
                    className={`${styles.videoPlaceholder} ${isPlayingVideo1 ? styles.playing : ''}`}
                    onClick={() => {
                      if (!isPlayingVideo1) setIsPlayingVideo1(true)
                    }}
                  >
                    {isPlayingVideo1 ? (
                      <>
                        <iframe
                          src="https://www.instagram.com/reel/DRNNbeJkXZG/embed"
                          className={styles.videoIframe}
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                        <button 
                          className={styles.closeVideoButton}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsPlayingVideo1(false)
                          }}
                          aria-label="Fechar vídeo"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className={styles.videoBgImage}>
                          <Image
                            src="/projects/via-bike/laptop.jpg"
                            alt="Reels Oficina e Diagnóstico"
                            fill
                          />
                        </div>
                        <div className={styles.videoOverlay}></div>
                        <div className={styles.playButton}>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <div className={styles.videoInfo}>
                          <span>Reels #1</span>
                          <h3>Ações Promocionais: Atração e Engajamento</h3>
                        </div>
                      </>
                    )}
                  </div>

                  <div 
                    className={`${styles.videoPlaceholder} ${isPlayingVideo2 ? styles.playing : ''}`}
                    onClick={() => {
                      if (!isPlayingVideo2) setIsPlayingVideo2(true)
                    }}
                  >
                    {isPlayingVideo2 ? (
                      <>
                        <iframe
                          src="https://www.instagram.com/reel/DY2xnaiRcde/embed"
                          className={styles.videoIframe}
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                        <button 
                          className={styles.closeVideoButton}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsPlayingVideo2(false)
                          }}
                          aria-label="Fechar vídeo"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className={styles.videoBgImage}>
                          <Image
                            src="/projects/via-bike/cap.jpg"
                            alt="Reels Vestuário e Acessórios"
                            fill
                          />
                        </div>
                        <div className={styles.videoOverlay}></div>
                        <div className={styles.playButton}>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <div className={styles.videoInfo}>
                          <span>Reels #2</span>
                          <h3>Merchandising e Acessórios de Performance</h3>
                        </div>
                      </>
                    )}
                  </div>

                  <div 
                    className={`${styles.videoPlaceholder} ${isPlayingVideo3 ? styles.playing : ''}`}
                    onClick={() => {
                      if (!isPlayingVideo3) setIsPlayingVideo3(true)
                    }}
                  >
                    {isPlayingVideo3 ? (
                      <>
                        <iframe
                          src="https://www.instagram.com/reel/C9uqldWAVZC/embed"
                          className={styles.videoIframe}
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                        <button 
                          className={styles.closeVideoButton}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsPlayingVideo3(false)
                          }}
                          aria-label="Fechar vídeo"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className={styles.videoBgImage}>
                          <Image
                            src="/projects/via-bike/mockup.jpg"
                            alt="Reels Campanha Promocional"
                            fill
                          />
                        </div>
                        <div className={styles.videoOverlay}></div>
                        <div className={styles.playButton}>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <div className={styles.videoInfo}>
                          <span>Reels #3</span>
                          <h3>Campanha Promocional: Sertão Via Bike</h3>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ── SHOWCASE ADICIONAL ── */}
            <section className={`${styles.showcase} project-animate`} style={{ marginTop: '8rem' }}>
              <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <span className={styles.sectionTag}>Amostra Gráfica</span>
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: '#ffffff', marginTop: '1rem' }}>Sinalização Interna</h2>
              </div>
              <Image
                src="/projects/via-bike/artboard.png"
                alt="Artboards de sinalização da Via Bike"
                width={1400}
                height={800}
                onLoad={() => ScrollTrigger.refresh()}
              />
            </section>

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
