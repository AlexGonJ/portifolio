'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/aline-project.module.scss'

export default function AlineGoncalves() {
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
        <main style={{ backgroundColor: '#F4EFEA', position: 'relative', zIndex: 1 }}>
          <Navbar isProjectPage={true} />

          <div className={styles.projectPage}>

            {/* ── HERO WITH BRANDED BACKGROUND ── */}
            <section className={styles.heroWrapper}>
              <div className={styles.heroBackground}>
                <Image
                  src="/projects/aline.png"
                  alt="Dra. Aline Gonçalves Hero Background"
                  fill
                  priority
                  className={styles.bgImage}
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <div className={styles.heroOverlay}></div>
                
                {/* Visual curve from the business card motif */}
                <svg className={styles.decorativeCurve} viewBox="0 0 900 500" preserveAspectRatio="none">
                  <path d="M0,400 Q450,300 900,400 L900,500 L0,500 Z" />
                </svg>
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>Identidade Visual & Estratégia</p>
                  <h1 className={styles.title}>Dra. Aline<br /><span>Gonçalves</span></h1>
                  <p className={styles.subtitle}>
                    Um sistema de marca premium para Angiologia e Cirurgia Vascular.
                    Estética elegante com curvas anatômicas sutis e uma sólida estratégia de presença digital faceless.
                  </p>
                </div>

                <div className={`${styles.meta} project-animate`}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Cliente</span>
                    <span className={styles.metaValue}>Dra. Aline Gonçalves</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Serviço</span>
                    <span className={styles.metaValue}>Branding · Visual Identity · Instagram Strategy</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Parceria</span>
                    <span className={styles.metaValue}>Lexon Digital</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Ano</span>
                    <span className={styles.metaValue}>2026</span>
                  </div>
                </div>
              </header>
            </section>

            {/* ── SECTION 01 — A Visão (The Vision) ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>01 — A Visão Criativa</span>
                <h2>Fluidez, Precisão<br />e Prestígio</h2>
                <p>
                  O design para profissionais de medicina exige um equilíbrio fino entre o rigor científico e o 
                  acolhimento humano. Para a <strong>Dra. Aline Gonçalves</strong>, médica especialista em angiologia e 
                  estética vascular, desenhamos uma marca que foge do frio clichê hospitalar.
                </p>
                <p>
                  A linha gráfica principal inspira-se no conceito de <strong>fluxo e retorno</strong>. Curvas orgânicas e
                  delicadas representam o retorno circulatório venoso de maneira abstrata e artística. As cores escolhidas — 
                  o tom creme de fundo (que evoca bem-estar e sofisticação), o marrom chocolate (gerando autoridade e solidez) 
                  e os detalhes em bronze e cobre metálico (trazendo modernidade e brilho) — constroem um posicionamento estético premium.
                </p>
              </div>

              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/aline2.png"
                    alt="Dra. Aline Gonçalves Brand Experience"
                    width={1400}
                    height={900}
                    priority
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
            </section>

            {/* ── SECTION 02 — Estratégia de Conteúdo (Faceless Strategy) ── */}
            <section className={styles.strategyShowcase}>
              <div className={styles.container}>
                <div className={`${styles.strategyHeader} project-animate`}>
                  <span className={styles.sectionTag}>02 — Posicionamento Digital</span>
                  <h2>Autoridade Sem Rosto: A Estratégia Faceless</h2>
                  <p>
                    O grande desafio operacional da médica era manter um canal de captação qualificado no Instagram sem a 
                    necessidade de gravar vídeos diários, trends ou expor sua rotina. Criamos uma estratégia focada em 
                    <strong>autoridade visual e informativa</strong>.
                  </p>
                </div>

                <div className={`${styles.strategyGrid} project-animate`}>
                  <div className={styles.strategyCard}>
                    <span className={styles.cardNum}>Método 1</span>
                    <h3>Carrossel Educativo Direcionado</h3>
                    <p>
                      Substituímos dicas genéricas por análises sintomáticas profundas, como o mapa vascular de quem passa 
                      8 horas sentada. Layouts limpos, fontes legíveis e contrastantes que geram salvamento imediato.
                    </p>
                  </div>

                  <div className={styles.strategyCard}>
                    <span className={styles.cardNum}>Método 2</span>
                    <h3>Reels Tipográficos Ritmados</h3>
                    <p>
                      Uso de vídeos de 30-40s com cortes secos de frases impactantes sobre fundo escuro e silêncio ou som lofi. 
                      Foco no mecanismo da dor e varizes, gerando identificação e quebrando o scroll rapidamente.
                    </p>
                  </div>

                  <div className={styles.strategyCard}>
                    <span className={styles.cardNum}>Método 3</span>
                    <h3>Infográficos Editoriais Clean</h3>
                    <p>
                      Diagramação de pernas estilizadas em traços elegantes com setas informativas. Substitui fotos de pós-operatório 
                      expostas por ilustrações limpas dignas de revistas médicas, aumentando a percepção de valor científico.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 03 — Brand Kit & Printed Materials ── */}
            <section className={`${styles.splitSection} ${styles.splitReverse} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>03 — Materiais Físicos</span>
                <h2>Experiência Tátil e Pontos de Contato</h2>
                <p>
                  A consistência da identidade foi levada para o ambiente clínico físico. O cartão de visitas combina a textura 
                  creme suave com o acabamento da curva em verniz cobre localizado, dando profundidade tátil ao toque.
                </p>
                <p>
                  Adicionalmente, as placas de identificação do consultório e do estacionamento seguem a mesma grid limpa, 
                  garantindo que o paciente sinta o mesmo nível de cuidado e profissionalismo desde a entrada da clínica 
                  até a mesa de atendimento.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/projects/PlacaAline.png"
                    alt="Placa de Identificação da Clínica"
                    width={1400}
                    height={900}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
            </section>

            {/* ── BRANDKIT REAL CARDS SHOWCASE ── */}
            <section className={`${styles.brandkitSection} project-animate`}>
              <div className={styles.brandkitHeader}>
                <span className={styles.sectionTag}>Brand Kit Completo</span>
                <h2>Cartões de Visita Reais</h2>
                <p>
                  Abaixo estão os cartões reais desenvolvidos para a Dra. Aline Gonçalves.
                  Fotografias em alta fidelidade que capturam a sofisticação tátil e a identidade cromática.
                </p>
              </div>

              <div className={styles.cardsWrapper}>
                <div className={styles.businessCardContainer}>
                  <span>Frente do Cartão</span>
                  <div className={styles.vectorCard}>
                    <Image
                      src="/projects/cartao_real_frente.png"
                      alt="Cartão de Visita Frente Real"
                      width={900}
                      height={500}
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </div>
                </div>

                <div className={styles.businessCardContainer}>
                  <span>Verso do Cartão</span>
                  <div className={styles.vectorCard}>
                    <Image
                      src="/projects/cartao_real_verso.png"
                      alt="Cartão de Visita Verso Real"
                      width={900}
                      height={500}
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Próximo Projeto</span>
              <Link href="/work/moda-agency" className={styles.nextLink}>
                Moda Agency
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
