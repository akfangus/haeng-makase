# 7. Coding Convention & AI Collaboration Guide

## 7.1 핵심 원칙
- **Trust but Verify:** AI가 짠 코드는 반드시 실행해보고 에러를 확인한다.
- **KISS (Keep It Simple, Stupid):** 과도한 추상화보다는 직관적인 코드를 선호한다.
- **Mobile First:** 모든 UI 확인은 모바일 뷰포트 크기에서 먼저 수행한다.

## 7.2 코드 작성 규칙 (FSD Architecture)
- **Type Safety:** `any` 타입 사용을 금지하며, Supabase에서 생성된 Database Type을 적극 활용한다 (`supabase gen types`).
- **Project Structure (Feature-Sliced Design):**
    - 프로젝트는 **FSD 방법론**을 따르며, 아래 계층 구조를 엄격히 준수한다.
    - **app/**: 전역 설정, 라우팅, 레이아웃, Provider.
    - **pages/**: Next.js 라우트별 페이지 조합 (로직 최소화).
    - **widgets/**: 독립적인 UI 블록 (Header, Sidebar 등 - Feature/Entity 조합).
    - **features/**: 비즈니스 기능이 포함된 컴포넌트 (LoginButton, AddToCart 등).
    - **entities/**: 도메인 데이터 모델 및 순수 UI (User, Product 등).
    - **shared/**: 공용 UI, 라이브러리, 유틸리티 (특정 도메인 종속 X).
    - *규칙: 상위 레이어는 하위 레이어만 참조할 수 있으며, 같은 레이어 간 참조(Shared 제외)는 지양한다.*
- **Component Structure:**
    - UI 로직(View)과 비즈니스 로직(Hook)을 분리한다.
    - 클라이언트 컴포넌트(`'use client'`)는 잎사귀(Leaf) 노드에 가깝게 배치하여 서버 사이드 렌더링 이점을 유지한다.
- **Naming Convention:**
    - 폴더: 소문자 케밥 케이스 (`product-list`)
    - 컴포넌트: 파스칼 케이스 (`ProductList.tsx`)
    - 함수/변수: 카멜 케이스 (`getProductList`)
    - 상수: 대문자 스네이크 케이스 (`MAX_ITEMS_PER_PAGE`)

## 7.3 AI와의 소통 팁 (프롬프트 가이드)
- **역할 부여:** "너는 시니어 프론트엔드 개발자야. Next.js 15와 Tailwind CSS 전문가처럼 행동해."
- **명확한 지시:** "그냥 예쁘게 해줘" (X) -> "Toss 앱처럼 여백을 24px 주고, 폰트 크기는 16px, 색상은 #333으로 해줘" (O)
- **에러 해결:** 에러 메시지만 던지지 말고, 에러가 발생한 파일의 코드와 함께 "이 부분에서 이런 에러가 났어. 문맥을 고려해서 수정해줘"라고 요청한다.
