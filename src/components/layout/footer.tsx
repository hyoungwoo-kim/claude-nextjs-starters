// 푸터 컴포넌트 - 3컬럼 링크 + 소셜 링크 + 저작권
import Link from 'next/link'
// lucide-react v1.x에서 브랜드 아이콘 제거됨 → 텍스트 링크로 대체
import { ExternalLink } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/common/logo'

const footerLinks = {
  제품: [
    { label: '기능', href: '#features' },
    { label: '가격', href: '#pricing' },
    { label: '변경 이력', href: '#' },
    { label: '로드맵', href: '#' },
  ],
  리소스: [
    { label: '문서', href: '#' },
    { label: '블로그', href: '#' },
    { label: '가이드', href: '#' },
    { label: 'FAQ', href: '#faq' },
  ],
  회사: [
    { label: '소개', href: '#' },
    { label: '채용', href: '#' },
    { label: '이용약관', href: '#' },
    { label: '개인정보처리방침', href: '#' },
  ],
}

const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'X (Twitter)', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export function Footer() {
  return (
    <footer className='border-t border-border bg-muted/20'>
      <div className='mx-auto max-w-6xl px-4 py-12'>
        {/* 상단: 로고 + 링크 컬럼 */}
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div className='col-span-2 md:col-span-1'>
            <Logo />
            <p className='mt-3 text-sm text-muted-foreground'>
              빠르게 웹 개발을 시작할 수 있는 모던 스타터킷
            </p>
            <div className='mt-4 flex gap-4'>
              {socialLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className='flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground'
                >
                  {label}
                  <ExternalLink className='h-3 w-3' />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className='mb-3 text-sm font-semibold'>{category}</h3>
              <ul className='flex flex-col gap-2'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className='my-8' />

        {/* 하단: 저작권 */}
        <p className='text-center text-sm text-muted-foreground'>
          © {new Date().getFullYear()} NextStarter. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
