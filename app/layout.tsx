import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COSY ISLAND · 独立站优化 Demo",
  description: "手机端前后对比：品牌首页、商品页、AI 选码与社媒落地页。",
  openGraph: {
    title: "COSY ISLAND · 独立站优化 Demo",
    description: "不是换个颜色，是让客人更愿意买。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "COSY ISLAND website optimization demo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "COSY ISLAND · 独立站优化 Demo",
    description: "不是换个颜色，是让客人更愿意买。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
