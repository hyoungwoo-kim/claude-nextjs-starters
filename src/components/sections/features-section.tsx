// 기능 섹션 - 4개 카드, 각 lucide-react 아이콘
import { Zap, Shield, Layers, Palette, Code2, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Zap,
    title: '번개같은 속도',
    description:
      'Turbopack이 기본 탑재된 Next.js 16으로 최고의 개발 경험과 빌드 성능을 제공합니다.',
  },
  {
    icon: Shield,
    title: '타입 안전성',
    description:
      'TypeScript strict 모드로 런타임 오류를 사전에 방지하고 안전한 코드를 작성하세요.',
  },
  {
    icon: Layers,
    title: '컴포넌트 시스템',
    description:
      'shadcn/ui와 Radix UI로 접근성을 갖춘 19개의 즉시 사용 가능한 컴포넌트를 제공합니다.',
  },
  {
    icon: Palette,
    title: '다크 모드',
    description:
      'next-themes와 Tailwind CSS v4의 oklch 색상 시스템으로 부드러운 테마 전환을 지원합니다.',
  },
  {
    icon: Code2,
    title: '폼 유효성 검사',
    description:
      'react-hook-form과 zod로 타입 안전한 폼 처리와 유효성 검사를 간편하게 구현하세요.',
  },
  {
    icon: Globe,
    title: '반응형 레이아웃',
    description:
      '모바일부터 데스크탑까지 모든 화면 크기에 최적화된 반응형 레이아웃을 제공합니다.',
  },
]

export function FeaturesSection() {
  return (
    <section id='features' className='px-4 py-24'>
      <div className='mx-auto max-w-6xl'>
        {/* 섹션 헤더 */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            개발에 필요한 모든 것
          </h2>
          <p className='mt-3 text-muted-foreground'>
            검증된 기술 스택으로 빠르게 시작하고 안심하고 확장하세요
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className='transition-shadow hover:shadow-md'>
                <CardHeader>
                  <div className='mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                    <Icon className='h-5 w-5 text-primary' />
                  </div>
                  <CardTitle className='text-lg'>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
