'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePixelCustomEvent } from '@/hooks/usePixelCustomEvent'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/project-page.module.scss'

export default function DesenvolvimentoPage() {
  const [isLoading, setIsLoading] = useState(true)

  usePixelCustomEvent('ViewDesenvolvimento')

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
        <main style={{ backgroundColor: '#fbfbfd', position: 'relative', zIndex: 1 }}>
          <Navbar isProjectPage={true} />

          <div className={styles.projectPage}>

            {/* ── HERO ── */}
            <section className={styles.heroWrapper} style={{ backgroundColor: '#1a1a1a' }}>
              <div className={styles.heroBackground}>
                <Image src="/projects/work1.png" alt="Desenvolvimento Personalizado" layout="fill" className={styles.bgImage} />
                <div className={styles.heroOverlay} style={{
                  background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.4) 0%, rgba(26, 26, 26, 1) 100%)'
                }}></div>
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>Software & Criação de Sites</p>
                  <h1 className={styles.title}>Software, Sites & <br /><span style={{ color: '#c9a84c' }}>Sistemas Sob Medida</span></h1>
                  <p className={styles.subtitle}>
                    Desenvolvimento de software sob medida, criação de sites profissionais e plataformas web escaláveis. Soluções completas para empresas em Belo Horizonte, Diamantina e todo o Brasil que reduzem custos operacionais e multiplicam faturamento.
                  </p>
                  <a href="/#contato" className={styles.cta}>
                    Solicitar Orçamento
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17 17 7M8.5 7H17v8.5" />
                    </svg>
                  </a>
                </div>
              </header>
            </section>

            {/* ── ERP E CRM ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>Gestão e Automação</span>
                <h2>Sistemas de Gestão<br />(ERP, CRM e Estoque)</h2>
                <p>
                  Desenvolvemos sistemas completos e seguros para gerenciar clientes, finanças, estoque e processos internos da sua empresa. Sem as limitações de ferramentas de prateleira, o sistema é construído <strong>exatamente para o fluxo da sua operação</strong>.
                </p>
                <p>
                  Tenha dashboards personalizados com os dados que realmente importam para o seu negócio, automatize tarefas manuais e tome decisões com base em dados reais, na palma da mão.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  {/* Dashboard / CRM Image */}
                  <Image src="/projects/mockup.jpeg" width={800} height={600} alt="Dashboard de Sistema ERP/CRM" />
                </div>
              </div>
            </section>

            {/* ── E-COMMERCE & APPS ── */}
            <section id="ecommerce" className={`${styles.splitSection} ${styles.splitReverse} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>Vendas em Escala</span>
                <h2>E-commerces Premium<br />e Aplicativos</h2>
                <p>
                  Lojas virtuais que vão além do básico. Criamos experiências de compra sob medida, integradas com seus meios de pagamento e logística, totalmente focadas em conversão.
                </p>
                <p>
                  Para o E-commerce <strong>Vitrine Masculina</strong>, por exemplo, unimos identidade streetwear com performance técnica. Carregamento em milissegundos e um checkout projetado para não perder nenhuma venda.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.imageFrame}>
                  {/* Vitrine Masculina Image */}
                  <Image src="/projects/vitrine-masculina/hero.png" width={800} height={600} alt="E-commerce Vitrine Masculina" />
                </div>
              </div>
            </section>

            {/* ── FULL WIDTH SHOWCASE (AGENDAMENTO) ── */}
            <section className={`${styles.showcase} project-animate`}>
              {/* Lumina Agendamento Image */}
              <Image src="/lumina.png" width={1400} height={700} alt="Sistema de Agendamento Lumina" />
            </section>

            {/* ── VANTAGENS / IMOVEIS ── */}
            <section className={`${styles.splitSection} project-animate`}>
              <div className={styles.splitText}>
                <span className={styles.sectionTag}>O Poder do SEO</span>
                <h2>Tráfego Orgânico<br />e Autoridade</h2>
                <p>
                  SEO (Otimização para Mecanismos de Busca) é estruturar o seu site para ser a melhor resposta no Google. Estar na primeira página significa tráfego qualificado e clientes diários sem pagar por anúncios a cada clique.
                </p>
                <p>
                  Nossos projetos web são construídos com uma arquitetura técnica avançada focada inteiramente em <strong>SEO e Performance</strong>. Desde a estrutura semântica ao tempo de carregamento rápido para garantir a melhor posição orgânica e máxima retenção.
                </p>
              </div>
              <div className={styles.splitMedia}>
                <div className={styles.laptopStage}>
                  <div className={styles.laptopAssembly}>
                    <div className={styles.laptopLid}>
                      <div className={styles.lidBack}><div className={styles.appleLogo}></div></div>
                      <div className={styles.lidScreen}>
                        <div className={styles.laptopScreenInner}>
                          {/* Hinelna Busca Image */}
                          <Image src="/projects/work2.png" width={800} height={600} alt="Sistema de Busca de Imóveis" className={styles.scrollingImage} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.laptopBase}>
                      <div className={styles.baseTop}></div>
                      <div className={styles.baseBottom}></div>
                      <div className={styles.baseFront}></div>
                      <div className={styles.baseBack}></div>
                      <div className={styles.baseLeft}></div>
                      <div className={styles.baseRight}></div>
                      <div className={styles.keyboard}></div>
                      <div className={styles.trackpad}></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Conheça na prática</span>
              <Link href="/work" className={styles.nextLink}>
                Veja nossos Projetos
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
