# 4. Database Design (데이터베이스 설계)

## 4.1 ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    products {
        uuid id PK "기본키 (지역 상품)"
        string name "상품명"
        integer price "가격 (엔화)"
        text image_url "이미지 링크"
        string region "지역 (예: 오사카, 도쿄, 후쿠오카)"
        string store "판매처 (예: 편의점, 백화점, 기념품샵)"
        string category "카테고리"
        text description "추천 이유/설명"
        text source_link "정보 출처"
        boolean is_featured "추천 여부"
        timestamp created_at
        timestamp updated_at
    }

    donki_products {
        uuid id PK "기본키 (돈키호테 상품)"
        string name "상품명"
        integer price "가격 (엔화)"
        text image_url "이미지 링크"
        integer rank "랭킹 (1~100)"
        string category "카테고리 (의약품, 화장품, 간식, 가전)"
        text description "돈키호테 추천 포인트"
        boolean is_tax_free "면세 대상 여부"
        timestamp created_at
        timestamp updated_at
    }
```

## 4.2 설계 원칙
- **Separation of Concerns (관심사의 분리):**
    - `products`는 '지역성(Locality)'에 집중하여, 특정 지역 여행 시에만 살 수 있는 아이템 위주로 구성합니다.
    - `donki_products`는 '보편성(Universality)'에 집중하여, 일본 전역 돈키호테 어디서나 살 수 있는 필수템 위주로 구성합니다.
- **Images:** 외부 링크를 저장하되, 깨짐 방지를 위해 추후 Supabase Storage 저장 고려.