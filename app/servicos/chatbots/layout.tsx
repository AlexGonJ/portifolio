import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automações & Chatbots Inteligentes para WhatsApp • Lexon Digital',
  description:
    'Chatbots com atendimento 24/7 no WhatsApp e no site. Qualifique leads automaticamente, reduza tempo de resposta, aumente vendas e integre com seu sistema.',
  keywords: [
    'chatbots para whatsapp',
    'atendimento automatizado whatsapp',
    'automação de vendas whatsapp',
    'chatbot ia empresa',
    'qualificação de leads whatsapp'
  ],
  alternates: {
    canonical: '/servicos/chatbots',
  },
  openGraph: {
    title: 'Automações & Chatbots Inteligentes no WhatsApp • Lexon Digital',
    description:
      'Atenda clientes instantaneamente 24h por dia e venda no piloto automático com scripts persuasivos e integrações robustas.',
    url: '/servicos/chatbots',
  },
}

export default function ChatbotsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
