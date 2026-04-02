// FAQ 섹션 - Accordion 컴포넌트 활용
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: '이 스타터킷은 무엇인가요?',
    answer:
      'NextStarter는 Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui로 구성된 프로덕션 수준의 웹 개발 스타터킷입니다. 반복적인 초기 설정 없이 비즈니스 로직 개발에 집중할 수 있도록 도와줍니다.',
  },
  {
    question: '상업적 프로젝트에 사용할 수 있나요?',
    answer:
      'MIT 라이선스로 배포되어 개인 프로젝트, 상업 프로젝트 모두에서 자유롭게 사용하실 수 있습니다.',
  },
  {
    question: 'Next.js 초보자도 사용할 수 있나요?',
    answer:
      '기본적인 React 지식이 있다면 충분히 활용하실 수 있습니다. 각 컴포넌트에 한국어 주석이 달려 있어 코드 이해가 쉽습니다.',
  },
  {
    question: '데이터베이스나 인증 기능은 포함되어 있나요?',
    answer:
      '이 스타터킷은 UI/프론트엔드에 집중되어 있습니다. 데이터베이스나 인증 기능은 Prisma, NextAuth.js 등을 별도로 연동하시면 됩니다.',
  },
  {
    question: '업데이트는 어떻게 받나요?',
    answer:
      'GitHub 저장소를 Watch하거나 Star하면 새 릴리즈 알림을 받으실 수 있습니다. 업그레이드 가이드도 함께 제공됩니다.',
  },
]

export function FaqSection() {
  return (
    <section id='faq' className='px-4 py-24'>
      <div className='mx-auto max-w-3xl'>
        {/* 섹션 헤더 */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            자주 묻는 질문
          </h2>
          <p className='mt-3 text-muted-foreground'>
            더 궁금한 점은 GitHub Issues나 문의 폼을 이용해 주세요
          </p>
        </div>

        {/* Base UI Accordion: type/collapsible prop 없음 */}
        <Accordion className='w-full'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='text-left'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground leading-relaxed'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
