'use client'

// usehooks-ts 예제 페이지
import { useState } from 'react'
import {
  useDebounceValue,
  useLocalStorage,
  useToggle,
  useCounter,
  useCopyToClipboard,
  useWindowSize,
  useMediaQuery,
  useOnClickOutside,
  useIsClient,
} from 'usehooks-ts'
import { useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ExampleLayout } from '@/components/examples/example-layout'

function Section({ title, description, hook, children }: {
  title: string
  description: string
  hook: string
  children: React.ReactNode
}) {
  return (
    <div className='rounded-lg border border-border/50 bg-card/40 p-6'>
      <div className='mb-4 flex flex-wrap items-start justify-between gap-2'>
        <div>
          <h2 className='text-base font-semibold'>{title}</h2>
          <p className='mt-0.5 text-sm text-muted-foreground'>{description}</p>
        </div>
        <Badge variant='outline' className='font-mono text-xs text-orange-400'>
          {hook}
        </Badge>
      </div>
      {children}
    </div>
  )
}

export default function HooksPage() {
  // useDebounceValue
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch] = useDebounceValue(searchInput, 500)

  // useLocalStorage
  const [storedName, setStoredName] = useLocalStorage('example-name', '')

  // useToggle
  const [isVisible, toggle] = useToggle(false)

  // useCounter
  const { count, increment, decrement, reset, setCount } = useCounter(0)

  // useCopyToClipboard
  const [, copy] = useCopyToClipboard()

  // useWindowSize
  const { width, height } = useWindowSize()

  // useMediaQuery
  const isMobile = useMediaQuery('(max-width: 768px)')

  // 클라이언트 여부 확인 (Hydration 불일치 방지)
  const isClient = useIsClient()

  // useOnClickOutside
  const boxRef = useRef<HTMLDivElement>(null)
  const [outsideClicked, setOutsideClicked] = useState(false)
  useOnClickOutside(boxRef as React.RefObject<HTMLElement>, () => setOutsideClicked(true))

  return (
    <ExampleLayout
      title='usehooks-ts 예제'
      description='usehooks-ts 라이브러리의 다양한 훅 사용법과 실용적인 예제입니다.'
    >
      <div className='flex flex-col gap-5'>

        {/* useDebounceValue */}
        <Section title='useDebounceValue' description='입력값을 지연시켜 불필요한 API 호출을 방지합니다.' hook='useDebounceValue(value, delay)'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1.5'>
              <Label>검색어 입력 (500ms 딜레이)</Label>
              <Input
                placeholder='빠르게 타이핑해 보세요...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className='flex gap-6 text-sm'>
              <div>
                <span className='text-muted-foreground'>실시간 값: </span>
                <span className='font-mono text-foreground'>{searchInput || '(없음)'}</span>
              </div>
              <div>
                <span className='text-muted-foreground'>디바운스 값: </span>
                <span className='font-mono text-primary'>{debouncedSearch || '(없음)'}</span>
              </div>
            </div>
          </div>
        </Section>

        {/* useLocalStorage */}
        <Section title='useLocalStorage' description='브라우저 localStorage에 값을 저장하고 동기화합니다.' hook='useLocalStorage(key, initial)'>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-2'>
              <Input
                placeholder='이름을 입력하면 저장됩니다'
                value={storedName}
                onChange={(e) => setStoredName(e.target.value)}
              />
              <Button variant='outline' onClick={() => setStoredName('')}>초기화</Button>
            </div>
            <p className='text-sm text-muted-foreground'>
              페이지를 새로고침해도 값이 유지됩니다.
              저장된 값: <span className='font-mono text-primary'>{storedName || '(없음)'}</span>
            </p>
          </div>
        </Section>

        {/* useToggle */}
        <Section title='useToggle' description='boolean 값을 간편하게 토글합니다.' hook='useToggle(initial)'>
          <div className='flex flex-col gap-3'>
            <Button variant='outline' onClick={() => toggle()}>
              토글 ({isVisible ? '표시 중' : '숨김'})
            </Button>
            {isVisible && (
              <div className='rounded-md border border-green-400/30 bg-green-400/10 p-3 text-sm text-green-400'>
                isVisible가 true일 때만 보입니다!
              </div>
            )}
          </div>
        </Section>

        {/* useCounter */}
        <Section title='useCounter' description='숫자 카운터를 쉽게 관리합니다.' hook='useCounter(initial)'>
          <div className='flex items-center gap-3'>
            <Button variant='outline' size='sm' onClick={decrement}>−</Button>
            <span className='w-12 text-center text-2xl font-bold'>{count}</span>
            <Button variant='outline' size='sm' onClick={increment}>+</Button>
            <Button variant='ghost' size='sm' onClick={reset}>초기화</Button>
            <Button variant='ghost' size='sm' onClick={() => setCount(100)}>100으로 설정</Button>
          </div>
        </Section>

        {/* useCopyToClipboard */}
        <Section title='useCopyToClipboard' description='텍스트를 클립보드에 복사합니다.' hook='useCopyToClipboard()'>
          <div className='flex flex-col gap-2'>
            {[
              'npm install usehooks-ts',
              'npx shadcn@latest init',
              'npm run dev',
            ].map((cmd) => (
              <div key={cmd} className='flex items-center justify-between rounded-md border border-border/50 bg-muted/20 px-3 py-2'>
                <code className='text-sm'>{cmd}</code>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    copy(cmd)
                    toast.success('클립보드에 복사되었습니다!')
                  }}
                >
                  복사
                </Button>
              </div>
            ))}
          </div>
        </Section>

        {/* useWindowSize */}
        <Section title='useWindowSize' description='브라우저 창의 크기를 실시간으로 추적합니다.' hook='useWindowSize()'>
          <div className='flex gap-6 text-sm'>
            <div className='rounded-md border border-border/50 bg-muted/20 px-4 py-2 text-center'>
              <div className='text-muted-foreground'>너비</div>
              <div className='text-xl font-bold text-primary'>{isClient ? `${width}px` : '-'}</div>
            </div>
            <div className='rounded-md border border-border/50 bg-muted/20 px-4 py-2 text-center'>
              <div className='text-muted-foreground'>높이</div>
              <div className='text-xl font-bold text-primary'>{isClient ? `${height}px` : '-'}</div>
            </div>
            <div className='rounded-md border border-border/50 bg-muted/20 px-4 py-2 text-center'>
              <div className='text-muted-foreground'>현재 기기</div>
              <div className='text-xl font-bold'>{isClient ? (isMobile ? '📱 모바일' : '🖥 데스크탑') : '-'}</div>
            </div>
          </div>
          <p className='mt-2 text-xs text-muted-foreground'>창 크기를 변경하면 값이 실시간으로 업데이트됩니다.</p>
        </Section>

        {/* useMediaQuery */}
        <Section title='useMediaQuery' description='CSS 미디어 쿼리를 JavaScript에서 감지합니다.' hook='useMediaQuery(query)'>
          <div className='flex flex-wrap gap-3 text-sm'>
            {[
              { query: '(max-width: 640px)', label: 'sm 미만' },
              { query: '(max-width: 768px)', label: 'md 미만 (모바일)' },
              { query: '(prefers-color-scheme: dark)', label: '다크모드 선호' },
            ].map(({ query, label }) => (
              <MediaQueryItem key={query} query={query} label={label} />
            ))}
          </div>
        </Section>

        {/* useOnClickOutside */}
        <Section title='useOnClickOutside' description='특정 요소 외부 클릭을 감지합니다.' hook='useOnClickOutside(ref, handler)'>
          <div className='flex flex-col gap-3'>
            <div
              ref={boxRef}
              className='cursor-pointer rounded-lg border-2 border-dashed border-orange-400/50 bg-orange-400/5 p-6 text-center text-sm'
              onClick={() => setOutsideClicked(false)}
            >
              이 박스 안을 클릭하면 초기화됩니다
            </div>
            {outsideClicked && (
              <p className='text-sm text-orange-400'>박스 외부를 클릭했습니다!</p>
            )}
            {!outsideClicked && (
              <p className='text-sm text-muted-foreground'>박스 외부를 클릭해보세요.</p>
            )}
          </div>
        </Section>

      </div>
    </ExampleLayout>
  )
}

// 미디어쿼리 결과 표시 컴포넌트
function MediaQueryItem({ query, label }: { query: string; label: string }) {
  const matches = useMediaQuery(query)
  return (
    <div className='flex items-center gap-2 rounded-md border border-border/50 bg-muted/20 px-3 py-2'>
      <span className={matches ? 'text-green-400' : 'text-muted-foreground'}>
        {matches ? '✓' : '✗'}
      </span>
      <span>{label}</span>
    </div>
  )
}
