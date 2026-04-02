// 레이아웃 예제 페이지
import type { Metadata } from 'next'
import Link from 'next/link'
import { LayoutDashboard, User, Globe, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { ExampleLayout } from '@/components/examples/example-layout'

export const metadata: Metadata = { title: '레이아웃 예제' }

const layouts = [
  {
    icon: Globe,
    title: '마케팅 레이아웃',
    description: '랜딩 페이지, 홈 등 공개 페이지에 사용하는 레이아웃입니다. Header + main + Footer 구조로 구성됩니다.',
    tags: ['공개 페이지', '랜딩'],
    preview: (
      <div className='rounded border border-border/50 bg-muted/30 p-3 text-xs'>
        <div className='mb-2 flex items-center justify-between rounded bg-muted/50 px-2 py-1'>
          <span className='font-medium'>Header</span>
          <span className='text-muted-foreground'>로고 · 네비 · 버튼</span>
        </div>
        <div className='mb-2 rounded bg-primary/10 px-2 py-4 text-center text-muted-foreground'>
          main (콘텐츠)
        </div>
        <div className='rounded bg-muted/50 px-2 py-1 text-center text-muted-foreground'>
          Footer
        </div>
      </div>
    ),
    href: '/',
    linkLabel: '홈 페이지에서 확인',
  },
  {
    icon: User,
    title: '인증 레이아웃',
    description: '로그인, 회원가입 등 인증 관련 페이지에 사용하는 레이아웃입니다. 중앙 정렬 카드 형태로 구성됩니다.',
    tags: ['로그인', '회원가입'],
    preview: (
      <div className='rounded border border-border/50 bg-muted/30 p-3 text-xs'>
        <div className='flex items-center justify-center py-4'>
          <div className='w-32 rounded border border-border/50 bg-card/50 p-3 text-center'>
            <div className='mb-1 font-medium'>로그인</div>
            <div className='h-2 rounded bg-muted/50'></div>
            <div className='mt-1 h-2 rounded bg-muted/50'></div>
            <div className='mt-2 h-4 rounded bg-primary/30'></div>
          </div>
        </div>
      </div>
    ),
    href: '/login',
    linkLabel: '로그인 페이지에서 확인',
  },
  {
    icon: LayoutDashboard,
    title: '대시보드 레이아웃',
    description: '관리자 패널, 대시보드에 사용하는 레이아웃입니다. Header + Sidebar + main 구조로 구성됩니다.',
    tags: ['대시보드', '사이드바'],
    preview: (
      <div className='rounded border border-border/50 bg-muted/30 p-3 text-xs'>
        <div className='mb-2 rounded bg-muted/50 px-2 py-1 text-center'>Header</div>
        <div className='flex gap-2'>
          <div className='w-20 rounded bg-muted/50 px-2 py-3 text-center text-muted-foreground'>
            Sidebar
          </div>
          <div className='flex-1 rounded bg-primary/10 px-2 py-3 text-center text-muted-foreground'>
            main
          </div>
        </div>
      </div>
    ),
    href: '/dashboard',
    linkLabel: '대시보드에서 확인',
  },
]

export default function LayoutsPage() {
  return (
    <ExampleLayout
      title='레이아웃 예제'
      description='다양한 레이아웃 패턴과 반응형 디자인 구현 방법을 익히세요.'
    >
      <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
        {layouts.map((layout) => {
          const Icon = layout.icon
          return (
            <Card key={layout.title} className='flex flex-col bg-card/40'>
              <CardHeader className='gap-2'>
                <Icon className='h-6 w-6 text-purple-400' />
                <CardTitle className='text-base'>{layout.title}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-1 flex-col gap-4'>
                <CardDescription className='leading-relaxed'>{layout.description}</CardDescription>
                {/* 레이아웃 프리뷰 */}
                {layout.preview}
                {/* 태그 */}
                <div className='flex flex-wrap gap-1.5'>
                  {layout.tags.map((tag) => (
                    <Badge key={tag} variant='secondary' className='text-xs'>{tag}</Badge>
                  ))}
                </div>
                <Link
                  href={layout.href}
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-auto w-full justify-center gap-1')}
                >
                  {layout.linkLabel}
                  <ArrowRight className='h-3.5 w-3.5' />
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 반응형 설명 */}
      <div className='mt-8 rounded-lg border border-border/50 bg-card/40 p-6'>
        <h2 className='mb-3 text-base font-semibold'>반응형 브레이크포인트</h2>
        <div className='grid grid-cols-2 gap-3 text-sm sm:grid-cols-4'>
          {[
            { bp: 'sm', size: '640px', label: '태블릿' },
            { bp: 'md', size: '768px', label: '중간' },
            { bp: 'lg', size: '1024px', label: '데스크탑' },
            { bp: 'xl', size: '1280px', label: '대형' },
          ].map((item) => (
            <div key={item.bp} className='rounded-md border border-border/50 bg-muted/20 p-3 text-center'>
              <code className='text-xs text-primary'>{item.bp}:</code>
              <div className='mt-1 font-medium'>{item.size}+</div>
              <div className='text-xs text-muted-foreground'>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </ExampleLayout>
  )
}
