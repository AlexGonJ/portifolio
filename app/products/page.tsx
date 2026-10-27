'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { useLanguage } from '@/i18n/LanguageContext'
import styles from '@/styles/products.module.scss'

interface Product {
  id: string
  category: 'sistemas' | 'dashboards' | 'planilhas' | 'templates' | 'guias'
  title: { en: string; pt: string }
  subtitle: { en: string; pt: string }
  description: { en: string; pt: string }
  oldPrice: string
  price: string
  installments: { en: string; pt: string }
  badge: { en: string; pt: string }
  categoryLabel: { en: string; pt: string }
  tags: string[]
  benefits: { en: string[]; pt: string[] }
  includes: { en: string[]; pt: string[] }
  image: string
}

const heroShowcase = [
  { src: '/projects/fiscal-desk.webp', alt: 'Sistema Fiscal' },
  { src: '/projects/vendas.webp', alt: 'Power BI Vendas' },
  { src: '/projects/dre.webp', alt: 'Planilha DRE' },
  { src: '/projects/moda-home.webp', alt: 'Template Web' },
  { src: '/projects/work1.webp', alt: 'Gestão de Tempo' },
]

const productsData: Product[] = [
  {
    id: 'sistema-fiscal',
    category: 'sistemas',
    badge: { en: 'Most Popular', pt: 'Mais Procurado' },
    categoryLabel: { en: 'Software / Fiscal', pt: 'Sistema / Fiscal' },
    title: {
      en: 'Smart Fiscal Invoicing System (NF-e, NFS-e & SPED)',
      pt: 'Sistema de Emissão Fiscal Inteligente (NF-e, NFS-e e SPED)',
    },
    subtitle: {
      en: 'Issue unlimited invoices in seconds with zero recurring monthly fees.',
      pt: 'Emita notas fiscais ilimitadas sem mensalidades abusivas e sem burocracia.',
    },
    description: {
      en: 'Engineered for entrepreneurs and growing businesses demanding fiscal independence. Issue, cancel, generate DANFE, and manage digital certificates (A1/A3) with total agility, local database, and cloud backup.',
      pt: 'Desenvolvido para empreendedores e pequenas empresas que buscam independência fiscal. O sistema permite emitir, cancelar, imprimir DANFE e gerenciar certificados digitais A1/A3 com máxima agilidade e sem custos mensais recorrentes.',
    },
    oldPrice: 'R$ 497',
    price: 'R$ 197',
    installments: { en: 'or 12x of R$ 19.78', pt: 'ou 12x de R$ 19,78' },
    tags: ['NF-e / NFS-e', 'Sem Mensalidade', 'XML Automático', 'Backup Nuvem'],
    benefits: {
      en: [
        'Fast issuing of NF-e, NFS-e, and NFC-e sales receipts',
        'Automated XML supplier import and batch storage',
        'Lifetime license: zero monthly fees with dedicated onboarding',
      ],
      pt: [
        'Emissão instantânea de NF-e, NFS-e e Cupom Fiscal (NFC-e)',
        'Importação em massa de XML e armazenamento seguro em nuvem',
        'Sem mensalidade: licença vitalícia com suporte de implantação',
      ],
    },
    includes: {
      en: [
        'Complete software installer ready for Windows & Web',
        'NF-e, NFS-e, and NFC-e issuing modules',
        'Smart supplier XML importer & stock sync',
        'Complete step-by-step video training',
        'Priority technical support for your first invoice',
      ],
      pt: [
        'Instalador do software pronto para Windows/Web',
        'Módulo de emissão de NF-e, NFS-e e NFC-e',
        'Importador inteligente de XML de fornecedores',
        'Vídeo-aulas completas de configuração passo a passo',
        'Suporte técnico direto para emissão da 1ª nota',
      ],
    },
    image: '/projects/fiscal-desk.webp',
  },
  {
    id: 'sistema-agendamento',
    category: 'sistemas',
    badge: { en: 'High Conversion', pt: 'Alta Conversão' },
    categoryLabel: { en: 'Software / Automation', pt: 'Sistema / Automação' },
    title: {
      en: 'Online Booking System with WhatsApp Notifications',
      pt: 'Sistema de Agendamento Online com Notificações no WhatsApp',
    },
    subtitle: {
      en: 'Cut appointment no-shows by up to 70% with automated reminder messages.',
      pt: 'Reduza faltas e no-shows em até 70% com confirmação e lembretes automáticos.',
    },
    description: {
      en: 'Perfect for clinics, barbershops, consultancies, and service providers. Your clients book 24/7 on their phones and receive automated confirmations and reminders straight to WhatsApp.',
      pt: 'Ideal para clínicas, consultórios, barbearias, estúdios e prestadores de serviços. Seus clientes agendam o horário em segundos direto pelo celular com confirmações e lembretes automáticos no WhatsApp.',
    },
    oldPrice: 'R$ 380',
    price: 'R$ 147',
    installments: { en: 'or 12x of R$ 14.76', pt: 'ou 12x de R$ 14,76' },
    tags: ['Agendamento 24h', 'WhatsApp Bot', 'Painel Admin', 'Anti No-Show'],
    benefits: {
      en: [
        'Dedicated 24/7 self-service scheduling link for customers',
        'Automated reminder notifications via WhatsApp to eliminate forgotten visits',
        'Admin dashboard to manage staff, calendar slots, and services',
      ],
      pt: [
        'Link exclusivo de autoagendamento 24h para seus clientes',
        'Lembretes automáticos direto no WhatsApp para acabar com faltas',
        'Painel administrativo completo de profissionais, horários e serviços',
      ],
    },
    includes: {
      en: [
        'Fully responsive web application ready to deploy',
        'Configured WhatsApp reminder messaging integration',
        'Staff calendar management and financial booking stats',
        '15-minute quickstart deployment guide',
      ],
      pt: [
        'Aplicação Web responsiva pronta para hospedar',
        'Integração configurada de lembretes no WhatsApp',
        'Painel administrativo com controle de horários e serviços',
        'Guia de instalação simples em menos de 15 minutos',
      ],
    },
    image: '/projects/dental.webp',
  },
  {
    id: 'sistema-gestao-tempo',
    category: 'sistemas',
    badge: { en: 'Productivity', pt: 'Produtividade' },
    categoryLabel: { en: 'Software / Team', pt: 'Sistema / Produtividade' },
    title: {
      en: 'Time Tracking & Team Productivity Management System',
      pt: 'Sistema de Gestão de Tempo, Tarefas & Produtividade de Equipe',
    },
    subtitle: {
      en: 'Track deadlines, eliminate bottlenecks, and monitor billable hours seamlessly.',
      pt: 'Controle prazos, tarefas da equipe e monitore horas trabalhadas sem fricção.',
    },
    description: {
      en: 'Say goodbye to operational chaos. An ultra-fast, clutter-free web platform featuring Kanban boards, live time tracking, and productivity analytics designed for agencies and freelancers.',
      pt: 'Acabe com o caos operacional. Um sistema ágil e direto ao ponto que centraliza demandas, prazos e controle de horas sem a lentidão ou complexidade de softwares corporativos pesados.',
    },
    oldPrice: 'R$ 297',
    price: 'R$ 97',
    installments: { en: 'or 10x of R$ 10.90', pt: 'ou 10x de R$ 10,90' },
    tags: ['Kanban Board', 'Time Tracker', 'Custo/Hora', 'Relatórios'],
    benefits: {
      en: [
        'Interactive Kanban board with priority flags and deadline alerts',
        'Live time-tracker to calculate actual profitability per client/project',
        'Automated weekly performance reports by team member or project',
      ],
      pt: [
        'Quadro Kanban interativo com priorização inteligente de demandas',
        'Time-tracker nativo para calcular custo/hora real por cliente',
        'Relatórios visuais de produtividade e rentabilidade da operação',
      ],
    },
    includes: {
      en: [
        'Full web app with user authentication and task boards',
        'Real-time task stopwatch and hourly rate estimator',
        'Automated report export to PDF and CSV',
        'Ready-to-use project templates for agencies and teams',
      ],
      pt: [
        'Web App completo com login e painel de tarefas',
        'Timer integrado de horas por demanda com cálculo de custo',
        'Módulo de exportação de relatórios em PDF e Excel',
        'Templates pré-configurados para agências e freelancers',
      ],
    },
    image: '/projects/work1.webp',
  },
  {
    id: 'power-bi-vendas',
    category: 'dashboards',
    badge: { en: 'Executive BI', pt: 'Pronto para Uso' },
    categoryLabel: { en: 'Power BI / Analytics', pt: 'Power BI / Analytics' },
    title: {
      en: 'Executive Commercial Dashboard in Power BI (Sales & Margins)',
      pt: 'Dashboard Comercial Executivo em Power BI (Vendas & Metas)',
    },
    subtitle: {
      en: 'Turn raw numbers into actionable growth strategies that increase profit.',
      pt: 'Transforme dados dispersos em decisões estratégicas de alto impacto no faturamento.',
    },
    description: {
      en: 'The exact visual analytics suite directors and sales leaders use to monitor revenue, salesperson quotas, customer acquisition cost (CAC), and product margins with single-click refresh.',
      pt: 'O dashboard que diretores e gestores comerciais usam para identificar quais produtos geram mais lucro, quais vendedores atingem metas e onde a empresa está perdendo margem.',
    },
    oldPrice: 'R$ 247',
    price: 'R$ 89',
    installments: { en: 'single payment', pt: 'pagamento único' },
    tags: ['Power BI (.pbix)', 'Vendas & Metas', 'Curva ABC', '100% Editável'],
    benefits: {
      en: [
        'Instant KPI visibility: Average ticket, revenue, margins, and sales targets',
        'Dynamic drill-down filters by representative, period, region, and channel',
        'Seamless 1-click connection to Excel, CSV, Google Sheets, or ERP databases',
      ],
      pt: [
        'KPIs de ticket médio, CAC, margem de lucro e faturamento em tempo real',
        'Filtros dinâmicos por vendedor, período, região e produtos curva ABC',
        'Conexão em 1 clique com planilhas Excel, Google Sheets ou ERP',
      ],
    },
    includes: {
      en: [
        'Official .pbix file 100% editable and customizable',
        'Executive Dark & Light design aesthetics',
        'Structured demo spreadsheet to easily paste your company data',
        'Video tutorial detailing how to connect and refresh in 1 click',
      ],
      pt: [
        'Arquivo .pbix oficial 100% editável e customizável',
        'Design executivo Dark & Light de alto padrão visual',
        'Planilha modelo de dados para fácil alimentação',
        'Vídeo tutorial ensinando como atualizar os dados com 1 clique',
      ],
    },
    image: '/projects/vendas.webp',
  },
  {
    id: 'planilha-gestao-dre',
    category: 'planilhas',
    badge: { en: 'Best-Seller', pt: 'Best-Seller' },
    categoryLabel: { en: 'Financial / Sheets', pt: 'Planilhas / Finanças' },
    title: {
      en: 'Master Business Financial Management & Automated DRE Spreadsheet',
      pt: 'Planilha Master de Gestão Financeira & DRE Empresarial Automático',
    },
    subtitle: {
      en: 'Master your cash flow, fixed expenses, and know your exact net profit.',
      pt: 'Controle total de fluxo de caixa, custos fixos e apuração exata de lucro líquido.',
    },
    description: {
      en: 'Stop wondering where your company cash is disappearing. Crafted by financial analysts to bring total transparency, bank reconciliation, and break-even projection to your operation.',
      pt: 'Chega de não saber para onde o dinheiro da empresa está indo. Esta planilha foi desenhada para dar clareza absoluta sobre rentabilidade, conciliação e previsibilidade sem fórmulas complexas.',
    },
    oldPrice: 'R$ 197',
    price: 'R$ 67',
    installments: { en: 'single payment', pt: 'pagamento único' },
    tags: ['Excel & Sheets', 'DRE Automático', 'Fluxo de Caixa', 'Sem Erros'],
    benefits: {
      en: [
        'Automated managerial DRE generated from day-to-day entries',
        'Accounts payable/receivable tracking with bank reconciliation',
        'Real-time financial health dashboards and break-even analysis',
      ],
      pt: [
        'DRE contábil e gerencial gerado automaticamente a cada lançamento',
        'Controle de contas a pagar, a receber e conciliação bancária',
        'Gráficos executivos automáticos de ponto de equilíbrio (Break-even)',
      ],
    },
    includes: {
      en: [
        'Microsoft Excel (.xlsx) and Google Sheets cloud versions',
        'Protected calculation formulas to prevent accidental corruption',
        'Integrated executive dashboard with financial KPIs',
        'Step-by-step recorded video class on financial indicator interpretation',
      ],
      pt: [
        'Versão para Microsoft Excel (.xlsx) e Google Sheets online',
        'Fórmulas travadas contra alterações e erros acidentais',
        'Dashboard financeiro integrado com gráficos automáticos',
        'Aula gravada ensinando a interpretar os indicadores do DRE',
      ],
    },
    image: '/projects/dre.webp',
  },
  {
    id: 'template-web-portfolio',
    category: 'templates',
    badge: { en: 'Design Award', pt: 'Design Award' },
    categoryLabel: { en: 'Web / Next.js', pt: 'Template / Web' },
    title: {
      en: 'Premium Portfolio & Agency Web Template in Next.js (GSAP + SCSS)',
      pt: 'Template Web Portfolio & Agency em Next.js (GSAP + SCSS)',
    },
    subtitle: {
      en: 'Build cinematic, lightning-fast websites with immense visual authority.',
      pt: 'Estrutura pronta para criar sites velozes, cinematográficos e de alta autoridade.',
    },
    description: {
      en: 'The exact codebase behind high-ticket web projects ($3,000+). Built with modern Next.js App Router, custom GSAP scroll triggers, interactive 3D cursors, and 100/100 Google Lighthouse scores.',
      pt: 'A base de código para quem quer vender websites de alto padrão para clientes exigentes. Estruturado com Next.js App Router, SCSS Modules, animações GSAP no estilo Awwwards e nota máxima no PageSpeed.',
    },
    oldPrice: 'R$ 397',
    price: 'R$ 149',
    installments: { en: 'or 12x of R$ 14.96', pt: 'ou 12x de R$ 14,96' },
    tags: ['Next.js 14+', 'GSAP Motion', 'PageSpeed 95+', 'Clean Code'],
    benefits: {
      en: [
        'Fluid smooth scrolling, magnetic cursors, and custom GSAP animations',
        '100% responsive, optimized assets, and top-tier SEO architecture',
        'Clean modular components with easy dark/light color customization',
      ],
      pt: [
        'Animações fluidas integradas com GSAP e microinterações de luxo',
        '100% responsivo, pontuação máxima no Google PageSpeed e SEO otimizado',
        'Código modular, limpo e facilmente customizável para qualquer nicho',
      ],
    },
    includes: {
      en: [
        'Full GitHub repository with clean, typed, and commented code',
        'Hero, Portfolio gallery, 3D Cursor, Drawer Menu, and FAQ components',
        '1-click Vercel deployment tutorial',
        'Unlimited commercial license for all your client projects',
      ],
      pt: [
        'Repositório completo com código limpo e comentado',
        'Componentes de Hero, Portfólio, Cursor 3D, Menu Drawer e FAQ',
        'Guia de deploy rápido em 1 clique na Vercel',
        'Licença comercial irrestrita para usar em quantos clientes quiser',
      ],
    },
    image: '/projects/moda-home.webp',
  },
  {
    id: 'guia-automacao-pme',
    category: 'guias',
    badge: { en: 'Instant PDF', pt: 'Acesso Imediato' },
    categoryLabel: { en: 'Guides / PDF', pt: 'Materiais / Guias' },
    title: {
      en: 'Practical Business Automation Playbook for SMEs (PDF + Checklists)',
      pt: 'Manual Prático de Automação Empresarial para PMEs (PDF + Checklists)',
    },
    subtitle: {
      en: 'Automate repetitive tasks and save 20+ hours per week in your business.',
      pt: 'O passo a passo para eliminar tarefas repetitivas e economizar 20h por semana.',
    },
    description: {
      en: 'A concise, action-first guide for founders and leaders. Discover 45 real processes to automate using free and low-cost no-code tools, accompanied by battle-tested sales and follow-up templates.',
      pt: 'Um guia condensado, prático e sem enrolação para donos de negócios e gestores que precisam destravar a operação da empresa usando ferramentas gratuitas e acessíveis de automação.',
    },
    oldPrice: 'R$ 97',
    price: 'R$ 37',
    installments: { en: 'single payment', pt: 'pagamento único' },
    tags: ['PDF Alta Resolução', 'Checklists', 'No-Code', 'Acesso Imediato'],
    benefits: {
      en: [
        '45+ business workflows ready to automate within 24 hours',
        'Step-by-step breakdown of best free and affordable no-code platforms',
        'Plug-and-play follow-up and sales recovery scripts for WhatsApp',
      ],
      pt: [
        '45+ processos empresariais prontos para automatizar em 24h',
        'Checklists práticos de auditoria de tempo e ferramentas gratuitas',
        'Modelos de scripts de atendimento e mensagens de conversão',
      ],
    },
    includes: {
      en: [
        'Full high-resolution digital eBook in PDF format',
        '5 printable and Notion-ready action checklists',
        'Copy-paste WhatsApp customer support and sales templates',
        'Free lifetime updates to new playbook editions',
      ],
      pt: [
        'E-book completo em alta resolução (PDF)',
        '5 Checklists práticos para impressão ou Notion',
        'Scripts prontos de mensagens de cobrança e pós-venda',
        'Atualizações gratuitas do material',
      ],
    },
    image: '/projects/card.webp',
  },
]

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { lang } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  // Interactive filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const pageText = {
    en: {
      label: 'Digital Store & Tools',
      title: 'Digital Products',
      description: 'Validated systems, spreadsheets, dashboards, and templates to automate your business, save hundreds of hours, and scale your sales.',
      count: 'products available',
      back: 'Back to Home',
      showcase: 'High-Performance Tools · Immediate Access · Dedicated Support',
      allProducts: 'All Products',
      searchPlaceholder: 'Search by template, dashboard, system, spreadsheet...',
      filterHeading: 'Explore Tools by Category',
      filterSubheading: 'Pick the exact asset you need to accelerate your workflow today.',
      categories: {
        all: 'All Products',
        sistemas: 'Systems & Software',
        dashboards: 'Power BI & Dashboards',
        planilhas: 'Spreadsheets & Finance',
        templates: 'Web Templates',
        guias: 'Guides & Playbooks',
      },
      card: {
        buyNow: 'Buy Now',
        viewDetails: 'Details',
        included: 'Key Highlights:',
        singlePayment: 'Single Payment · Instant Delivery',
      },
      empty: {
        title: 'No products found',
        desc: 'Try adjusting your search query or switching categories.',
        clear: 'Reset Filters',
      },
      trust: {
        item1Title: 'Instant Access',
        item1Desc: 'Immediate download link and access credentials sent right after order confirmation.',
        item2Title: '7-Day Guarantee',
        item2Desc: 'Zero risk. If you are not fully satisfied, request 100% of your investment back.',
        item3Title: 'Dedicated Support',
        item3Desc: 'Direct support channel to help you set up and get the most out of your tools.',
        item4Title: '100% Secure Checkout',
        item4Desc: 'Protected transactions with industry-standard bank encryption.',
      },
      faq: {
        badge: 'Common Questions',
        title: 'Frequently Asked Questions',
        desc: 'Everything you need to know about our products, delivery, and support.',
        q1: 'How do I receive access to my product after buying?',
        a1: 'Right after your purchase confirmation, you will immediately receive the download link, video tutorials, and access credentials via WhatsApp and email. Everything is instant.',
        q2: 'How does payment work? Are there recurring fees?',
        a2: 'Most templates, spreadsheets, and guides are single one-time payments with lifetime access. For specific cloud systems or tools requiring cloud infrastructure, any recurring maintenance plans are clearly detailed on each product.',
        q3: 'Do I need advanced coding or Excel skills to use them?',
        a3: 'Not at all. Every product is designed with a plug-and-play philosophy and comes with straightforward video tutorials showing step-by-step setup in under 15 minutes.',
        q4: 'What if I need help configuring or customizing?',
        a4: 'You have a direct line to our technical support via WhatsApp to resolve any questions during setup and usage.',
      },
      customCta: {
        badge: 'Enterprise & Custom Solutions',
        title: 'Need a tailored system or custom bundle for your business?',
        desc: 'Let us build a customized automation, ERP integration, or Power BI dashboard specifically for your company operation.',
        btn: 'Talk Directly on WhatsApp',
      },
      modal: {
        whatsIncluded: 'What is included in this package:',
        guarantee: '100% Satisfaction Guarantee: 7 days unconditional trial.',
        guaranteeSub: 'Test it in your routine. If it does not exceed expectations, we will refund your purchase immediately.',
        confirmPurchase: 'Confirm Purchase via WhatsApp',
      },
    },
    pt: {
      label: 'Loja de Ativos Digitais',
      title: 'Produtos & Sistemas',
      description: 'Sistemas, planilhas, dashboards e templates validados para automatizar sua rotina empresarial, economizar centenas de horas e alavancar suas vendas.',
      count: 'produtos disponíveis',
      back: 'Voltar ao Início',
      showcase: 'Ferramentas de Alta Performance · Acesso Imediato · Suporte Especializado',
      allProducts: 'Todos os Produtos',
      searchPlaceholder: 'Buscar por template, dashboard, sistema, planilha...',
      filterHeading: 'Explore as Ferramentas por Categoria',
      filterSubheading: 'Escolha o ativo ideal para acelerar seu negócio e eliminar gargalos hoje mesmo.',
      categories: {
        all: 'Todos os Produtos',
        sistemas: 'Sistemas & Softwares',
        dashboards: 'Power BI & Dashboards',
        planilhas: 'Planilhas & Finanças',
        templates: 'Templates Web',
        guias: 'Guias & PDFs',
      },
      card: {
        buyNow: 'Comprar Agora',
        viewDetails: 'Ver Detalhes',
        included: 'Destaques inclusos:',
        singlePayment: 'Pagamento Único · Acesso Imediato',
      },
      empty: {
        title: 'Nenhum produto encontrado',
        desc: 'Tente alterar os termos de busca ou selecionar outra categoria.',
        clear: 'Limpar Filtros',
      },
      trust: {
        item1Title: 'Acesso Imediato',
        item1Desc: 'Link de download e arquivos liberados instantaneamente após a confirmação.',
        item2Title: 'Garantia de 7 Dias',
        item2Desc: 'Risco zero: teste o material e, se não atender suas expectativas, devolvemos 100%.',
        item3Title: 'Suporte Técnico Direto',
        item3Desc: 'Canal exclusivo para tirar dúvidas de instalação e configuração das ferramentas.',
        item4Title: 'Pagamento 100% Seguro',
        item4Desc: 'Transações seguras com criptografia bancária de ponta a ponta.',
      },
      faq: {
        badge: 'Tire suas Dúvidas',
        title: 'Perguntas Frequentes',
        desc: 'Tudo o que você precisa saber sobre entrega, formato dos arquivos e suporte.',
        q1: 'Como recebo o acesso ao produto após a compra?',
        a1: 'Logo após a confirmação do pagamento, você recebe imediatamente no seu WhatsApp e e-mail os links de download de todos os arquivos, arquivos-fonte e vídeos tutoriais passo a passo.',
        q2: 'Como funcionam os pagamentos? Há cobrança de mensalidade?',
        a2: 'A maioria dos templates, planilhas e guias é de pagamento único com acesso vitalício. Para sistemas específicos com infraestrutura na nuvem ou emissão contínua, eventuais planos ou condições de manutenção são detalhados individualmente na descrição da ferramenta.',
        q3: 'Não sou programador ou especialista em Excel, vou conseguir usar?',
        a3: 'Com certeza. Todas as ferramentas foram criadas com o conceito plug-and-play (prontas para uso) e acompanham tutoriais simples em vídeo ensinando do zero em menos de 15 minutos.',
        q4: 'E se eu tiver dúvidas na instalação ou configuração?',
        a4: 'Você conta com nosso suporte direto via WhatsApp para tirar qualquer dúvida e garantir que tudo funcione perfeitamente na sua empresa.',
      },
      customCta: {
        badge: 'Soluções Personalizadas',
        title: 'Precisa de um sistema sob medida ou pacote completo para sua empresa?',
        desc: 'Desenvolvemos soluções personalizadas de automação, integrações fiscais e dashboards sob demanda para o tamanho exato da sua operação.',
        btn: 'Falar Diretamente no WhatsApp',
      },
      modal: {
        whatsIncluded: 'O que está incluso neste pacote:',
        guarantee: 'Garantia Incondicional de 7 Dias',
        guaranteeSub: 'Coloque a ferramenta para rodar. Se não economizar seu tempo ou não for o que esperava, devolvemos 100% do seu dinheiro.',
        confirmPurchase: 'Comprar Agora via WhatsApp',
      },
    }
  }

  const t = pageText[lang]

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      if (!query) return matchCategory

      const matchTitle = product.title[lang].toLowerCase().includes(query)
      const matchSubtitle = product.subtitle[lang].toLowerCase().includes(query)
      const matchTags = product.tags.some((tag) => tag.toLowerCase().includes(query))
      const matchCategoryName = product.categoryLabel[lang].toLowerCase().includes(query)

      return matchCategory && (matchTitle || matchSubtitle || matchTags || matchCategoryName)
    })
  }, [selectedCategory, searchQuery, lang])

  // WhatsApp purchase click handler
  const getWhatsAppBuyLink = (product: Product) => {
    const message = lang === 'pt'
      ? `Olá Alex! Gostaria de adquirir o produto: *${product.title.pt}* (${product.price}). Como posso finalizar a compra e receber o acesso?`
      : `Hello Alex! I want to purchase the product: *${product.title.en}* (${product.price}). How can I proceed with payment and instant delivery?`

    return `https://wa.me/5538999023012?text=${encodeURIComponent(message)}`
  }

  const getWhatsAppCustomLink = () => {
    const message = lang === 'pt'
      ? 'Olá Alex! Gostaria de solicitar uma solução personalizada / pacote empresarial sob medida para o meu negócio.'
      : 'Hello Alex! I am interested in a custom software/automation solution for my business.'

    return `https://wa.me/5538999023012?text=${encodeURIComponent(message)}`
  }

  // Animation lifecycle
  useEffect(() => {
    if (isLoading) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(
        '.work-animate',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )

      // Gallery cards stagger
      gsap.fromTo(
        '.gallery-card',
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.25,
        }
      )

      // Parallax on gallery cards
      const cards = document.querySelectorAll('.gallery-card')
      cards.forEach((card, i) => {
        const speed = i % 2 === 0 ? -25 : -45
        gsap.to(card, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })

      // Marquee infinite scroll
      const marquee = marqueeRef.current
      if (marquee) {
        const track = marquee.querySelector('[data-marquee-track]')
        if (track) {
          gsap.to(track, {
            xPercent: -50,
            ease: 'none',
            duration: 22,
            repeat: -1,
          })
        }
      }
    })

    setTimeout(() => ScrollTrigger.refresh(), 500)

    return () => ctx.revert()
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main className={styles.productsPage}>
          <Navbar />

          {/* ═══════════════════════════════════════════════════════════
              HERO — Visual Showcase Cover (Preserved with CRO Copy)
              ═══════════════════════════════════════════════════════════ */}
          <section ref={heroRef} className={styles.hero}>
            <div className={styles.heroBg} />

            <div className={styles.heroContent}>
              <Link href="/" className={`${styles.backLink} work-animate`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t.back}
              </Link>

              <p className={`${styles.heroLabel} work-animate`}>{t.label}</p>
              <h1 className={`${styles.heroTitle} work-animate`}>{t.title}</h1>
              <p className={`${styles.heroDescription} work-animate`}>{t.description}</p>
            </div>

            {/* Gallery mosaic */}
            <div ref={galleryRef} className={styles.heroGallery}>
              <div className={styles.galleryGrid}>
                {heroShowcase.map((item, i) => (
                  <div key={i} className={`${styles.galleryCard} gallery-card`}>
                    <div className={styles.galleryImageWrap}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        priority={i < 3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.heroAccent} />
          </section>

          {/* ═══════════════════════════════════════════════════════════
              MARQUEE — Value Proposition Strip
              ═══════════════════════════════════════════════════════════ */}
          <div ref={marqueeRef} className={styles.marquee}>
            <div className={styles.marqueeTrack} data-marquee-track>
              {[...Array(6)].map((_, i) => (
                <span key={i} className={styles.marqueeItem}>
                  {t.showcase}
                  <svg className={styles.marqueeStar} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L17.18 19 12 15.27 6.82 19l2.09-6.26L3.82 9l6.09-.74z" />
                  </svg>
                </span>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              FILTER & SEARCH BAR (Friction Reducer)
              ═══════════════════════════════════════════════════════════ */}
          <section className={styles.filterSection}>
            <div className={styles.filterHeader}>
              {/* Title centered and placed higher up */}
              <div className={styles.filterTitleGroup}>
                <h2>{t.filterHeading}</h2>
                <p>{t.filterSubheading}</p>
              </div>

              {/* Search bar & categories arranged coming from the left */}
              <div className={styles.searchAndCategoriesRow}>
                {/* Search Input on the left */}
                <div className={styles.searchBox}>
                  <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className={styles.clearBtn}
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className={styles.categoryPills}>
                  {(['all', 'sistemas', 'dashboards', 'planilhas', 'templates', 'guias'] as const).map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.pillBtn} ${selectedCategory === cat ? styles.activePill : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {t.categories[cat]}
                    </button>
                  ))}

                  <span className={styles.productCountBadge}>
                    {filteredProducts.length} {t.count}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              PRODUCTS GRID — High Conversion Cards
              ═══════════════════════════════════════════════════════════ */}
          <section className={styles.productsGridSection}>
            <div className={styles.productsGrid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <article key={product.id} className={styles.productCard}>
                    {/* Header Image */}
                    <div
                      className={styles.cardHeaderImage}
                      onClick={() => setSelectedProduct(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className={styles.cardBadge}>{product.badge[lang]}</span>
                      <Image
                        src={product.image}
                        alt={product.title[lang]}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>

                    {/* Content */}
                    <div className={styles.cardBody}>
                      <div className={styles.cardTitleGroup}>
                        <span className={styles.cardCategoryText}>{product.categoryLabel[lang]}</span>
                        <h3
                          className={styles.cardTitle}
                          onClick={() => setSelectedProduct(product)}
                          style={{ cursor: 'pointer' }}
                        >
                          {product.title[lang]}
                        </h3>
                        <p className={styles.cardSubtitle}>{product.subtitle[lang]}</p>
                      </div>

                      {/* Top 2 Key Highlights */}
                      <div className={styles.cardTags}>
                        {product.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className={styles.cardTag}>{tag}</span>
                        ))}
                      </div>

                      {/* Footer & Price */}
                      <div className={styles.cardFooter}>
                        <div className={styles.priceBlock}>
                          <div className={styles.priceValues}>
                            <span className={styles.oldPrice}>{product.oldPrice}</span>
                            <span className={styles.currentPrice}>
                              <span>{product.price.split(' ')[0]} </span>
                              {product.price.split(' ').slice(1).join(' ')}
                            </span>
                          </div>
                          <span className={styles.priceInstallments}>
                            {product.installments[lang]}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className={styles.cardActions}>
                          <a
                            href={getWhatsAppBuyLink(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.buyButton}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" />
                            </svg>
                            {t.card.buyNow}
                          </a>

                          <button
                            type="button"
                            className={styles.detailsButton}
                            onClick={() => setSelectedProduct(product)}
                          >
                            {t.card.viewDetails}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <h3>{t.empty.title}</h3>
                  <p>{t.empty.desc}</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSearchQuery('')
                    }}
                  >
                    {t.empty.clear}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              TRUST ASSURANCE BAR (Risk Reversal & Credibility)
              ═══════════════════════════════════════════════════════════ */}
          <section className={styles.trustSection}>
            <div className={styles.trustContainer}>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className={styles.trustText}>
                  <h4>{t.trust.item1Title}</h4>
                  <p>{t.trust.item1Desc}</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className={styles.trustText}>
                  <h4>{t.trust.item2Title}</h4>
                  <p>{t.trust.item2Desc}</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className={styles.trustText}>
                  <h4>{t.trust.item3Title}</h4>
                  <p>{t.trust.item3Desc}</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className={styles.trustText}>
                  <h4>{t.trust.item4Title}</h4>
                  <p>{t.trust.item4Desc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              FAQ ACCORDION (Objection Elimination)
              ═══════════════════════════════════════════════════════════ */}
          <section className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <span className={styles.faqBadge}>{t.faq.badge}</span>
              <h2>{t.faq.title}</h2>
              <p>{t.faq.desc}</p>
            </div>

            <div className={styles.faqList}>
              {[
                { q: t.faq.q1, a: t.faq.a1 },
                { q: t.faq.q2, a: t.faq.a2 },
                { q: t.faq.q3, a: t.faq.a3 },
                { q: t.faq.q4, a: t.faq.a4 },
              ].map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={index}
                    className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}
                  >
                    <button
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className={styles.faqAnswer}>
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              CUSTOM PACKAGE / HIGH CONVERSION BOTTOM CTA
              ═══════════════════════════════════════════════════════════ */}
          <section className={styles.customCtaSection}>
            <div className={styles.customCtaBox}>
              <div className={styles.customCtaContent}>
                <span>{t.customCta.badge}</span>
                <h2>{t.customCta.title}</h2>
                <p>{t.customCta.desc}</p>
              </div>

              <a
                href={getWhatsAppCustomLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.customCtaButton}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" />
                </svg>
                {t.customCta.btn}
              </a>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              MODAL / QUICK VIEW DRAWER (Detail Conversion Layer)
              ═══════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {selectedProduct && (
              <div
                className={styles.modalBackdrop}
                onClick={() => setSelectedProduct(null)}
              >
                <motion.div
                  className={styles.modalContent}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.modalCloseBtn}
                    onClick={() => setSelectedProduct(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>

                  {/* Modal Hero */}
                  <div className={styles.modalHeroImage}>
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.title[lang]}
                      fill
                    />
                    <div className={styles.modalHeroInfo}>
                      <span className={styles.modalBadge}>
                        {selectedProduct.badge[lang]}
                      </span>
                      <h3>{selectedProduct.title[lang]}</h3>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className={styles.modalBody}>
                    <p className={styles.modalDescription}>
                      {selectedProduct.description[lang]}
                    </p>

                    <div>
                      <h4 className={styles.modalSectionTitle}>
                        {t.modal.whatsIncluded}
                      </h4>
                      <ul className={styles.modalIncludesList}>
                        {selectedProduct.includes[lang].map((item, i) => (
                          <li key={i}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Guarantee Box */}
                    <div className={styles.modalGuaranteeCard}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <p>
                        <strong>{t.modal.guarantee}</strong>
                        {t.modal.guaranteeSub}
                      </p>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className={styles.modalFooter}>
                    <div className={styles.modalPriceGroup}>
                      <span className={styles.modalOldPrice}>
                        {selectedProduct.oldPrice}
                      </span>
                      <span className={styles.modalCurrentPrice}>
                        <span>{selectedProduct.price.split(' ')[0]} </span>
                        {selectedProduct.price.split(' ').slice(1).join(' ')}
                      </span>
                      <span className={styles.modalTerms}>
                        {t.card.singlePayment}
                      </span>
                    </div>

                    <a
                      href={getWhatsAppBuyLink(selectedProduct)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.modalBuyBtn}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" />
                      </svg>
                      {t.modal.confirmPurchase}
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
  )
}
