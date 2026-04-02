'use client'

// 폼 컴포넌트 클라이언트 래퍼
// Next.js 16: ssr:false는 Server Component에서 사용 불가 → Client Component에서 dynamic import
// react-hook-form은 브라우저 전용 훅 → SSR 비활성화 필요
import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/common/loading-spinner'

export const LoginFormClient = dynamic(
  () => import('./login-form').then((m) => ({ default: m.LoginForm })),
  { ssr: false, loading: () => <LoadingSpinner className='py-8' /> },
)

export const RegisterFormClient = dynamic(
  () => import('./register-form').then((m) => ({ default: m.RegisterForm })),
  { ssr: false, loading: () => <LoadingSpinner className='py-8' /> },
)

export const ContactFormClient = dynamic(
  () => import('./contact-form').then((m) => ({ default: m.ContactForm })),
  { ssr: false, loading: () => <LoadingSpinner className='py-8' /> },
)
