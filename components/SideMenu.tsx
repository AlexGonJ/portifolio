'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/side-menu.module.scss'
import { useLanguage } from '../i18n/LanguageContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

// O Backbone do Backdrop escuro da tela que restou dos 60%
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeIn' as const, delay: 0.3 }
  }
}

// O Efeito curva sofisticado: começa esférico na lateral esquerda superior e inferior (border radius) e estica para placa plana. 
const drawerVariants: Variants = {
  hidden: {
    x: '100%',
    borderTopLeftRadius: '50vw',
    borderBottomLeftRadius: '50vw'
  },
  visible: {
    x: '0%',
    borderTopLeftRadius: '0vw',
    borderBottomLeftRadius: '0vw',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] // Custom bezier "Fluid Apple"
    }
  },
  exit: {
    x: '100%',
    borderTopLeftRadius: '50vw',
    borderBottomLeftRadius: '50vw',
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
  exit: { y: -10, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' as const } }
}

const getSocialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'linkedin':
      return <svg viewBox="0 0 24 24"><path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56c0-1.08-.82-1.94-1.92-1.94s-1.93.86-1.93 1.94c0 1.06.82 1.93 1.9 1.93h.03c1.12 0 1.92-.87 1.92-1.93ZM20.44 13.08c0-3.5-1.86-5.13-4.35-5.13-2 0-2.9 1.1-3.4 1.88V8.5H9.31c.04.88 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.67.9-1.37 1.96-1.37 1.39 0 1.94 1.03 1.94 2.55V20H20v-6.92Z" /></svg>
    case 'instagram':
      return <svg viewBox="0 0 24 24"><path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm8.85 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" /></svg>
    case 'behance':
      return <svg viewBox="0 0 24 24"><path d="M9.8 11.03c1.16-.57 1.72-1.44 1.72-2.65 0-2.08-1.62-3.38-4.22-3.38H2V20h5.58c2.79 0 4.57-1.43 4.57-3.76 0-1.68-.83-2.76-2.35-3.21ZM4.66 7.14H7c1.18 0 1.84.47 1.84 1.38 0 .95-.66 1.4-1.84 1.4H4.66V7.14Zm2.56 10.72H4.66v-3.02h2.56c1.32 0 2.02.5 2.02 1.5 0 1.03-.7 1.52-2.02 1.52ZM16.07 6.37h4.93v1.45h-4.93V6.37Zm5.74 8.84c.05-.33.07-.67.07-1.02 0-2.9-1.7-4.79-4.45-4.79-2.82 0-4.7 2.12-4.7 5.26 0 3.1 1.87 5.16 4.79 5.16 2.23 0 3.8-1.12 4.22-3h-2.54c-.27.56-.9.88-1.68.88-1.2 0-1.98-.77-2.04-2.03h6.33v-.46Zm-6.28-1.33c.15-1.08.85-1.73 1.9-1.73 1.06 0 1.72.61 1.78 1.73h-3.68Z" /></svg>
    case 'whatsapp':
    default:
      return <svg viewBox="0 0 24 24"><path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" /></svg>
  }
}

const IMAGES = [
  '/nav_about.png',
  '/nav_projects.png',
  '/nav_contact.png'
]

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [hoveredIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navLinks = [
    ...(pathname !== '/' ? [{ label: 'Home', href: '/', index: -1 }] : []),
    { label: t.nav.about, href: pathname === '/' ? 'sobre' : '/sobre', index: 0 },
    { label: t.nav.projects, href: pathname === '/' ? 'projetos' : '/work', index: 1 },
    { label: t.nav.contact, href: pathname === '/' ? '#contato' : '/#contato', index: 2 }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Escuro (clique para fechar a tela) */}
          <motion.div
            className={styles.overlayBackdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* O Menu 40vw Deslizante com Curva da Direita */}
          <motion.div
            className={styles.menuDrawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.drawerContent}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* O Bloco Esquerdo de Imagem Dinâmica */}
              <div className={styles.leftCol}>
                <motion.div variants={itemVariants} className={styles.imageWrapper}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <Image
                        src={IMAGES[hoveredIndex]}
                        alt="Nav Preview"
                        fill
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* O Bloco Direito de Navegação */}
              <div className={styles.rightCol}>
                <div className={styles.mainNav}>
                  {navLinks.map((link, i) => (
                    <Link key={link.index} href={link.href} passHref legacyBehavior>
                      <motion.a
                        className={styles.navItem}
                        variants={itemVariants}
                        onClick={onClose}
                      >
                        <span className={styles.num}>0{i + 1}</span>
                        {link.label}
                      </motion.a>
                    </Link>
                  ))}
                </div>

                {/* Social Networks Native List */}
                <div className={styles.socialNavContainer}>
                  <motion.p className={styles.socialLabel} variants={itemVariants}>
                    {t.nav.socials}
                  </motion.p>
                  <div className={styles.socialNav}>
                    {t.socialLinks.map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialItem}
                        variants={itemVariants}
                      >
                        {getSocialIcon(social.label)}
                        <span>{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Minimal Footer */}
              <motion.div className={styles.footerRow} variants={itemVariants}>
                <p></p>
                <p>Alex Design</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
