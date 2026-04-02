'use client'

// 로그인 폼 - react-hook-form + zod 유효성 검사
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해 주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    // 실제 로그인 API 연동 위치
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success(`${data.email}로 로그인되었습니다`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='email'>이메일</Label>
        <Input
          id='email'
          type='email'
          placeholder='hello@example.com'
          autoComplete='email'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-xs text-destructive'>{errors.email.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-1.5'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='password'>비밀번호</Label>
          <Link
            href='#'
            className='text-xs text-muted-foreground underline-offset-4 hover:underline'
          >
            비밀번호 찾기
          </Link>
        </div>
        <Input
          id='password'
          type='password'
          autoComplete='current-password'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-xs text-destructive'>{errors.password.message}</p>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        계정이 없으신가요?{' '}
        <Link
          href='/register'
          className='font-medium text-foreground underline-offset-4 hover:underline'
        >
          회원가입
        </Link>
      </p>
    </form>
  )
}
