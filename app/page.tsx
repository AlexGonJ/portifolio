'use client'

import { useState, useEffect } from 'react'
import { usePixelCustomEvent } from '@/hooks/usePixelCustomEvent'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import About from '@/components/About'
import ResultCards from '@/components/ResultCards'
import Services from '@/components/Services'
import MotionShowcase from '@/components/MotionShowcase'
import EditorialBreak from '@/components/EditorialBreak'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Faq from '@/components/Faq'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Dispara evento customizado no Meta Pixel somente quando consentimento for concedido
  usePixelCustomEvent('HomeView')

  useEffect(() => {
    if (!isLoading) {
      const refreshScrollTrigger = async () => {
        if (typeof window === 'undefined') return

        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        ScrollTrigger.refresh()

        // Dispara evento customizado para outros componentes recalcularem suas posições
        window.dispatchEvent(new Event('layoutComplete'))
      }

      setTimeout(refreshScrollTrigger, 100)
      setTimeout(refreshScrollTrigger, 500)

      window.addEventListener('load', refreshScrollTrigger)
      return () => window.removeEventListener('load', refreshScrollTrigger)
    }
  }, [isLoading])

  return (
    <>


      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main style={{ backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
          <Navbar />
          <Hero start={!isLoading} />
          <About />
          <ResultCards />
          <Services />
          <SelectedWork />
          <MotionShowcase />
          <EditorialBreak />
          <Testimonials />
          <Faq />
          <Contact />
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}
