'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from '../styles/navbar.module.scss'
import { useLanguage } from '../i18n/LanguageContext'
import SideMenu from './SideMenu'

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false) // Lista -> Sanduiche
  const [isPastHero, setIsPastHero] = useState(false) // Saiu da Hero
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Estado do Menu Lateral
  const navRef = useRef(null)

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
    ScrollTrigger.create({
      trigger: "section:first-of-type", // Alvo: Sua Hero
      start: "bottom 10%", // Quando o fim da hero chega no topo
      onEnter: () => setIsPastHero(true),
      onEnterBack: () => setIsPastHero(false),
    })
  }, [])

 return (
   <>
    <nav 
      ref={navRef} 
      className={`${styles.nav} ${isPastHero ? styles.afterHero : ''}`}
    >
      <span className={styles.logo}>Code by Alex</span>
      
      <div className={styles.navRight}>
        {/* Lógica mantida: O CSS cuidará de esconder isso no mobile via @media */}
        {!isScrolled && !isPastHero && (
          <ul className={styles.menu} style={{ display: 'flex', alignItems: 'center' }}>
            <li><a href="#sobre" className={styles.menuItem}>{t.nav.about}</a></li>
            <li><a href="#projetos" className={styles.menuItem}>{t.nav.projects}</a></li>
            <li><a href="#contato" className={styles.menuItem}>{t.nav.contact}</a></li>
            <li>
              <button 
                onClick={toggleLanguage} 
                style={{ marginLeft: '1rem', background: 'none', border: 'none', color: '#fff', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer', opacity: 0.8 }}
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
            style={{ marginRight: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer', opacity: 0.8 }}
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