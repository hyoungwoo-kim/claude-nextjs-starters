// 폼 예제 페이지
import type { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExampleLayout } from '@/components/examples/example-layout'
import { LoginFormClient, RegisterFormClient, ContactFormClient } from '@/components/forms/form-client-wrappers'

export const metadata: Metadata = { title: '폼 예제' }

export default function FormsPage() {
  return (
    <ExampleLayout
      title='폼 예제'
      description='react-hook-form과 zod를 활용한 다양한 폼 구현 예제입니다.'
    >
      <div className='rounded-lg border border-border/50 bg-card/40 p-6'>
        <p className='mb-6 text-sm text-muted-foreground'>
          모든 폼은 <strong>react-hook-form</strong>으로 상태를 관리하고,
          <strong> zod</strong>로 유효성 검사를 수행합니다.
          빈 칸 제출 또는 잘못된 형식 입력 시 오류 메시지를 확인하세요.
        </p>
        <Tabs defaultValue='login'>
          <TabsList className='mb-6'>
            <TabsTrigger value='login'>로그인 폼</TabsTrigger>
            <TabsTrigger value='register'>회원가입 폼</TabsTrigger>
            <TabsTrigger value='contact'>문의 폼</TabsTrigger>
          </TabsList>
          <TabsContent value='login'>
            <div className='mx-auto max-w-sm'>
              <LoginFormClient />
            </div>
          </TabsContent>
          <TabsContent value='register'>
            <div className='mx-auto max-w-sm'>
              <RegisterFormClient />
            </div>
          </TabsContent>
          <TabsContent value='contact'>
            <ContactFormClient />
          </TabsContent>
        </Tabs>
      </div>
    </ExampleLayout>
  )
}
