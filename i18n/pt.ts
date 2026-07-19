import { TranslatorProps } from './en'

export const pt: TranslatorProps = {
  nav: {
    about: 'Sobre',
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
      'Projeto sites e marcas que não apenas impressionam, eles vendem. Cada decisão é guiada por um objetivo: fazer o seu negócio crescer.',
    description:
      'Design não é decoração, é a engrenagem silenciosa por trás de cada venda. Combino estética premium com estratégia de conversão para entregar projetos que geram resultado mensurável.',
    ctaText: 'Conheça meu processo',
    availableText: 'Disponível',
  },
  services: {
    label: 'Serviços & Soluções',
    title: 'O que construímos para sua empresa.',
    description:
      'Soluções tecnológicas e visuais desenvolvidas para otimizar processos, fortalecer sua marca e impulsionar vendas.',
    items: [
      {
        title: 'Desenvolvimento Personalizado',
        description:
          'Sites institucionais, landing pages e sistemas sob medida com aparência premium, performance e foco em conversão.',
        details: ['Sites otimizados para SEO', 'Sistemas web personalizados', 'Interfaces focadas em conversão'],
        link: '/servicos/desenvolvimento',
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
        link: 'https://lexonagendamento.vercel.app/', // Link externo
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
    ],
    ctaText: 'Solicitar orçamento',
  },
  selectedWork: {
    label: 'Projetos Selecionados',
    moreWork: 'Ver mais',
    view: 'VER',
    projects: [
      { title: 'Plataforma web', meta: 'Website e Sistema ERP' },
      { title: 'Identidade de Marca', meta: 'Branding e Design' },
      { title: 'Plataforma Web Editorial', meta: 'Website e Animações GSAP — Moda Agency' },
    ],
  },
  motionShowcase: {
    meta1: 'Estratégia e execução',
    meta2: 'Crescimento real',
    kicker: 'O que eu faço por você',
    bottomNote:
      'Web, branding e marketing digital alinhados a um único objetivo: mais receita para o seu negócio.',
    slides: [
      {
        id: '01',
        eyebrow: 'Webdesign and development',
        title: 'Sites que carregam rápido, posicionam no Google e convertem clientes.',
        description:
          'Desenvolvimento com foco em performance, SEO e experiência do usuário. Seus concorrentes perdem clientes por terem sites lentos, você não vai.',
        accent: 'Performance, SEO e conversão',
      },
      {
        id: '02',
        eyebrow: 'Branding',
        title: 'Identidades visuais que fazem o cliente escolher você antes de ler uma só palavra.',
        description:
          'Marca, tipografia, paleta e sistema visual construídos para transmitir valor premium e justificar preços mais altos. Sua marca vira seu melhor vendedor.',
        accent: 'Marca, posicionamento e valor percebido',
      },
      {
        id: '03',
        eyebrow: 'Digital marketing',
        title: 'Marketing visual que faz parar na tela e transforma seguidores em compradores.',
        description:
          'Conteúdo para Instagram, campanhas visuais e direção criativa que geram engajamento real e enchem a DM de mensagens de clientes interessados.',
        accent: 'Conteúdo, engajamento e vendas',
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
    asideMeta2: 'Vagas limitadas em 2026',
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
    serviceLabel: 'Qual serviço você precisa?',
    serviceWebsite: 'Website',
    serviceBranding: 'Branding',
    serviceMarketing: 'Marketing',
    serviceOther: 'Outro',
    messagePlaceholder: 'Qual desafio do seu negócio posso resolver?',
    submit: 'Enviar mensagem',
    sending: 'Enviando...',
    success: 'Mensagem enviada com sucesso!',
    error: 'Ocorreu um erro. Tente novamente.',
    trustFree: 'Orçamento gratuito',
    trust24h: 'Resposta em 24h',
    trustNoStrings: 'Sem compromisso',
    orWhatsapp: 'ou converse direto',
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
  },
  socialLinks: [
    { label: 'Instagram', url: 'https://www.instagram.com/lexon.digital/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alexander-goncalvesdev/' },
    { label: 'WhatsApp', url: 'https://wa.me/5538999023012' },
  ],
}
