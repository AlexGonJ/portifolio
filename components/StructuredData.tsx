import { SITE_URL, SEO_CONFIG } from '@/lib/seo'

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization'],
    '@id': `${SITE_URL}/#organization`,
    name: SEO_CONFIG.name,
    alternateName: 'Alexander Gonçalves - Lexon Digital',
    url: SITE_URL,
    logo: `${SITE_URL}/lexon.jpeg`,
    image: `${SITE_URL}/og-image.png`,
    description: SEO_CONFIG.description,
    founder: {
      '@type': 'Person',
      name: SEO_CONFIG.founder,
      jobTitle: 'Fundador & Engenheiro de Software / Diretor Criativo',
      url: SITE_URL,
      sameAs: [
        SEO_CONFIG.socials.linkedin,
        SEO_CONFIG.socials.github,
        SEO_CONFIG.socials.instagram,
      ],
    },
    email: SEO_CONFIG.contact.email,
    sameAs: [
      SEO_CONFIG.socials.instagram,
      SEO_CONFIG.socials.linkedin,
      SEO_CONFIG.socials.github,
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Brazil',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Worldwide',
      },
    ],
    knowsAbout: [
      'Web Development',
      'Next.js & React',
      'UI/UX Design',
      'Design Estratégico',
      'Landing Pages de Alta Conversão',
      'Search Engine Optimization (SEO)',
      'Chatbots WhatsApp e Automação',
      'Sistemas Web e ERPs',
      'Identidade Visual e Branding',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços e Soluções Digitais',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desenvolvimento Web Personalizado & Landing Pages',
            description:
              'Criação de websites institucionais, landing pages de alta conversão e sistemas sob medida com Next.js, SEO avançado e performance máxima.',
            url: `${SITE_URL}/servicos/desenvolvimento`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing & Imagem (Branding e Design)',
            description:
              'Soluções completas de identidade visual, logotipos, branding estratégico, materiais gráficos e comunicação visual premium.',
            url: `${SITE_URL}/servicos/marketing-imagem`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automações & Chatbots Inteligentes no WhatsApp',
            description:
              'Atendimento automatizado 24h via WhatsApp para qualificação de leads, agendamentos e suporte com scripts persuasivos.',
            url: `${SITE_URL}/servicos/chatbots`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sistema Fiscal de Emissão de Notas',
            description:
              'Emissor de notas fiscais prático, seguro e integrado com as secretarias da fazenda para automatizar o faturamento.',
            url: `${SITE_URL}/servicos/sistema-fiscal`,
          },
        },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SEO_CONFIG.name,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: ['pt-BR', 'en'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qual retorno posso esperar do investimento?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Clientes reportam aumento nas conversões e na percepção de valor da marca após o lançamento. Projetos bem estruturados com design e engenharia estratégica geram aumento médio de 32% no faturamento e multiplicam a taxa de conversão.',
        },
      },
      {
        '@type': 'Question',
        name: 'Por que investir em design profissional e desenvolvimento sob medida em vez de templates ou IA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Templates e IA entregam resultados genéricos que comunicam ao cliente que o seu negócio também é comum. Um projeto sob medida posiciona sua marca como autoridade premium, justifica preços maiores e cria uma experiência pensada para o seu cliente, carregando em milissegundos com SEO impecável.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual é o prazo e como funciona o processo de desenvolvimento?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Projetos duram entre 2 e 8 semanas, divididos em 4 fases claras: Discovery (análise do negócio e concorrência), Demo (prototipagem e design de alta fidelidade), Build (código em Next.js com SEO e animações) e Validação (testes e suporte contínuo).',
        },
      },
      {
        '@type': 'Question',
        name: 'A Lexon Digital faz desenvolvimento de software ou apenas design?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Entregamos a solução completa ponta a ponta: do posicionamento estratégico e identidade visual até a arquitetura de software, desenvolvimento frontend e backend, APIs e publicação em produção.',
        },
      },
      {
        '@type': 'Question',
        name: 'Vocês atendem clientes em todo o Brasil e no exterior?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. Atendemos clientes em todo o Brasil e internacionalmente com comunicação ágil, reuniões estratégicas online e suporte contínuo.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
