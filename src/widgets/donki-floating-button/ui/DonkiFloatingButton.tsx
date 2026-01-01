import Link from "next/link";

export function DonkiFloatingButton() {
  return (
    <div className="fixed bottom-6 right-[calc(50%-180px)] z-50 pointer-events-none md:right-[calc(50%-220px)]">
      {/* 
        중앙 정렬된 max-w-md 레이아웃 내에서의 우측 하단 배치를 위해 
        중앙값(50%)에서 컨테이너 절반만큼 뺀 위치를 기준으로 잡습니다.
      */}
      <Link
        href="/donki"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-wood-secondary text-2xl shadow-lg shadow-wood-primary/20 transition-transform hover:scale-110 active:scale-95 border-2 border-white"
      >
        <span className="sr-only">돈키호테 바로가기</span>
        🐧
      </Link>
    </div>
  );
}
