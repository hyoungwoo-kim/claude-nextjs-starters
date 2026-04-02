// 회원가입 페이지
import type { Metadata } from 'next'
import { RegisterFormClient } from '@/components/forms/form-client-wrappers'

export const metadata: Metadata = {
  title: '회원가입',
}

export default function RegisterPage() {
  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12'>
      <div className='w-full max-w-sm'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold'>시작하세요</h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            무료 계정을 만들고 바로 시작하세요
          </p>
        </div>
        <RegisterFormClient />
      </div>
    </div>
  )
}
