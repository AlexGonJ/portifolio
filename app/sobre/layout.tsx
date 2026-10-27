import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre & Metodologia',
  description:
    'Conheça a Lexon Digital e Alexander Gonçalves. Engenharia de software e design estratégico unindo tecnologia de ponta, performance e posicionamento de marca para empresas.',
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    title: 'Sobre a Lexon Digital • Alexander Gonçalves',
    description:
      'Conheça nossa metodologia de 4 fases (Discovery, Demo, Build e Validação) e como transformamos empresas através de tecnologia e design premium.',
    url: '/sobre',
  },
}

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
