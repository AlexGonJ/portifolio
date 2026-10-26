import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case VIA Bike • Rebranding Comercial & Comunicação Visual',
  description:
    'Estudo de caso do reposicionamento visual, fachadas, uniformes e identidade da rede VIA Bike pela Lexon Digital.',
  alternates: {
    canonical: '/work/via-bike',
  },
  openGraph: {
    title: 'Case de Sucesso: VIA Bike • Lexon Digital',
    description:
      'Identidade marcante e contemporânea no mercado de ciclismo para destacar a marca e atrair novos praticantes.',
    url: '/work/via-bike',
  },
}

export default function ViaBikeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
