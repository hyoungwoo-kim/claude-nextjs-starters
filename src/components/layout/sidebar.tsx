// 사이드바 컴포넌트 - 대시보드 레이아웃용
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/common/logo'
import { Separator } from '@/components/ui/separator'

const sidebarLinks = [
  { icon: LayoutDashboard, label: '대시보드', href: '/dashboard' },
  { icon: Users, label: '사용자', href: '/dashboard/users' },
  { icon: BarChart3, label: '분석', href: '/dashboard/analytics' },
  { icon: Settings, label: '설정', href: '/dashboard/settings' },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'hidden w-60 shrink-0 border-r border-border bg-background md:flex md:flex-col',
        className,
      )}
    >
      <div className='flex h-14 items-center border-b px-4'>
        <Logo />
      </div>

      <nav className='flex flex-1 flex-col gap-1 p-3'>
        {sidebarLinks.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
          >
            <Icon className='h-4 w-4' />
            {label}
          </Link>
        ))}
      </nav>

      <Separator />
      <div className='p-3'>
        <Link
          href='#'
          className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
        >
          <HelpCircle className='h-4 w-4' />
          도움말
        </Link>
      </div>
    </aside>
  )
}
