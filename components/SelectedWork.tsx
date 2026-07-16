'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import styles from '../styles/selected-work.module.scss'
import { useLanguage } from '../i18n/LanguageContext'

const projects = [
  {
    title: 'Web Platform Experience',
    meta: '2025 — Dev/ Next.js/ Cybersecurity',
    image: '/projects/post-car1.png',
    href: '/work/localiza-multas',
  },
  {
    title: 'Brand Identity System',
    meta: '2024 — Branding',
    image: '/projects/PlacaAline.png',
    href: '/work/aline-goncalves',
  },
  {
    title: 'Minimal Web Platform',
    meta: '2024 — Web Design',
    image: '/projects/moda-home.png',
    href: '/work/moda-agency',
  },
]

import { useRouter } from 'next/navigation'

export default function SelectedWork() {
  const router = useRouter()
  const { t } = useLanguage()
  const sectionRef   = useRef<HTMLElement>(null)
  const previewRef   = useRef<HTMLDivElement>(null)
  const cursorRef    = useRef<HTMLDivElement>(null)
  const imgARef      = useRef<HTMLImageElement>(null)
  const imgBRef      = useRef<HTMLImageElement>(null)
  const activeSlot   = useRef<'a' | 'b'>('a')
  const currentIndex = useRef<number>(-1)
  const lastY        = useRef<number>(0)
  const isVisible    = useRef<boolean>(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeProject, setActiveProject] = useState<number>(-1)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const strength = 0.25

    const move = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
      gsap.to(btn.querySelector('span'), { x: x * strength * 0.4, y: y * strength * 0.4, duration: 0.4 })
    }

    const leave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      gsap.to(btn.querySelector('span'), { x: 0, y: 0, duration: 0.6 })
    }

    btn.addEventListener('mousemove', move)
    btn.addEventListener('mouseleave', leave)
    return () => {
      btn.removeEventListener('mousemove', move)
      btn.removeEventListener('mouseleave', leave)
    }
  }, [])

  // ─── Função central para esconder preview ───────────────────────────────
  const hidePreview = (preview: HTMLDivElement | null, cursor: HTMLDivElement | null) => {
    if (currentIndex.current === -1) return
    gsap.to([preview, cursor], { opacity: 0, scale: 0.92, duration: 0.28, ease: 'power3.in' })
    currentIndex.current = -1
    activeSlot.current = 'a'
    setActiveProject(-1)
  }

  useEffect(() => {
    if (isMobile) return

    const preview = previewRef.current
    const cursor  = cursorRef.current
    const imgA    = imgARef.current
    const imgB    = imgBRef.current
    const section = sectionRef.current
    if (!preview || !cursor || !imgA || !imgB || !section) return

    gsap.set(preview, { opacity: 0, scale: 0.92, xPercent: -50, yPercent: -50 })
    gsap.set(cursor,  { opacity: 0, xPercent: -50, yPercent: -50 })
    gsap.set(imgB,    { yPercent: 0, opacity: 0 })

    let mouseX = 0, mouseY = 0
    let px = 0, py = 0, rafId: number

    const onMove = (e: MouseEvent) => {
      lastY.current = mouseY
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      px += (mouseX - px) * 0.09
      py += (mouseY - py) * 0.09
      gsap.set(preview, { x: px, y: py })
      gsap.set(cursor,  { x: mouseX, y: mouseY })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // ── Esconde quando o mouse sair da seção ────────────────────────────
    const onSectionLeave = () => hidePreview(preview, cursor)
    section.addEventListener('mouseleave', onSectionLeave)

    const items = section.querySelectorAll('[data-project-item]') ?? []
    const offs: (() => void)[] = []

    items.forEach((item, index) => {
      const enter = () => {
        const src = item.getAttribute('data-image') ?? ''
        const isFirst = currentIndex.current === -1

        setActiveProject(index)

        if (isFirst) {
          imgA.src = src
          gsap.set(imgA, { yPercent: 0, opacity: 1 })
          gsap.to(preview, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
          gsap.to(cursor,  { opacity: 1, duration: 0.3, ease: 'power3.out' })
        } else {
          const goingDown = index > currentIndex.current
          const incoming  = activeSlot.current === 'a' ? imgB : imgA
          const outgoing  = activeSlot.current === 'a' ? imgA : imgB

          incoming.src = src
          gsap.set(incoming, { yPercent: goingDown ? 100 : -100, opacity: 1, zIndex: 2 })
          gsap.set(outgoing, { zIndex: 1 })
          gsap.to(incoming,  { yPercent: 0, duration: 0.55, ease: 'power3.out' })
          gsap.to(outgoing,  { yPercent: goingDown ? -40 : 40, opacity: 0, duration: 0.45, ease: 'power3.in' })
          activeSlot.current = activeSlot.current === 'a' ? 'b' : 'a'
        }

        currentIndex.current = index
      }

      item.addEventListener('mouseenter', enter)
      offs.push(() => item.removeEventListener('mouseenter', enter))
    })

    // ── IntersectionObserver: esconde se a seção sair da viewport ────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
        if (!entry.isIntersecting) hidePreview(preview, cursor)
      },
      { threshold: 0 }
    )
    observer.observe(section)

    return () => {
      window.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onSectionLeave)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      offs.forEach(fn => fn())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const handleGlow = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    btn.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    btn.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
  }

  return (
    <section id="projetos" ref={sectionRef} className={styles.selectedWork}>
      <p className={styles.sectionLabel}>{t.selectedWork.label}</p>

      <ul className={styles.list}>
        {projects.map((project, i) => (
          <li
            key={i}
            className={`${styles.item} ${activeProject === i ? styles.itemActive : ''}`}
            data-project-item
            data-image={project.image}
            onClick={() => {
              if (project.href && project.href !== '#') {
                router.push(project.href)
              }
            }}
            style={{ cursor: project.href !== '#' ? 'none' : 'default' }}
          >
            <div className={styles.itemContent}>
              <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>
              {isMobile && (
                <div className={styles.mobileImage}>
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100px, 100vw" />
                </div>
              )}
              <div className={styles.itemCenter}>
                <h3>{t.selectedWork.projects[i].title}</h3>
                <span className={styles.itemMeta}>{t.selectedWork.projects[i].meta}</span>
              </div>
              <span className={styles.itemArrow}>↗</span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.buttonWrapper}>
        <a
          ref={btnRef}
          href="/work"
          className={styles.moreWorkBtn}
          onMouseMove={handleGlow}
          onClick={(e) => { e.preventDefault(); router.push('/work'); }}
        ><div className={styles.borderGlow}></div>
          <span>{t.selectedWork.moreWork}</span>
        </a>
      </div>

      {!isMobile && (
        <>
          <div ref={previewRef} className={styles.preview} aria-hidden="true">
            {/* Barra superior com info do projeto ativo */}
            <div className={styles.previewHeader}>
              <span className={styles.previewTag}>
                {activeProject >= 0 ? String(activeProject + 1).padStart(2, '0') : '—'}
              </span>
              <span className={styles.previewDot} />
              <span className={styles.previewCategory}>
                {activeProject >= 0 ? projects[activeProject].meta.split('—')[1]?.trim() : 'Project'}
              </span>
            </div>

            {/* Imagens */}
            <div className={styles.previewImgWrap}>
              <img ref={imgARef} className={styles.previewImg} alt="" />
              <img ref={imgBRef} className={styles.previewImg} alt="" />
            </div>

            {/* Rodapé com título */}
            <div className={styles.previewFooter}>
              <span className={styles.previewFooterLabel}>
                {activeProject >= 0 ? projects[activeProject].title : ''}
              </span>
              <span className={styles.previewViewTag}>View →</span>
            </div>

            {/* Brilho de canto */}
            <div className={styles.previewGlow} />
          </div>

          <div ref={cursorRef} className={styles.viewCursor} aria-hidden="true">
            <span className={styles.viewCursorInner}>{t.selectedWork.view}</span>
          </div>
        </>
      )}
    </section>
  )
}
