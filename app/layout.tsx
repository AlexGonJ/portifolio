import Providers from './providers'
import './globals.scss'
import CustomCursor from '../components/CustomCursor'
import CodeProtection from '../components/CodeProtection'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CodeProtection />
          <CustomCursor/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
