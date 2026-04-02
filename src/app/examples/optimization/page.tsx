// 성능 최적화 & SEO 예제 페이지
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Zap,
  Search,
  Image as ImageIcon,
  Code2,
  Globe,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { ExampleLayout } from '@/components/examples/example-layout'

export const metadata: Metadata = {
  title: '성능 최적화 & SEO 예제',
  description: 'Next.js의 성능 최적화 기능과 SEO 설정 방법을 학습합니다.',
  openGraph: {
    title: '성능 최적화 & SEO 예제',
    description: 'Next.js의 성능 최적화 기능과 SEO 설정 방법을 학습합니다.',
    type: 'website',
  },
}

// 섹션 구분 컴포넌트
function Section({ title, description, badge, children }: {
  title: string
  description: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <div className='rounded-lg border border-border/50 bg-card/40 p-6'>
      <div className='mb-5 flex flex-wrap items-start justify-between gap-2'>
        <div>
          <h2 className='text-base font-semibold'>{title}</h2>
          <p className='mt-0.5 text-sm text-muted-foreground'>{description}</p>
        </div>
        {badge && (
          <Badge variant='outline' className='font-mono text-xs text-green-400'>
            {badge}
          </Badge>
        )}
      </div>
      {children}
    </div>
  )
}

// 코드 블록 컴포넌트
function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className='rounded-md border border-border/50 bg-muted/20'>
      {title && (
        <div className='border-b border-border/50 px-4 py-2'>
          <span className='font-mono text-xs text-muted-foreground'>{title}</span>
        </div>
      )}
      <pre className='overflow-x-auto p-4 text-xs leading-relaxed text-foreground/90'>
        <code>{code}</code>
      </pre>
    </div>
  )
}

// 체크 아이템 컴포넌트
function CheckItem({ label, good, note }: { label: string; good: boolean; note?: string }) {
  return (
    <div className='flex items-start gap-2'>
      {good ? (
        <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-green-400' />
      ) : (
        <XCircle className='mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40' />
      )}
      <div>
        <span className='text-sm'>{label}</span>
        {note && <p className='text-xs text-muted-foreground'>{note}</p>}
      </div>
    </div>
  )
}

