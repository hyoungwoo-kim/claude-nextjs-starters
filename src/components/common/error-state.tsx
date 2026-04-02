// 에러 상태 컴포넌트 - 에러/404 화면에 표시
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = '오류가 발생했습니다',
  description = '잠시 후 다시 시도해 주세요.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg p-12 text-center',
        className,
      )}
    >
      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10'>
        <AlertTriangle className='h-6 w-6 text-destructive' />
      </div>
      <div>
        <h3 className='font-semibold'>{title}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant='outline'>
          다시 시도
        </Button>
      )}
    </div>
  )
}
