# 6. TASKS (AI 개발 파트너용 프롬프트 설계서)

> **[중요] AI 개발 파트너를 위한 지침**
>
> 이 문서는 프로젝트의 실행 계획을 담고 있습니다. 각 태스크를 수행하기 전에 반드시 `docs/` 폴더 내의 아래 설계 문서들을 꼼꼼히 참조하여 문맥에 맞는 코드를 작성해 주십시오. 모든 설계의 근거와 상세 내용은 해당 문서들에 정의되어 있습니다.
>
> **참조 문서 목록:**
>
> - **[01-PRD.md](./01-PRD.md):** 제품의 목표, 페르소나, 사용자 스토리
> - **[02-TRD.md](./02-TRD.md):** 기술 스택, 시스템 아키텍처, 데이터 파이프라인 (테이블 분리 전략 포함)
> - **[03-User-Flow.md](./03-User-Flow.md):** 사용자 여정 및 인터랙션 흐름 (돈키호테 별도 플로우)
> - **[04-Database-Design.md](./04-Database-Design.md):** ERD (`products` vs `donki_products`)
> - **[05-Design-System.md](./05-Design-System.md):** 색상, 폰트, UI 컴포넌트 가이드
> - **[07-Coding-Convention.md](./07-Coding-Convention.md):** 코드 스타일, 명명 규칙, 프롬프트 가이드

## [M0] 프로젝트 초기화 및 환경 설정

- **목표:** Next.js 15, Bun, Supabase, GitHub Repo 연동 완료.
- **Tasks:**
  - [x] 1. "Bun을 사용하여 Next.js 15 (App Router) 프로젝트 `haeng-makase`를 생성하라. TypeScript, Tailwind CSS, ESLint, Prettier를 포함한다."
  - [x] 2. "Shadcn/ui를 초기화하고 `card`, `button`, `badge`, `sonner`(toast 대체), `skeleton` 컴포넌트를 설치하라."
  - [x] 3. "Supabase 프로젝트를 생성하고 TRD를 참조하여 `products`, `donki_products` 테이블 생성 SQL을 작성하라. 추가로 `@supabase/ssr`을 사용하여 `utils/supabase/server.ts`, `client.ts`, `middleware.ts` (세션 관리용)를 구현하라."
  - [x] 4. "프로젝트 폴더 구조를 FSD 아키텍처에 따라 `app`, `pages`, `widgets`, `features`, `entities`, `shared`로 정리하라."

## [M1] 디자인 시스템 및 레이아웃 구현

- **목표:** 토스 스타일의 미니멀 우드톤 UI 테마 적용 및 기본 레이아웃 구성.
- **Tasks:**
  - [x] 1. "Tailwind CSS v4 방식에 맞춰 `app/globals.css` 내 `@theme` 블록을 사용하여 Design System의 색상(Wood & Toss Blue)과 폰트를 정의하라."
  - [x] 2. "모바일 뷰를 기준으로 상단 헤더(로고+환율위젯), 메인 콘텐츠 영역, 하단 탭(선택사항) 구조의 `layout.tsx`를 구현하라."
  - [ ] 3. "장바구니를 입에 문 시바견 이미지를 플레이스홀더로 사용하여 로딩 컴포넌트 `LoadingShiba.tsx`를 구현하라."
  - [ ] 4. "모든 페이지의 우측 하단(또는 헤더)에 '돈키호테 바로가기' 플로팅 버튼(펭귄 아이콘 등)을 구현하고, 클릭 시 `/donki` 페이지로 이동하도록 하라."

## [M2] 핵심 기능 개발 1: 홈(지도) & 지역별 상품

- **목표:** 메인 화면의 지도 인터랙션과 지역별 상품 조회 (`products` 테이블).
- **Tasks:**
  - [ ] 1. "SVG를 사용하여 클릭 가능한 단순화된 일본 지도 컴포넌트 `JapanMap.tsx`를 구현하라. (주요 지역: 홋카이도, 도쿄/간토, 오사카/간사이, 후쿠오카/규슈, 오키나와)"
  - [ ] 2. "Supabase Server Client를 사용하여 `products` 테이블에서 특정 지역의 데이터를 가져오는 Server Action `getRegionProducts(region)`을 구현하라."
  - [ ] 3. "홈 화면에서 지역 클릭 시 `/region/[region_name]` 페이지로 이동하며, 해당 지역의 상품 리스트만 보여주도록 구현하라."

## [M3] 핵심 기능 개발 2: 돈키호테 & 찜하기 (MVP 완성)

- **목표:** 돈키호테 전용 페이지 (`donki_products` 테이블) 및 통합 찜 기능.
- **Tasks:**
  - [ ] 1. "Supabase Server Client를 사용하여 `donki_products` 테이블에서 랭킹 순으로 데이터를 가져오는 Server Action `getDonkiProducts()`를 구현하라."
  - [ ] 2. "돈키호테 페이지 `/donki/page.tsx`를 생성하고, 상품을 랭킹 뱃지(1위, 2위...)와 함께 카드 형태로 나열하라."
  - [ ] 3. "Zustand와 LocalStorage를 사용하여 `useWishlist` 훅을 구현하라. (Next.js Hydration Mismatch 방지를 위해 `persist` 미들웨어와 함께 커스텀 훅 또는 `useEffect` 처리를 반드시 포함)"
  - [ ] 4. "상품 리스트 및 상세 페이지에서 찜하기 버튼 클릭 시 토스트 메시지를 띄우고 상태를 저장하라."
  - [ ] 5. "상단 헤더에 무료 환율 API를 연동하여 '100엔 = XXX원' 정보를 보여주는 `ExchangeRateWidget.tsx`를 구현하라."

## [M4] 데이터 수집 자동화 (Data Pipeline)

- **목표:** Python/Node.js 스크립트로 데이터 수집 및 Supabase 적재 자동화.
- **Tasks:**
  - [ ] 1. "스크래핑 스크립트를 `scraper/region_scraper.py` (지역 상품용)와 `scraper/donki_scraper.py` (돈키호테 랭킹용) 두 개로 분리하여 작성하라."
  - [ ] 2. "각 스크립트가 수집한 데이터를 각각 `products`와 `donki_products` 테이블에 Upsert하도록 로직을 구현하라."
  - [ ] 3. "이 스크립트들이 매주 월요일 오전 9시에 실행되도록 `.github/workflows/scrape.yml` 파일을 작성하라."