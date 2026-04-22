'use client'

import React, { createContext, useContext, useState } from 'react'
import { en, TranslatorProps } from './en'
import { pt } from './pt'

type Language = 'en' | 'pt'

interface LanguageContextProps {
  lang: Language
  t: TranslatorProps
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: 'en',
  t: en,
  toggleLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'

    const saved = localStorage.getItem('site_lang') as Language | null
    if (saved === 'pt' || saved === 'en') return saved

    return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  })
  const hasMounted = typeof window !== 'undefined'

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'pt' : 'en'
    setLang(nextLang)
    localStorage.setItem('site_lang', nextLang)
  }

  const t = lang === 'pt' ? pt : en

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      <div suppressHydrationWarning style={{ opacity: hasMounted ? 1 : 0, transition: 'opacity 0.2s' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
