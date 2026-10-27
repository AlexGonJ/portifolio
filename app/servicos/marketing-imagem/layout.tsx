import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Branding, Marketing & Imagem',
  description:
    'Criação de logotipos, identidades visuais de alto padrão, direção de arte, vídeos comerciais e comunicação visual completa (fachadas, papelaria, uniformes).',
  keywords: [
    'criação de marca',
    'branding e identidade visual',
    'design de logo profissional',
    'comunicação visual empresas',
    'produção de vídeo comercial'
  ],
  alternates: {
    canonical: '/servicos/marketing-imagem',
  },
  openGraph: {
    title: 'Marketing & Imagem • Branding Estratégico e Design de Alto Padrão',
    description:
      'Construímos marcas fortes que transmitem autoridade, geram confiança imediata e justificam preços maiores no mercado.',
    url: '/servicos/marketing-imagem',
  },
}

export default function MarketingImagemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