export default function OptimizationPage() {
  return (
    <ExampleLayout
      title='성능 최적화 & SEO'
      description='Next.js의 내장 최적화 기능과 SEO 설정으로 더 빠르고 검색에 잘 노출되는 앱을 만드세요.'
    >
      <div className='flex flex-col gap-5'>

        {/* Metadata API */}
        <Section
          title='Metadata API (SEO)'
          description='Next.js 13+ App Router의 Metadata API로 페이지별 SEO를 설정합니다.'
          badge='next/metadata'
        >
          <div className='flex flex-col gap-4'>
            <CodeBlock
              title='app/page.tsx — 정적 메타데이터'
              code={`import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홈 | NextStarter',
  description: '모던 웹 스타터킷으로 빠르게 개발을 시작하세요.',
  keywords: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  openGraph: {
    title: '홈 | NextStarter',
    description: '모던 웹 스타터킷',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '홈 | NextStarter',
  },
}`}
            />
            <CodeBlock
              title='app/blog/[slug]/page.tsx — 동적 메타데이터'
              code={`export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    },
  }
}`}
            />
            <div className='rounded-md border border-border/50 bg-muted/10 p-4'>
              <p className='mb-3 text-xs font-medium text-muted-foreground'>이 페이지에 적용된 메타데이터</p>
              <div className='grid grid-cols-1 gap-2 text-sm sm:grid-cols-2'>
                <div><span className='text-muted-foreground'>title: </span><span className='font-mono text-xs'>성능 최적화 & SEO 예제</span></div>
                <div><span className='text-muted-foreground'>description: </span><span className='font-mono text-xs'>Next.js의 성능 최적화...</span></div>
                <div><span className='text-muted-foreground'>og:title: </span><span className='font-mono text-xs'>성능 최적화 & SEO 예제</span></div>
                <div><span className='text-muted-foreground'>og:type: </span><span className='font-mono text-xs'>website</span></div>
              </div>
            </div>
          </div>
        </Section>

        {/* Next/Image 최적화 */}
        <Section
          title='이미지 최적화 (next/image)'
          description='Next.js Image 컴포넌트로 자동 최적화, WebP 변환, 지연 로딩을 적용합니다.'
          badge='next/image'
        >
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {/* 좋은 예 */}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-1.5'>
                  <CheckCircle2 className='h-4 w-4 text-green-400' />
                  <span className='text-sm font-medium text-green-400'>next/image 사용</span>
                </div>
                <div className='overflow-hidden rounded-md border border-green-400/30'>
                  <Image
                    src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop'
                    alt='코딩 예시 이미지'
                    width={400}
                    height={200}
                    className='w-full object-cover'
                    placeholder='blur'
                    blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIBAAAQQCAgMAAAAAAAAAAAAAAQIDBBEABSExQf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwCmV9c3TT2bXECfNijgkQXnG1OpBSpKlAnYJG+wQe9RdtVkqNBffdU26S4VJKlBJKiSSdEnZJJ717xjGBZJlv/Z'
                  />
                </div>
                <p className='text-xs text-muted-foreground'>WebP 자동 변환, 지연 로딩, blur placeholder</p>
              </div>

              {/* 나쁜 예 */}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-1.5'>
                  <XCircle className='h-4 w-4 text-muted-foreground/40' />
                  <span className='text-sm font-medium text-muted-foreground'>{'<img>'} 직접 사용</span>
                </div>
                <div className='flex h-[120px] items-center justify-center rounded-md border border-border/30 bg-muted/10'>
                  <p className='text-sm text-muted-foreground'>이미지 크기 제어 없음, 레이아웃 시프트 발생</p>
                </div>
                <p className='text-xs text-muted-foreground'>최적화 없음, CLS 점수 하락</p>
              </div>
            </div>

            <CodeBlock
              title='올바른 next/image 사용법'
              code={`import Image from 'next/image'

// 고정 크기
<Image
  src='/hero.jpg'
  alt='히어로 이미지'
  width={1200}
  height={600}
  priority     // LCP 이미지에 적용 (preload)
/>

// 반응형 (부모 컨테이너 기준)
<div className='relative h-64 w-full'>
  <Image
    src='/background.jpg'
    alt='배경'
    fill
    sizes='(max-width: 768px) 100vw, 50vw'
    className='object-cover'
  />
</div>`}
            />
          </div>
        </Section>

        {/* Server / Client Component 전략 */}
        <Section
          title='Server vs Client 컴포넌트 전략'
          description='올바른 렌더링 전략으로 초기 로딩 속도와 번들 크기를 최적화합니다.'
          badge='RSC'
        >
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              <Card className='border-blue-400/30 bg-blue-400/5'>
                <CardHeader className='pb-2'>
                  <CardTitle className='flex items-center gap-2 text-sm text-blue-400'>
                    <Globe className='h-4 w-4' />
                    Server Component (기본)
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-1.5 text-xs text-muted-foreground'>
                  <CheckItem good label='JS 번들에 포함되지 않음' />
                  <CheckItem good label='DB / API 직접 접근 가능' />
                  <CheckItem good label='민감 정보 서버에서만 처리' />
                  <CheckItem good={false} label='useState / useEffect 불가' />
                  <CheckItem good={false} label='이벤트 핸들러 불가' />
                </CardContent>
              </Card>

              <Card className='border-orange-400/30 bg-orange-400/5'>
                <CardHeader className='pb-2'>
                  <CardTitle className='flex items-center gap-2 text-sm text-orange-400'>
                    <Code2 className='h-4 w-4' />
                    Client Component ('use client')
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-1.5 text-xs text-muted-foreground'>
                  <CheckItem good label='상태(useState) 사용 가능' />
                  <CheckItem good label='이벤트 핸들러 사용 가능' />
                  <CheckItem good label='브라우저 API 사용 가능' />
                  <CheckItem good={false} label='JS 번들에 포함됨' />
                  <CheckItem good={false} label='DB 직접 접근 불가' />
                </CardContent>
              </Card>
            </div>

            <CodeBlock
              title='컴포넌트 분리 전략'
              code={`// ✅ 좋은 예: 상호작용 부분만 Client로 분리
// ProductPage.tsx (Server)
export default async function ProductPage() {
  const product = await db.getProduct()  // 서버에서 DB 접근
  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton id={product.id} />  {/* Client */}
    </div>
  )
}

// AddToCartButton.tsx (Client)
'use client'
export function AddToCartButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  return <button onClick={() => addToCart(id)}>장바구니 추가</button>
}`}
            />
          </div>
        </Section>

        {/* 폰트 최적화 */}
        <Section
          title='폰트 최적화 (next/font)'
          description='next/font로 폰트를 자동 최적화하여 레이아웃 시프트를 방지합니다.'
          badge='next/font'
        >
          <div className='flex flex-col gap-4'>
            <CodeBlock
              title='app/layout.tsx'
              code={`import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html className={\`\${geistSans.variable} \${geistMono.variable}\`}>
      <body>{children}</body>
    </html>
  )
}`}
            />
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
              {[
                { icon: Zap, label: '자동 자체 호스팅', desc: 'Google Fonts CDN 불필요' },
                { icon: BarChart3, label: 'CLS 제로', desc: 'size-adjust로 레이아웃 시프트 방지' },
                { icon: Search, label: '성능 점수 향상', desc: 'Lighthouse 폰트 경고 제거' },
              ].map((item) => (
                <div key={item.label} className='flex items-start gap-3 rounded-md border border-border/50 bg-muted/10 p-3'>
                  <item.icon className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
                  <div>
                    <p className='text-sm font-medium'>{item.label}</p>
                    <p className='text-xs text-muted-foreground'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* SEO 체크리스트 */}
        <Section
          title='SEO 체크리스트'
          description='검색 엔진 최적화를 위한 필수 항목을 확인하세요.'
          badge='SEO'
        >
          <div className='grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2'>
            <div className='flex flex-col gap-2'>
              <p className='text-xs font-medium text-muted-foreground'>기본 메타태그</p>
              <CheckItem good label='페이지별 고유 title 설정' />
              <CheckItem good label='meta description (150자 이내)' />
              <CheckItem good label='Open Graph 태그 (og:title, og:image)' />
              <CheckItem good label='Twitter Card 태그' />
              <CheckItem good label='canonical URL 설정' />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-xs font-medium text-muted-foreground'>기술적 SEO</p>
              <CheckItem good label='sitemap.xml 자동 생성' note='next-sitemap 또는 app/sitemap.ts' />
              <CheckItem good label='robots.txt 설정' note='app/robots.ts' />
              <CheckItem good label='구조화 데이터 (JSON-LD)' note='Schema.org' />
              <CheckItem good label='Core Web Vitals 최적화' note='LCP, FID, CLS' />
              <CheckItem good label='모바일 반응형' note='필수 구글 랭킹 요소' />
            </div>
          </div>
          <Separator className='my-4' />
          <CodeBlock
            title='app/sitemap.ts'
            code={`import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://example.com', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: 'https://example.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/private/' },
    sitemap: 'https://example.com/sitemap.xml',
  }
}`}
          />
        </Section>

        {/* 성능 최적화 요약 */}
        <div className='rounded-lg border border-border/50 bg-card/40 p-6'>
          <h2 className='mb-4 flex items-center gap-2 text-base font-semibold'>
            <Layers className='h-4 w-4' />
            Next.js 성능 최적화 핵심 요약
          </h2>
          <div className='grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3'>
            {[
              { title: 'next/image', desc: '이미지 자동 최적화, WebP, lazy loading', color: 'text-blue-400' },
              { title: 'next/font', desc: '폰트 자체 호스팅, CLS 방지', color: 'text-purple-400' },
              { title: 'next/link', desc: '자동 프리패치로 빠른 페이지 전환', color: 'text-green-400' },
              { title: 'RSC', desc: '서버 컴포넌트로 JS 번들 최소화', color: 'text-orange-400' },
              { title: 'Metadata API', desc: '페이지별 SEO 자동화', color: 'text-pink-400' },
              { title: 'Turbopack', desc: '빠른 HMR, 개발 생산성 향상', color: 'text-yellow-400' },
            ].map((item) => (
              <div key={item.title} className='rounded-md border border-border/50 bg-muted/10 p-3'>
                <p className={`font-mono text-sm font-medium ${item.color}`}>{item.title}</p>
                <p className='mt-1 text-xs text-muted-foreground'>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className='mt-4 flex'>
            <Link
              href='https://nextjs.org/docs/app/building-your-application/optimizing'
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
              target='_blank'
              rel='noopener noreferrer'
            >
              Next.js 최적화 공식 문서
              <ArrowRight className='h-3.5 w-3.5' />
            </Link>
          </div>
        </div>

      </div>
    </ExampleLayout>
  )
}
