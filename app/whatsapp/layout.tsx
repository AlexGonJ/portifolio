import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atendimento via WhatsApp',
  robots: { index: false, follow: false },
}

export default function WhatsappLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
