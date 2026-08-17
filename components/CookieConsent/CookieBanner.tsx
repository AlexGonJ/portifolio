'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCookieConsent } from './CookieConsentContext'
import { useLanguage } from '@/i18n/LanguageContext'
import styles from '@/styles/cookie-consent.module.scss'

export default function CookieBanner() {
  const {
    consent,
    isConsentDetermined,
    isBannerVisible,
    isPreferencesOpen,
    acceptAll,
    rejectNonEssential,
    saveCustomConsent,
    openPreferences,
    closePreferences,
  } = useCookieConsent()

  const { t } = useLanguage()

  // Local state para as categorias no modal de preferências
  const [analyticsChecked, setAnalyticsChecked] = useState(false)
  const [marketingChecked, setMarketingChecked] = useState(false)

  useEffect(() => {
    if (consent) {
      setAnalyticsChecked(Boolean(consent.categories.analytics))
      setMarketingChecked(Boolean(consent.categories.marketing))
    } else {
      setAnalyticsChecked(false)
      setMarketingChecked(false)
    }
  }, [consent, isPreferencesOpen])

  // Não renderiza nada antes do carregamento do cliente
  if (!isConsentDetermined) return null

  const handleSaveCustom = () => {
    saveCustomConsent({
      analytics: analyticsChecked,
      marketing: marketingChecked,
    })
  }

  return (
    <>
      {/* Banner Flutuante de Primeiro Acesso */}
      {isBannerVisible && !isPreferencesOpen && (
        <aside className={styles.bannerWrapper} aria-label="Consentimento de Cookies">
          <div className={styles.bannerCard}>
            <div className={styles.badgeRow}>
              <svg className={styles.badgeIcon} viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className={styles.badgeText}>LGPD & Privacidade</span>
            </div>

            <h3 className={styles.bannerTitle}>{t.cookieConsent.title}</h3>
            <p className={styles.bannerText}>
              {t.cookieConsent.description}{' '}
              <Link href="/politica-de-privacidade" className={styles.policyLink}>
                {t.cookieConsent.privacyLinkText} &rarr;
              </Link>
            </p>

            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={acceptAll}
              >
                {t.cookieConsent.acceptAll}
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={openPreferences}
              >
                {t.cookieConsent.customize}
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={rejectNonEssential}
              >
                {t.cookieConsent.rejectNonEssential}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal de Preferências Detalhadas */}
      {isPreferencesOpen && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePreferences()
          }}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div>
                <h2 id="cookie-preferences-title" className={styles.modalTitle}>
                  {t.cookieConsent.preferencesTitle}
                </h2>
                <p className={styles.modalDesc}>{t.cookieConsent.preferencesDesc}</p>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closePreferences}
                aria-label={t.cookieConsent.close}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Categoria 1: Essenciais */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryTop}>
                  <span className={styles.categoryTitle}>
                    {t.cookieConsent.essentialTitle}
                  </span>
                  <span className={styles.alwaysActiveTag}>
                    {t.cookieConsent.alwaysActive}
                  </span>
                </div>
                <p className={styles.categoryDesc}>
                  {t.cookieConsent.essentialDesc}
                </p>
              </div>

              {/* Categoria 2: Analíticos */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryTop}>
                  <span className={styles.categoryTitle}>
                    {t.cookieConsent.analyticsTitle}
                  </span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={analyticsChecked}
                      onChange={(e) => setAnalyticsChecked(e.target.checked)}
                      aria-label={t.cookieConsent.analyticsTitle}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.categoryDesc}>
                  {t.cookieConsent.analyticsDesc}
                </p>
              </div>

              {/* Categoria 3: Marketing / Meta Pixel */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryTop}>
                  <span className={styles.categoryTitle}>
                    {t.cookieConsent.marketingTitle}
                  </span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={marketingChecked}
                      onChange={(e) => setMarketingChecked(e.target.checked)}
                      aria-label={t.cookieConsent.marketingTitle}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.categoryDesc}>
                  {t.cookieConsent.marketingDesc}
                </p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={rejectNonEssential}
              >
                {t.cookieConsent.rejectNonEssential}
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleSaveCustom}
              >
                {t.cookieConsent.savePreferences}
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={acceptAll}
              >
                {t.cookieConsent.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
