// 로그인 페이지
import type { Metadata } from 'next'
import { LoginFormClient } from '@/components/forms/form-client-wrappers'

export const metadata: Metadata = {
  title: '로그인',
}

export default function LoginPage() {
  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12'>
      <div className='w-full max-w-sm'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold'>다시 만나서 반가워요</h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            계정에 로그인하여 계속하세요
          </p>
        </div>
        <LoginFormClient />
      </div>
    </div>
  )
}
