'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from '../styles/navbar.module.scss'
import { useLanguage } from '../i18n/LanguageContext'
import SideMenu from './SideMenu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar({ isProjectPage = false }: { isProjectPage?: boolean }) {
  const pathname = usePathname()
  const { t, lang, toggleLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false) // Lista -> Sanduiche
  const [isPastHero, setIsPastHero] = useState(false) // Saiu da Hero
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Estado do Menu Lateral
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false)
  const navRef = useRef(null)
  const servicesCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openServicesMenu = () => {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current)
      servicesCloseTimerRef.current = null
    }

    setIsServicesMenuOpen(true)
  }

  const scheduleServicesMenuClose = () => {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current)
    }

    servicesCloseTimerRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false)
      servicesCloseTimerRef.current = null
    }, 450)
  }

  useEffect(() => {
    return () => {
      if (servicesCloseTimerRef.current) {
        clearTimeout(servicesCloseTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 1. Troca os links pelo sanduíche (ainda na Hero)
    ScrollTrigger.create({
      start: "top top",
      end: "+=400",
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0.9)
      }
    })

    // 2. Detecta quando a Hero termina
    if (!isProjectPage) {
      ScrollTrigger.create({
        trigger: "section:first-of-type", // Alvo: Sua Hero
        start: "bottom 10%", // Quando o fim da hero chega no topo
        onEnter: () => setIsPastHero(true),
        onEnterBack: () => setIsPastHero(false),
      })
    }
  }, [isProjectPage])

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${isPastHero ? styles.themeLight : ''} ${isProjectPage ? styles.projectNav : ''}`}
      >
        <span className={styles.logo}>Code by Alex</span>

        <div className={styles.navRight}>
          {/* Lógica mantida: O CSS cuidará de esconder isso no mobile via @media */}
          {!isScrolled && !isPastHero && (
            <ul className={styles.menu} style={{ display: 'flex', alignItems: 'center' }}>
              {pathname !== '/' && (
                <li><Link href="/" className={styles.menuItem}>Home</Link></li>
              )}
              <li><Link href={pathname === '/' ? "sobre" : "/sobre"} className={styles.menuItem}>{t.nav.about}</Link></li>
              <li
                className={`${styles.servicesMenu} ${isServicesMenuOpen ? styles.servicesMenuOpen : ''}`}
                onMouseEnter={openServicesMenu}
                onMouseLeave={scheduleServicesMenuClose}
                onFocus={openServicesMenu}
                onBlur={scheduleServicesMenuClose}
              >
                <Link href={pathname === '/' ? "#servicos" : "/#servicos"} className={styles.menuItem}>
                  {t.nav.services}
                </Link>
                <div className={styles.servicesDropdown}>
                  <span className={styles.servicesDropdownLabel}>{t.nav.services}</span>
                  {t.services.items.map((service) => {
                    const item = service as typeof service & { isExternal: boolean; link: string }
                    return item.isExternal ? (
                      <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" className={styles.serviceDropdownLink}>
                        {item.title}<span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link key={item.title} href={item.link} className={styles.serviceDropdownLink}>
                        {item.title}<span aria-hidden="true">↗</span>
                      </Link>
                    )
                  })}
                </div>
              </li>
              <li><Link href={pathname === '/' ? "/work" : "/work"} className={styles.menuItem}>{t.nav.projects}</Link></li>
              <li><Link href="/products" className={styles.menuItem}>{lang === 'pt' ? 'Produtos' : 'Products'}</Link></li>
              <li><Link href={pathname === '/' ? "#contato" : "/#contato"} className={styles.menuItem}>{t.nav.contact}</Link></li>
              <li>
                <button
                  onClick={toggleLanguage}
                  className={styles.langBtn}
                >
                  <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span> • <span style={{ opacity: lang === 'pt' ? 1 : 0.4 }}>PT</span>
                </button>
              </li>
            </ul>
          )}

          {/* O Burger aparecerá se houver scroll OU se for mobile (via CSS) */}
          <div
            className={styles.burgerWrapper}
            style={{
              display: (isScrolled || isPastHero) ? 'flex' : 'none'
            }}
          >
            <button
              onClick={toggleLanguage}
              className={`${styles.langBtn} ${styles.mobileLangBtn}`}
            >
              <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span> • <span style={{ opacity: lang === 'pt' ? 1 : 0.4 }}>PT</span>
            </button>

            <button
              className={`${styles.burgerBtn} ${isMenuOpen ? styles.isOpen : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span>{isMenuOpen ? 'Fechar' : t.nav.menu}</span>
              <div className={styles.burgerLines}>
                <div />
                <div />
              </div>
            </button>
          </div>
        </div>
      </nav>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
