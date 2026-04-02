'use client'

// next-themes ThemeProvider 래퍼
// layout.tsx는 Server Component이므로 Client Component로 분리 필요
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
