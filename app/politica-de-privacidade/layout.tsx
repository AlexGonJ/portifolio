import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade e LGPD',
  description:
    'Política de privacidade e proteção de dados da Lexon Digital em total conformidade com a LGPD (Lei Geral de Proteção de Dados) e GDPR.',
  alternates: {
    canonical: '/politica-de-privacidade',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PoliticaPrivacidadeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
