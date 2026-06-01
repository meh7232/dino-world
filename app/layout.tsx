import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "공룡 탐험대",
  description: "놀라운 공룡의 세계를 탐험해봐요!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
