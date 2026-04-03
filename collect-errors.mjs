import { chromium } from 'playwright'

const BASE_URL = 'http://localhost:3000'

const PAGES = [
  { path: '/', name: '랜딩 페이지' },
  { path: '/examples', name: '예제 인덱스' },
  { path: '/examples/components', name: 'UI 컴포넌트' },
  { path: '/examples/forms', name: '폼 예제' },
  { path: '/examples/data-fetching', name: '데이터 패칭' },
  { path: '/examples/hooks', name: '커스텀 훅' },
  { path: '/examples/layouts', name: '레이아웃' },
  { path: '/examples/optimization', name: '최적화' },
  { path: '/dashboard', name: '대시보드' },
  { path: '/login', name: '로그인' },
  { path: '/register', name: '회원가입' },
]

const results = {}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext()

for (const { path, name } of PAGES) {
  const page = await context.newPage()
  const errors = []
  const networkErrors = []
  const warnings = []

  // 콘솔 메시지 수집
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push({ type: 'console.error', text: msg.text(), location: msg.location() })
    } else if (msg.type() === 'warning') {
      warnings.push({ type: 'console.warn', text: msg.text() })
    }
  })

  // 페이지 오류 수집
  page.on('pageerror', (err) => {
    errors.push({ type: 'pageerror', text: err.message, stack: err.stack })
  })

  // 네트워크 오류 수집
  page.on('requestfailed', (req) => {
    networkErrors.push({
      type: 'network_failed',
      url: req.url(),
      method: req.method(),
      failure: req.failure()?.errorText,
    })
  })

  page.on('response', (resp) => {
    if (resp.status() >= 400) {
      networkErrors.push({
        type: `http_${resp.status()}`,
        url: resp.url(),
        status: resp.status(),
      })
    }
  })

  const url = `${BASE_URL}${path}`
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
    await page.waitForTimeout(2000)
  } catch (e) {
    errors.push({ type: 'navigation_error', text: e.message })
  }

  results[path] = { name, url, errors, networkErrors, warnings }
  await page.close()
}

await browser.close()

// 결과 출력
console.log('\n' + '='.repeat(60))
console.log('Playwright 오류 수집 결과')
console.log('='.repeat(60))

let totalErrors = 0
let totalNetworkErrors = 0

for (const [path, data] of Object.entries(results)) {
  const hasIssues = data.errors.length > 0 || data.networkErrors.length > 0
  if (!hasIssues) continue

  console.log(`\n📄 [${data.name}] ${data.url}`)
  console.log('-'.repeat(50))

  if (data.errors.length > 0) {
    console.log(`  콘솔/페이지 오류 (${data.errors.length}건):`)
    for (const err of data.errors) {
      totalErrors++
      const loc = err.location ? ` @ ${err.location.url}:${err.location.lineNumber}` : ''
      console.log(`  ❌ [${err.type}] ${err.text}${loc}`)
      if (err.stack) {
        const firstLine = err.stack.split('\n')[1]?.trim()
        if (firstLine) console.log(`     └─ ${firstLine}`)
      }
    }
  }

  if (data.networkErrors.length > 0) {
    console.log(`  네트워크 오류 (${data.networkErrors.length}건):`)
    for (const err of data.networkErrors) {
      totalNetworkErrors++
      console.log(`  🌐 [${err.type}] ${err.url}`)
      if (err.failure) console.log(`     └─ ${err.failure}`)
    }
  }

  if (data.warnings.length > 0) {
    console.log(`  경고 (${data.warnings.length}건):`)
    for (const w of data.warnings) {
      console.log(`  ⚠️  ${w.text}`)
    }
  }
}

console.log('\n' + '='.repeat(60))
console.log(`총 오류: 콘솔/페이지 ${totalErrors}건, 네트워크 ${totalNetworkErrors}건`)
console.log('='.repeat(60))

// JSON 출력 (파싱용)
console.log('\n__JSON_START__')
console.log(JSON.stringify(results, null, 2))
console.log('__JSON_END__')
