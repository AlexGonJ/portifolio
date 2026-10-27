import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suporte de TI & Informática para Empresas • Lexon Digital',
  description:
    'Suporte de TI empresarial, assistência em informática, manutenção preventiva e sustentação de sistemas e infraestrutura em Belo Horizonte, Diamantina e todo o Brasil.',
  keywords: [
    'suporte',
    'suporte de ti',
    'informatica',
    'informática',
    'serviços de informática',
    'suporte tecnico informatica',
    'suporte de ti belo horizonte',
    'suporte de ti diamantina',
    'informatica belo horizonte',
    'informatica diamantina',
    'empresa de ti belo horizonte',
    'empresa de ti diamantina',
    'sustentação de sistemas',
    'manutenção de sistemas web',
    'gestão de infraestrutura de ti',
    'suporte técnico sistemas',
  ],
  alternates: {
    canonical: '/servicos/suporte-ti',
  },
  openGraph: {
    title: 'Suporte de TI & Gestão de Informática Empresarial • Lexon Digital',
    description:
      'Acompanhamento técnico, suporte de TI, manutenção preventiva e evolução de sistemas e informática para empresas em Belo Horizonte e Diamantina.',
    url: '/servicos/suporte-ti',
  },
}

export default function SuporteTiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
