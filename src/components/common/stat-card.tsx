// 통계/지표 카드 - 대시보드 숫자 표시용
import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number   // 변화율 (양수: 상승, 음수: 하락)
    label?: string
  }
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  const isPositive = trend && trend.value > 0

  return (
    <Card className={cn('', className)}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
        {Icon && (
          <div className='flex h-8 w-8 items-center justify-center rounded-md bg-muted'>
            <Icon className='h-4 w-4 text-muted-foreground' />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className='text-2xl font-bold'>{value}</p>
        <div className='mt-1 flex items-center gap-2'>
          {trend && (
            <Badge
              variant={isPositive ? 'default' : 'destructive'}
              className='flex items-center gap-1 text-xs'
            >
              {isPositive ? (
                <TrendingUp className='h-3 w-3' />
              ) : (
                <TrendingDown className='h-3 w-3' />
              )}
              {Math.abs(trend.value)}%
            </Badge>
          )}
          {description && (
            <p className='text-xs text-muted-foreground'>{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
