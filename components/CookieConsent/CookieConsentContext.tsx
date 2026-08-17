'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface CookieCategories {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export type ConsentStatus = 'undecided' | 'all' | 'custom' | 'rejected'

export interface CookieConsentData {
  status: ConsentStatus
  categories: CookieCategories
  timestamp: string
  version: string
}

interface CookieConsentContextType {
  consent: CookieConsentData | null
  isConsentDetermined: boolean
  isBannerVisible: boolean
  isPreferencesOpen: boolean
  acceptAll: () => void
  rejectNonEssential: () => void
  saveCustomConsent: (categories: { analytics: boolean; marketing: boolean }) => void
  openPreferences: () => void
  closePreferences: () => void
  hasConsentedTo: (category: keyof CookieCategories) => boolean
}

const STORAGE_KEY = 'lexon_cookie_consent_v1'
const CURRENT_VERSION = '1.0'

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentData | null>(null)
  const [isConsentDetermined, setIsConsentDetermined] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

  // Carrega preferências do localStorage no mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: CookieConsentData = JSON.parse(stored)
        if (parsed && parsed.version === CURRENT_VERSION) {
          setConsent(parsed)
          setIsConsentDetermined(true)
          setIsBannerVisible(false)
          return
        }
      }
    } catch (err) {
      console.warn('Erro ao ler consentimento de cookies:', err)
    }

    // Se não há consentimento prévio
    setIsConsentDetermined(true)
    setIsBannerVisible(true)
  }, [])

  const persistConsent = useCallback((data: CookieConsentData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (err) {
      console.warn('Erro ao salvar consentimento no localStorage:', err)
    }
    setConsent(data)
    setIsBannerVisible(false)
    setIsPreferencesOpen(false)

    // Dispara evento customizado no window para scripts externos/integradores
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('lexonCookieConsentChanged', { detail: data })
      )
    }
  }, [])

  const acceptAll = useCallback(() => {
    const data: CookieConsentData = {
      status: 'all',
      categories: {
        essential: true,
        analytics: true,
        marketing: true,
      },
      timestamp: new Date().toISOString(),
      version: CURRENT_VERSION,
    }
    persistConsent(data)
  }, [persistConsent])

  const rejectNonEssential = useCallback(() => {
    const data: CookieConsentData = {
      status: 'rejected',
      categories: {
        essential: true,
        analytics: false,
        marketing: false,
      },
      timestamp: new Date().toISOString(),
      version: CURRENT_VERSION,
    }
    persistConsent(data)
  }, [persistConsent])

  const saveCustomConsent = useCallback(
    (custom: { analytics: boolean; marketing: boolean }) => {
      const isAll = custom.analytics && custom.marketing
      const isNone = !custom.analytics && !custom.marketing

      const data: CookieConsentData = {
        status: isAll ? 'all' : isNone ? 'rejected' : 'custom',
        categories: {
          essential: true,
          analytics: custom.analytics,
          marketing: custom.marketing,
        },
        timestamp: new Date().toISOString(),
        version: CURRENT_VERSION,
      }
      persistConsent(data)
    },
    [persistConsent]
  )

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true)
  }, [])

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false)
  }, [])

  const hasConsentedTo = useCallback(
    (category: keyof CookieCategories): boolean => {
      if (!consent) return false
      if (category === 'essential') return true
      return Boolean(consent.categories[category])
    },
    [consent]
  )

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isConsentDetermined,
        isBannerVisible,
        isPreferencesOpen,
        acceptAll,
        rejectNonEssential,
        saveCustomConsent,
        openPreferences,
        closePreferences,
        hasConsentedTo,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
