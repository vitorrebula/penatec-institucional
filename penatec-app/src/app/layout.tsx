import type { Metadata } from 'next'
import { Inter, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PENATEC | Mais de 50 anos de Confiança, Inovação e Excelência',
  description:
    'A PENATEC se destaca pela qualidade, confiança e inovação no fornecimento de produtos e serviços, oferecendo soluções eficientes e suporte especializado para impulsionar o sucesso dos seus clientes.',
  keywords: 'PENATEC, assistência técnica, produtos industriais, suporte especializado, qualidade, inovação',
  openGraph: {
    title: 'PENATEC | Mais de 50 anos de Confiança, Inovação e Excelência',
    description: 'Qualidade, confiança e inovação no fornecimento de produtos e serviços há mais de 50 anos.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
