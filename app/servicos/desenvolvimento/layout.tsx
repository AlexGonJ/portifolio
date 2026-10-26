import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desenvolvimento de Sites e Sistemas Sob Medida • Lexon Digital',
  description:
    'Desenvolvimento de websites de alta conversão, landing pages premium, e-commerces e sistemas ERP/CRM em Next.js com carregamento em milissegundos e SEO avançado.',
  keywords: [
    'desenvolvimento de sites',
    'criação de landing page',
    'sistemas sob medida',
    'desenvolvedor next.js',
    'sites de alta conversão',
    'erp sob medida',
    'crm personalizado'
  ],
  alternates: {
    canonical: '/servicos/desenvolvimento',
  },
  openGraph: {
    title: 'Desenvolvimento Web Personalizado & Landing Pages de Alta Conversão',
    description:
      'Sites e sistemas que reduzem custos operacionais, multiplicam faturamento e posicionam sua marca como referência.',
    url: '/servicos/desenvolvimento',
  },
}

export default function DesenvolvimentoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
