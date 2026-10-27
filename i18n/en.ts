export const en = {
  nav: {
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    menu: 'Menu',
    socials: 'Socials',
  },
  hero: {
    eyebrow: 'Strategic Design & Engineering — Lexon Digital',
    title1: 'Brands that sell more start with',
    title2: 'decisions that convert',
    description:
      'Custom software engineering, high-converting websites, IT solutions and computer support for businesses seeking market leadership.',
    ctaEyebrow: 'Next step',
    ctaLabel: 'Request a quote',
    ctaSecondaryLabel: 'See the work',
    hint: 'Move across the form',
    hintTouch: 'Touch the form',
    scrollText: 'Scroll',
    whatsappTooltip: 'Contact us',
  },
  about: {
    title:
      'We engineer custom software, build high-performance websites, and provide enterprise IT support to accelerate your company.',
    description:
      'Lexon Digital combines high-performance software engineering, conversion-focused web development, IT management, and computer systems support. Serving clients across Belo Horizonte, Diamantina, and throughout Brazil and worldwide.',
    ctaText: 'Explore our process',
    availableText: 'Agency Structure',
  },
  services: {
    label: 'Services & Solutions',
    title: 'What we build for your business.',
    description:
      'Complete solutions in software engineering, website development, IT infrastructure, and technical support designed to drive scalable growth.',
    items: [
      {
        title: 'Software & Website Development',
        description:
          'Institutional websites, high-converting landing pages, and bespoke software/ERP systems with maximum performance and SEO.',
        details: ['Custom Software & Web Systems', 'Websites & High-Converting Landing Pages', 'Advanced Google SEO Optimization', 'Serving BH, Diamantina & Nationwide'],
        link: '/servicos/desenvolvimento',
        isExternal: false
      },
      {
        title: 'E-commerce',
        description:
          'Complete, scalable online stores with high-conversion checkout, catalog management, and payment and shipping integrations.',
        details: ['Custom online stores', 'Fast high-conversion checkout', 'Payment & shipping integration', 'Product & inventory management'],
        link: '/servicos/desenvolvimento#ecommerce',
        isExternal: false
      },
      {
        title: 'Marketing & Image',
        description:
          'Complete design and audiovisual solutions: logo creation, branding, video recording/editing, Instagram posts, and visual communication (signs, facades, t-shirts).',
        details: ['Branding & Logos', 'Social Media & Banners', 'Video Recording & Editing', 'Signs, Facades & T-shirts'],
        link: '/servicos/marketing-imagem',
        isExternal: false
      },
      {
        title: 'Lexon Scheduling',
        description:
          'Complete online scheduling platform for clinics, salons and independent professionals. Reduce no-shows and organize your agenda.',
        details: ['Automatic reminders (WhatsApp)', 'Team and schedule management', 'Advance payment'],
        link: 'https://lexonagendamento.vercel.app/',
        isExternal: true
      },
      {
        title: 'Tax Invoice System',
        description:
          'Practical and secure invoice issuer, integrated with tax authorities to speed up your business billing.',
        details: ['Simplified issuance', 'Secure cloud storage', 'Accounting integration'],
        link: '/servicos/sistema-fiscal',
        isExternal: false
      },
      {
        title: 'Automations & Smart Chatbots',
        description:
          'Automated 24/7 service via WhatsApp and website. Answer customers, qualify leads and sell on autopilot.',
        details: ['Simultaneous service', 'System integration', 'Sales-focused scripts'],
        link: '/servicos/chatbots',
        isExternal: false
      },
      {
        title: 'IT Support & Systems Management',
        description:
          'Expert IT support, preventive maintenance, infrastructure management, and continuous evolution for business operations.',
        details: ['IT Support & Systems Maintenance', 'Corporate IT solutions', 'Serving BH, Diamantina & Nationwide'],
        link: '/servicos/suporte-ti',
        isExternal: false
      },
    ],
    ctaText: 'Request a quote',
  },
  selectedWork: {
    label: 'Selected Work',
    moreWork: 'More work',
    view: 'VIEW',
    projects: [
      { title: 'Web Platform', meta: 'Website & ERP System — 2025' },
      { title: 'Brand Identity', meta: 'Branding & Design — 2024' },
      { title: 'Editorial Web Platform', meta: 'Website & GSAP Animations — 2024' },
    ],
  },
  motionShowcase: {
    meta1: 'Strategy & execution',
    meta2: '03 Pillars — 05 Case Studies',
    kicker: 'What I do for you • Selected Work',
    heading: 'Capabilities proven by real projects in production.',
    subhead:
      'Hover or select a project inside each pillar to preview the case study, or click to explore the full execution.',
    casesLabel: 'Selected projects in this pillar',
    viewCase: 'View case',
    viewCursor: 'VIEW',
    moreWork: 'Explore all 05 projects',
    bottomNote:
      'Web, branding and digital marketing aligned to a single goal: more revenue for your business.',
    slides: [
      {
        id: '01',
        eyebrow: 'Webdesign, Systems & E-commerce',
        title: 'Websites, stores and systems built to convert.',
        description:
          'Fast architecture, SEO and high-craft UX designed to turn visitors into clients.',
        accent: 'Performance, SEO & conversion',
        cases: [
          {
            title: 'Localiza Multas',
            role: 'Web Platform & ERP',
            year: '2025',
            tags: ['Next.js', 'ERP', 'SEO'],
            href: '/work/localiza-multas',
          },
          {
            title: 'Vitrine Masculina',
            role: 'Full-Stack E-commerce',
            year: '2026',
            tags: ['Medusa v2', 'Checkout', 'Next.js'],
            href: '/work/vitrine-masculina',
          },
        ],
      },
      {
        id: '02',
        eyebrow: 'Branding & Visual Identity',
        title: 'Brands that sell before a single word is read.',
        description:
          'Visual identity, typography and commercial storefronts crafted to command premium value.',
        accent: 'Brand, positioning & value',
        cases: [
          {
            title: 'Dra. Aline Gonçalves',
            role: 'Brand Identity',
            year: '2026',
            tags: ['Branding', 'Identity', 'Strategy'],
            href: '/work/aline-goncalves',
          },
          {
            title: 'Via Bike Rebranding',
            role: 'Brand & 3D Storefront',
            year: '2026',
            tags: ['Rebranding', 'Storefront', 'Signage'],
            href: '/work/via-bike',
          },
        ],
      },
      {
        id: '03',
        eyebrow: 'Creative Direction & Digital Marketing',
        title: 'Visual direction that turns attention into revenue.',
        description:
          'Immersive editorial web platforms, video production and campaigns built to spark desire.',
        accent: 'Motion, campaigns & sales',
        cases: [
          {
            title: 'Moda Agency',
            role: 'Editorial Platform & GSAP',
            year: '2026',
            tags: ['Editorial', 'GSAP', 'Next.js'],
            href: '/work/moda-agency',
          },
          {
            title: 'Via Bike Campaign',
            role: 'Audiovisual & Campaign',
            year: '2026',
            tags: ['Video', 'Campaign', 'Direction'],
            href: '/work/via-bike',
          },
        ],
      },
    ],
  },
  editorialBreak: {
    label: 'Our philosophy',
    track1: 'DESIGN THAT SELLS • ',
    track2: 'BRANDS THAT GROW • ',
    track3: 'REAL RESULTS • ',
    statement1: "It's not just beautiful.",
    statement2: "It's profitable.",
    support:
      'Before any pixel, I evaluate your business. Every project starts with a strategic analysis, from brand positioning to team operations. The result is a tailored solution: design that sells, systems that organize, and tools that make your company run better.',
  },
  contact: {
    label: 'Next step',
    title1: 'Your growth',
    title2: 'starts here',
    asideLead:
      "Ready for a website that converts, a brand that sells, and a digital presence that drives results? Let's talk.",
    asideMeta1: 'Brazil / Remote',
    asideMeta2: 'Response within 24h',
  },
  resultCards: {
    cards: [
      { number: '60+', label: 'Projects that drove results' },
      { number: '+32%', label: 'Average growth with strategic design' },
      { number: '3x', label: 'Average increase in conversion' },
      { number: '5+', label: 'Years transforming businesses' },
    ],
  },
  contactForm: {
    namePlaceholder: "What's your name?",
    emailPlaceholder: 'Your email address',
    phonePlaceholder: 'Phone / WhatsApp number',
    serviceLabel: 'What service do you need?',
    serviceWebsite: 'Website / System',
    serviceBranding: 'Branding',
    serviceMarketing: 'Marketing',
    serviceOther: 'Other',
    messagePlaceholder: 'What business challenge can I help you solve?',
    submit: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'An error occurred. Please try again.',
    trust24h: 'Response within 24h',
    orWhatsapp: 'or chat directly',
    phoneOrWhatsappLabel: 'Direct Phone & WhatsApp',
    whatsappLabel: 'Chat on WhatsApp',
  },
  faq: {
    label: 'Details',
    title: 'Frequently asked questions.',
    questions: [
      {
        q: 'What return can I expect from investing with Lexon Digital?',
        a: "Clients report notable increases in conversions and brand valuation after launch. Our solutions blend high-performance software engineering with strategic design to maximize ROI and operational velocity.",
      },
      {
        q: 'Why invest in custom software and bespoke websites instead of templates or generic AI?',
        a: "Templates and generic tools deliver sluggish, generic outputs that fail to reflect your business value. Custom engineering ensures millisecond speed, dominant Google SEO, and flawless execution tailored to your specific business logic.",
      },
      {
        q: 'Does Lexon Digital serve companies in Belo Horizonte and Diamantina?',
        a: 'Yes! We have an established regional presence in Belo Horizonte (BH), Diamantina, and throughout Minas Gerais, delivering software development, website creation, IT support, and enterprise systems, as well as nationwide and global remote delivery.',
      },
      {
        q: 'Does Lexon Digital develop custom software and provide IT support, or just web design?',
        a: "We deliver full-cycle solutions: from strategic positioning and high-converting websites to complex software engineering, ERP/CRM systems, continuous IT support, and cloud infrastructure.",
      },
      {
        q: 'What is the average project timeline and process?',
        a: 'Projects typically span 2 to 8 weeks through structured phases: Discovery (strategic immersion), Demo (UI/UX architecture and prototyping), Build (software engineering and SEO), and Validation with continuous support.',
      },
    ],
    ctaText: 'Questions resolved? Let\'s talk',
  },
  testimonials: {
    label: 'Testimonials',
    title: 'What clients say about the work.',
    ctaText: 'Want results like these?',
    items: [
      {
        quote: 'Lexon Digital delivered much more than a website — they delivered a sales engine. Our organic traffic tripled and conversion rate increased 47% in the first month.',
        name: 'Joanna Dias',
        role: 'Lawyer — Joanna Dias Office',
      },
      {
        quote: 'Our old site was generic and didn\'t convey trust. After the rebranding and new website, we started closing bigger clients and charging more for our service.',
        name: 'Rafael Martins',
        role: 'CEO — De Olho Multas',
      },
      {
        quote: 'Professionalism and strategic vision. The Lexon team doesn\'t just understand technology and design, they understand business. Every decision was backed by conversion logic.',
        name: 'Camila Souza',
        role: 'Marketing Director — VIA Express',
      },
    ],
  },
  footer: {
    topLine1: 'Strategic projects for brands that want to sell more',
    topLine2: 'Available in Belo Horizonte, Diamantina & Worldwide',
    kicker: 'Final step',
    title1: 'YOUR RESULT',
    title2: 'STARTS IN THE NEXT',
    title3: 'CONVERSATION',
    copy:
      "While you're thinking, your competitor is already investing in digital presence and software. Strategic engineering is the difference between growing and falling behind.",
    orbOrbit: 'REQUEST A QUOTE • REQUEST A QUOTE •',
    orbEyebrow: 'Start a project',
    orbLabel: 'Contact us',
    orbMeta: 'Response within 24h',
    localTime: 'Local Time',
    privacyPolicy: 'Privacy Policy',
    cookieSettings: 'Cookie Preferences',
  },
  socialLinks: [
    { label: 'Instagram', url: 'https://www.instagram.com/lexon.digital/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/lexondigital/' },
    { label: 'WhatsApp', url: '/whatsapp' },
  ],
  cookieConsent: {
    title: 'We value your privacy',
    description:
      'We use essential cookies to ensure the website functions properly, and with your consent, marketing and analytics cookies (such as Meta Pixel) to improve your experience and measure campaigns in compliance with LGPD and GDPR.',
    acceptAll: 'Accept All',
    rejectNonEssential: 'Reject Optional',
    customize: 'Customize',
    savePreferences: 'Save Preferences',
    privacyLinkText: 'Learn more in our Privacy Policy',
    preferencesTitle: 'Cookie Preferences Center',
    preferencesDesc:
      'Manage your cookie choices. Third-party scripts and marketing pixels (Meta Pixel) will remain blocked until you give explicit consent.',
    essentialTitle: 'Strictly Necessary',
    essentialDesc:
      'Required for core site features, security, and storing your privacy preferences. Cannot be disabled.',
    analyticsTitle: 'Analytics & Performance',
    analyticsDesc:
      'Helps us understand how visitors interact with the site so we can continuously improve user experience.',
    marketingTitle: 'Marketing & Third-Party Pixels (Meta)',
    marketingDesc:
      'Activates the Meta (Facebook) Pixel to measure campaign conversions, track interactions (such as WhatsApp clicks), and provide relevant advertising.',
    alwaysActive: 'Always Active',
    close: 'Close',
  },
}

export type TranslatorProps = typeof en
