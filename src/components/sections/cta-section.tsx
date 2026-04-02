// CTA 섹션 - 하단 전환 유도 배너
// base-nova 프리셋: asChild 미지원 → buttonVariants를 Link에 직접 적용
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export function CtaSection() {
  return (
    <section className='px-4 py-24'>
      <div className='mx-auto max-w-6xl'>
        <div className='rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            지금 바로 시작하세요
          </h2>
          <p className='mt-4 text-lg opacity-80'>
            설정 없이 바로 개발을 시작하세요.
            <br />
            무료 플랜으로 첫 프로젝트를 시작할 수 있습니다.
          </p>
          <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
            <Link
              href='/register'
              className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
            >
              무료로 시작하기
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
            <Link
              href='#'
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10',
              )}
            >
              문서 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
