import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produtos & Soluções SaaS',
  description:
    'Conheça os produtos digitais e plataformas desenvolvidas pela Lexon Digital para acelerar negócios, clínicas e empresas.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Produtos Digitais e Soluções • Lexon Digital',
    description:
      'Plataformas SaaS e ferramentas completas prontas para escalar a gestão e o atendimento da sua empresa.',
    url: '/products',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
