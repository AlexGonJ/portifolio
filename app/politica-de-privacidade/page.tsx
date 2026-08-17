'use client'

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/i18n/LanguageContext'
import { useCookieConsent } from '@/components/CookieConsent/CookieConsentContext'
import styles from '@/styles/privacidade.module.scss'

export default function PoliticaPrivacidadePage() {
  const { lang } = useLanguage()
  const { openPreferences } = useCookieConsent()

  const isPt = lang === 'pt'

  return (
    <>
      <Navbar isProjectPage={true} />

      <main className={styles.privacyPage}>
        <div className={styles.bgEffects} aria-hidden="true">
          <div className={styles.glowTop} />
          <div className={styles.gridPattern} />
        </div>

        <div className={styles.container}>
          <div className={styles.backRow}>
            <Link href="/" className={styles.backLink}>
              <svg viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>{isPt ? 'Voltar ao Início' : 'Back to Home'}</span>
            </Link>
          </div>

          <header className={styles.heroHeader}>
            <div className={styles.badge}>
              <span>{isPt ? 'Conformidade LGPD & GDPR' : 'LGPD & GDPR Compliance'}</span>
            </div>

            <h1 className={styles.title}>
              {isPt
                ? 'Política de Privacidade e Proteção de Dados'
                : 'Privacy and Data Protection Policy'}
            </h1>

            <p className={styles.subtitle}>
              {isPt
                ? 'Transparência integral sobre a coleta, finalidade, retenção de dados pessoais e gestão de cookies e pixels de terceiros no ecossistema Lexon Digital.'
                : 'Full transparency regarding data collection, purpose, retention, and third-party cookies & pixels management across the Lexon Digital ecosystem.'}
            </p>

            <div className={styles.metaRow}>
              <span>
                {isPt
                  ? 'Última atualização: 17 de Agosto de 2026 • Versão 1.0'
                  : 'Last updated: August 17, 2026 • Version 1.0'}
              </span>

              <button
                type="button"
                className={styles.manageCookiesBtn}
                onClick={openPreferences}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M7 13.5v.01" />
                  <path d="M12 16v.01" />
                </svg>
                <span>{isPt ? 'Gerenciar Preferências de Cookies' : 'Manage Cookie Preferences'}</span>
              </button>
            </div>
          </header>

          <div className={styles.contentBody}>
            {/* 1. Visão Geral & Controlador */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>01</span>
                {isPt ? 'Identificação do Controlador' : 'Data Controller Identification'}
              </h2>
              <p className={styles.sectionParagraph}>
                {isPt
                  ? 'A Lexon Digital, atuando sob responsabilidade técnica e profissional de Alexander Gonçalves, é a controladora dos dados pessoais tratados através deste website e de suas aplicações associadas, nos termos da Lei Geral de Proteção de Dados (LGPD - Lei Federal nº 13.709/2018) e, subsidiariamente, do Regulamento Geral sobre a Proteção de Dados da UE (GDPR).'
                  : 'Lexon Digital, operated by Alexander Gonçalves, is the controller of personal data processed through this website and associated applications, in accordance with the Brazilian General Data Protection Law (LGPD - Law No. 13,709/2018) and the European General Data Protection Regulation (GDPR).'}
              </p>
              <div className={styles.contactBox}>
                <div className={styles.contactItem}>
                  <div className={styles.contactLabel}>{isPt ? 'Encarregado (DPO)' : 'Data Officer'}</div>
                  <div className={styles.contactValue}>Alexander Gonçalves</div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactLabel}>{isPt ? 'Canal de Privacidade' : 'Privacy Email'}</div>
                  <a href="mailto:alexandergoncalvesdev@gmail.com" className={styles.contactValue}>
                    alexandergoncalvesdev@gmail.com
                  </a>
                </div>
              </div>
            </section>

            {/* 2. Dados Coletados */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>02</span>
                {isPt ? 'Dados Pessoais Coletados e Finalidades' : 'Personal Data Collected and Purposes'}
              </h2>
              <p className={styles.sectionParagraph}>
                {isPt
                  ? 'Coletamos exclusivamente as informações estritamente necessárias para a prestação de serviços digitais, atendimento comercial e aprimoramento da sua experiência:'
                  : 'We collect only the information strictly necessary to provide digital services, commercial communication, and enhance your user experience:'}
              </p>

              <ul className={styles.featureList}>
                <li>
                  <strong>{isPt ? 'Formulário de Contato e Propostas:' : 'Contact and Quote Form:'}</strong>{' '}
                  {isPt
                    ? 'Ao preencher nosso formulário, coletamos seu Nome, E-mail, Serviço de interesse e Mensagem descritiva. Esses dados são transmitidos por API segura (HTTPS/TLS) e integrados com sistema seguro para permitir o retorno comercial, elaboração de orçamentos e esclarecimento de dúvidas (Base legal: Execução de contrato ou procedimentos preliminares - Art. 7º, V da LGPD).'
                    : 'When completing our form, we collect your Name, Email, Service of interest, and Message. This data is transmitted via secure API (HTTPS/TLS) to enable commercial contact, project scoping, and proposals (Legal basis: Pre-contractual procedures - Art. 7, V LGPD).'}
                </li>
                <li>
                  <strong>{isPt ? 'Redirecionamento para WhatsApp:' : 'WhatsApp Communication:'}</strong>{' '}
                  {isPt
                    ? 'Ao clicar em botões de contato via WhatsApp (/whatsapp), o usuário é direcionado com segurança para o aplicativo oficial com mensagem pré-formatada. Os dados compartilhados na conversa seguem a política de privacidade da Meta/WhatsApp e nosso termo de sigilo profissional.'
                    : 'When clicking WhatsApp contact buttons (/whatsapp), you are securely directed to the official app. Conversation data is subject to Meta/WhatsApp privacy terms and our professional non-disclosure standards.'}
                </li>
                <li>
                  <strong>{isPt ? 'Dados Técnicos de Navegação:' : 'Technical Browsing Data:'}</strong>{' '}
                  {isPt
                    ? 'Informações anônimas de dispositivo, resolução de tela, idioma preferencial e tempos de resposta coletadas para garantir a estabilidade das animações GSAP e renderização em alta performance.'
                    : 'Anonymous technical details such as device type, screen resolution, language choice, and performance timings to ensure smooth GSAP animations and reliable rendering.'}
                </li>
              </ul>
            </section>

            {/* 3. Cookies e Meta Pixel */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>03</span>
                {isPt ? 'Política de Cookies e Meta Pixel' : 'Cookies and Meta Pixel Policy'}
              </h2>
              <p className={styles.sectionParagraph}>
                {isPt
                  ? 'Adotamos uma abordagem estrita de privacidade por design (Privacy by Design). Por padrão, nenhum script de rastreamento de terceiros ou cookie de marketing é baixado ou executado sem o seu consentimento prévio e explícito.'
                  : 'We follow a strict Privacy by Design approach. By default, no third-party tracking scripts or marketing cookies are downloaded or executed without your prior and explicit consent.'}
              </p>

              <div className={styles.highlightCard}>
                <p>
                  <strong>{isPt ? 'Compromisso com o Bloqueio Prévio:' : 'Pre-Consent Blocking Guarantee:'}</strong>{' '}
                  {isPt
                    ? 'O Meta Pixel (Facebook & Instagram) permanece totalmente desativado até que você clique em "Aceitar Todos" ou autorize a categoria de "Marketing" na nossa Central de Preferências.'
                    : 'The Meta Pixel (Facebook & Instagram) remains completely blocked until you click "Accept All" or enable "Marketing" in our Preferences Center.'}
                </p>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.cookieTable}>
                  <thead>
                    <tr>
                      <th>{isPt ? 'Categoria' : 'Category'}</th>
                      <th>{isPt ? 'Finalidade & Exemplos' : 'Purpose & Examples'}</th>
                      <th>{isPt ? 'Base Legal & Status' : 'Legal Basis & Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>{isPt ? 'Estritamente Necessários' : 'Strictly Necessary'}</strong></td>
                      <td>
                        {isPt
                          ? 'Armazenamento da escolha de idioma e do registro de consentimento (lexon_cookie_consent_v1). Proteção de integridade.'
                          : 'Language preferences and consent registry persistence (lexon_cookie_consent_v1). Site integrity protection.'}
                      </td>
                      <td>{isPt ? 'Legítimo Interesse / Sempre Ativo' : 'Legitimate Interest / Always Active'}</td>
                    </tr>
                    <tr>
                      <td><strong>{isPt ? 'Análise & Métricas' : 'Analytics & Performance'}</strong></td>
                      <td>
                        {isPt
                          ? 'Compreensão agregada de navegação e páginas mais acessadas para otimização de velocidade e conteúdo.'
                          : 'Aggregated metrics and navigation flow to improve loading speed and user experience.'}
                      </td>
                      <td>{isPt ? 'Consentimento (Opcional)' : 'Consent (Optional)'}</td>
                    </tr>
                    <tr>
                      <td><strong>{isPt ? 'Marketing & Meta Pixel' : 'Marketing & Meta Pixel'}</strong></td>
                      <td>
                        {isPt
                          ? 'Pixel da Meta Platforms (cookies _fbp, _fbc) para mensuração de conversões, visitas a serviços e campanhas personalizadas.'
                          : 'Meta Platforms Pixel (_fbp, _fbc cookies) for ad conversion measurement, service visits, and targeted campaigns.'}
                      </td>
                      <td>{isPt ? 'Consentimento Explícito (Opcional)' : 'Explicit Consent (Optional)'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Compartilhamento e Terceiros */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>04</span>
                {isPt ? 'Compartilhamento com Terceiros' : 'Third-Party Data Sharing'}
              </h2>
              <p className={styles.sectionParagraph}>
                {isPt
                  ? 'A Lexon Digital não vende, aluga ou comercializa seus dados pessoais sob nenhuma hipótese. O compartilhamento ocorre estritamente com provedores de infraestrutura homologados e indispensáveis:'
                  : 'Lexon Digital does not sell, rent, or trade your personal information. Sharing occurs strictly with audited infrastructure providers essential to our operations:'}
              </p>
              <ul className={styles.featureList}>
                <li>
                  <strong>{isPt ? 'Hospedagem e CDN (Vercel Inc.):' : 'Hosting & CDN (Vercel Inc.):'}</strong>{' '}
                  {isPt
                    ? 'Infraestrutura de borda segura com proteção contra ataques DDoS e tráfego criptografado TLS 1.3.'
                    : 'Secure edge cloud infrastructure with DDoS mitigation and TLS 1.3 encrypted connections.'}
                </li>
                <li>
                  <strong>{isPt ? 'Meta Platforms Inc. (Pixel):' : 'Meta Platforms Inc. (Pixel):'}</strong>{' '}
                  {isPt
                    ? 'Apenas quando autorizado pelo titular, dados técnicos e eventos de conversão são processados pela Meta conforme seus termos de privacidade para mensuração de tráfego.'
                    : 'Only when authorized by you, technical metrics and conversion events are processed by Meta in accordance with their privacy policies.'}
                </li>
                <li>
                  <strong>{isPt ? 'Google Workspace (Google Sheets API):' : 'Google Workspace (Google Sheets API):'}</strong>{' '}
                  {isPt
                    ? 'Processamento seguro das mensagens do formulário de contato em ambiente autenticado com controles de acesso restrito.'
                    : 'Secure backend handling of form contact requests inside an authenticated environment with strict access controls.'}
                </li>
              </ul>
            </section>

            {/* 5. Direitos dos Titulares */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>05</span>
                {isPt ? 'Seus Direitos como Titular (Art. 18 LGPD)' : 'Your Rights as a Data Subject'}
              </h2>
              <p className={styles.sectionParagraph}>
                {isPt
                  ? 'Em conformidade com o artigo 18 da LGPD, você possui os seguintes direitos a qualquer momento, mediante requisição expressa e gratuita:'
                  : 'In compliance with Article 18 of the LGPD and GDPR articles, you have the right to freely exercise:'}
              </p>
              <ul className={styles.featureList}>
                <li>{isPt ? 'Confirmação da existência de tratamento dos seus dados pessoais.' : 'Confirmation of data processing existence.'}</li>
                <li>{isPt ? 'Acesso simplificado e detalhado às informações armazenadas.' : 'Direct access to your stored personal records.'}</li>
                <li>{isPt ? 'Correção de dados incompletos, inexatos ou desatualizados.' : 'Correction of incomplete, inaccurate, or outdated data.'}</li>
                <li>{isPt ? 'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.' : 'Anonymization, blocking, or erasure of unnecessary data.'}</li>
                <li>{isPt ? 'Revogação do consentimento concedido anteriormente para cookies e marketing com efeito imediato.' : 'Immediate revocation of previously granted cookie consent.'}</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className={styles.manageCookiesBtn}
                  onClick={openPreferences}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M7 13.5v.01" />
                    <path d="M12 16v.01" />
                  </svg>
                  <span>{isPt ? 'Revogar ou Alterar Consentimento de Cookies' : 'Revoke or Change Cookie Consent'}</span>
                </button>
              </div>
            </section>

            {/* 6. Segurança e Retenção */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>06</span>
                {isPt ? 'Segurança da Informação e Retenção' : 'Information Security & Data Retention'}
              </h2>
              <p className={styles.sectionParagraph}>
                {isPt
                  ? 'Implementamos salvaguardas técnicas e administrativas contínuas para proteger os dados pessoais contra acessos não autorizados, vazamentos acidentais ou destruição ilícita. Seus dados de contato comercial são retidos apenas durante o período necessário para formalização da proposta e execução dos serviços contratados, sendo arquivados ou excluídos com segurança após o término da relação comercial.'
                  : 'We maintain technical and organizational safeguards to protect personal data against unauthorized access, loss, or unlawful processing. Contact records are retained only for the duration needed to fulfill project proposals and commercial agreements, after which they are securely archived or deleted.'}
              </p>
            </section>

            {/* 7. Contato */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>07</span>
                {isPt ? 'Dúvidas e Contato com o DPO' : 'Questions and Contact'}
              </h2>
              <p className={styles.sectionParagraph}>
                {isPt
                  ? 'Para exercer qualquer um dos seus direitos de titular ou tirar dúvidas sobre esta Política de Privacidade, entre em contato diretamente pelo e-mail:'
                  : 'To exercise your data subject rights or clarify questions regarding this Privacy Policy, reach out directly via:'}
              </p>
              <div className={styles.contactBox}>
                <div className={styles.contactItem}>
                  <div className={styles.contactLabel}>{isPt ? 'E-mail Oficial' : 'Official Email'}</div>
                  <a href="mailto:alexandergoncalvesdev@gmail.com" className={styles.contactValue}>
                    alexandergoncalvesdev@gmail.com
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactLabel}>{isPt ? 'Atendimento WhatsApp' : 'WhatsApp Desk'}</div>
                  <a href="/whatsapp" target="_blank" rel="noreferrer" className={styles.contactValue}>
                    +55 (38) 99902-3012
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
