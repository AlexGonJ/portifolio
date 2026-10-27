import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato Recebido',
  robots: { index: false, follow: false },
}

export default function ContatoRecebidoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
