import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Moda Agency • Vitrine Editorial de Modelos de Alto Padrão',
  description:
    'Estudo de caso do site da agência Moda Agency: estética editorial minimalista, transições fluidas e portfólio de casting interativo.',
  alternates: {
    canonical: '/work/moda-agency',
  },
  openGraph: {
    title: 'Case de Sucesso: Moda Agency • Lexon Digital',
    description:
      'Design editorial sofisticado projetado para conectar modelos a grandes marcas da moda mundial.',
    url: '/work/moda-agency',
  },
}

export default function ModaAgencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
