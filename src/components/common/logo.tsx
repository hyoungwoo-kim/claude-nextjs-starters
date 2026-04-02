// 로고 컴포넌트 - 브랜드 아이덴티티
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href='/'
      className={cn('flex items-center gap-2 font-bold text-foreground', className)}
    >
      <div className='flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground'>
        <Zap className='h-4 w-4' />
      </div>
      <span className='text-lg'>NextStarter</span>
    </Link>
  )
}
