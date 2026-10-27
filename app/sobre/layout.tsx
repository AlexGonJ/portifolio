import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre a Lexon Digital • Engenharia de Software, Sites, TI & Informática',
  description:
    'Conheça a Lexon Digital: empresa especializada em desenvolvimento de software sob medida, criação de sites profissionais, suporte de TI e soluções em informática corporativa em Belo Horizonte, Diamantina e todo o Brasil.',
  keywords: [
    'sobre lexon digital',
    'empresa de software',
    'empresa de ti',
    'desenvolvimento de software minas gerais',
    'criacao de sites belo horizonte',
    'suporte ti diamantina',
    'soluções de informática para empresas',
  ],
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    title: 'Sobre a Lexon Digital • Soluções em Software, Sites & Suporte de TI',
    description:
      'Conheça nossa metodologia de 4 fases (Discovery, Demo, Build e Validação) e como impulsionamos empresas com sistemas sob medida, sites de alta conversão e suporte em TI em Belo Horizonte, Diamantina e todo o Brasil.',
    url: '/sobre',
  },
}

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
