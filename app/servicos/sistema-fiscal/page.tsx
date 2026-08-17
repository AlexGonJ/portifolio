'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePixelCustomEvent } from '@/hooks/usePixelCustomEvent'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/project-page.module.scss'
import f from '@/styles/fiscal.module.scss'
import { useLanguage } from '@/i18n/LanguageContext'

export default function SistemaFiscalPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  usePixelCustomEvent('ViewSistemaFiscal')

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
            <section className={styles.heroWrapper} style={{ backgroundColor: '#111317' }}>
              <div className={styles.heroBackground}>
                <div className={styles.heroOverlay} style={{
                  background: 'linear-gradient(to bottom, rgba(17, 19, 23, 0.4) 0%, rgba(17, 19, 23, 1) 100%)'
                }}></div>
              </div>

              <header className={styles.hero}>
                <div className={`${styles.heroInner} project-animate`}>
                  <p className={styles.eyebrow}>Serviço · SaaS & Gestão</p>
                  <h1 className={styles.title}>Sistema<br/><span style={{ color: '#c9a84c' }}>Fiscal</span></h1>
                  <p className={styles.subtitle}>
                    Faturamento rápido. Estoque automático. Emissão fiscal sem complicação.
                  </p>
                  <a
                    href="/whatsapp?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Sistema%20Fiscal."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                    style={{ color: '#1a1a1a', background: '#c9a84c' }}
                  >
                    Solicitar Demonstração
                  </a>
                </div>
              </header>
            </section>

            {/* ── STATS BAR — Números de impacto ── */}
            <section className={`${f.statsBar} project-animate`}>
              <div className={f.statItem}>
                <span className={f.statNumber}>90%</span>
                <span className={f.statLabel}>Menos digitação manual no estoque</span>
              </div>
              <div className={f.statItem}>
                <span className={f.statNumber}>3s</span>
                <span className={f.statLabel}>Para emitir uma nota fiscal completa</span>
              </div>
              <div className={f.statItem}>
                <span className={f.statNumber}>100%</span>
                <span className={f.statLabel}>Integrado com a SEFAZ em tempo real</span>
              </div>
              <div className={f.statItem}>
                <span className={f.statNumber}>0</span>
                <span className={f.statLabel}>Erros de cadastros duplicados</span>
              </div>
            </section>

            {/* ── FEATURE STRIP — Hardware + Integrações ── */}
            <section className={`${f.featureStrip} project-animate`}>
              <div className={f.featureStripInner}>
                <div className={f.featureStripItem}>
                  <div className={f.featureStripIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M3 5v14M6 5v14M10 5v14M14 5v14M17 5v14M20 5v14M8 5v14M12 5v14" />
                    </svg>
                  </div>
                  <div className={f.featureStripText}>
                    <h4>Leitor de Código de Barras</h4>
                    <p>Bipe produtos e notas fiscais instantaneamente</p>
                  </div>
                </div>

                <div className={f.featureStripItem}>
                  <div className={f.featureStripIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <rect x="6" y="14" width="12" height="8" />
                    </svg>
                  </div>
                  <div className={f.featureStripText}>
                    <h4>Impressoras Térmicas & Etiquetas</h4>
                    <p>Imprima cupons, comprovantes e etiquetas de preço</p>
                  </div>
                </div>

                <div className={f.featureStripItem}>
                  <div className={f.featureStripIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className={f.featureStripText}>
                    <h4>Certificado Digital A1</h4>
                    <p>Conexão direta com a SEFAZ para buscar notas</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SCREENSHOT 01 — Importação XML ── */}
            <section className={`${f.screenshotSection} project-animate`}>
              <div className={f.screenshotHeader}>
                <span className={styles.sectionTag}>Entrada Automática</span>
                <h2>Bipe a nota. O estoque se atualiza sozinho.</h2>
                <p>
                  Leia o código de barras da DANFE ou faça upload do XML — o sistema cruza produtos similares e alimenta o estoque automaticamente.
                </p>
              </div>
              <div className={f.screenshotFrame}>
                <Image
                  src="/projects/importar-xml.png"
                  alt="Interface de importação de XML — entrada automática de estoque"
                  width={1024}
                  height={499}
                  priority
                />
              </div>
              <p className={f.screenshotCaption}>
                Tela de importação — busca pela DANFE ou upload direto do arquivo XML
              </p>
            </section>

            {/* ── VISUAL SPLIT — Barcode (image + bullets) ── */}
            <section className={`${f.visualSplit} project-animate`}>
              <div className={f.visualSplitImage}>
                <Image
                  src="/projects/fiscal-barcode.png"
                  alt="Lojista utilizando leitor de código de barras"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className={f.visualSplitContent}>
                <h2>Menos trabalho manual.<br/>Mais tempo para vender.</h2>
                <p>O sistema elimina as tarefas repetitivas que consomem horas da sua equipe todos os dias.</p>
                <div className={f.bulletFeatures}>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Estoque alimentado por código de barras ou XML</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Comparação automática com produtos similares</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Sugestão inteligente de margens de lucro</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Zero cadastros duplicados</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SCREENSHOT 02 — Vendas ── */}
            <section className={`${f.screenshotSection} project-animate`}>
              <div className={f.screenshotHeader}>
                <span className={styles.sectionTag}>Controle Comercial</span>
                <h2>Todas as vendas e notas em um só painel.</h2>
                <p>
                  Emita NF-e, NFC-e, NFS-e, etiquetas e cupons não-fiscais. Consulte o histórico completo de produtos, clientes e serviços a qualquer momento.
                </p>
              </div>
              <div className={f.screenshotFrame}>
                <Image
                  src="/projects/vendas.png"
                  alt="Painel de vendas — gestão de notas fiscais e cupons"
                  width={1024}
                  height={498}
                />
              </div>
              <p className={f.screenshotCaption}>
                Painel de vendas — emissão, status fiscal e ações rápidas em um só lugar
              </p>
            </section>

            {/* ── VISUAL SPLIT REVERSE — Gestão + Contador ── */}
            <section className={`${f.visualSplit} ${f.visualSplitReverse} project-animate`}>
              <div className={f.visualSplitImage}>
                <Image
                  src="/projects/fiscal-desk.png"
                  alt="Pessoa organizando documentos fiscais no computador"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className={f.visualSplitContent}>
                <h2>Organização que facilita<br/>o crescimento.</h2>
                <p>Com dados estruturados e acessíveis, sua empresa cresce com previsibilidade e seu contador agradece.</p>
                <div className={f.bulletFeatures}>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Histórico completo de produtos, clientes e serviços</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Envio de XMLs e relatórios para o contador em poucos cliques</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Balanço mensal simplificado e sem retrabalho</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Backup automático diário na nuvem</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CAPABILITIES GRID — Tudo que o sistema faz ── */}
            <section className={`${f.capabilitiesSection} project-animate`}>
              <div className={f.capabilitiesHeader}>
                <h2>Tudo o que seu negócio precisa. Em um só sistema.</h2>
              </div>

              <div className={f.capabilitiesGrid}>
                <div className={f.capCard}>
                  <div className={f.capIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <h3>NF-e & NFC-e</h3>
                  <p>Emissão de notas fiscais de produto e consumidor integrada à SEFAZ</p>
                </div>

                <div className={f.capCard}>
                  <div className={f.capIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    </svg>
                  </div>
                  <h3>NFS-e</h3>
                  <p>Notas fiscais de serviço para prestadores e profissionais liberais</p>
                </div>

                <div className={f.capCard}>
                  <div className={f.capIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <h3>Cupons Sem Valor Fiscal</h3>
                  <p>Orçamentos e controle interno sem burocracia fiscal</p>
                </div>

                <div className={f.capCard}>
                  <div className={f.capIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="2" width="12" height="6" rx="1" />
                      <rect x="6" y="16" width="12" height="6" rx="1" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                    </svg>
                  </div>
                  <h3>Etiquetas de Produto</h3>
                  <p>Impressão de etiquetas com preço, código de barras e descrição</p>
                </div>

                <div className={f.capCard}>
                  <div className={f.capIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3>Gestão de Clientes</h3>
                  <p>Cadastro e histórico de compras de cada cliente</p>
                </div>

                <div className={f.capCard}>
                  <div className={f.capIcon}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="21" x2="4" y2="14" />
                      <line x1="4" y1="10" x2="4" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="3" />
                      <line x1="20" y1="21" x2="20" y2="16" />
                      <line x1="20" y1="12" x2="20" y2="3" />
                      <line x1="1" y1="14" x2="7" y2="14" />
                      <line x1="9" y1="8" x2="15" y2="8" />
                      <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                  </div>
                  <h3>100% Personalizável</h3>
                  <p>Adaptamos o sistema para as regras e fluxos do seu negócio</p>
                </div>
              </div>
            </section>

            {/* ── VISUAL SPLIT — Team + personalização ── */}
            <section className={`${f.visualSplit} project-animate`}>
              <div className={f.visualSplitImage}>
                <Image
                  src="/projects/fiscal-team.png"
                  alt="Equipe trabalhando com organização e produtividade"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className={f.visualSplitContent}>
                <h2>Feito sob medida<br/>para o seu negócio.</h2>
                <p>
                  Não existe negócio igual. Por isso, cada sistema que entregamos é personalizado para atender as suas necessidades específicas — do layout ao fluxo de operações.
                </p>
                <div className={f.bulletFeatures}>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Fluxos de trabalho adaptados à sua operação</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Interface e relatórios customizados</span>
                  </div>
                  <div className={f.bulletItem}>
                    <span className={f.bulletCheck}>
                      <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className={f.bulletText}>Suporte dedicado e treinamento da equipe</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className={`${f.ctaBanner} project-animate`}>
              <div className={f.ctaBannerInner}>
                <h2>Pronto para simplificar sua gestão fiscal?</h2>
                <p>
                  Solicite uma demonstração gratuita e veja como o sistema pode transformar a rotina do seu negócio em minutos.
                </p>
                <a
                  href="/whatsapp?text=Ol%C3%A1!%20Gostaria%20de%20uma%20demonstra%C3%A7%C3%A3o%20do%20Sistema%20Fiscal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={f.ctaButton}
                >
                  Quero uma Demonstração
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </section>

            {/* ── NEXT PROJECT ── */}
            <section className={styles.nextProject}>
              <span className={styles.nextLabel}>Outro Serviço</span>
              <Link href="/servicos/chatbots" className={styles.nextLink}>
                Chatbots Inteligentes
              </Link>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
