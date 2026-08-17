export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '921564783637852'

declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}

let isInitialized = false

/**
 * Inicializa o script oficial do Meta Pixel apenas quando há consentimento do usuário.
 */
export function initMetaPixel() {
  if (typeof window === 'undefined' || isInitialized) return

  // Injeção segura do script da Meta
  ;(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  if (window.fbq) {
    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')
    isInitialized = true
  }
}

/**
 * Dispara evento padrão ou personalizado no Meta Pixel se estiver inicializado.
 */
export function trackPixelEvent(
  eventName: string,
  params?: Record<string, any>,
  isCustom = false
) {
  if (typeof window === 'undefined' || !window.fbq) {
    return
  }

  try {
    if (isCustom) {
      window.fbq('trackCustom', eventName, params)
    } else {
      window.fbq('track', eventName, params)
    }
  } catch (err) {
    console.warn('Erro ao disparar evento no Meta Pixel:', err)
  }
}
