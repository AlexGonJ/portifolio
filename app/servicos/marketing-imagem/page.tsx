'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import styles from '@/styles/marketing-imagem.module.scss'
import { useLanguage } from '@/i18n/LanguageContext'

interface ServiceItem {
  id: string
  namePt: string
  nameEn: string
  descPt: string
  descEn: string
  pricePt: string
  priceEn: string
  priceVal: number
  deliverablesPt: string[]
  deliverablesEn: string[]
  canHaveQty?: boolean
  disabled?: boolean
}

const SERVICES_DATA: { [category: string]: ServiceItem[] } = {
  branding: [
    {
      id: 'logo_avulso',
      namePt: 'Logotipo Avulso',
      nameEn: 'Standalone Logo',
      descPt: 'Criação de logotipo principal, variações e submarca em alta definição.',
      descEn: 'Creation of the primary logo, variations, and sub-marks in high definition.',
      pricePt: '350',
      priceEn: '100',
      priceVal: 350,
      deliverablesPt: ['Logo principal e secundária', 'Formatos PNG, SVG e EPS', 'Versões monocromáticas'],
      deliverablesEn: ['Primary and secondary logo', 'PNG, SVG, and EPS formats', 'Monochromatic versions']
    },
    {
      id: 'identidade_completa',
      namePt: 'Identidade Visual Completa',
      nameEn: 'Full Visual Identity',
      descPt: 'Branding profissional com logo, paleta de cores, tipografia, manual da marca e mockups 3D.',
      descEn: 'Professional branding with logo, color palette, typography, brand manual, and 3D mockups.',
      pricePt: '1.200',
      priceEn: '320',
      priceVal: 1200,
      deliverablesPt: ['Manual de Identidade Visual', 'Tipografia & Paleta HSL', 'Aplicações em Papelaria/Banners', 'Mockups realistas de apresentação'],
      deliverablesEn: ['Visual Identity Manual', 'Typography & HSL Palette', 'Stationery/Banner designs', 'Realistic presentation mockups']
    },
    {
      id: 'rebranding',
      namePt: 'Rebranding (Redesign de Marca)',
      nameEn: 'Rebranding (Brand Redesign)',
      descPt: 'Modernização completa de marca existente para reposicionamento premium no mercado.',
      descEn: 'Complete modernization of an existing brand for premium market repositioning.',
      pricePt: '1.000',
      priceEn: '270',
      priceVal: 1000,
      deliverablesPt: ['Redesenho do logotipo', 'Atualização do ecossistema visual', 'Estratégia de reposicionamento', 'Guia de transição de marca'],
      deliverablesEn: ['Logo redesign', 'Visual ecosystem update', 'Repositioning strategy', 'Brand transition guide']
    },
    {
      id: 'vetorizacao_logo',
      namePt: 'Vetorização de Logos',
      nameEn: 'Logo Vectorization',
      descPt: 'Conversão de logotipos antigos ou em baixa resolução (JPG/PNG) em vetor profissional editável e infinitamente escalável.',
      descEn: 'Conversion of low-res or old logos (JPG/PNG) into a professional, editable, and infinitely scalable vector.',
      pricePt: '140',
      priceEn: '35',
      priceVal: 140,
      deliverablesPt: ['Arquivos em SVG, EPS, PDF e AI', 'PNG em alta resolução com fundo transparente', 'Vetorização manual em alta precisão'],
      deliverablesEn: ['SVG, EPS, PDF, and AI vector files', 'High-res PNG with transparent background', 'High-precision manual vectorization']
    },
    {
      id: 'cartao_digital',
      namePt: 'Criação de Cartão Digital Interativo',
      nameEn: 'Interactive Digital Business Card',
      descPt: 'Cartão de visitas virtual em PDF interativo com botões clicáveis para WhatsApp, redes sociais, localização e site.',
      descEn: 'Virtual business card in interactive PDF with clickable buttons for WhatsApp, social media, map location, and site.',
      pricePt: '150',
      priceEn: '40',
      priceVal: 150,
      deliverablesPt: ['PDF Interativo com botões com link', 'Arquivo vCard para salvamento direto nos contatos', 'Layout moderno otimizado para celulares'],
      deliverablesEn: ['Interactive PDF with link buttons', 'vCard file for direct smartphone save', 'Modern mobile-optimized layout']
    }
  ],
  social: [
    {
      id: 'arte_individual',
      namePt: 'Arte Individual (Feed/Story)',
      nameEn: 'Single Art Post (Feed/Story)',
      descPt: 'Arte customizada para Instagram em alta definição.',
      descEn: 'Custom art post for Instagram in high definition.',
      pricePt: '60',
      priceEn: '15',
      priceVal: 60,
      deliverablesPt: ['Design da arte', 'Copywriting/Legenda básica', 'Formatação para Feed ou Story'],
      deliverablesEn: ['Art design', 'Basic copywriting/caption', 'Format optimized for Feed or Story'],
      canHaveQty: true
    },
    {
      id: 'pack_artes',
      namePt: 'Pack 10 Artes Instagram',
      nameEn: 'Pack of 10 Instagram Arts',
      descPt: 'Pacote com 10 artes harmônicas com identidade visual alinhada e foco em conversão.',
      descEn: 'Pack of 10 harmonious art posts with aligned visual identity and focus on conversion.',
      pricePt: '500',
      priceEn: '130',
      priceVal: 500,
      deliverablesPt: ['10 designs exclusivos', 'Legendas otimizadas para engajamento', 'Sugestões de hashtags estratégicas', 'Grade de agendamento inclusa'],
      deliverablesEn: ['10 exclusive designs', 'Captions optimized for engagement', 'Strategic hashtag suggestions', 'Scheduling grid included'],
      canHaveQty: true
    },
    {
      id: 'templates_canva',
      namePt: 'Templates Editáveis (Canva)',
      nameEn: 'Editable Templates (Canva)',
      descPt: 'Kit de templates profissionais no Canva para que você mesmo crie suas postagens rapidamente.',
      descEn: 'Kit of professional Canva templates so you can easily create your posts on your own.',
      pricePt: '350',
      priceEn: '90',
      priceVal: 350,
      deliverablesPt: ['8 a 12 templates no Canva', 'Organização de fontes e cores do kit', 'Vídeo rápido de instrução/tutoriais'],
      deliverablesEn: ['8 to 12 templates in Canva', 'Setup of brand fonts & colors in the kit', 'Quick instruction video/tutorials']
    },
    {
      id: 'criativos_trafego',
      namePt: 'Criativos de Tráfego Pago (Anúncios)',
      nameEn: 'Paid Traffic Creatives (Ads)',
      descPt: 'Artes em formato estático ou carrossel com gatilhos mentais fortes para campanhas no Facebook/Google Ads.',
      descEn: 'Arts in static or carousel format with strong triggers for Facebook/Google Ads campaigns.',
      pricePt: '80',
      priceEn: '20',
      priceVal: 80,
      deliverablesPt: ['Artes de alta conversão', 'Design focado no Botão de Ação (CTA)', 'Testes A/B (diferentes chamadas)'],
      deliverablesEn: ['High-converting designs', 'Design focused on the Call to Action (CTA)', 'A/B testing layouts (different copy)'],
      canHaveQty: true
    },
    {
      id: 'criacao_linktree',
      namePt: 'Criação de Linktree / Biolink',
      nameEn: 'Linktree / Biolink Creation',
      descPt: 'Estruturação e design de página personalizada de links para a bio do Instagram e TikTok.',
      descEn: 'Custom link page design and setup for Instagram and TikTok bio.',
      pricePt: '200',
      priceEn: '50',
      priceVal: 200,
      deliverablesPt: ['Layout personalizado com a identidade da marca', 'Configuração de até 8 botões de destaque', 'Integração com WhatsApp e redes sociais'],
      deliverablesEn: ['Custom layout with brand visual identity', 'Setup of up to 8 highlighted buttons', 'WhatsApp and social media integration']
    }
  ],
  audiovisual: [
    {
      id: 'edicao_reels',
      namePt: 'Edição de Reels/TikTok/Shorts',
      nameEn: 'Reels/TikTok/Shorts Video Editing',
      descPt: 'Edição dinâmica (até 1 min) com cortes, legendas animadas, efeitos de som e trilha.',
      descEn: 'Dynamic video editing (up to 1 min) with cuts, animated subtitles, sound effects, and music.',
      pricePt: '120',
      priceEn: '30',
      priceVal: 120,
      deliverablesPt: ['Edição e cortes profissionais', 'Legendas automáticas dinâmicas', 'Efeitos sonoros e sonoplastia', 'Color grading básico'],
      deliverablesEn: ['Professional editing and cuts', 'Dynamic auto-subtitles', 'Sound effects & mixing', 'Basic color grading'],
      canHaveQty: true
    },
    {
      id: 'pacote_mensal_videos',
      namePt: 'Pacote Mensal (10 Vídeos Reels)',
      nameEn: 'Monthly Video Pack (10 Reels)',
      descPt: 'Edição de 10 vídeos curtos por mês. Você grava e nós transformamos em vídeos profissionais.',
      descEn: 'Editing of 10 short videos per month. You record them, and we turn them professional.',
      pricePt: '900',
      priceEn: '225',
      priceVal: 900,
      deliverablesPt: ['10 Edições completas', 'Roteirização e ideias de conteúdo', 'Legendas dinâmicas em todos', 'Prazo de entrega agendado'],
      deliverablesEn: ['10 Full edits', 'Scriptwriting and content concepts', 'Dynamic subtitles on all videos', 'Scheduled delivery dates']
    },
    {
      id: 'captacao_diaria',
      namePt: 'Gravação e Direção de Vídeo (até 4h)',
      nameEn: 'Video Shoot & Creative Direction (up to 4h)',
      descPt: 'Sessão de gravação presencial ou assessoria remota guiada para captação profissional (valor referente a até 4h).',
      descEn: 'On-site video shooting or guided remote support for professional video capture (rate for up to 4h session).',
      pricePt: '500 / 4h',
      priceEn: '130 / 4h',
      priceVal: 500,
      deliverablesPt: ['Até 4 horas de captação presencial/remota', 'Equipamento de câmera e iluminação profissional', 'Captação de áudio limpo com microfone lapela', 'Direção de cena, postura e enquadramento'],
      deliverablesEn: ['Up to 4 hours of video shoot session', 'Professional camera and lighting setup', 'Clean lapel mic audio recording', 'Scene, posture, and framing direction']
    },
    {
      id: 'gravacao_video_bruto',
      namePt: 'Gravação de Vídeo Bruto',
      nameEn: 'Raw Video Recording',
      descPt: 'Captação presencial de tomadas e cenas em vídeo sem edição para uso posterior da sua equipe.',
      descEn: 'On-site raw video capture of unedited footage for your team to use later.',
      pricePt: '350',
      priceEn: '90',
      priceVal: 350,
      deliverablesPt: ['Captação em 4K / 60fps', 'Entrega de todos os arquivos brutos na nuvem', 'Iluminação básica inclusa', 'Disponível por sessão de 2h (quantidade customizável)'],
      deliverablesEn: ['4K / 60fps video capture', 'Cloud delivery of all raw video files', 'Basic lighting included', 'Rate per 2h session (customizable quantity)'],
      canHaveQty: true
    },
    {
      id: 'video_institucional',
      namePt: 'Vídeo Institucional / Comercial',
      nameEn: 'Institutional / Promo Video',
      descPt: 'Produção completa de vídeo para apresentação corporativa, site ou anúncios premium.',
      descEn: 'Full video production for corporate presentation, website, or premium ads.',
      pricePt: '1.500',
      priceEn: '400',
      priceVal: 1500,
      deliverablesPt: ['Roteiro profissional', 'Locução profissional inclusa', 'Edição cinematográfica e trilha sonora licenciada', 'Formatos widescreen e vertical'],
      deliverablesEn: ['Professional script', 'Professional voiceover included', 'Cinematic editing & licensed soundtrack', 'Widescreen and vertical formats'],
      disabled: true
    }
  ],
  visual: [
    {
      id: 'fachada_3d',
      namePt: 'Layout de Fachada 3D',
      nameEn: '3D Storefront/Facade Layout',
      descPt: 'Design realista em 3D da fachada da sua empresa física para visualização prévia.',
      descEn: 'Realistic 3D design of your physical storefront for previewing before build.',
      pricePt: '500',
      priceEn: '130',
      priceVal: 500,
      deliverablesPt: ['Imagens renderizadas em 3D de alta qualidade', 'Medidas estimadas e especificações', 'Arquivo vetorizado para a serralheria/luminoso'],
      deliverablesEn: ['High-quality rendered 3D images', 'Estimated measurements and specifications', 'Vector files for signage/hardware shop']
    },
    {
      id: 'arte_placa',
      namePt: 'Arte para Placas & Painéis',
      nameEn: 'Signage & Board Design',
      descPt: 'Criação de arte em grandes formatos para outdoors, painéis internos ou placas luminosas.',
      descEn: 'Design of large formats for billboards, indoor panels, or light boards.',
      pricePt: '250',
      priceEn: '70',
      priceVal: 250,
      deliverablesPt: ['Vetor em escala real (PDF/Corel/Illustrator)', 'Simulação digital no local', 'Gabarito de furação se necessário'],
      deliverablesEn: ['Full-scale vector file (PDF/Corel/Illustrator)', 'Digital mockups in place', 'Drilling templates if needed']
    },
    {
      id: 'camisa_uniforme',
      namePt: 'Design de Camisetas & Uniformes',
      nameEn: 'T-shirt & Uniform Design',
      descPt: 'Design de estampas, uniformes corporativos ou camisetas promocionais.',
      descEn: 'Design of prints, corporate uniforms, or promotional t-shirts.',
      pricePt: '180',
      priceEn: '50',
      priceVal: 180,
      deliverablesPt: ['Ficha técnica de tecidos e estampas', 'Vetor final para estamparia (silkscreen/sublimação)', 'Mockups de visualização em modelos'],
      deliverablesEn: ['Technical sheet of fabrics and printing method', 'Final vector for screenprinting/sublimation', 'Visualization mockups on models']
    },
    {
      id: 'adesivo_vitrine',
      namePt: 'Adesivagem de Vitrines & Envelopamento',
      nameEn: 'Window Decals & Vehicle Wraps',
      descPt: 'Design completo de adesivos decorativos, vitrines temáticas ou envelopamento de frotas.',
      descEn: 'Full design of decorative stickers, themed storefront glass, or vehicle wrapping.',
      pricePt: '300',
      priceEn: '80',
      priceVal: 300,
      deliverablesPt: ['Layout de plotagem em tamanho real', 'Indicação de tipo de vinil (fosco/brilho/perfurado)', 'Mockup de simulação do veículo/vidro'],
      deliverablesEn: ['Real-size plotting layout', 'Indication of vinyl type (matte/gloss/perforated)', 'Simulation mockup of vehicle/glass']
    },
    {
      id: 'cartao_fisico',
      namePt: 'Criação de Cartão de Visitas Físico',
      nameEn: 'Physical Business Card Design',
      descPt: 'Design profissional frente e verso para cartão de visitas físico pronto para impressão gráfica.',
      descEn: 'Professional front and back physical business card design ready for print.',
      pricePt: '150',
      priceEn: '40',
      priceVal: 150,
      deliverablesPt: ['Design frente e verso exclusivo', 'Arquivo vetorizado em alta definição (PDF/X-1a e AI)', 'Sangria e marcação de corte gráfica', 'Mockup 3D de apresentação'],
      deliverablesEn: ['Exclusive front & back design', 'High-definition vector files (PDF/X-1a & AI)', 'Print bleed and crop mark setup', '3D presentation mockup']
    },
    {
      id: 'banners_hd',
      namePt: 'Criação de Banners em Alta Definição',
      nameEn: 'High-Definition Banner Creation',
      descPt: 'Design de banners em alta definição para sites, e-commerce, feiras ou impressão gráfica.',
      descEn: 'High-definition banner design for websites, e-commerce, trade shows, or print graphics.',
      pricePt: '120',
      priceEn: '30',
      priceVal: 120,
      deliverablesPt: ['Arte em altíssima resolução (PNG, SVG, PDF)', 'Dimensões e proporções personalizadas', 'Layout otimizado para chamada de ação (CTA)'],
      deliverablesEn: ['Ultra-high resolution graphic (PNG, SVG, PDF)', 'Custom dimensions and ratios', 'Layout optimized for Call to Action (CTA)'],
      canHaveQty: true
    }
  ]
}

