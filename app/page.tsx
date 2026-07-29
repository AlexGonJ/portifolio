'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
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
      {/* 
        ========================================================================
        CÓDIGO DO PIXEL DA META (FACEBOOK) - HOMEPAGE
        ========================================================================
      */}
      <Script id="meta-pixel-home" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
          fbq('init', '921564783637852'); 
          fbq('track', 'PageView');
          fbq('trackCustom', 'HomeView'); // Evento para visitas na Homepage
        `}
      </Script>
      {/* ======================================================================== */}

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
