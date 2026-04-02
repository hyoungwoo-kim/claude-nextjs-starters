'use client'

// 데이터 패칭 예제 페이지
import { useState, useEffect } from 'react'
import { Loader2, RefreshCw, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ExampleLayout } from '@/components/examples/example-layout'

// 섹션 구분 컴포넌트
function Section({ title, description, badge, children }: {
  title: string
  description: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <div className='rounded-lg border border-border/50 bg-card/40 p-6'>
      <div className='mb-4 flex flex-wrap items-start justify-between gap-2'>
        <div>
          <h2 className='text-base font-semibold'>{title}</h2>
          <p className='mt-0.5 text-sm text-muted-foreground'>{description}</p>
        </div>
        {badge && (
          <Badge variant='outline' className='font-mono text-xs text-blue-400'>
            {badge}
          </Badge>
        )}
      </div>
      {children}
    </div>
  )
}

// 상태 표시 컴포넌트
function StatusBadge({ status }: { status: 'idle' | 'loading' | 'success' | 'error' }) {
  const config = {
    idle: { label: '대기', className: 'text-muted-foreground', icon: Clock },
    loading: { label: '로딩 중', className: 'text-blue-400', icon: Loader2 },
    success: { label: '성공', className: 'text-green-400', icon: CheckCircle2 },
    error: { label: '오류', className: 'text-destructive', icon: AlertCircle },
  }
  const { label, className, icon: Icon } = config[status]
  return (
    <span className={`flex items-center gap-1 text-sm ${className}`}>
      <Icon className={`h-3.5 w-3.5 ${status === 'loading' ? 'animate-spin' : ''}`} />
      {label}
    </span>
  )
}

// JSONPlaceholder API 타입
interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  email: string
  username: string
  website: string
}

