// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // 确保这行导入了你的全局样式

// 设置网站的元数据（标题、描述等）
export const metadata: Metadata = {
  title: "邻里圈 - 让身边人更有温度",
  description: "方圆智联旗下邻里社交平台，连接物业、商家与居民，共建温情社区。",
};

// 这就是报错中提到的，必须包含 <html> 和 <body> 标签的【根布局】
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ⚠️ 注意：这里必须包含 <html> 和 <body> 标签
    <html lang="zh-CN">
      <body className="antialiased">
        {/* children 就是你页面的内容，比如之前的 Hero, DataChapter 等组件 */}
        {children}
      </body>
    </html>
  );
}