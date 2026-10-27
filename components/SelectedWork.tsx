'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HaloReel, type HaloReelItem } from '@/components/ui/halo-reel'
import { useLanguage } from '@/i18n/LanguageContext'

const PORTFOLIO_CARDS: HaloReelItem[] = [
  {
    src: '/projects/vitrine-masculina/hero.png',
    alt: 'Vitrine Masculina - E-commerce Full-Stack',
    title: 'Vitrine Masculina',
    category: 'Ecommerce',
    role: 'E-commerce Full-Stack',
    year: '2026',
    description: 'Plataforma e-commerce completa com checkout integrado, catálogo dinâmico e performance extrema.',
    href: '/work/vitrine-masculina',
    tags: ['Medusa v2', 'Next.js', 'Checkout'],
  },
  {
    src: '/projects/post-car1.png',
    alt: 'Localiza Multas - Plataforma Web & ERP',
    title: 'Localiza Multas',
    category: 'Web Platform & ERP',
    role: 'Sistemas & ERP',
    year: '2025',
    description: 'Sistema institucional e ERP automatizado para gestão de infrações com alta disponibilidade.',
    href: '/work/localiza-multas',
    tags: ['Next.js', 'ERP', 'SEO'],
  },
  {
    src: '/projects/moda-home.png',
    alt: 'Moda Agency - Plataforma Editorial & GSAP',
    title: 'Moda Agency',
    category: 'Web Editorial & GSAP',
    role: 'Editorial & Motion',
    year: '2024',
    description: 'Experiência web editorial refinada com animações fluidas, tipografia moderna e design minimalista.',
    href: '/work/moda-agency',
    tags: ['GSAP', 'Next.js', 'Editorial'],
  },
  {
    src: '/projects/PlacaAline.png',
    alt: 'Aline Gonçalves - Branding & Identidade Visual',
    title: 'Aline Gonçalves',
    category: 'Branding & Identidade',
    role: 'Identidade de Marca',
    year: '2024',
    description: 'Posicionamento e sistema completo de identidade visual de luxo para arquitetura e interiores.',
    href: '/work/aline-goncalves',
    tags: ['Branding', 'Design', 'Print'],
  },
  {
    src: '/projects/via-bike/poster-stand.png',
    alt: 'Via Bike - Direção Criativa & Marketing',
    title: 'Via Bike',
    category: 'Marketing Visual & Direção',
    role: 'Comunicação Visual',
    year: '2024',
    description: 'Direção de arte, identidade e marketing visual para presença omnicanal de alto impacto.',
    href: '/work/via-bike',
    tags: ['Branding', 'Campanhas', 'Visual'],
  },
  {
    src: '/projects/vitrine-masculina/product.png',
    alt: 'Vitrine Masculina - Vitrine de Produtos & Checkout',
    title: 'Vitrine Masculina',
    category: 'Ecommerce',
    role: 'Experiência de Compra',
    year: '2026',
    description: 'Fluxo de compra frictionless, carrinho dinâmico e interface ultra responsiva.',
    href: '/work/vitrine-masculina',
    tags: ['E-commerce', 'Checkout', 'UI/UX'],
  },
  {
    src: '/projects/localiza.png',
    alt: 'Localiza Multas - Dashboard & Automação',
    title: 'Localiza Multas',
    category: 'Web Platform & ERP',
    role: 'Plataforma Digital',
    year: '2025',
    description: 'Módulos analíticos e painéis de consulta integrados a bancos de dados em tempo real.',
    href: '/work/localiza-multas',
    tags: ['ERP', 'Performance', 'Dashboard'],
  },
  {
    src: '/projects/moda-hero.jpg',
    alt: 'Moda Agency - Direção Tipográfica',
    title: 'Moda Agency',
    category: 'Web Editorial & GSAP',
    role: 'Composição Visual',
    year: '2024',
    description: 'Composição tipográfica arrojada, navegação imersiva e transições sem interrupções.',
    href: '/work/moda-agency',
    tags: ['Design System', 'GSAP', 'Animações'],
  },
  {
    src: '/projects/bag.png',
    alt: 'Aline Gonçalves - Aplicações de Marca',
    title: 'Aline Gonçalves',
    category: 'Branding & Identidade',
    role: 'Aplicações de Marca',
    year: '2024',
    description: 'Identidade aplicada em materiais corporativos e embalagens premium.',
    href: '/work/aline-goncalves',
    tags: ['Branding', 'Papelaria', 'Embalagens'],
  },
  {
    src: '/projects/via-bike/cap.jpg',
    alt: 'Via Bike - Materiais Promocionais',
    title: 'Via Bike',
    category: 'Marketing Visual & Direção',
    role: 'Material Promocional',
    year: '2024',
    description: 'Brindes, vestuário institucional e material promocional para clientes.',
    href: '/work/via-bike',
    tags: ['Merch', 'Marketing', 'Identidade'],
  },
]

