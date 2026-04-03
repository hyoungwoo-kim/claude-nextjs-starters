// 예제 모음 인덱스 페이지
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  LayoutDashboard,
  Code2,
  Database,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: '예제 모음',
}

interface Example {
  icon: LucideIcon
  iconColor: string
  iconBg: string
  title: string
  description: string
  tags: string[]
  href: string
}

const examples: Example[] = [
  {
    icon: FileText,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/10',
    title: '폼 예제',
    description:
      'react-hook-form과 zod를 활용한 다양한 폼 구현 예제입니다.',
    tags: ['검증', '상태관리'],
    href: '/examples/forms',
  },
  {
    icon: LayoutDashboard,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    title: '레이아웃 예제',
    description:
      '다양한 레이아웃 패턴과 반응형 디자인 구현 방법을 익히세요.',
    tags: ['반응형', '레이아웃'],
    href: '/examples/layouts',
  },
  {
    icon: Code2,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10',
    title: 'usehooks-ts 예제',
    description:
      'usehooks-ts 라이브러리의 다양한 훅 사용법과 실용적인 예제입니다.',
    tags: ['훅', '상태관리'],
    href: '/examples/hooks',
  },
  {
    icon: Database,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
    title: '데이터 패칭',
    description:
      'API 호출, 로딩 상태, 에러 처리 등 데이터 관리 예제입니다.',
    tags: ['API', '네트워킹'],
    href: '/examples/data-fetching',
  },
  {
    icon: Settings,
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-400/10',
    title: '설정 및 최적화',
    description:
      '성능 최적화, SEO 설정, PWA 구현 등 프로젝트 완성을 위한 설정입니다.',
    tags: ['최적화', 'SEO'],
    href: '/examples/optimization',
  },
]

export default function ExamplesPage() {
  return (
    <div className='min-h-screen px-4 py-16'>
      <div className='mx-auto max-w-6xl'>
        {/* 페이지 헤더 */}
        <div className='mb-14 text-center'>
          <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>예제 모음</h1>
          <p className='mt-4 text-muted-foreground'>
            실제 동작하는 예제를 통해 스타터킷의 모든 기능을 탐색해보세요.
            <br />각 예제는 소스 코드와 함께 제공됩니다.
          </p>
        </div>

        {/* 예제 카드 그리드 */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {examples.map((example) => {
            const Icon = example.icon
            return (
              <Card
                key={example.href}
                className='flex flex-col bg-card/60 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg'
              >
                <CardHeader className='gap-3'>
                  {/* 아이콘 */}
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      example.iconBg,
                    )}
                  >
                    <Icon className={cn('h-5 w-5', example.iconColor)} />
                  </div>
                  <CardTitle className='text-lg'>{example.title}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-1 flex-col gap-4'>
                  <CardDescription className='flex-1 leading-relaxed'>
                    {example.description}
                  </CardDescription>

                  {/* 태그 */}
                  <div className='flex flex-wrap gap-1.5'>
                    {example.tags.map((tag) => (
                      <Badge key={tag} variant='secondary' className='text-xs'>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* 예제 보기 버튼 */}
                  <Link
                    href={example.href}
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full justify-center')}
                  >
                    예제 보기
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 하단 안내 */}
        <div className='mt-12 flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-6 py-4 text-sm text-muted-foreground'>
          <Code2 className='h-4 w-4 shrink-0' />
          각 예제는 실제 코드와 함께 제공되므로 프로젝트에 바로 적용하여 사용할 수 있습니다.
        </div>
      </div>
    </div>
  )
}
