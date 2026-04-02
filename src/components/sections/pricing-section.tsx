// 가격 섹션 - 플랜 비교 카드
// base-nova 프리셋: asChild 미지원 → buttonVariants를 Link에 직접 적용
import Link from 'next/link'
import { Check } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Plan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted: boolean
  badge?: string
}

const plans: Plan[] = [
  {
    name: '무료',
    price: '₩0',
    period: '영구 무료',
    description: '개인 프로젝트와 학습에 적합',
    features: [
      '프로젝트 3개',
      '기본 컴포넌트',
      '커뮤니티 지원',
      '1GB 스토리지',
    ],
    cta: '무료로 시작',
    href: '/register',
    highlighted: false,
  },
  {
    name: '프로',
    price: '₩29,000',
    period: '/ 월',
    description: '팀과 함께 성장하는 프로젝트에 적합',
    features: [
      '프로젝트 무제한',
      '모든 컴포넌트',
      '우선 지원',
      '100GB 스토리지',
      '팀 협업',
      '고급 분석',
    ],
    cta: '프로 시작',
    href: '/register',
    highlighted: true,
    badge: '인기',
  },
  {
    name: '엔터프라이즈',
    price: '문의',
    period: '',
    description: '대규모 팀과 기업 환경에 최적화',
    features: [
      '모든 프로 기능',
      'SLA 보장',
      '전담 매니저',
      '무제한 스토리지',
      'SSO 지원',
      '커스텀 계약',
    ],
    cta: '영업팀 문의',
    href: '#',
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id='pricing' className='px-4 py-24'>
      <div className='mx-auto max-w-6xl'>
        {/* 섹션 헤더 */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            간단하고 투명한 가격
          </h2>
          <p className='mt-3 text-muted-foreground'>
            팀 규모와 필요에 맞는 플랜을 선택하세요
          </p>
        </div>

        {/* 가격 카드 */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'flex flex-col',
                plan.highlighted && 'border-primary shadow-md ring-1 ring-primary',
              )}
            >
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.badge && <Badge>{plan.badge}</Badge>}
                </div>
                <div className='flex items-baseline gap-1'>
                  <span className='text-3xl font-bold'>{plan.price}</span>
                  <span className='text-muted-foreground'>{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex flex-1 flex-col gap-4'>
                <ul className='flex flex-1 flex-col gap-2'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex items-center gap-2 text-sm'>
                      <Check className='h-4 w-4 shrink-0 text-primary' />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({ variant: plan.highlighted ? 'default' : 'outline' }),
                    'w-full justify-center',
                  )}
                >
                  {plan.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