export default function SelectedWork() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [currentProject, setCurrentProject] = useState<HaloReelItem>(PORTFOLIO_CARDS[0])
  const [currentIndex, setCurrentIndex] = useState(0)

  const isEn = lang === 'en'
  const sectionTitle = isEn ? 'Selected Works' : 'Projetos Selecionados'
  const exploreCaseText = isEn ? 'View Case Study' : 'Ver Estudo de Caso'
  const allProjectsText = isEn ? 'View all projects' : 'Ver todos os projetos'
  const dragHintText = isEn ? 'Drag to rotate • Click card to open' : 'Arraste para girar • Clique no card para abrir'

  return (
    <section id="work" className="relative w-full bg-white overflow-hidden py-14 sm:py-20 lg:py-24">
      <HaloReel
        items={PORTFOLIO_CARDS}
        aria-label={sectionTitle}
        cardWidth={140}
        cardHeight={195}
        minScale={0.34}
        maxScale={1.34}
        depthExponent={2.8}
        radiusXRatio={0.42}
        centerXRatio={0.02}
        radiusYRatio={0.36}
        holdDuration={1800}
        stepDuration={800}
        spread={1.25}
        className="h-[600px] sm:h-[660px] lg:h-[720px] w-full"
        onCardClick={(item) => {
          if (item.href) router.push(item.href)
        }}
        onActiveIndexChange={(idx) => {
          setCurrentIndex(idx)
          setCurrentProject(PORTFOLIO_CARDS[idx])
        }}
        centerLabel={(activeItem, activeIdx) => {
          const item = activeItem || currentProject
          const currentNum = String((activeIdx ?? currentIndex) + 1).padStart(2, '0')
          const totalNum = String(PORTFOLIO_CARDS.length).padStart(2, '0')

          return (
            <div className="h-full flex flex-col justify-between py-6 sm:py-10 pr-6 sm:pr-12 lg:pr-24 pointer-events-none select-none">
              {/* Top: Selected Works (Mova esse selected work que esta escrito para cima) */}
              <div className="flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-900 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-900"></span>
                  </span>
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-neutral-800">
                    {sectionTitle}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-mono font-medium border border-neutral-200">
                  <span>{currentNum}</span>
                  <span className="text-neutral-300">/</span>
                  <span className="text-neutral-400">{totalNum}</span>
                </div>
              </div>

              {/* Middle: Nome do projeto e o que ele é (por exemplo "Ecommerce") */}
              <div className="my-auto pointer-events-auto flex flex-col items-start gap-4 max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={item.title + (item.category ?? '') + currentNum}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start gap-3"
                  >
                    {/* O que ele é (ex: "Ecommerce") */}
                    <div className="flex flex-wrap items-center gap-2">
                      {item.category && (
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0b0b0d] text-white shadow-sm">
                          {item.category}
                        </span>
                      )}
                      {item.year && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono text-neutral-500 bg-neutral-100 border border-neutral-200">
                          {item.year}
                        </span>
                      )}
                    </div>

                    {/* Nome do projeto */}
                    <h3 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#0b0b0d] leading-[1.06]">
                      {item.title}
                    </h3>

                    {/* Descrição e detalhes */}
                    {item.description && (
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg mt-1">
                        {item.description}
                      </p>
                    )}

                    {/* Botão de Ação / Link para o case */}
                    {item.href && (
                      <div className="pt-3 flex items-center gap-5">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg group"
                        >
                          <span>{exploreCaseText}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                            ↗
                          </span>
                        </Link>

                        <Link
                          href="/work"
                          className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-medium underline underline-offset-4"
                        >
                          {allProjectsText}
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom: Instrução sutil e barra de progresso dos projetos */}
              <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-100 pt-4 pointer-events-auto">
                <span className="hidden sm:inline font-medium text-neutral-500">
                  {dragHintText}
                </span>
                <span className="sm:hidden font-medium text-neutral-500">
                  {isEn ? 'Swipe or tap card' : 'Arraste ou toque'}
                </span>

                <div className="flex items-center gap-1.5">
                  {PORTFOLIO_CARDS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        (activeIdx ?? currentIndex) === i
                          ? 'w-6 bg-neutral-900'
                          : 'w-1.5 bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        }}
      />
    </section>
  )
}
