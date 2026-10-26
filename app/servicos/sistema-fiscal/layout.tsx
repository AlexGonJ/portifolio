import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema Fiscal de Emissão de Notas em Nuvem • Lexon Digital',
  description:
    'Emissor prático, ágil e seguro de notas fiscais integrado com as Secretarias da Fazenda (SEFAZ). Emissão de NF-e e NFS-e sem complicações para sua empresa.',
  keywords: [
    'emissor de nota fiscal',
    'emissão de nfe nuvem',
    'sistema fiscal para pequenas empresas',
    'software de faturamento rápido',
    'emissor sefaz integrado'
  ],
  alternates: {
    canonical: '/servicos/sistema-fiscal',
  },
  openGraph: {
    title: 'Sistema Fiscal de Emissão de Notas • Lexon Digital',
    description:
      'Emissão ágil e segura de notas fiscais com armazenamento em nuvem e total conformidade com a SEFAZ.',
    url: '/servicos/sistema-fiscal',
  },
}

export default function SistemaFiscalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
