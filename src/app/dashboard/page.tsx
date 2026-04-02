// 대시보드 페이지 - StatCard, Table, Sidebar 활용 예시
import type { Metadata } from 'next'
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'
import { Sidebar } from '@/components/layout/sidebar'
import { StatCard } from '@/components/common/stat-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '대시보드',
}

// 예시 주문 데이터
const recentOrders = [
  { id: '#1001', customer: '김민준', amount: '₩89,000', status: '완료' },
  { id: '#1002', customer: '이서연', amount: '₩45,000', status: '처리중' },
  { id: '#1003', customer: '박지훈', amount: '₩120,000', status: '완료' },
  { id: '#1004', customer: '최수진', amount: '₩67,000', status: '취소' },
  { id: '#1005', customer: '정우성', amount: '₩33,000', status: '처리중' },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  완료: 'default',
  처리중: 'secondary',
  취소: 'destructive',
}

export default function DashboardPage() {
  return (
    // 대시보드 레이아웃: 사이드바 + 메인 콘텐츠
    <div className='flex flex-1 overflow-hidden'>
      <Sidebar />

      <div className='flex-1 overflow-auto p-6'>
        <div className='mx-auto max-w-5xl'>
          <h1 className='mb-6 text-2xl font-bold'>대시보드</h1>

          {/* 통계 카드 */}
          <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <StatCard
              title='총 사용자'
              value='10,482'
              icon={Users}
              trend={{ value: 12, label: '지난달 대비' }}
              description='지난달 대비'
            />
            <StatCard
              title='월 매출'
              value='₩4,820,000'
              icon={DollarSign}
              trend={{ value: 8.2, label: '지난달 대비' }}
              description='지난달 대비'
            />
            <StatCard
              title='신규 주문'
              value='284'
              icon={ShoppingCart}
              trend={{ value: -3.1, label: '지난달 대비' }}
              description='지난달 대비'
            />
            <StatCard
              title='전환율'
              value='3.24%'
              icon={TrendingUp}
              trend={{ value: 1.5, label: '지난달 대비' }}
              description='지난달 대비'
            />
          </div>

          {/* 최근 주문 테이블 */}
          <Card>
            <CardHeader>
              <CardTitle>최근 주문</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>주문 번호</TableHead>
                    <TableHead>고객</TableHead>
                    <TableHead>금액</TableHead>
                    <TableHead>상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className='font-medium'>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[order.status] ?? 'secondary'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
