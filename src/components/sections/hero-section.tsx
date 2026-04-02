// 히어로 섹션 - 헤드라인, 서브텍스트, CTA 버튼
// base-nova 프리셋: asChild 미지원 → buttonVariants를 Link에 직접 적용
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className='relative flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-center md:py-36'>
      {/* 배경 그라디언트 장식 */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 flex items-center justify-center'
      >
        <div className='h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl' />
      </div>

      {/* 배지 */}
      <Badge variant='outline' className='mb-6 gap-1.5 px-3 py-1'>
        <span className='text-primary'>✦</span>
        Next.js 16 + React 19 기반 스타터킷
      </Badge>

      {/* 헤드라인 */}
      <h1 className='max-w-3xl text-4xl font-bold tracking-tight md:text-6xl'>
        모던 웹 개발의{' '}
        <span className='text-primary'>빠른 시작</span>을 위한 스타터킷
      </h1>

      {/* 서브텍스트 */}
      <p className='mt-6 max-w-xl text-lg text-muted-foreground'>
        Next.js, TypeScript, Tailwind CSS, shadcn/ui로 구성된 프로덕션 수준의 스타터킷.
        설정 없이 바로 개발을 시작하세요.
      </p>

      {/* CTA 버튼 */}
      <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
        <Link href='/register' className={cn(buttonVariants({ size: 'lg' }))}>
          무료로 시작하기
          <ArrowRight className='ml-2 h-4 w-4' />
        </Link>
        <Link
          href='https://github.com'
          target='_blank'
          rel='noopener noreferrer'
          className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
        >
          <ExternalLink className='mr-2 h-4 w-4' />
          GitHub
        </Link>
      </div>

      {/* 하단 신뢰 지표 */}
      <p className='mt-10 text-sm text-muted-foreground'>
        무료 플랜으로 시작 · 신용카드 불필요 · 5분 만에 배포
      </p>
    </section>
  )
}
