'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { useLanguage } from '@/i18n/LanguageContext'
import styles from '@/styles/work-list.module.scss'

const heroShowcase = [
  { src: '/projects/post-car1.png', alt: 'Localiza Multas' },
  { src: '/projects/moda-home.png', alt: 'Moda Agency' },
  { src: '/projects/PlacaAline.png', alt: 'Dra. Aline Gonçalves' },
  { src: '/projects/via-bike/poster-stand.png', alt: 'Via Bike' },
  { src: '/projects/sport.png', alt: 'Sport Campaign' },
  { src: '/projects/bag.png', alt: 'E-commerce' },
]

const allProjects = [
  {
    title: { en: 'Via Bike Rebranding', pt: 'Rebranding Via Bike' },
    meta: { en: 'Brand Identity & Shop Facade', pt: 'Identidade de Marca e Fachada Comercial' },
    year: '2026',
    tags: ['Branding', 'Storefront Design', 'Banners', 'Video Production'],
    image: '/projects/via-bike/poster-stand.png',
    href: '/work/via-bike',
  },
  {
    title: { en: 'Web Platform Experience', pt: 'Plataforma Web' },
    meta: { en: 'Website and ERP System', pt: 'Website e Sistema ERP' },
    year: '2025',
    tags: ['Next.js', 'Firebase', 'Cybersecurity'],
    image: '/projects/post-car1.png',
    href: '/work/localiza-multas',
  },
  {
    title: { en: 'Brand Identity System', pt: 'Identidade de Marca' },
    meta: { en: 'Branding and Design', pt: 'Branding e Design' },
    year: '2024',
    tags: ['Branding', 'Visual Identity', 'Strategy'],
    image: '/projects/PlacaAline.png',
    href: '/work/aline-goncalves',
  },
  {
    title: { en: 'Minimal Web Platform', pt: 'Plataforma Web Editorial' },
    meta: { en: 'Website and GSAP Animations — Moda Agency', pt: 'Website e Animações GSAP — Moda Agency' },
    year: '2024',
    tags: ['Web Design', 'GSAP', 'Next.js'],
    image: '/projects/moda-home.png',
    href: '/work/moda-agency',
  },
  {
    title: { en: 'Social Media Campaign', pt: 'Campanha de Mídia Social' },
    meta: { en: 'Visual Strategy & Content', pt: 'Estratégia Visual e Conteúdo' },
    year: '2024',
    tags: ['Social Media', 'Art Direction'],
    image: '/projects/sport.png',
    href: '#',
  },
  {
    title: { en: 'E-commerce Visual System', pt: 'Sistema Visual E-commerce' },
    meta: { en: 'UI Design & Branding', pt: 'UI Design e Branding' },
    year: '2023',
    tags: ['E-commerce', 'UI Design'],
    image: '/projects/bag.png',
    href: '#',
  },
  {
    title: { en: 'Financial Dashboard', pt: 'Dashboard Financeiro' },
    meta: { en: 'Web Application & UX', pt: 'Aplicação Web e UX' },
    year: '2023',
    tags: ['Dashboard', 'React', 'UX'],
    image: '/projects/financa.png',
    href: '#',
  },
  {
    title: { en: 'Dental Clinic Brand', pt: 'Marca de Clínica Dental' },
    meta: { en: 'Branding & Visual Identity', pt: 'Branding e Identidade Visual' },
    year: '2023',
    tags: ['Branding', 'Healthcare'],
    image: '/projects/dental.png',
    href: '#',
  },
  {
    title: { en: 'Engineering Platform', pt: 'Plataforma de Engenharia' },
    meta: { en: 'Web Development', pt: 'Desenvolvimento Web' },
    year: '2022',
    tags: ['Web Dev', 'Next.js'],
    image: '/projects/enge.png',
    href: '#',
  },
]

