// 빈 상태 컴포넌트 - 데이터가 없을 때 표시
import { type LucideIcon, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border p-12 text-center',
        className,
      )}
    >
      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
        <Icon className='h-6 w-6 text-muted-foreground' />
      </div>
      <div>
        <h3 className='font-semibold'>{title}</h3>
        {description && (
          <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onClick} variant='outline'>
          {action.label}
        </Button>
      )}
    </div>
  )
}
