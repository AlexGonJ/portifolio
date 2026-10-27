import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desenvolvimento de Software, Criação de Sites & Sistemas • Lexon Digital',
  description:
    'Desenvolvimento de software sob medida, criação de sites profissionais, landing pages de alta conversão e sistemas ERP/CRM em Next.js para empresas em Belo Horizonte, Diamantina e todo o Brasil.',
  keywords: [
    'software',
    'desenvolvimento de software',
    'fábrica de software',
    'sites',
    'criação de sites',
    'desenvolvimento de sites',
    'criação de sites profissionais',
    'criação de landing page',
    'sistemas sob medida',
    'software belo horizonte',
    'desenvolvimento de software belo horizonte',
    'criação de sites belo horizonte',
    'criacao de sites bh',
    'software diamantina',
    'desenvolvimento de software diamantina',
    'criação de sites diamantina',
    'desenvolvedor next.js',
    'sites de alta conversão',
    'erp sob medida',
    'crm personalizado',
  ],
  alternates: {
    canonical: '/servicos/desenvolvimento',
  },
  openGraph: {
    title: 'Desenvolvimento de Software & Criação de Sites • Lexon Digital',
    description:
      'Engenharia de software sob medida e criação de sites profissionais que reduzem custos operacionais, multiplicam faturamento e posicionam sua marca como referência.',
    url: '/servicos/desenvolvimento',
  },
}

export default function DesenvolvimentoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
