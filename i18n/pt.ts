import { TranslatorProps } from './en'

export const pt: TranslatorProps = {
  nav: {
    about: 'Sobre',
    services: 'Serviços',
    projects: 'Projetos',
    contact: 'Contato',
    menu: 'Menu',
    socials: 'Redes Sociais',
  },
  hero: {
    title1: 'Marcas que vendem mais começam com',
    title2: 'decisões que convertem',
    description:
      'Estratégia visual, sites e identidades que transformam visitantes em clientes com design premium que posiciona sua marca acima da concorrência.',
    ctaEyebrow: 'Próximo passo',
    ctaLabel: 'Solicitar orçamento',
    ctaSecondaryLabel: 'Ver projetos',
    scrollText: 'Scroll',
    whatsappTooltip: 'Fale comigo',
  },
  about: {
    title:
      'Criamos marcas, sites e ecossistemas digitais que impulsionam vendas e posicionam empresas como líderes do seu segmento.',
    description:
      'Design e tecnologia não são ornamentos, são a engrenagem estratégica por trás do crescimento da sua empresa. Nossa agência une posicionamento de marca, experiência de usuário e engenharia de alta performance para acelerar seus resultados.',
    ctaText: 'Conheça nosso processo',
    availableText: 'Estrutura de Agência',
  },
  services: {
    label: 'Serviços & Soluções',
    title: 'O que construímos para sua empresa.',
    description:
      'Soluções tecnológicas e visuais desenvolvidas para otimizar processos, fortalecer sua marca e impulsionar vendas.',
    items: [
      {
        title: 'Desenvolvimento Web',
        description:
          'Sites institucionais, landing pages e sistemas web sob medida com aparência premium, alta performance e foco em conversão.',
        details: ['Sites institucionais & Landing Pages', 'Otimização avançada para SEO', 'Sistemas web personalizados', 'Interfaces focadas em conversão'],
        link: '/servicos/desenvolvimento',
        isExternal: false
      },
      {
        title: 'E-commerce',
        description:
          'Lojas virtuais completas e escaláveis com checkout de alta conversão, gestão de catálogo e integração com meios de pagamento e logística.',
        details: ['Lojas virtuais sob medida', 'Checkout rápido de alta conversão', 'Integração com pagamentos e frete', 'Gestão de produtos e estoque'],
        link: '/servicos/desenvolvimento#ecommerce',
        isExternal: false
      },
      {
        title: 'Marketing & Imagem',
        description:
          'Soluções completas de design e audiovisual: criação de logos, branding, edição e gravação de vídeos, artes para Instagram e comunicação visual (placas, fachadas, camisas).',
        details: ['Branding & Logotipos', 'Redes Sociais & Artes', 'Edição & Gravação de Vídeos', 'Placas, Fachadas & Camisas'],
        link: '/servicos/marketing-imagem',
        isExternal: false
      },
      {
        title: 'Lexon Agendamento',
        description:
          'Plataforma completa de agendamento online para clínicas, salões e profissionais autônomos. Reduza faltas e organize sua agenda.',
        details: ['Lembretes automáticos (WhatsApp)', 'Gestão de equipe e horários', 'Pagamento antecipado'],
        link: 'https://lexonagendamento.vercel.app/',
        isExternal: true
      },
      {
        title: 'Sistema Fiscal de Emissão de Notas',
        description:
          'Emissor de notas fiscais prático e seguro, integrado com as secretarias da fazenda para agilizar o faturamento do seu negócio.',
        details: ['Emissão simplificada', 'Armazenamento seguro em nuvem', 'Integração contábil'],
        link: '/servicos/sistema-fiscal',
        isExternal: false
      },
      {
        title: 'Automações & Chatbots Inteligentes',
        description:
          'Atendimento automatizado 24h via WhatsApp e site. Responda clientes, qualifique leads e venda no piloto automático.',
        details: ['Atendimento simultâneo', 'Integração com sistemas', 'Scripts focados em vendas'],
        link: '/servicos/chatbots',
        isExternal: false
      },
      {
        title: 'Suporte de TI & Sistemas',
        description:
          'Acompanhamento técnico, manutenção preventiva e evolução contínua para os sistemas e a estrutura digital da sua empresa.',
        details: ['Manutenção e evolução de sistemas', 'Suporte técnico empresarial', 'Monitoramento e estabilidade'],
        link: '/servicos/suporte-ti',
        isExternal: false
      },
    ],
    ctaText: 'Solicitar orçamento',
  },
  selectedWork: {
    label: 'Projetos Selecionados',
    moreWork: 'Ver mais',
    view: 'VER',
    projects: [
      { title: 'Plataforma Web', meta: 'Website e Sistema ERP — 2025' },
      { title: 'Identidade de Marca', meta: 'Branding e Design — 2024' },
      { title: 'Plataforma Web Editorial', meta: 'Website e Animações GSAP — 2024' },
    ],
  },
  motionShowcase: {
    meta1: 'Estratégia & execução',
    meta2: '03 Pilares — 05 Cases Reais',
    kicker: 'O que eu faço por você • Projetos Selecionados',
    heading: 'Entrega estratégica provada por projetos reais.',
    subhead:
      'Alterne entre os projetos de cada pilar para visualizar a execução ao vivo ou clique para abrir o estudo de caso completo.',
    casesLabel: 'Projetos selecionados neste pilar',
    viewCase: 'Ver case',
    viewCursor: 'VER',
    moreWork: 'Ver todos os 05 projetos',
    bottomNote:
      'Web, branding e marketing digital alinhados a um único objetivo: mais receita para o seu negócio.',
    slides: [
      {
        id: '01',
        eyebrow: 'Webdesign, Sistemas & E-commerce',
        title: 'Sites, lojas e sistemas feitos para converter.',
        description:
          'Arquitetura rápida, SEO e experiência de alto padrão para transformar cliques em clientes.',
        accent: 'Performance, SEO e conversão',
        cases: [
          {
            title: 'Localiza Multas',
            role: 'Plataforma Web & ERP',
            year: '2025',
            tags: ['Next.js', 'ERP', 'SEO'],
            href: '/work/localiza-multas',
          },
          {
            title: 'Vitrine Masculina',
            role: 'E-commerce Full-Stack',
            year: '2026',
            tags: ['Medusa v2', 'Checkout', 'Next.js'],
            href: '/work/vitrine-masculina',
          },
        ],
      },
      {
        id: '02',
        eyebrow: 'Branding & Identidade Visual',
        title: 'Marcas que vendem antes da primeira palavra.',
        description:
          'Identidade visual, tipografia e fachada comercial construídas para transmitir valor premium.',
        accent: 'Marca, posicionamento e valor',
        cases: [
          {
            title: 'Dra. Aline Gonçalves',
            role: 'Identidade de Marca',
            year: '2026',
            tags: ['Branding', 'Identidade', 'Estratégia'],
            href: '/work/aline-goncalves',
          },
          {
            title: 'Rebranding Via Bike',
            role: 'Marca & Fachada 3D',
            year: '2026',
            tags: ['Rebranding', 'Fachada', 'Sinalização'],
            href: '/work/via-bike',
          },
        ],
      },
      {
        id: '03',
        eyebrow: 'Direção Criativa & Marketing Visual',
        title: 'Direção visual que transforma atenção em receita.',
        description:
          'Plataformas editoriais imersivas, audiovisual e campanhas pensadas para despertar desejo.',
        accent: 'Motion, conteúdo e vendas',
        cases: [
          {
            title: 'Moda Agency',
            role: 'Plataforma Editorial & GSAP',
            year: '2026',
            tags: ['Editorial', 'GSAP', 'Next.js'],
            href: '/work/moda-agency',
          },
          {
            title: 'Via Bike — Campanha',
            role: 'Audiovisual & Campanha',
            year: '2026',
            tags: ['Vídeo', 'Campanha', 'Direção'],
            href: '/work/via-bike',
          },
        ],
      },
    ],
  },
  editorialBreak: {
    label: 'Nossa filosofia',
    track1: 'DESIGN QUE VENDE • ',
    track2: 'MARCAS QUE CRESCEM • ',
    track3: 'RESULTADOS REAIS • ',
    statement1: 'Não é só bonito.',
    statement2: 'É lucrativo.',
    support:
      'Antes de qualquer pixel, eu avalio o seu negócio. Cada projeto nasce de uma análise estratégica, do posicionamento da marca à operação da equipe. O resultado é uma solução sob medida: design que vende, sistemas que organizam e ferramentas que fazem sua empresa funcionar melhor.',
  },
  contact: {
    label: 'Próximo passo',
    title1: 'Seu crescimento',
    title2: 'começa aqui',
    asideLead:
      'Pronto para ter um site que converte, uma marca que vende e um posicionamento digital que gera resultado? Vamos conversar.',
    asideMeta1: 'Brasil / Remoto',
    asideMeta2: 'Resposta em até 24h',
  },
  resultCards: {
    cards: [
      { number: '60+', label: 'Projetos que geraram resultado' },
      { number: '+32%', label: 'Crescimento médio com design estratégico' },
      { number: '3x', label: 'Média de aumento em conversão' },
      { number: '5+', label: 'Anos transformando negócios' },
    ],
  },
  contactForm: {
    namePlaceholder: 'Qual o seu nome?',
    emailPlaceholder: 'Seu endereço de e-mail',
    phonePlaceholder: 'Telefone / WhatsApp com DDD',
    serviceLabel: 'Qual serviço você precisa?',
    serviceWebsite: 'Website / Sistema',
    serviceBranding: 'Branding',
    serviceMarketing: 'Marketing',
    serviceOther: 'Outro',
    messagePlaceholder: 'Qual desafio do seu negócio posso resolver?',
    submit: 'Enviar mensagem',
    sending: 'Enviando...',
    success: 'Mensagem enviada com sucesso!',
    error: 'Ocorreu um erro. Tente novamente.',
    trust24h: 'Resposta em até 24h',
    orWhatsapp: 'ou converse direto',
    phoneOrWhatsappLabel: 'Telefone & WhatsApp direto',
    whatsappLabel: 'Chamar no WhatsApp',
  },
  faq: {
    label: 'Detalhes',
    title: 'Perguntas frequentes.',
    questions: [
      {
        q: 'Qual retorno posso esperar do investimento?',
        a: 'Clientes reportam aumento nas conversões e na percepção de valor da marca após o lançamento. Isso não é custo, é o investimento com maior ROI que você pode fazer no seu negócio.',
      },
      {
        q: 'Por que investir em design profissional em vez de usar templates ou IA?',
        a: 'Templates e IA entregam resultados genéricos que comunicam que seu negócio também é. Eles não entendem a sua marca, seu público ou sua estratégia. Um projeto sob medida posiciona sua marca como premium, justifica preços maiores e cria uma experiência pensada para o seu cliente, algo que nenhum template ou prompt consegue replicar.',
      },
      {
        q: 'Qual é o prazo e como funciona o processo?',
        a: 'Projetos costumam durar entre 2 e 8 semanas, com etapas claras: briefing estratégico, proposta visual, desenvolvimento e entrega com suporte. Você acompanha cada fase e tem revisões incluídas para garantir que o resultado final gere impacto real.',
      },
      {
        q: 'Você também faz desenvolvimento ou só design?',
        a: 'Entrego a solução completa: do posicionamento estratégico ao código em produção. Isso significa que o design não se perde na tradução, cada detalhe visual se transforma exatamente no que converte, usando tecnologias modernas e arquitetura de alta performance.',
      },
      {
        q: 'Você pega projetos internacionais?',
        a: 'Sim. Trabalho com clientes no Brasil e no exterior, com processos assíncronos e checkpoints claros. Fuso horário nunca foi obstáculo, resultado é o que importa.',
      },
    ],
    ctaText: 'Dúvidas resolvidas? Vamos conversar',
  },
  testimonials: {
    label: 'Depoimentos',
    title: 'O que dizem sobre o trabalho.',
    ctaText: 'Quer resultados assim?',
    items: [
      {
        quote: 'O Alex entregou muito mais do que um site — entregou uma ferramenta de vendas. Nosso tráfego orgânico triplicou e a taxa de conversão subiu 47% no primeiro mês.',
        name: 'Joanna Dias',
        role: 'Advogada — Escritório Joanna Dias',
      },
      {
        quote: 'Nosso site antigo era genérico e não transmitia confiança. Depois do rebranding e do novo site, começamos a fechar clientes maiores e a cobrar mais pelo nosso serviço.',
        name: 'Rafael Martins',
        role: 'CEO — De Olho Multas',
      },
      {
        quote: 'Profissionalismo e visão estratégica. O Alex não só entende de design, ele entende de negócio. Cada decisão visual foi justificada com lógica de conversão.',
        name: 'Camila Souza',
        role: 'Diretora de Marketing — VIA Express',
      },
    ],
  },
  footer: {
    topLine1: 'Projetos estratégicos para marcas que querem vender mais',
    topLine2: 'Disponível remotamente',
    kicker: 'Último passo',
    title1: 'SEU RESULTADO',
    title2: 'COMEÇA NA PRÓXIMA',
    title3: 'CONVERSA',
    copy:
      'Enquanto você pensa, seu concorrente já está investindo em presença digital. Design estratégico é a diferença entre crescer ou ficar para trás.',
    orbOrbit: 'SOLICITE UM ORÇAMENTO • SOLICITE UM ORÇAMENTO •',
    orbEyebrow: 'Começar um projeto',
    orbLabel: 'Fale comigo',
    orbMeta: 'Resposta em até 24h',
    localTime: 'Hora local',
    privacyPolicy: 'Política de Privacidade',
    cookieSettings: 'Preferências de Cookies',
  },
  socialLinks: [
    { label: 'Instagram', url: 'https://www.instagram.com/lexon.digital/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alexander-goncalvesdev/' },
    { label: 'WhatsApp', url: '/whatsapp' },
  ],
  cookieConsent: {
    title: 'Valorizamos sua privacidade',
    description:
      'Utilizamos cookies essenciais para o funcionamento do site e, com seu consentimento, cookies de marketing e análise (como o Pixel da Meta) para personalizar sua experiência e mensurar anúncios, em conformidade com a LGPD.',
    acceptAll: 'Aceitar Todos',
    rejectNonEssential: 'Rejeitar Opcionais',
    customize: 'Personalizar',
    savePreferences: 'Salvar Preferências',
    privacyLinkText: 'Saiba mais na nossa Política de Privacidade',
    preferencesTitle: 'Central de Preferências de Cookies',
    preferencesDesc:
      'Gerencie suas escolhas de privacidade. Scripts e pixels de terceiros (Pixel da Meta) permanecem desativados até que você forneça seu consentimento.',
    essentialTitle: 'Estritamente Necessários',
    essentialDesc:
      'Indispensáveis para a navegação, segurança, integridade e armazenamento das suas preferências. Não podem ser desativados.',
    analyticsTitle: 'Análise & Desempenho',
    analyticsDesc:
      'Ajudam a entender como os visitantes navegam no site para aprimorarmos a experiência de uso de forma anônima.',
    marketingTitle: 'Marketing & Pixels de Terceiros (Meta)',
    marketingDesc:
      'Ativa o Pixel da Meta (Facebook/Instagram) para mensurar conversões de campanhas, registrar interações (como cliques para o WhatsApp) e exibir anúncios personalizados.',
    alwaysActive: 'Sempre Ativo',
    close: 'Fechar',
  },
}
