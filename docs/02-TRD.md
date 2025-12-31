# 2. TRD (기술 요구사항 정의서)

## 2.1 시스템 아키텍처
```mermaid
graph TD
    User[사용자 (Mobile Web)] --> CDN[Vercel Edge Network]
    CDN --> FE[Next.js App Router (Bun)]
    FE --> API[Exchange Rate API]
    FE --> DB[(Supabase DB)]
    
    subgraph Data Pipeline
        GHA[GitHub Actions (Weekly Cron)] --> Scraper[Python/Node Scraper Script]
        Scraper --Upsert--> DB
    end
```

## 2.2 기술 스택 선정
- **프론트엔드:**
    - **Framework:** Next.js 15 (App Router) - 최신 기능 및 SEO 최적화
    - **Runtime/Bundler:** Bun - 초고속 패키지 설치 및 빌드 성능
    - **Language:** TypeScript - 타입 안정성 확보
    - **UI Library:** shadcn/ui + Tailwind CSS - '토스' 스타일의 깔끔하고 모던한 UI 구축
    - **State Management:** Zustand - 전역 상태(환율 정보 등) 및 로컬스토리지 연동(persist) 관리
    - **Icon:** Lucide React
- **백엔드 & 데이터베이스:**
    - **DB:** Supabase (PostgreSQL) - 관리형 DB, 대시보드 제공
    - **API:** Supabase Client (Direct Query)
- **인프라 & 자동화:**
    - **Hosting:** Vercel - Next.js 최적화 배포
    - **Automation:** GitHub Actions - 주기적 데이터 수집 스크립트 실행
    - **Scraper:** Python (BeautifulSoup/Selenium) or Node.js (Puppeteer/Cheerio) - *AI가 작성*

## 2.3 데이터베이스 설계 요구사항
- **Dual Table Strategy:**
    - `products` 테이블: 지역별 특산품 및 일반 쇼핑 아이템 저장 (지역 필터링 중심).
    - `donki_products` 테이블: 돈키호테 전용 인기 상품 및 랭킹 데이터 저장 (랭킹/카테고리 중심).
- **Navigation:** 모든 페이지에서 접근 가능한 '돈키호테 바로가기' 아이콘(또는 버튼)을 UI에 배치하여 별도 플로우로 유도.
- **Data Lifecycle:** 스크래핑 데이터는 `updated_at`을 기준으로 최신성을 유지하며, 오래된 데이터는 노출 순위를 낮추거나 아카이빙.

## 2.4 비기능 요구사항
- **모바일 최적화:** 모든 UI는 모바일 터치 환경(Touch Target 44px 이상)에 맞춰 설계.
- **오프라인 대응:** 찜한 목록은 네트워크가 불안정한 돈키호테 지하 매장에서도 볼 수 있어야 함 (LocalStorage).
- **퍼포먼스:** 이미지 포맷은 WebP 사용, Lazy Loading 적용.