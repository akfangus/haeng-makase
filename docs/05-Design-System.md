# 5. Design System (기초 디자인 시스템)

## 5.1 Design Tokens
- **Color Palette (Sophisticated Wood & Toss Style):**
    - `Primary`: `#7D5A55` (Warm Wood Brown - 서비스의 핵심이 되는 따뜻한 나무색)
    - `Secondary`: `#D6C7B1` (Sand Beige - 보조 강조 및 배경 대비용)
    - `Background`: `#FDFBF7` (Creamy White - 한지 느낌의 따뜻한 배경색)
    - `Surface`: `#FFFFFF` (Pure White - 카드 콘텐츠 배경)
    - `Border`: `#E5E0D8` (Soft Taupe - 우드톤과 어울리는 부드러운 경계선)
    - `Text-Main`: `#2D2926` (Off Black - 가독성을 높인 짙은 차콜)
    - `Text-Muted`: `#8C8279` (Wood Gray - 보조 설명용 색상)
    - `Accent`: `#3B82F6` (Toss Blue - 클릭 유도 및 중요한 상태 변화 알림용)

- **Typography:**
    - Font: `Pretendard` (깔끔하고 가독성 높은 산세리프)
    - Scale: H1(24px/Bold), H2(20px/SemiBold), Body(16px/Regular), Caption(13px/Medium)

## 5.2 UI Components (shadcn/ui Customization)
- **Product Card:** 둥근 모서리(Rounded-xl), 부드러운 그림자(Shadow-sm), 우드톤 보더(`border-border`) 또는 옅은 베이지 배경.
- **Region Map:** SVG 기반의 인터랙티브 컴포넌트. 선택 시 `Primary` 색상으로 채워지며 부드러운 스케일 애니메이션 적용.
- **Shiba Loader:** 장바구니를 문 시바견 캐릭터와 함께 "맛있는 쇼핑 정보를 가져오고 있어요!"라는 문구 표시.
- **Donki Button:** 우측 하단에 위치한 플로팅 버튼. 돈키호테의 상징인 펭귄 아이콘과 함께 `Secondary` 배경색 적용.
- **Exchange Widget:** 상단 헤더에 작게 위치. `Text-Muted` 색상을 사용하여 은은하게 정보 제공.