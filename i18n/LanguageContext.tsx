'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
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
    // Run exactly once when app mounts
    const saved = localStorage.getItem('site_lang') as Language | null
    if (saved === 'pt' || saved === 'en') {
      setLang(saved)
    } else {
      // Auto-detect based on navigator
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('pt')) {
        setLang('pt')
      } else {
        setLang('en') // Fallback to english for the rest of the world
      }
    }
    setHasMounted(true)
  }, [])

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'pt' : 'en'
    setLang(nextLang)
    localStorage.setItem('site_lang', nextLang)
  }

  // Prevent hydration mismatch by rendering default (or nothing) until mounted if needed.
  // We will just render English on the server, and hydrate to PT immediately if needed.
  const t = lang === 'pt' ? pt : en

  // Optional: If you want strictly no flash of incorrect language, you might return null until mounted
  // but it's okay to render English and let it swap to PT instantly. 
  
  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      <div style={{ opacity: hasMounted ? 1 : 0, transition: 'opacity 0.2s' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
