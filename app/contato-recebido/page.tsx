'use client'

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/i18n/LanguageContext'
import { usePixelCustomEvent } from '@/hooks/usePixelCustomEvent'
import styles from '@/styles/contato-recebido.module.scss'

export default function ContatoRecebidoPage() {
  const { lang } = useLanguage()
  const isPt = lang === 'pt'

  // Dispara evento Lead quando a página de conversão é carregada (se consentido)
  usePixelCustomEvent('Lead', { value: 0, currency: 'BRL' }, false)

  return (
    <div className={styles.thankYouPage}>
      <Navbar isProjectPage={true} />

      <div className={styles.bgEffects} aria-hidden="true">
        <div className={styles.glowCenter} />
        <div className={styles.gridPattern} />
      </div>

      <main className={styles.mainContent}>
        <div className={styles.card}>
          <div className={styles.iconWrapper} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className={styles.badge}>
            <span>{isPt ? 'Solicitação Confirmada' : 'Request Confirmed'}</span>
          </div>

          <h1 className={styles.title}>
            {isPt ? 'Contato Recebido com Sucesso!' : 'Message Received Successfully!'}
          </h1>

          <p className={styles.description}>
            {isPt
              ? 'Obrigado por entrar em contato. Recebemos sua mensagem e entraremos em contato em até 24 horas para apresentar uma solução sob medida para sua empresa.'
              : 'Thank you for reaching out. We have received your message and will get back to you within 24 hours with a custom proposal tailored to your business.'}
          </p>

          <div className={styles.actionRow}>
            <a
              href="/whatsapp"
              target="_blank"
              rel="noreferrer"
              className={styles.btnWhatsapp}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12.03 2.5a9.63 9.63 0 0 0-8.24 14.6l-1.3 4.7 4.88-1.26a9.63 9.63 0 1 0 4.66-18.04Zm5.18 13.52c-.22.61-1.27 1.15-1.75 1.25-.45.1-.98.17-3.14-.72-2.6-1.07-4.23-3.72-4.36-3.89-.13-.17-1.04-1.39-1.04-2.65s.65-1.88.88-2.12c.22-.22.48-.28.64-.28.16 0 .33 0 .47.03.15.03.35-.06.54.4.19.46.65 1.59.71 1.7.06.12.1.26.02.42-.08.15-.12.25-.24.4-.12.14-.26.31-.37.42-.1.12-.22.25-.1.46.12.22.56.93 1.2 1.5.83.73 1.54.96 1.76 1.07.22.1.35.08.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.21.08 1.32.61 1.54.72.22.11.37.16.42.26.05.1.05.58-.17 1.19Z" />
              </svg>
              <span>{isPt ? 'Falar Imediatamente no WhatsApp' : 'Chat Instantly on WhatsApp'}</span>
            </a>

            <Link href="/" className={styles.btnSecondary}>
              <span>{isPt ? 'Voltar para a Página Inicial' : 'Back to Home'}</span>
            </Link>
          </div>

          <div className={styles.trustFootnote}>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>
              {isPt
                ? 'Tempo médio de resposta: menos de 2 horas em dias úteis'
                : 'Average response time: under 2 hours on business days'}
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
