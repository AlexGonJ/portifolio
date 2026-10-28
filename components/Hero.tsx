'use client'

import SculptureHero from '@/components/ui/liquid-sculpture-hero'
import { useLanguage } from '../i18n/LanguageContext'

interface HeroProps {
  start?: boolean
  mobileSculptureScale?: number
}

export default function Hero({ start = true, mobileSculptureScale }: HeroProps) {
  const { t, lang } = useLanguage()

  return (
    <SculptureHero
      start={start}
      mobileSculptureScale={mobileSculptureScale}
      showNav={false}
      brand="Code by Alex"
      navLinks={[
        { label: t.nav.about, href: '/sobre' },
        { label: t.nav.services, href: '#servicos' },
        { label: t.nav.projects, href: '/work' },
        { label: t.nav.contact, href: '#contato' },
      ]}
      navCta={{ label: t.hero.ctaLabel, href: '#contato' }}
      eyebrow={t.hero.eyebrow}
      headline={`${t.hero.title1.includes('mais') ? t.hero.title1.replace('mais', '\nmais') : t.hero.title1.replace('more', '\nmore')}\n${t.hero.title2.includes('que') ? t.hero.title2.replace('que', 'que\n') : t.hero.title2.replace('that', 'that\n')}`}
      headlineAccent={t.hero.title2.includes('que') ? t.hero.title2.replace('que', 'que\n') : t.hero.title2.replace('that', 'that\n')}
      body={t.hero.description}
      primaryCta={{ label: t.hero.ctaLabel, href: '#contato' }}
      secondaryCta={{ label: t.hero.ctaSecondaryLabel, href: '/work' }}
      hint={t.hero.hint}
      hintTouch={t.hero.hintTouch}
      backdropText="LEXON"
      background="linear-gradient(110deg, #F0EAE1 0%, #E8E0D4 40%, #DCD1C2 75%, #D0C3B2 100%)"
      textColor="#181716"
      accentColor="#3E342B"
      theme="light"
      themeToggle={false}
      loadFonts={false}
      intro={true}
      ambient={true}
      ambientIntensity={0.85}
      sculptureScale={1.05}
      showCredit={false}
    />
  )
}
