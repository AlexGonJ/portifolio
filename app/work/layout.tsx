import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfólio & Casos de Sucesso • Lexon Digital',
  description:
    'Explore nossos cases reais de websites de alta conversão, e-commerces, plataformas web e identidades visuais estratégicas que multiplicaram faturamentos.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Portfólio de Projetos & Resultados • Lexon Digital',
    description:
      'Projetos desenvolvidos com estética premium, Next.js, alta conversão e foco no crescimento do cliente.',
    url: '/work',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
