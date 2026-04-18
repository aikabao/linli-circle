// app/(main)/layout.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ChineseParticles from '@/components/ChineseParticles';
import BgMusic from '@/components/BgMusic';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* 全局粒子背景（朱红桃花瓣飘落） */}
      <ChineseParticles />

      {/* 悬浮导航栏 */}
      <Navbar />

      {/* 可选背景音乐按钮（默认关闭，点击开启） */}
      <BgMusic />

      {/* 页面转场动画 */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, rotateY: 45, scale: 0.98 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: -45, scale: 0.98 }}
          transition={{
            duration: 0.5,
            ease: [0.42, 0, 0.58, 1], // 大明风格缓动曲线
          }}
          style={{ transformOrigin: 'left center' }}
          className="pt-20 min-h-screen relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}