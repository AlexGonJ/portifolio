'use client'

import { useEffect } from 'react'
import { useCookieConsent } from '@/components/CookieConsent/CookieConsentContext'
import { initMetaPixel, trackPixelEvent } from '@/lib/pixel'

export function usePixelCustomEvent(
  eventName: string,
  params?: Record<string, any>,
  isCustom = true
) {
  const { hasConsentedTo } = useCookieConsent()
  const isMarketingAllowed = hasConsentedTo('marketing')

  useEffect(() => {
    if (!isMarketingAllowed) return

    initMetaPixel()
    trackPixelEvent(eventName, params, isCustom)
  }, [eventName, isMarketingAllowed, params, isCustom])
}
