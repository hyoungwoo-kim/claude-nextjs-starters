'use client'

// 컴포넌트 쇼케이스 예제 페이지
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Loader2,
  Bell,
  Settings,
  User,
  LogOut,
  Info,
  ChevronDown,
  Star,
} from 'lucide-react'
import { ExampleLayout } from '@/components/examples/example-layout'

// 섹션 구분 컴포넌트
function Section({ title, description, children }: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className='rounded-lg border border-border/50 bg-card/40 p-6'>
      <h2 className='text-base font-semibold'>{title}</h2>
      <p className='mt-0.5 text-sm text-muted-foreground'>{description}</p>
      <div className='mt-5'>{children}</div>
    </div>
  )
}

export default function ComponentsPage() {
  const [switchOn, setSwitchOn] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <ExampleLayout
      title='컴포넌트 쇼케이스'
      description='ShadcnUI 컴포넌트들의 실제 동작을 확인해보세요.'
      backHref='/examples'
    >
      <div className='flex flex-col gap-5'>

        {/* 버튼 */}
        <Section title='버튼 (Button)' description='다양한 스타일과 크기의 버튼 컴포넌트입니다.'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-wrap gap-2'>
              <Button variant='default'>기본</Button>
              <Button variant='secondary'>보조</Button>
              <Button variant='outline'>아웃라인</Button>
              <Button variant='ghost'>고스트</Button>
              <Button variant='destructive'>위험</Button>
              <Button variant='link'>링크</Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              <Button size='sm'>작은 버튼</Button>
              <Button size='default'>기본 버튼</Button>
              <Button size='lg'>큰 버튼</Button>
              <Button size='icon'><Star className='h-4 w-4' /></Button>
              <Button disabled>비활성화</Button>
              <Button onClick={handleLoadingClick} disabled={loading}>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {loading ? '로딩 중...' : '로드 보기'}
              </Button>
            </div>
          </div>
        </Section>

        {/* 입력 필드 */}
        <Section title='입력 필드 (Input)' description='사용자 입력을 받는 다양한 형태의 입력 필드입니다.'>
          <div className='flex flex-col gap-3 max-w-sm'>
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='ex-email'>이메일</Label>
              <Input id='ex-email' type='email' placeholder='ynjin028@naver.com' defaultValue='ynjin028@naver.com' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='ex-password'>비밀번호</Label>
              <Input id='ex-password' type='password' defaultValue='password123' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='ex-search'>검색</Label>
              <Input id='ex-search' placeholder='검색어를 입력하세요' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='ex-disabled'>비활성화</Label>
              <Input id='ex-disabled' placeholder='비활성화된 입력' disabled />
            </div>
          </div>
        </Section>

        {/* 배지 */}
        <Section title='배지 (Badge)' description='상태나 카테고리를 표시하는 배지 컴포넌트입니다.'>
          <div className='flex flex-wrap gap-2'>
            <Badge>기본</Badge>
            <Badge variant='secondary'>보조</Badge>
            <Badge variant='outline'>아웃라인</Badge>
            <Badge variant='destructive'>위험</Badge>
          </div>
        </Section>

        {/* 아바타 */}
        <Section title='아바타 (Avatar)' description='사용자 프로필 이미지를 표시하는 컴포넌트입니다.'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop' />
              <AvatarFallback>홍</AvatarFallback>
            </Avatar>
            <Avatar className='h-10 w-10'>
              <AvatarFallback>김민</AvatarFallback>
            </Avatar>
            <Avatar className='h-12 w-12'>
              <AvatarImage src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop' />
              <AvatarFallback>이서</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        {/* 탭 */}
        <Section title='탭 (Tabs)' description='콘텐츠를 탭으로 구분하는 컴포넌트입니다.'>
          <Tabs defaultValue='tab1'>
            <TabsList>
              <TabsTrigger value='tab1'>개요</TabsTrigger>
              <TabsTrigger value='tab2'>기능</TabsTrigger>
              <TabsTrigger value='tab3'>설정</TabsTrigger>
            </TabsList>
            <TabsContent value='tab1' className='mt-4 text-sm text-muted-foreground'>
              프로젝트의 전반적인 개요를 확인할 수 있습니다.
            </TabsContent>
            <TabsContent value='tab2' className='mt-4 text-sm text-muted-foreground'>
              사용 가능한 기능 목록이 표시됩니다.
            </TabsContent>
            <TabsContent value='tab3' className='mt-4 text-sm text-muted-foreground'>
              프로젝트 설정을 관리합니다.
            </TabsContent>
          </Tabs>
        </Section>

        {/* 스위치 */}
        <Section title='스위치 (Switch)' description='토글 형태의 스위치 컴포넌트입니다.'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} id='sw1' />
              <Label htmlFor='sw1'>알림 활성화 {switchOn ? '(켜짐)' : '(꺼짐)'}</Label>
            </div>
            <div className='flex items-center gap-3'>
              <Switch id='sw2' defaultChecked />
              <Label htmlFor='sw2'>이메일 수신 동의</Label>
            </div>
          </div>
        </Section>

        {/* 스켈레톤 */}
        <Section title='스켈레톤 (Skeleton)' description='콘텐츠 로딩 중 표시하는 플레이스홀더입니다.'>
          <div className='flex items-start gap-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-48' />
              <Skeleton className='h-4 w-36' />
              <Skeleton className='h-4 w-56' />
            </div>
          </div>
        </Section>

        {/* 알림 */}
        <Section title='알림 (Alert)' description='중요 메시지를 강조해서 표시하는 컴포넌트입니다.'>
          <div className='flex flex-col gap-3'>
            <Alert>
              <Info className='h-4 w-4' />
              <span className='ml-2 text-sm'>일반 안내 메시지입니다.</span>
            </Alert>
            <Alert className='border-destructive/50 text-destructive'>
              <Info className='h-4 w-4' />
              <span className='ml-2 text-sm'>오류가 발생했습니다. 다시 시도해 주세요.</span>
            </Alert>
          </div>
        </Section>

        {/* 다이얼로그 */}
        <Section title='다이얼로그 (Dialog)' description='모달 팝업을 표시하는 컴포넌트입니다.'>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant='outline'>다이얼로그 열기</Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>다이얼로그 제목</DialogTitle>
                <DialogDescription>
                  다이얼로그의 내용을 여기에 작성합니다. 중요한 정보나 사용자 액션을 요청할 때 사용합니다.
                </DialogDescription>
              </DialogHeader>
              <div className='flex justify-end gap-2 pt-4'>
                <Button variant='outline'>취소</Button>
                <Button onClick={() => toast.success('확인되었습니다!')}>확인</Button>
              </div>
            </DialogContent>
          </Dialog>
        </Section>

        {/* 드롭다운 */}
        <Section title='드롭다운 메뉴 (Dropdown Menu)' description='클릭 시 나타나는 메뉴 컴포넌트입니다.'>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant='outline'>
                  메뉴 열기 <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />프로필
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className='mr-2 h-4 w-4' />알림
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />설정
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive'>
                <LogOut className='mr-2 h-4 w-4' />로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        {/* 툴팁 */}
        <Section title='툴팁 (Tooltip)' description='호버 시 도움말을 표시하는 컴포넌트입니다.'>
          <div className='flex gap-4'>
            <Tooltip>
              <TooltipTrigger render={<Button variant='outline' size='icon'><Bell className='h-4 w-4' /></Button>} />
              <TooltipContent>알림 설정</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant='outline' size='icon'><Settings className='h-4 w-4' /></Button>} />
              <TooltipContent>설정 열기</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant='outline'>마우스를 올려보세요</Button>} />
              <TooltipContent>툴팁이 표시됩니다!</TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* 카드 */}
        <Section title='카드 (Card)' description='콘텐츠를 담는 카드 컴포넌트입니다.'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>카드 제목</CardTitle>
                <CardDescription>카드의 간략한 설명입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>카드 본문 콘텐츠가 들어갑니다.</p>
              </CardContent>
            </Card>
            <Card className='border-primary/30 bg-primary/5'>
              <CardHeader>
                <CardTitle className='text-base'>강조 카드</CardTitle>
                <CardDescription>테두리 색상으로 강조한 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>중요한 내용을 강조할 때 사용합니다.</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* 구분선 */}
        <Section title='구분선 (Separator)' description='콘텐츠를 시각적으로 구분하는 컴포넌트입니다.'>
          <div className='flex flex-col gap-3'>
            <p className='text-sm'>위 콘텐츠</p>
            <Separator />
            <p className='text-sm'>아래 콘텐츠</p>
          </div>
        </Section>

        {/* 토스트 */}
        <Section title='토스트 (Toast)' description='화면 모서리에 나타나는 알림 메시지입니다.'>
          <div className='flex flex-wrap gap-2'>
            <Button variant='outline' size='sm' onClick={() => toast.success('성공! 작업이 완료되었습니다.')}>
              성공
            </Button>
            <Button variant='outline' size='sm' onClick={() => toast.error('오류가 발생했습니다.')}>
              오류
            </Button>
            <Button variant='outline' size='sm' onClick={() => toast.warning('주의가 필요합니다.')}>
              경고
            </Button>
            <Button variant='outline' size='sm' onClick={() => toast.info('참고할 정보입니다.')}>
              정보
            </Button>
            <Button variant='outline' size='sm' onClick={() => toast.loading('처리 중입니다...')}>
              로딩
            </Button>
          </div>
        </Section>

      </div>
    </ExampleLayout>
  )
}
