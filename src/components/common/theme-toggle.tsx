'use client'

// 다크모드 토글 버튼 - hydration 불일치 방지 패턴 적용
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 서버/클라이언트 hydration 불일치 방지
  // 마운트 전에는 빈 버튼을 렌더링하여 SSR과 일치시킴
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant='ghost' size='icon' aria-label='테마 로딩 중' disabled>
        <Sun className='h-4 w-4' />
      </Button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
    </Button>
  )
}
