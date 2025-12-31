# 3. User Flow (사용자 흐름도)

```mermaid
graph TD
    Start(접속) --> Splash[로딩: 장바구니 문 시바견]
    Splash --> Home[메인 홈: 지도 & 헤더]
    
    subgraph Header/Nav
        Home --> Exchange[환율 위젯 확인]
        Home --클릭--> DonkiIcon[돈키호테 아이콘 🐧]
        DonkiIcon --> DonkiPage[돈키호테 랭킹 페이지]
    end
    
    subgraph Map Flow (Region)
        Home --지역 선택--> RegionPage[지역별 상품 리스트]
        RegionPage --> ProductDetail[상품 상세 (Region)]
    end
    
    subgraph Donki Flow (Ranking)
        DonkiPage --카테고리/랭킹 필터--> DonkiList[돈키호테 상품 리스트]
        DonkiList --> DonkiDetail[상품 상세 (Donki)]
    end
    
    subgraph Action
        ProductDetail --찜하기--> Wish[(로컬스토리지 저장)]
        DonkiDetail --찜하기--> Wish
        Wish --> Toast[토스트 메시지: 찜 완료!]
        Home --찜 목록 보기--> WishPage[나의 장바구니]
    end
```