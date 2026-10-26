import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case De Olho Multas (Localiza Multas) • Plataforma de Conversão',
  description:
    'Estudo de caso da plataforma de consulta e captação de recursos de trânsito que aumentou a conversão em 47% com interface intuitiva e fluida.',
  alternates: {
    canonical: '/work/localiza-multas',
  },
  openGraph: {
    title: 'Case de Sucesso: De Olho Multas • Lexon Digital',
    description:
      'Como redesenhamos a plataforma de consulta para triplicar a velocidade de atendimento e disparar as contratações.',
    url: '/work/localiza-multas',
  },
}

export default function LocalizaMultasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
