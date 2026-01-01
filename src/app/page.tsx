import { Button } from "@/shared/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 pt-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-wood-text-main">
          맛있는 일본 쇼핑 정보, 행마카세
        </h2>
        <p className="text-wood-text-muted">
          지역별 특산품과 돈키호테 꿀템을 한눈에 확인하세요.
        </p>
      </div>

      <div className="w-full aspect-[4/3] rounded-2xl bg-wood-background border-2 border-dashed border-wood-border flex items-center justify-center">
        <span className="text-wood-text-muted">🇯🇵 일본 지도 컴포넌트 (준비 중)</span>
      </div>

      <div className="w-full space-y-3">
        <Button className="w-full h-12 text-lg font-semibold bg-wood-primary hover:bg-wood-primary/90 text-white rounded-xl">
          지역별 상품 보러가기
        </Button>
        <Button variant="outline" className="w-full h-12 text-lg font-semibold border-wood-border text-wood-text-main hover:bg-wood-background rounded-xl">
          🐧 돈키호테 인기 랭킹
        </Button>
      </div>
    </div>
  );
}