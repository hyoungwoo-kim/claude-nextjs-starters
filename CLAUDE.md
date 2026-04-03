# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## 개발 명령어

```bash
npm run dev        # 개발 서버 실행 (http://localhost:3000)
npm run build      # 프로덕션 빌드 (cross-env NODE_ENV=production)
npm run start      # 프로덕션 서버 실행
npm run lint       # ESLint 실행
```

E2E 오류 수집:
```bash
node collect-errors.mjs   # Playwright로 전체 페이지 콘솔/네트워크 오류 수집
```

---

## 아키텍처 개요

**Next.js 16 App Router** 기반 스타터킷. 페이지는 기본적으로 Server Component이며, 상호작용이 필요한 경우에만 `'use client'` 추가.

### 핵심 의존성

| 역할 | 라이브러리 |
|------|-----------|
| UI 컴포넌트 | `@base-ui/react` (shadcn base-nova 프리셋 — Radix UI 아님) |
| 스타일링 | Tailwind CSS v4 |
| 폼 관리 | `react-hook-form` + `zod` |
| 알림 | `sonner` |
| 다크모드 | `next-themes` |
| 훅 유틸리티 | `usehooks-ts` |
| 테스트 | `playwright` |

### 프로젝트 구조

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # 루트 레이아웃 (ThemeProvider, Header, Footer, Toaster)
│   ├── page.tsx                      # 랜딩 페이지 (섹션 컴포넌트 조합)
│   ├── globals.css                   # Tailwind CSS v4 전역 스타일
│   ├── (auth)/                       # 라우트 그룹 — URL에 'auth' 미포함
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   └── page.tsx                  # 사이드바 + 통계 카드 + 데이터 테이블
│   └── examples/
│       ├── page.tsx                  # 예제 목록
│       ├── components/page.tsx       # UI 컴포넌트 쇼케이스
│       ├── forms/page.tsx            # react-hook-form + zod 예제
│       ├── data-fetching/page.tsx    # fetch 패턴 (기본/선택적/에러/페이지네이션)
│       ├── hooks/page.tsx            # usehooks-ts 예제
│       ├── layouts/page.tsx          # 레이아웃 패턴
│       └── optimization/page.tsx     # 성능 최적화 예제
│
├── components/
│   ├── ui/                           # shadcn base-nova UI 컴포넌트 (25개)
│   │   ├── button.tsx                # 'use client' — Base UI 기반
│   │   ├── button-variants.ts        # CVA variants만 분리 (Server Component용)
│   │   └── ...                       # accordion, alert, avatar, badge, card,
│   │                                 # checkbox, dialog, dropdown-menu, input,
│   │                                 # label, navigation-menu, select, separator,
│   │                                 # sheet, skeleton, sonner, switch, table,
│   │                                 # tabs, textarea, tooltip
│   ├── layout/
│   │   ├── header.tsx                # sticky 헤더, 데스크탑 nav, 테마 토글
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx            # Sheet 기반 모바일 햄버거 메뉴
│   │   ├── sidebar.tsx               # 대시보드 사이드바
│   │   └── theme-provider.tsx        # next-themes 래퍼 ('use client')
│   ├── sections/                     # 랜딩 페이지 전용 섹션
│   │   └── hero, features, stats, testimonials, pricing, faq, cta
│   ├── forms/
│   │   ├── login-form.tsx            # zod 스키마 + react-hook-form
│   │   ├── register-form.tsx
│   │   ├── contact-form.tsx
│   │   └── form-client-wrappers.tsx  # dynamic ssr:false 래퍼
│   ├── common/
│   │   ├── empty-state.tsx
│   │   ├── error-state.tsx
│   │   ├── loading-spinner.tsx
│   │   ├── logo.tsx
│   │   ├── stat-card.tsx
│   │   └── theme-toggle.tsx
│   └── examples/
│       └── example-layout.tsx        # 예제 페이지 공통 레이아웃
│
└── lib/
    └── utils.ts                      # cn() — clsx + tailwind-merge
```

### 라우트 구조

```
/                        → 랜딩 페이지
/(auth)/login            → 로그인 (라우트 그룹 — URL에 auth 미포함)
/(auth)/register         → 회원가입
/dashboard               → 대시보드
/examples                → 예제 목록
/examples/components     → UI 컴포넌트
/examples/forms          → 폼 처리
/examples/data-fetching  → 데이터 패칭
/examples/hooks          → React 훅
/examples/layouts        → 레이아웃 패턴
/examples/optimization   → 성능 최적화
```

### 루트 레이아웃 구조

`src/app/layout.tsx`가 전체 앱을 감싸는 방식:

```
ThemeProvider (next-themes, defaultTheme='dark')
  └─ TooltipProvider (@base-ui/react)
       ├─ Header
       ├─ <main> {children}
       ├─ Footer
       └─ Toaster (sonner)
```

폰트: Geist Sans (`--font-sans`), Geist Mono (`--font-mono`) — shadcn nova 프리셋이 `--font-sans` 변수를 기대함.

---

## @base-ui/react 사용 시 주의사항

shadcn의 `base-nova` 프리셋은 **Radix UI가 아닌 Base UI**를 사용하므로 API가 다름.

| 패턴 | ❌ Radix (기존) | ✅ Base UI (이 프로젝트) |
|------|----------------|------------------------|
| Button as Link | `<Button asChild><Link>` | `buttonVariants`를 Link에 직접 적용 |
| Trigger 렌더 | `<SheetTrigger asChild>` | `<SheetTrigger render={<Button />}>` |
| Accordion | `<Accordion type='single' collapsible>` | `<Accordion>` |

**주의:** `button.tsx`는 `'use client'`이므로 Server Component에서 `buttonVariants` import 시 `src/components/ui/button-variants.ts` (별도 파일) 사용.

---

## 주요 패턴

### Server Component에서 form 사용
폼 컴포넌트는 SSR 시 `useContext` null 에러가 발생할 수 있음.
`src/components/forms/form-client-wrappers.tsx` — Client Component에서 `dynamic({ ssr: false })` 래퍼 제공.
Next.js 16에서 `ssr: false`는 Server Component에서 직접 사용 불가 → 반드시 Client Component 래퍼 경유.

### 윈도우 크기 / 클라이언트 전용 값
Hydration 불일치 방지를 위해 `usehooks-ts`의 `useIsClient()` 사용, 마운트 전 fallback 값 표시.

### 이미지
외부 이미지는 `images.unsplash.com`만 허용 (`next.config.ts` remotePatterns).

### 경로 별칭
`@/` → `src/` (tsconfig paths)
