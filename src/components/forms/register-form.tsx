'use client'

// 회원가입 폼 - react-hook-form + zod 유효성 검사
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

const registerSchema = z
  .object({
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
    email: z.string().email('올바른 이메일 주소를 입력해 주세요'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, '이용약관에 동의해 주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { terms: false },
  })

  const termsValue = watch('terms')

  const onSubmit = async (data: RegisterFormValues) => {
    // 실제 회원가입 API 연동 위치
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success(`${data.email}로 가입이 완료되었습니다`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='name'>이름</Label>
        <Input id='name' type='text' placeholder='홍길동' {...register('name')} />
        {errors.name && (
          <p className='text-xs text-destructive'>{errors.name.message}</p>
        )}
      </div>

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
        <Label htmlFor='password'>비밀번호</Label>
        <Input
          id='password'
          type='password'
          placeholder='8자 이상'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-xs text-destructive'>{errors.password.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='confirmPassword'>비밀번호 확인</Label>
        <Input
          id='confirmPassword'
          type='password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className='text-xs text-destructive'>{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className='flex items-start gap-2'>
        <Checkbox
          id='terms'
          checked={termsValue}
          onCheckedChange={(checked) => setValue('terms', checked === true)}
        />
        <Label htmlFor='terms' className='text-sm font-normal leading-snug'>
          <Link href='#' className='underline underline-offset-4 hover:text-foreground'>
            이용약관
          </Link>{' '}
          및{' '}
          <Link href='#' className='underline underline-offset-4 hover:text-foreground'>
            개인정보처리방침
          </Link>
          에 동의합니다
        </Label>
      </div>
      {errors.terms && (
        <p className='text-xs text-destructive'>{errors.terms.message}</p>
      )}

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? '가입 중...' : '회원가입'}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        이미 계정이 있으신가요?{' '}
        <Link
          href='/login'
          className='font-medium text-foreground underline-offset-4 hover:underline'
        >
          로그인
        </Link>
      </p>
    </form>
  )
}