// 1. 기본 fetch 예제
function BasicFetchExample() {
  const [posts, setPosts] = useState<Post[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const fetchPosts = async () => {
    setStatus('loading')
    setPosts([])
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
      if (!res.ok) throw new Error('API 오류')
      const data = await res.json()
      setPosts(data)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <Button variant='outline' size='sm' onClick={fetchPosts} disabled={status === 'loading'}>
          {status === 'loading' ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <RefreshCw className='mr-2 h-4 w-4' />
          )}
          데이터 불러오기
        </Button>
        {status !== 'idle' && <StatusBadge status={status} />}
      </div>

      {status === 'loading' && (
        <div className='flex flex-col gap-3'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex flex-col gap-2 rounded-md border border-border/50 bg-muted/10 p-3'>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-3 w-full' />
              <Skeleton className='h-3 w-2/3' />
            </div>
          ))}
        </div>
      )}

      {status === 'success' && posts.length > 0 && (
        <div className='flex flex-col gap-3'>
          {posts.map((post) => (
            <div key={post.id} className='rounded-md border border-border/50 bg-muted/10 p-3'>
              <div className='flex items-center gap-2'>
                <Badge variant='outline' className='text-xs'>{post.id}</Badge>
                <p className='text-sm font-medium line-clamp-1'>{post.title}</p>
              </div>
              <p className='mt-1 text-xs text-muted-foreground line-clamp-2'>{post.body}</p>
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className='flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive'>
          <AlertCircle className='h-4 w-4' />
          데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.
        </div>
      )}

      {status === 'idle' && (
        <p className='text-sm text-muted-foreground'>버튼을 클릭하면 JSONPlaceholder API에서 게시글을 불러옵니다.</p>
      )}
    </div>
  )
}

// 2. 사용자 목록 + 상세 보기 (선택적 패칭)
function SelectiveFetchExample() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [usersLoading, setUsersLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const fetchUsers = async () => {
    setUsersLoading(true)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4')
      const data = await res.json()
      setUsers(data)
      setLoaded(true)
    } finally {
      setUsersLoading(false)
    }
  }

  const fetchUserDetail = async (id: number) => {
    setDetailLoading(true)
    setSelectedUser(null)
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const data = await res.json()
      setSelectedUser(data)
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {!loaded && (
        <Button variant='outline' size='sm' onClick={fetchUsers} disabled={usersLoading}>
          {usersLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
          사용자 목록 불러오기
        </Button>
      )}

      {usersLoading && (
        <div className='flex flex-col gap-2'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='flex items-center gap-3 rounded-md border border-border/50 p-3'>
              <Skeleton className='h-9 w-9 rounded-full' />
              <div className='flex flex-col gap-1'>
                <Skeleton className='h-3.5 w-32' />
                <Skeleton className='h-3 w-44' />
              </div>
            </div>
          ))}
        </div>
      )}

      {loaded && (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-muted-foreground'>사용자 목록 (클릭하여 상세 확인)</p>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => fetchUserDetail(user.id)}
                className={`flex items-center gap-3 rounded-md border p-3 text-left transition-colors hover:bg-muted/30 ${selectedUser?.id === user.id ? 'border-primary/50 bg-primary/5' : 'border-border/50'}`}
              >
                <Avatar className='h-9 w-9'>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-medium'>{user.name}</p>
                  <p className='text-xs text-muted-foreground'>{user.email}</p>
                </div>
              </button>
            ))}
          </div>

          <div className='rounded-md border border-border/50 bg-muted/10 p-4'>
            <p className='mb-3 text-xs font-medium text-muted-foreground'>상세 정보</p>
            {detailLoading && (
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='h-3 w-full' />
                <Skeleton className='h-3 w-2/3' />
                <Skeleton className='h-3 w-1/2' />
              </div>
            )}
            {!detailLoading && selectedUser && (
              <div className='flex flex-col gap-2 text-sm'>
                <div><span className='text-muted-foreground'>이름: </span><span className='font-medium'>{selectedUser.name}</span></div>
                <div><span className='text-muted-foreground'>아이디: </span><span className='font-mono text-primary'>@{selectedUser.username}</span></div>
                <div><span className='text-muted-foreground'>이메일: </span>{selectedUser.email}</div>
                <div><span className='text-muted-foreground'>웹사이트: </span>{selectedUser.website}</div>
              </div>
            )}
            {!detailLoading && !selectedUser && (
              <p className='text-sm text-muted-foreground'>사용자를 선택하면 상세 정보가 표시됩니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// 3. 에러 처리 + 재시도 패턴
function RetryExample() {
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [data, setData] = useState<Post | null>(null)

  const fetchWithError = async () => {
    setStatus('loading')
    setData(null)
    setAttempts((p) => p + 1)

    // 50% 확률로 실패 시뮬레이션
    await new Promise((r) => setTimeout(r, 1000))
    if (Math.random() < 0.5) {
      setStatus('error')
      return
    }

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      const post = await res.json()
      setData(post)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setData(null)
    setAttempts(0)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <Button
          variant='outline'
          size='sm'
          onClick={fetchWithError}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
          {status === 'error' ? '재시도' : '요청 보내기'}
        </Button>
        {attempts > 0 && (
          <span className='text-sm text-muted-foreground'>시도 횟수: <strong>{attempts}</strong>회</span>
        )}
        {attempts > 0 && (
          <Button variant='ghost' size='sm' onClick={reset}>초기화</Button>
        )}
        {status !== 'idle' && <StatusBadge status={status} />}
      </div>

      {status === 'error' && (
        <div className='flex flex-col gap-3'>
          <div className='flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3'>
            <AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-destructive' />
            <div>
              <p className='text-sm font-medium text-destructive'>요청 실패</p>
              <p className='text-xs text-muted-foreground'>네트워크 오류 또는 서버 문제가 발생했습니다.</p>
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>
            💡 실제 앱에서는 지수 백오프(exponential backoff) 패턴으로 자동 재시도합니다.
            이 예제는 50% 확률로 실패하여 에러 처리 패턴을 보여줍니다.
          </p>
        </div>
      )}

      {status === 'success' && data && (
        <div className='rounded-md border border-green-400/30 bg-green-400/5 p-4'>
          <div className='flex items-center gap-2'>
            <CheckCircle2 className='h-4 w-4 text-green-400' />
            <span className='text-sm font-medium text-green-400'>요청 성공</span>
          </div>
          <Separator className='my-3 border-green-400/20' />
          <p className='text-sm font-medium'>{data.title}</p>
          <p className='mt-1 text-xs text-muted-foreground'>{data.body}</p>
        </div>
      )}

      {status === 'idle' && (
        <p className='text-sm text-muted-foreground'>
          이 예제는 50% 확률로 실패하여 에러 처리 패턴(재시도 버튼)을 보여줍니다.
        </p>
      )}
    </div>
  )
}

// 4. 페이지네이션 패턴
function PaginationExample() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const limit = 3

  const fetchPage = async (p: number) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${p}&_limit=${limit}`
      )
      const data = await res.json()
      setPosts(data)
      setPage(p)
      setStarted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {!started && (
        <Button variant='outline' size='sm' onClick={() => fetchPage(1)}>
          예제 시작
        </Button>
      )}

      {loading && (
        <div className='flex flex-col gap-2'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='rounded-md border border-border/50 p-3'>
              <Skeleton className='mb-2 h-4 w-2/3' />
              <Skeleton className='h-3 w-full' />
            </div>
          ))}
        </div>
      )}

      {started && !loading && posts.length > 0 && (
        <>
          <div className='flex flex-col gap-2'>
            {posts.map((post) => (
              <div key={post.id} className='rounded-md border border-border/50 bg-muted/10 p-3'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs text-muted-foreground'>#{post.id}</span>
                  <p className='text-sm font-medium line-clamp-1'>{post.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>페이지 {page} / 10</span>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => fetchPage(page - 1)}
                disabled={page <= 1}
              >
                이전
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => fetchPage(page + 1)}
                disabled={page >= 10}
              >
                다음
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function DataFetchingPage() {
  return (
    <ExampleLayout
      title='데이터 패칭 예제'
      description='fetch API를 활용한 다양한 데이터 요청 패턴과 상태 관리 방법입니다.'
    >
      <div className='flex flex-col gap-5'>

        {/* 기본 fetch */}
        <Section
          title='기본 fetch + 로딩/에러 상태'
          description='데이터 요청의 기본 패턴: 로딩 스켈레톤, 성공, 에러 처리를 포함합니다.'
          badge='fetch + useState'
        >
          <BasicFetchExample />
        </Section>

        {/* 선택적 패칭 */}
        <Section
          title='선택적 패칭 (On-demand)'
          description='사용자 액션에 따라 추가 데이터를 패칭하는 패턴입니다.'
          badge='on-demand fetch'
        >
          <SelectiveFetchExample />
        </Section>

        {/* 에러 처리 + 재시도 */}
        <Section
          title='에러 처리 + 재시도 패턴'
          description='요청 실패 시 사용자에게 재시도 옵션을 제공하는 패턴입니다.'
          badge='error boundary'
        >
          <RetryExample />
        </Section>

        {/* 페이지네이션 */}
        <Section
          title='페이지네이션'
          description='대량의 데이터를 페이지 단위로 나누어 불러오는 패턴입니다.'
          badge='pagination'
        >
          <PaginationExample />
        </Section>

        {/* 패턴 요약 */}
        <div className='rounded-lg border border-border/50 bg-card/40 p-6'>
          <h2 className='mb-4 text-base font-semibold'>데이터 패칭 핵심 패턴</h2>
          <div className='grid grid-cols-1 gap-3 text-sm sm:grid-cols-2'>
            {[
              { title: '로딩 상태', desc: 'Skeleton UI로 레이아웃 시프트 방지', badge: 'UX' },
              { title: '에러 처리', desc: '명확한 에러 메시지 + 재시도 버튼 제공', badge: '필수' },
              { title: '낙관적 업데이트', desc: '응답 전 UI 먼저 업데이트 → 사용자 경험 향상', badge: '고급' },
              { title: '캐싱', desc: 'React Query / SWR로 자동 캐시 및 재검증', badge: '권장' },
              { title: '경쟁 조건 방지', desc: 'AbortController로 이전 요청 취소', badge: '안정성' },
              { title: '재시도 전략', desc: '지수 백오프로 서버 부하 감소', badge: '안정성' },
            ].map((item) => (
              <div key={item.title} className='flex items-start gap-3 rounded-md border border-border/50 bg-muted/10 p-3'>
                <Badge variant='secondary' className='mt-0.5 shrink-0 text-xs'>{item.badge}</Badge>
                <div>
                  <p className='font-medium'>{item.title}</p>
                  <p className='text-xs text-muted-foreground'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ExampleLayout>
  )
}
