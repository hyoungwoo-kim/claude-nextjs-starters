// 통계 섹션 - 숫자로 신뢰감 구축
const stats = [
  { value: '10,000+', label: '개발자', description: '전 세계 개발자가 사용 중' },
  { value: '5분', label: '설정 시간', description: '처음부터 배포까지' },
  { value: '100%', label: '오픈소스', description: 'MIT 라이선스' },
  { value: '99.9%', label: '업타임', description: '안정적인 서비스' },
]

export function StatsSection() {
  return (
    <section id='stats' className='border-y border-border bg-muted/30 px-4 py-16'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className='text-center'>
              <p className='text-3xl font-bold md:text-4xl'>{stat.value}</p>
              <p className='mt-1 font-semibold'>{stat.label}</p>
              <p className='mt-0.5 text-sm text-muted-foreground'>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
