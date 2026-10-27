import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suporte de TI & Sustentação de Sistemas',
  description:
    'Suporte de TI, manutenção preventiva e evolução contínua de sistemas web, ERPs e infraestrutura digital pela Lexon Digital.',
  keywords: [
    'suporte de ti',
    'sustentação de sistemas',
    'manutenção de sistemas web',
    'gestão de infraestrutura de ti',
    'suporte técnico sistemas'
  ],
  alternates: {
    canonical: '/servicos/suporte-ti',
  },
  openGraph: {
    title: 'Suporte de TI & Sustentação de Sistemas • Lexon Digital',
    description:
      'Acompanhamento técnico, manutenção preventiva e evolução de sistemas e infraestrutura digital para empresas.',
    url: '/servicos/suporte-ti',
  },
}

export default function SuporteTiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
