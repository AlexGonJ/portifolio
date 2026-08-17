'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCookieConsent } from './CookieConsent/CookieConsentContext'
import { initMetaPixel, trackPixelEvent } from '@/lib/pixel'

function MetaPixelNavigationTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { hasConsentedTo } = useCookieConsent()

  const isMarketingAllowed = hasConsentedTo('marketing')

  useEffect(() => {
    if (!isMarketingAllowed) return

    // Inicializa o Pixel caso ainda não tenha sido
    initMetaPixel()

    // Dispara PageView em cada transição de rota
    trackPixelEvent('PageView')
  }, [pathname, searchParams, isMarketingAllowed])

  return null
}

export default function MetaPixelTracker() {
  return (
    <Suspense fallback={null}>
      <MetaPixelNavigationTracker />
    </Suspense>
  )
}
