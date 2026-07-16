'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
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
  const [lang, setLang] = useState<Language>('en')
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const saved = localStorage.getItem('site_lang') as Language | null
    if (saved === 'pt' || saved === 'en') {
      setLang(saved)
    } else if (navigator.language.toLowerCase().startsWith('pt')) {
      setLang('pt')
    }
  }, [])

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'pt' : 'en'
    setLang(nextLang)
    localStorage.setItem('site_lang', nextLang)
  }

  const t = lang === 'pt' ? pt : en

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      <div style={{ opacity: hasMounted ? 1 : 0, transition: 'opacity 0.25s ease-out' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