export default function WorkPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { lang } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const pageText = {
    en: {
      label: 'Portfolio',
      title: 'The Work',
      description: 'A curated selection of projects across branding, web development and digital strategy.',
      count: `${allProjects.length} projects`,
      back: 'Back',
      showcase: 'Selected projects that drove real results',
      allWork: 'All Projects',
    },
    pt: {
      label: 'Portfólio',
      title: 'Trabalhos',
      description: 'Uma seleção curada de projetos em branding, desenvolvimento web e estratégia digital.',
      count: `${allProjects.length} projetos`,
      back: 'Voltar',
      showcase: 'Projetos selecionados que geraram resultados reais',
      allWork: 'Todos os Projetos',
    },
  }

  const t = pageText[lang]

  useEffect(() => {
    if (isLoading) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // ── Hero text entrance ──
      gsap.fromTo(
        '.work-animate',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )

      // ── Gallery cards stagger ──
      gsap.fromTo(
        '.gallery-card',
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )

      // ── Parallax on gallery cards when scrolling ──
      const cards = document.querySelectorAll('.gallery-card')
      cards.forEach((card, i) => {
        const speed = (i % 2 === 0) ? -30 : -50
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

      // ── Marquee infinite scroll ──
      const marquee = marqueeRef.current
      if (marquee) {
        const track = marquee.querySelector('[data-marquee-track]')
        if (track) {
          gsap.to(track, {
            xPercent: -50,
            ease: 'none',
            duration: 25,
            repeat: -1,
          })
        }
      }

      // ── List items stagger ──
      gsap.fromTo(
        '.work-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work-list-section',
            start: 'top 80%',
          },
        }
      )
    })

    setTimeout(() => ScrollTrigger.refresh(), 600)

    return () => ctx.revert()
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main style={{ backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
          <Navbar />

          <div className={styles.workPage}>

            {/* ═══════════════════════════════════════════════════════════
                HERO — Visual showcase cover
                ═══════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className={styles.hero}>
              {/* Dark background */}
              <div className={styles.heroBg} />

              {/* Text layer */}
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

              {/* ── Gallery mosaic ── */}
              <div ref={galleryRef} className={styles.heroGallery}>
                <div className={styles.galleryGrid}>
                  {heroShowcase.map((item, i) => (
                    <div
                      key={i}
                      className={`${styles.galleryCard} gallery-card`}
                      style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}
                    >
                      <div className={styles.galleryImageWrap}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          priority={i < 3}
                        />
                      </div>
                      <span className={styles.galleryCardLabel}>{item.alt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Gold accent line ── */}
              <div className={styles.heroAccent} />
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MARQUEE — scrolling text strip
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
                LIST — All projects
                ═══════════════════════════════════════════════════════════ */}
            <section className={`${styles.listSection} work-list-section`}>
              <div className={styles.listHeader}>
                <span className={styles.sectionLabel}>{t.allWork}</span>
                <span className={styles.projectCount}>{t.count}</span>
              </div>

              <ul className={styles.list}>
                {allProjects.map((project, i) => {
                  const isExternal = !project.href || project.href === '#'

                  return (
                    <li key={i} className={`${styles.item} work-item`}>
                      <Link
                        href={project.href}
                        className={styles.itemLink}
                        {...(isExternal ? { onClick: (e: React.MouseEvent) => e.preventDefault() } : {})}
                        style={{ cursor: isExternal ? 'default' : 'pointer' }}
                      >
                        <div className={styles.itemContent}>
                          <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>

                          <div className={styles.itemCenter}>
                            <h3>{project.title[lang]}</h3>
                            <span className={styles.itemMeta}>
                              {project.year} — {project.meta[lang]}
                            </span>
                            <div className={styles.itemTags}>
                              {project.tags.map((tag, j) => (
                                <span key={j} className={styles.tag}>{tag}</span>
                              ))}
                            </div>
                          </div>

                          <div className={styles.itemImage}>
                            <Image
                              src={project.image}
                              alt={project.title[lang]}
                              fill
                              sizes="180px"
                            />
                          </div>
                        </div>

                        {/* Mobile thumbnail */}
                        <div className={styles.mobileImage}>
                          <Image
                            src={project.image}
                            alt={project.title[lang]}
                            fill
                            sizes="100vw"
                          />
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
