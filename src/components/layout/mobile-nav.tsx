'use client'

// 모바일 햄버거 메뉴 - Sheet 컴포넌트 사용
// base-nova 프리셋 (Base UI): render prop 패턴 사용
import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/common/logo'

const navLinks = [
  { label: '홈', href: '/' },
  { label: '예제', href: '/examples' },
  { label: '통계', href: '/#stats' },
  { label: '후기', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Base UI: render prop으로 트리거 컴포넌트 지정 */}
      <SheetTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='메뉴 열기'
          >
            <Menu className='h-5 w-5' />
          </Button>
        }
      />
      <SheetContent side='left' className='w-72'>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className='mt-8 flex flex-col gap-1'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className='rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className='mt-6 flex flex-col gap-2 border-t pt-6'>
          <Link
            href='/login'
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-center')}
          >
            로그인
          </Link>
          <Link
            href='/register'
            onClick={() => setOpen(false)}
            className={cn(buttonVariants(), 'w-full justify-center')}
          >
            시작하기
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
