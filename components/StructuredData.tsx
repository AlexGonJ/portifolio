import { SITE_URL, SEO_CONFIG } from '@/lib/seo'

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: SEO_CONFIG.name,
    alternateName: [
      'Lexon Digital — Software, Sites & TI',
      'Lexon Digital Tecnologia',
      'Lexon Digital Suporte e Informática',
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/lexon.jpeg`,
    image: `${SITE_URL}/og-image.png`,
    description: SEO_CONFIG.description,
    email: SEO_CONFIG.contact.email,
    telephone: SEO_CONFIG.contact.phone,
    priceRange: '$$',
    sameAs: [
      SEO_CONFIG.socials.instagram,
      SEO_CONFIG.socials.linkedin,
      SEO_CONFIG.socials.github,
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'MG',
      addressCountry: 'BR',
      description: 'Atendimento corporativo e projetos em Diamantina, Belo Horizonte e todo o Brasil',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Diamantina',
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Minas Gerais',
        },
      },
      {
        '@type': 'City',
        name: 'Belo Horizonte',
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Minas Gerais',
        },
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Minas Gerais',
      },
      {
        '@type': 'Country',
        name: 'Brasil',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Worldwide',
      },
    ],
    knowsAbout: [
      'Desenvolvimento de Software',
      'Fábrica de Software e Sistemas Web',
      'Tecnologia da Informação (TI)',
      'Consultoria e Gestão em TI',
      'Criação de Sites Profissionais e Portais',
      'Landing Pages de Alta Conversão',
      'Suporte de TI e Sustentação de Sistemas',
      'Informática Corporativa e Manutenção',
      'Desenvolvimento de Software em Belo Horizonte',
      'Criação de Sites em Belo Horizonte',
      'Suporte de TI em Belo Horizonte',
      'Desenvolvimento de Software em Diamantina',
      'Criação de Sites em Diamantina',
      'Suporte de TI e Informática em Diamantina',
      'Next.js, React e TypeScript',
      'Search Engine Optimization (SEO)',
      'Chatbots WhatsApp e Automação de Processos',
      'Sistemas Web, ERP e CRM sob Medida',
      'Sistemas Fiscais e Emissão de Notas',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo de Soluções em Tecnologia, Software, Sites e TI',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desenvolvimento de Software & Sistemas Sob Medida',
            description:
              'Engenharia de software personalizada, sistemas ERP, CRM e plataformas corporativas desenvolvidas sob medida com alta escalabilidade e segurança.',
            url: `${SITE_URL}/servicos/desenvolvimento`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Criação de Sites Profissionais & Landing Pages',
            description:
              'Criação de websites institucionais rápidos, responsivos e otimizados para SEO e conversão de clientes em Belo Horizonte, Diamantina e todo o Brasil.',
            url: `${SITE_URL}/servicos/desenvolvimento`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Suporte de TI & Gestão de Informática Empresarial',
            description:
              'Acompanhamento técnico contínuo, manutenção preventiva, infraestrutura e sustentação de sistemas e informática para empresas.',
            url: `${SITE_URL}/servicos/suporte-ti`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automações & Chatbots Inteligentes para WhatsApp',
            description:
              'Atendimento automatizado 24h via WhatsApp para qualificação de leads, agendamentos e suporte integrado a sistemas.',
            url: `${SITE_URL}/servicos/chatbots`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sistema Fiscal de Emissão de Notas em Nuvem',
            description:
              'Emissor de notas fiscais (NF-e, NFS-e) seguro, prático e integrado às secretarias da fazenda para automação de faturamento.',
            url: `${SITE_URL}/servicos/sistema-fiscal`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing & Imagem (Branding e Design Estratégico)',
            description:
              'Identidade visual de alto padrão, posicionamento de marca, design comercial e estratégias para aumentar o valor percebido.',
            url: `${SITE_URL}/servicos/marketing-imagem`,
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
        name: 'A Lexon Digital desenvolve software e sistemas personalizados?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. Desenvolvemos softwares completos sob medida, incluindo sistemas ERP, CRM, plataformas web, painéis de gestão e integrações de APIs, projetados especificamente para a regra de negócio da sua empresa.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como funciona a criação de sites profissionais pela Lexon Digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Criamos sites institucionais e landing pages de alta conversão arquitetados com Next.js, SEO avançado para ranqueamento no Google, carregamento instantâneo em milissegundos e design responsivo premium.',
        },
      },
      {
        '@type': 'Question',
        name: 'A Lexon Digital oferece suporte de TI e manutenção de informática para empresas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. Oferecemos suporte de TI contínuo, manutenção corretiva e preventiva de sistemas, gestão de infraestrutura digital, suporte técnico e consultoria em informática para manter a operação das empresas sempre estável e segura.',
        },
      },
      {
        '@type': 'Question',
        name: 'A Lexon Digital atende em Belo Horizonte e Diamantina - MG?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. Atendemos com destaque regional em Belo Horizonte, Diamantina e todo o estado de Minas Gerais, prestando serviços presenciais ou remotos de desenvolvimento de software, criação de sites, suporte de TI e informática corporativa, além de clientes em todo o Brasil.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual o prazo médio de entrega de um projeto com a Lexon Digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O ciclo típico dura entre 2 e 8 semanas, passando pelas etapas de Discovery (imersão no negócio), Demo (direção de arte e prototipagem), Build (engenharia de software e SEO) e Validação (testes de performance e estabilidade).',
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