const WHATSAPP_PHONE = '5538999023012'

export default function MarketingImagemPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { t, lang } = useLanguage()

  // State for the simulator
  const [selections, setSelections] = useState<{ [id: string]: { selected: boolean; qty: number } }>({})
  const [showNoticeModal, setShowNoticeModal] = useState(false)

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

  // Initialize selections state
  useEffect(() => {
    const initial: typeof selections = {}
    Object.values(SERVICES_DATA).forEach((categoryItems) => {
      categoryItems.forEach((item) => {
        if (!item.disabled) {
          initial[item.id] = { selected: false, qty: 1 }
        }
      })
    })
    setSelections(initial)
  }, [])

  const handleToggleSelect = (id: string) => {
    setSelections((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selected: !prev[id]?.selected
      }
    }))
  }

  const handleQtyChange = (id: string, delta: number) => {
    setSelections((prev) => {
      const currentQty = prev[id]?.qty || 1
      const nextQty = Math.max(1, currentQty + delta)
      return {
        ...prev,
        [id]: {
          ...prev[id],
          qty: nextQty,
          selected: true // Auto select if quantity is interacted with
        }
      }
    })
  }

  // Find service by ID helper
  const findServiceById = (id: string): ServiceItem | undefined => {
    for (const items of Object.values(SERVICES_DATA)) {
      const found = items.find((it) => it.id === id)
      if (found) return found
    }
    return undefined
  }

  // Calculate totals
  const getSelectedItems = () => {
    return Object.entries(selections)
      .filter(([_, value]) => value.selected)
      .map(([id, value]) => {
        const item = findServiceById(id)
        return {
          id,
          qty: value.qty,
          item
        }
      })
      .filter((entry) => entry.item !== undefined) as { id: string; qty: number; item: ServiceItem }[]
  }

  const calculateTotal = () => {
    return getSelectedItems().reduce((sum, item) => {
      return sum + item.item.priceVal * item.qty
    }, 0)
  }

  const formatPrice = (value: number) => {
    if (lang === 'pt') {
      return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    } else {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    }
  }

  const handleSendWhatsApp = () => {
    const selected = getSelectedItems()
    if (selected.length === 0) return

    let message = ''
    if (lang === 'pt') {
      message = 'Olá Alex! Montei um pacote de serviços personalizados pelo simulador do seu site:\n\n'
      selected.forEach((entry) => {
        const name = entry.item.namePt
        const qtyStr = entry.item.canHaveQty ? ` (${entry.qty}x)` : ''
        const priceStr = formatPrice(entry.item.priceVal * entry.qty)
        message += `• ${name}${qtyStr}: ${priceStr}\n`
      })
      message += `\n*Total Estimado: ${formatPrice(calculateTotal())}*\n\nComo podemos prosseguir com o agendamento?`
    } else {
      message = 'Hello Alex! I set up a custom package of services from your website simulator:\n\n'
      selected.forEach((entry) => {
        const name = entry.item.nameEn
        const qtyStr = entry.item.canHaveQty ? ` (${entry.qty}x)` : ''
        const priceStr = formatPrice(entry.item.priceVal * entry.qty)
        message += `• ${name}${qtyStr}: ${priceStr}\n`
      })
      message += `\n*Estimated Total: ${formatPrice(calculateTotal())}*\n\nHow can we proceed with the project?`
    }

    const encodedText = encodeURIComponent(message)
    const url = `/whatsapp?text=${encodedText}`
    window.open(url, '_blank')
  }

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main className={styles.marketingPage}>
          <Navbar isProjectPage={true} />

          {/* ── HERO ── */}
          <section className={styles.heroWrapper}>
            <div className={styles.heroBackground} />
            <div className={styles.heroOverlay} />

            <header className={styles.hero}>
              <div className={`${styles.heroInner} project-animate`}>
                <Link href="/#servicos" className={styles.backButton}>
                  <svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  {lang === 'pt' ? 'Voltar para Serviços' : 'Back to Services'}
                </Link>
                <p className={styles.eyebrow}>
                  {lang === 'pt' ? 'Design, Imagem & Posicionamento' : 'Design, Image & Positioning'}
                </p>
                <h1 className={styles.title}>
                  {lang === 'pt' ? 'Serviços de' : 'Marketing &'}
                  <br />
                  <span style={{ color: '#c9a84c' }}>
                    {lang === 'pt' ? 'Marketing & Imagem' : 'Image Services'}
                  </span>
                </h1>
                <p className={styles.subtitle}>
                  {lang === 'pt'
                    ? 'Identidade visual, branding completo, vídeos de alta conversão, criativos e comunicação visual física em um único local para impulsionar suas vendas.'
                    : 'Visual identity, full branding, high-converting videos, social media design, and physical signage in a single place to boost your business sales.'}
                </p>
                <a href="#simulador" className={styles.heroCta}>
                  {lang === 'pt' ? 'Simular Orçamento' : 'Estimate Budget'}
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M8.5 7H17v8.5" />
                  </svg>
                </a>
              </div>
            </header>
          </section>

          {/* ── INTRO ── */}
          <section className={`${styles.introSection} project-animate`}>
            <h2>
              {lang === 'pt'
                ? 'Design não é luxo, é posicionamento.'
                : 'Design is not a luxury, it is positioning.'}
            </h2>
            <p>
              {lang === 'pt'
                ? 'Deixe de parecer amador. O mercado paga mais caro para marcas que aparentam ser premium. Oferecemos todo o suporte estético e visual para que seu negócio — seja ele digital ou físico — se destaque da concorrência e gere mais desejo no seu cliente ideal.'
                : "Stop looking amateur. The market pays more for brands that look premium. We provide full aesthetic and visual support so that your business — whether physical or digital — stands out from the competition and builds desire for your ideal client."}
            </p>
          </section>

          {/* ── PRICING TABLES ── */}
          <section className={styles.pricingSection}>
            {/* BRANDING */}
            <div id="branding" className={`${styles.categoryBlock} project-animate`}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className={styles.categoryTitle}>
                  <h3>{lang === 'pt' ? 'Branding & Logotipo' : 'Branding & Logo'}</h3>
                  <p>
                    {lang === 'pt'
                      ? 'Fundação visual e conceitual para dar autoridade ao seu negócio.'
                      : 'Visual and conceptual foundation to give authority to your business.'}
                  </p>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.priceTable}>
                  <thead>
                    <tr>
                      <th>{lang === 'pt' ? 'Serviço' : 'Service'}</th>
                      <th>{lang === 'pt' ? 'Preço' : 'Price'}</th>
                      <th>{lang === 'pt' ? 'Entregáveis' : 'Deliverables'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES_DATA.branding.filter((item) => !item.disabled).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className={styles.serviceName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                          <div className={styles.serviceDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                        </td>
                        <td>
                          <div className={styles.servicePrice}>
                            <span className={styles.priceStarting}>{lang === 'pt' ? 'A partir de' : 'From'}</span>
                            {lang === 'pt' ? `R$ ${item.pricePt}` : `$${item.priceEn}`}
                          </div>
                        </td>
                        <td className={styles.serviceDeliverable}>
                          <ul>
                            {(lang === 'pt' ? item.deliverablesPt : item.deliverablesEn).map((deliv, index) => (
                              <li key={index}>{deliv}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div id="social-media" className={`${styles.categoryBlock} project-animate`}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
                  </svg>
                </div>
                <div className={styles.categoryTitle}>
                  <h3>{lang === 'pt' ? 'Redes Sociais & Design Digital' : 'Social Media & Digital Design'}</h3>
                  <p>
                    {lang === 'pt'
                      ? 'Artes e criativos que fazem o cliente parar o scroll e engajar.'
                      : 'Arts and creatives that make clients stop scrolling and engage.'}
                  </p>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.priceTable}>
                  <thead>
                    <tr>
                      <th>{lang === 'pt' ? 'Serviço' : 'Service'}</th>
                      <th>{lang === 'pt' ? 'Preço' : 'Price'}</th>
                      <th>{lang === 'pt' ? 'Entregáveis' : 'Deliverables'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES_DATA.social.filter((item) => !item.disabled).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className={styles.serviceName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                          <div className={styles.serviceDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                        </td>
                        <td>
                          <div className={styles.servicePrice}>
                            <span className={styles.priceStarting}>{lang === 'pt' ? 'A partir de' : 'From'}</span>
                            {lang === 'pt' ? `R$ ${item.pricePt}` : `$${item.priceEn}`}
                          </div>
                        </td>
                        <td className={styles.serviceDeliverable}>
                          <ul>
                            {(lang === 'pt' ? item.deliverablesPt : item.deliverablesEn).map((deliv, index) => (
                              <li key={index}>{deliv}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AUDIOVISUAL */}
            <div id="audiovisual" className={`${styles.categoryBlock} project-animate`}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <svg viewBox="0 0 24 24">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <div className={styles.categoryTitle}>
                  <h3>{lang === 'pt' ? 'Produção Audiovisual & Vídeos' : 'Audiovisual & Video Production'}</h3>
                  <p>
                    {lang === 'pt'
                      ? 'Edição de vídeos dinâmicos de alta retenção e captação profissional.'
                      : 'Dynamic high-retention video editing and professional capture.'}
                  </p>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.priceTable}>
                  <thead>
                    <tr>
                      <th>{lang === 'pt' ? 'Serviço' : 'Service'}</th>
                      <th>{lang === 'pt' ? 'Preço' : 'Price'}</th>
                      <th>{lang === 'pt' ? 'Entregáveis' : 'Deliverables'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES_DATA.audiovisual.filter((item) => !item.disabled).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className={styles.serviceName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                          <div className={styles.serviceDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                        </td>
                        <td>
                          <div className={styles.servicePrice}>
                            <span className={styles.priceStarting}>{lang === 'pt' ? 'A partir de' : 'From'}</span>
                            {lang === 'pt' ? `R$ ${item.pricePt}` : `$${item.priceEn}`}
                          </div>
                        </td>
                        <td className={styles.serviceDeliverable}>
                          <ul>
                            {(lang === 'pt' ? item.deliverablesPt : item.deliverablesEn).map((deliv, index) => (
                              <li key={index}>{deliv}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* COMUNICAÇÃO VISUAL */}
            <div id="comunicacao-visual" className={`${styles.categoryBlock} project-animate`}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <rect x="7" y="7" width="3" height="9" />
                    <path d="M14 7h3M14 11h3M14 15h3" />
                  </svg>
                </div>
                <div className={styles.categoryTitle}>
                  <h3>{lang === 'pt' ? 'Comunicação Visual & Impressos' : 'Visual Communication & Prints'}</h3>
                  <p>
                    {lang === 'pt'
                      ? 'Projetos de fachadas 3D, placas corporativas, camisetas e envelopamento físico.'
                      : 'Designs for 3D storefronts, corporate signs, t-shirts, and physical wrapping.'}
                  </p>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.priceTable}>
                  <thead>
                    <tr>
                      <th>{lang === 'pt' ? 'Serviço' : 'Service'}</th>
                      <th>{lang === 'pt' ? 'Preço' : 'Price'}</th>
                      <th>{lang === 'pt' ? 'Entregáveis' : 'Deliverables'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES_DATA.visual.filter((item) => !item.disabled).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className={styles.serviceName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                          <div className={styles.serviceDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                        </td>
                        <td>
                          <div className={styles.servicePrice}>
                            <span className={styles.priceStarting}>{lang === 'pt' ? 'A partir de' : 'From'}</span>
                            {lang === 'pt' ? `R$ ${item.pricePt}` : `$${item.priceEn}`}
                          </div>
                        </td>
                        <td className={styles.serviceDeliverable}>
                          <ul>
                            {(lang === 'pt' ? item.deliverablesPt : item.deliverablesEn).map((deliv, index) => (
                              <li key={index}>{deliv}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── PACKAGES / COMBOS ── */}
          <section id="pacotes" className={styles.packagesWrapper}>
            <div className={styles.packagesInner}>
              <div className={styles.packagesHeader}>
                <span>{lang === 'pt' ? 'Combos Especiais' : 'Special Combos'}</span>
                <h2>{lang === 'pt' ? 'Pacotes de Marketing Prontos' : 'Ready-to-Go Marketing Packs'}</h2>
                <p>
                  {lang === 'pt'
                    ? 'Combine soluções essenciais para economizar e acelerar sua presença digital e física.'
                    : 'Combine essential services to save money and accelerate your physical and digital presence.'}
                </p>
              </div>

              <div className={styles.packagesGrid}>
                {/* COMBO 1 */}
                <div className={styles.packageCard}>
                  <div className={styles.packHeader}>
                    <h3>{lang === 'pt' ? 'Combo Start-up' : 'Start-up Combo'}</h3>
                    <p>
                      {lang === 'pt'
                        ? 'Ideal para novas marcas digitais estabelecerem uma identidade profissional.'
                        : 'Ideal for new digital brands setting up their professional identity.'}
                    </p>
                  </div>
                  <div className={styles.packPrice}>
                    <div className={styles.amount}>
                      {lang === 'pt' ? 'R$ 1.300' : '$350'}
                    </div>
                    <div className={styles.period}>{lang === 'pt' ? 'Pagamento único' : 'Single payment'}</div>
                  </div>
                  <ul className={styles.packFeatures}>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Identidade Visual Completa' : 'Full Visual Identity Manual'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Identidade do Feed (Templates Canva)' : 'Feed Identity (Canva templates)'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? '4 Artes Prontas para Postagem' : '4 Finished Post Designs'}
                    </li>
                  </ul>
                  <a
                    href={`/whatsapp?text=${encodeURIComponent(
                      lang === 'pt'
                        ? 'Olá Alex! Gostaria de saber mais sobre o Combo Start-up de R$ 1.300.'
                        : 'Hi Alex! I would like to know more about the Start-up Combo ($350).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.packCta}
                  >
                    {lang === 'pt' ? 'Escolher Start-up' : 'Choose Start-up'}
                  </a>
                </div>

                {/* COMBO 2 */}
                <div className={`${styles.packageCard} ${styles.featured}`}>
                  <span className={styles.badge}>{lang === 'pt' ? 'Mais Vendido' : 'Best Seller'}</span>
                  <div className={styles.packHeader}>
                    <h3>{lang === 'pt' ? 'Combo Creator' : 'Creator Combo'}</h3>
                    <p>
                      {lang === 'pt'
                        ? 'Foque em postar e nós cuidamos da edição estratégica de retenção.'
                        : 'Focus on recording content while we do the retention-focused editing.'}
                    </p>
                  </div>
                  <div className={styles.packPrice}>
                    <div className={styles.amount}>
                      {lang === 'pt' ? 'R$ 1.450' : '$390'}
                      <span>{lang === 'pt' ? '/mês' : '/mo'}</span>
                    </div>
                    <div className={styles.period}>{lang === 'pt' ? 'Assinatura Mensal' : 'Monthly Subscription'}</div>
                  </div>
                  <ul className={styles.packFeatures}>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Pacote Mensal de 10 Reels Editados' : 'Monthly Pack of 10 Edited Reels'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Roteirização básica & Idéias de vídeo' : 'Basic scripting & video ideas'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? '6 Banners/Artes de Tráfego ou Reels Cover' : '6 Ads Graphics or Reels Covers'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Suporte estratégico via WhatsApp' : 'Strategic Support via WhatsApp'}
                    </li>
                  </ul>
                  <a
                    href={`/whatsapp?text=${encodeURIComponent(
                      lang === 'pt'
                        ? 'Olá Alex! Gostaria de assinar o Combo Creator de R$ 1.450/mês.'
                        : 'Hi Alex! I would like to subscribe to the Creator Combo ($390/month).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.packCta} ${styles.featuredCta}`}
                  >
                    {lang === 'pt' ? 'Assinar Combo Creator' : 'Subscribe Creator'}
                  </a>
                </div>

                {/* COMBO 3 */}
                <div className={styles.packageCard}>
                  <div className={styles.packHeader}>
                    <h3>{lang === 'pt' ? 'Combo Presença Física' : 'Physical Brand Combo'}</h3>
                    <p>
                      {lang === 'pt'
                        ? 'Para estabelecimentos comerciais que buscam impacto local imediato.'
                        : 'For retail stores looking for immediate local visual impact.'}
                    </p>
                  </div>
                  <div className={styles.packPrice}>
                    <div className={styles.amount}>
                      {lang === 'pt' ? 'R$ 2.900' : '$800'}
                    </div>
                    <div className={styles.period}>{lang === 'pt' ? 'Pagamento único' : 'Single payment'}</div>
                  </div>
                  <ul className={styles.packFeatures}>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Rebranding & Logo Completo' : 'Rebranding & Full Logo Setup'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Layout de Fachada Comercial 3D' : '3D Commercial Facade design'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Design de Placa e Camisa de Equipe' : 'Signage & Team Uniform design'}
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      {lang === 'pt' ? 'Pack de 10 Artes de Lançamento (Instagram)' : '10 Launch Social Media Graphics'}
                    </li>
                  </ul>
                  <a
                    href={`/whatsapp?text=${encodeURIComponent(
                      lang === 'pt'
                        ? 'Olá Alex! Gostaria de saber mais sobre o Combo Presença Física de R$ 2.900.'
                        : 'Hi Alex! I would like to know more about the Physical Brand Combo ($800).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.packCta}
                  >
                    {lang === 'pt' ? 'Escolher Presença Física' : 'Choose Physical Brand'}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── BUDGET SIMULATOR ── */}
          <section id="simulador" className={styles.simulatorSection}>
            <div className={styles.simulatorCard}>
              <div className={styles.simulatorHeader}>
                <span>{lang === 'pt' ? 'Simulador Inteligente' : 'Smart Budget Planner'}</span>
                <h2>{lang === 'pt' ? 'Escolha Seus Serviços Avulsos' : 'Select Your Custom Services'}</h2>
                <p>
                  {lang === 'pt'
                    ? 'Selecione abaixo as opções desejadas para calcular uma estimativa de investimento em tempo real.'
                    : 'Select options below to estimate your investment in real time.'}
                </p>
              </div>

              <div className={styles.simulatorGrid}>
                {/* SELECTION AREA */}
                <div className={styles.selectionArea}>
                  {/* Category 1 */}
                  <div className={styles.simGroup}>
                    <h4>{lang === 'pt' ? 'Branding & Logo' : 'Branding & Logo'}</h4>
                    <div className={styles.simItemsList}>
                      {SERVICES_DATA.branding.filter((item) => !item.disabled).map((item) => {
                        const isSel = selections[item.id]?.selected || false
                        const qty = selections[item.id]?.qty || 1
                        return (
                          <div
                            key={item.id}
                            className={`${styles.simItemRow} ${isSel ? styles.active : ''}`}
                          >
                            <div className={styles.simItemInfo} onClick={() => handleToggleSelect(item.id)}>
                              <input
                                type="checkbox"
                                checked={isSel}
                                onChange={() => {}} // Controlled by row click
                                aria-label={lang === 'pt' ? item.namePt : item.nameEn}
                              />
                              <div className={styles.simItemText}>
                                <div className={styles.itemName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                                <div className={styles.itemDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                              </div>
                            </div>
                            <div className={styles.simItemRight}>
                              {item.canHaveQty && (
                                <div className={styles.quantityControls} onClick={(e) => e.stopPropagation()}>
                                  <button onClick={() => handleQtyChange(item.id, -1)} disabled={qty <= 1}>
                                    -
                                  </button>
                                  <span>{qty}</span>
                                  <button onClick={() => handleQtyChange(item.id, 1)}>+</button>
                                </div>
                              )}
                              <div className={styles.simItemPrice}>
                                {formatPrice(item.priceVal * qty)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className={styles.simGroup}>
                    <h4>{lang === 'pt' ? 'Redes Sociais & Design' : 'Social Media & Design'}</h4>
                    <div className={styles.simItemsList}>
                      {SERVICES_DATA.social.filter((item) => !item.disabled).map((item) => {
                        const isSel = selections[item.id]?.selected || false
                        const qty = selections[item.id]?.qty || 1
                        return (
                          <div
                            key={item.id}
                            className={`${styles.simItemRow} ${isSel ? styles.active : ''}`}
                          >
                            <div className={styles.simItemInfo} onClick={() => handleToggleSelect(item.id)}>
                              <input
                                type="checkbox"
                                checked={isSel}
                                onChange={() => {}} // Controlled by row click
                                aria-label={lang === 'pt' ? item.namePt : item.nameEn}
                              />
                              <div className={styles.simItemText}>
                                <div className={styles.itemName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                                <div className={styles.itemDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                              </div>
                            </div>
                            <div className={styles.simItemRight}>
                              {item.canHaveQty && (
                                <div className={styles.quantityControls} onClick={(e) => e.stopPropagation()}>
                                  <button onClick={() => handleQtyChange(item.id, -1)} disabled={qty <= 1}>
                                    -
                                  </button>
                                  <span>{qty}</span>
                                  <button onClick={() => handleQtyChange(item.id, 1)}>+</button>
                                </div>
                              )}
                              <div className={styles.simItemPrice}>
                                {formatPrice(item.priceVal * qty)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className={styles.simGroup}>
                    <h4>{lang === 'pt' ? 'Produção Audiovisual' : 'Audiovisual Production'}</h4>
                    <div className={styles.simItemsList}>
                      {SERVICES_DATA.audiovisual.filter((item) => !item.disabled).map((item) => {
                        const isSel = selections[item.id]?.selected || false
                        const qty = selections[item.id]?.qty || 1
                        return (
                          <div
                            key={item.id}
                            className={`${styles.simItemRow} ${isSel ? styles.active : ''}`}
                          >
                            <div className={styles.simItemInfo} onClick={() => handleToggleSelect(item.id)}>
                              <input
                                type="checkbox"
                                checked={isSel}
                                onChange={() => {}}
                                aria-label={lang === 'pt' ? item.namePt : item.nameEn}
                              />
                              <div className={styles.simItemText}>
                                <div className={styles.itemName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                                <div className={styles.itemDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                              </div>
                            </div>
                            <div className={styles.simItemRight}>
                              {item.canHaveQty && (
                                <div className={styles.quantityControls} onClick={(e) => e.stopPropagation()}>
                                  <button onClick={() => handleQtyChange(item.id, -1)} disabled={qty <= 1}>
                                    -
                                  </button>
                                  <span>{qty}</span>
                                  <button onClick={() => handleQtyChange(item.id, 1)}>+</button>
                                </div>
                              )}
                              <div className={styles.simItemPrice}>
                                {formatPrice(item.priceVal * qty)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div className={styles.simGroup}>
                    <h4>{lang === 'pt' ? 'Comunicação Visual & Impressos' : 'Visual Communication & Prints'}</h4>
                    <div className={styles.simItemsList}>
                      {SERVICES_DATA.visual.filter((item) => !item.disabled).map((item) => {
                        const isSel = selections[item.id]?.selected || false
                        const qty = selections[item.id]?.qty || 1
                        return (
                          <div
                            key={item.id}
                            className={`${styles.simItemRow} ${isSel ? styles.active : ''}`}
                          >
                            <div className={styles.simItemInfo} onClick={() => handleToggleSelect(item.id)}>
                              <input
                                type="checkbox"
                                checked={isSel}
                                onChange={() => {}}
                                aria-label={lang === 'pt' ? item.namePt : item.nameEn}
                              />
                              <div className={styles.simItemText}>
                                <div className={styles.itemName}>{lang === 'pt' ? item.namePt : item.nameEn}</div>
                                <div className={styles.itemDesc}>{lang === 'pt' ? item.descPt : item.descEn}</div>
                              </div>
                            </div>
                            <div className={styles.simItemRight}>
                              {item.canHaveQty && (
                                <div className={styles.quantityControls} onClick={(e) => e.stopPropagation()}>
                                  <button onClick={() => handleQtyChange(item.id, -1)} disabled={qty <= 1}>
                                    -
                                  </button>
                                  <span>{qty}</span>
                                  <button onClick={() => handleQtyChange(item.id, 1)}>+</button>
                                </div>
                              )}
                              <div className={styles.simItemPrice}>
                                {formatPrice(item.priceVal * qty)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* SIDEBAR SUMMARY */}
                <div className={styles.summarySidebar}>
                  <h3 className={styles.summaryTitle}>
                    {lang === 'pt' ? 'Orçamento Estimado' : 'Estimated Budget'}
                  </h3>

                  <div className={styles.selectedList}>
                    {getSelectedItems().length === 0 ? (
                      <div className={styles.emptySelection}>
                        {lang === 'pt'
                          ? 'Selecione pelo menos um serviço acima.'
                          : 'Select at least one service above.'}
                      </div>
                    ) : (
                      getSelectedItems().map((entry) => (
                        <div key={entry.id} className={styles.selectedRow}>
                          <span className={styles.selectedName}>
                            {lang === 'pt' ? entry.item.namePt : entry.item.nameEn}
                          </span>
                          <span className={styles.selectedQtyPrice}>
                            {entry.item.canHaveQty && `${entry.qty}x `}
                            {formatPrice(entry.item.priceVal * entry.qty)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className={styles.totalBlock}>
                    <span className={styles.label}>{lang === 'pt' ? 'Total:' : 'Total:'}</span>
                    <span className={styles.value}>{formatPrice(calculateTotal())}</span>
                  </div>

                  <button
                    onClick={() => setShowNoticeModal(true)}
                    disabled={getSelectedItems().length === 0}
                    className={styles.whatsappSendBtn}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.03 2.1C6.5 2.1 2 6.6 2 12.1c0 1.8.5 3.5 1.4 5l-1.5 5.5 5.6-1.5c1.4.8 3.1 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2.1 12.03 2.1zm5.1 13.5c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .2-3.1-.7-2.6-1.1-4.2-3.7-4.4-3.9-.1-.2-1-1.4-1-2.7s.7-1.9.9-2.1c.2-.2.5-.3.7-.3.2 0 .3 0 .5.1.2.1.4 0 .5.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .5-.1.1-.1.3-.2.4-.1.1-.3.3-.4.4-.1.1-.2.3-.1.5.1.2.6.9 1.2 1.5.8.7 1.5 1 1.8 1.1.2.1.4.1.5-.1.1-.2.6-.7.7-.9.1-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3 0 .1 0 .6-.2 1.2z" />
                    </svg>
                    {lang === 'pt' ? 'Enviar via WhatsApp' : 'Request via WhatsApp'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── NEXT PROJECT ── */}
          <section className={styles.nextProject}>
            <span className={styles.nextLabel}>
              {lang === 'pt' ? 'Outro Serviço' : 'Other Service'}
            </span>
            <Link href="/servicos/desenvolvimento" className={styles.nextLink}>
              {lang === 'pt' ? 'Desenvolvimento Personalizado' : 'Custom Development'}
            </Link>
          </section>

          {/* ── FOOTER ── */}
        </main>

        <Footer />
      </div>

      {showNoticeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <svg viewBox="0 0 24 24" className={styles.warningIcon}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <h3>{lang === 'pt' ? 'Aviso Importante' : 'Important Notice'}</h3>
            </div>
            <div className={styles.modalBody}>
              <p>
                {lang === 'pt'
                  ? 'Os valores calculados no simulador são estimativos baseados no preço base de cada serviço. O valor final pode variar de acordo com a complexidade do seu projeto.'
                  : 'The calculated pricing is an estimate based on the base price of each service. The final price may vary depending on the complexity of your project.'}
              </p>
              <p>
                {lang === 'pt'
                  ? 'A complexidade será avaliada em conjunto durante o nosso atendimento no WhatsApp para definirmos o orçamento final.'
                  : 'The project complexity will be evaluated together during our chat on WhatsApp to define the final quote.'}
              </p>
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => {
                  setShowNoticeModal(false)
                  handleSendWhatsApp()
                }}
                className={styles.modalConfirmBtn}
              >
                {lang === 'pt' ? 'Prosseguir para o WhatsApp' : 'Proceed to WhatsApp'}
              </button>
              <button onClick={() => setShowNoticeModal(false)} className={styles.modalCancelBtn}>
                {lang === 'pt' ? 'Voltar e Ajustar' : 'Back and Adjust'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
