import type { Metadata } from "next";
import { Header } from "@/widgets/header";
import { DonkiFloatingButton } from "@/widgets/donki-floating-button";
import { Toaster } from "@/shared/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "행마카세 (Haeng-makase)",
  description: "일본 여행 지역별 특산품 및 돈키호테 쇼핑 가이드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased bg-wood-background min-h-screen">
        <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl shadow-wood-primary/5 border-x border-wood-border flex flex-col">
          <Header />
          <main className="flex-1 p-4 pb-20">
            {children}
          </main>
          <DonkiFloatingButton />
          {/* 하단 탭 바 (추후 필요시 구현) */}
          <Toaster position="top-center" richColors />
        </div>
      </body>
    </html>
  );
}
