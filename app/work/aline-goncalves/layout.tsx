import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Aline Gonçalves Advocacia • Reposicionamento & Identidade Visual',
  description:
    'Estudo de caso da criação de identidade visual de luxo e presença digital para o escritório de advocacia Aline Gonçalves pela Lexon Digital.',
  alternates: {
    canonical: '/work/aline-goncalves',
  },
  openGraph: {
    title: 'Case de Sucesso: Aline Gonçalves Advocacia • Lexon Digital',
    description:
      'Posicionamento de marca jurídica sofisticado e elegante que multiplicou a atração de clientes de alto padrão.',
    url: '/work/aline-goncalves',
  },
}

export default function AlineGoncalvesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
