// 후기 섹션 - 고객 리뷰 카드
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: '김민준',
    role: '풀스택 개발자',
    avatar: '',
    initials: '김민',
    content:
      '이 스타터킷 덕분에 새 프로젝트 설정 시간을 일주일에서 하루로 줄였습니다. shadcn/ui 컴포넌트들이 정말 훌륭해요.',
    rating: 5,
  },
  {
    name: '이서연',
    role: '프론트엔드 엔지니어',
    avatar: '',
    initials: '이서',
    content:
      'TypeScript와 zod 조합으로 타입 안전한 코드를 빠르게 작성할 수 있었습니다. 다크 모드 구현도 완벽해요.',
    rating: 5,
  },
  {
    name: '박지훈',
    role: 'CTO',
    avatar: '',
    initials: '박지',
    content:
      '스타트업에서 MVP를 빠르게 출시해야 했는데, 이 스타터킷이 없었다면 훨씬 오래 걸렸을 거예요. 강력 추천합니다.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id='testimonials' className='px-4 py-24'>
      <div className='mx-auto max-w-6xl'>
        {/* 섹션 헤더 */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            개발자들의 이야기
          </h2>
          <p className='mt-3 text-muted-foreground'>
            이미 수천 명의 개발자가 NextStarter로 프로젝트를 시작했습니다
          </p>
        </div>

        {/* 후기 카드 */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className='flex flex-col'>
              <CardContent className='flex flex-1 flex-col gap-4 pt-6'>
                {/* 별점 */}
                <div className='flex gap-0.5'>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-primary text-primary'
                    />
                  ))}
                </div>

                {/* 후기 내용 */}
                <p className='flex-1 text-sm leading-relaxed text-muted-foreground'>
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* 작성자 정보 */}
                <div className='flex items-center gap-3'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className='text-xs'>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-semibold'>{testimonial.name}</p>
                    <p className='text-xs text-muted-foreground'>{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
