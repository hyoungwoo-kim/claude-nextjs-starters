'use client'

// 헤더 컴포넌트 - 로고, 네비게이션, 다크모드 토글, 모바일 메뉴 포함
// base-nova 프리셋: asChild 미지원 → buttonVariants를 Link에 직접 적용
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { MobileNav } from '@/components/layout/mobile-nav'

const navLinks = [
  { label: '홈', href: '/' },
  { label: '예제', href: '/examples' },
  { label: '통계', href: '/#stats' },
  { label: '후기', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
]

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-sm'>
      <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-4'>
        {/* 로고 */}
        <Logo />

        {/* 데스크탑 네비게이션 */}
        <nav className='hidden items-center gap-1 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 영역 */}
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <div className='hidden items-center gap-2 md:flex'>
            <Link
              href='/login'
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              로그인
            </Link>
            <Link
              href='/register'
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              시작하기
            </Link>
          </div>
          {/* 모바일 햄버거 메뉴 */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
