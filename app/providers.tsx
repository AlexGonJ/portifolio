'use client'

import { ReactNode, useEffect } from 'react'
import { LanguageProvider } from '../i18n/LanguageContext'
import { CookieConsentProvider } from '../components/CookieConsent/CookieConsentContext'
import CookieBanner from '../components/CookieConsent/CookieBanner'
import MetaPixelTracker from '../components/MetaPixelTracker'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const init = async () => {
      const gsapModule = await import('gsap')
      const scrollTriggerModule = await import('gsap/ScrollTrigger')

      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)
    }

    init()
  }, [])

  return (
    <LanguageProvider>
      <CookieConsentProvider>
        <MetaPixelTracker />
        {children}
        <CookieBanner />
      </CookieConsentProvider>
    </LanguageProvider>
  )
}

