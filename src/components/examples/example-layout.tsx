// 예제 상세 페이지 공통 레이아웃
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

interface ExampleLayoutProps {
  title: string
  description: string
  backHref?: string
  children: React.ReactNode
}

export function ExampleLayout({
  title,
  description,
  backHref = '/examples',
  children,
}: ExampleLayoutProps) {
  return (
    <div className='min-h-screen px-4 py-10'>
      <div className='mx-auto max-w-4xl'>
        {/* 뒤로 가기 */}
        <Link
          href={backHref}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'mb-6 -ml-2 gap-1.5',
          )}
        >
          <ArrowLeft className='h-4 w-4' />
          예제 목록으로
        </Link>

        {/* 페이지 헤더 */}
        <div className='mb-10 text-center'>
          <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>{title}</h1>
          <p className='mt-3 text-muted-foreground'>{description}</p>
        </div>

        {/* 예제 콘텐츠 */}
        {children}
      </div>
    </div>
  )
}
