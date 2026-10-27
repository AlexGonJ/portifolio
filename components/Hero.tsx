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
      headline={`${t.hero.title1}\n${t.hero.title2}`}
      headlineAccent={t.hero.title2}
      body={t.hero.description}
      primaryCta={{ label: t.hero.ctaLabel, href: '#contato' }}
      secondaryCta={{ label: t.hero.ctaSecondaryLabel, href: '/work' }}
      hint={t.hero.hint}
      hintTouch={t.hero.hintTouch}
      backdropText="LEXON"
      background="#E0DAD0"
      theme="light"
      themeToggle={true}
      intro={true}
      ambient={true}
      ambientIntensity={0.65}
      showCredit={false}
    />
  )
}
