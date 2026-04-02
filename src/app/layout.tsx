import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

// shadcn nova 프리셋이 --font-sans 변수를 기대함
const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Next.js 스타터킷',
    template: '%s | Next.js 스타터킷',
  },
  description:
    'Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui 기반 모던 웹 스타터킷',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning: next-themes가 html에 클래스를 주입할 때
    // 서버/클라이언트 hydration 불일치 경고를 억제
    <html
      lang='ko'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className='min-h-screen flex flex-col bg-background text-foreground antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
