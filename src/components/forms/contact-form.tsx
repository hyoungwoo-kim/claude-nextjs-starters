'use client'

// 문의 폼 - react-hook-form + zod 유효성 검사
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 주소를 입력해 주세요'),
  subject: z.string().min(5, '제목은 최소 5자 이상이어야 합니다'),
  message: z.string().min(20, '내용은 최소 20자 이상이어야 합니다'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormValues) => {
    // 실제 문의 API 연동 위치
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <div className='grid gap-5 sm:grid-cols-2'>
        <div className='flex flex-col gap-1.5'>
          <Label htmlFor='name'>이름</Label>
          <Input id='name' placeholder='홍길동' {...register('name')} />
          {errors.name && (
            <p className='text-xs text-destructive'>{errors.name.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-1.5'>
          <Label htmlFor='email'>이메일</Label>
          <Input id='email' type='email' placeholder='hello@example.com' {...register('email')} />
          {errors.email && (
            <p className='text-xs text-destructive'>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='subject'>제목</Label>
        <Input id='subject' placeholder='문의 제목을 입력해 주세요' {...register('subject')} />
        {errors.subject && (
          <p className='text-xs text-destructive'>{errors.subject.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='message'>내용</Label>
        <Textarea
          id='message'
          placeholder='문의 내용을 자세히 적어 주세요'
          rows={5}
          {...register('message')}
        />
        {errors.message && (
          <p className='text-xs text-destructive'>{errors.message.message}</p>
        )}
      </div>

      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? '전송 중...' : '문의 보내기'}
      </Button>
    </form>
  )
}
