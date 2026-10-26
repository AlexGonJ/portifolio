import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Vitrine Masculina • E-commerce Streetwear de Alta Conversão',
  description:
    'Estudo de caso do e-commerce Vitrine Masculina: alta velocidade de carregamento, design urbano marcante e checkout sem atrito.',
  alternates: {
    canonical: '/work/vitrine-masculina',
  },
  openGraph: {
    title: 'Case de Sucesso: Vitrine Masculina • Lexon Digital',
    description:
      'Lojas virtuais com experiência de compra em nível de grife global, integradas e com alta taxa de conversão.',
    url: '/work/vitrine-masculina',
  },
}

export default function VitrineMasculinaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
