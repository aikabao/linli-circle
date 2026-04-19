'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

// 导航项
const navItems = [
  { name: '首卷', path: '/' },
  { name: '智联', path: '/zhilian' },
  { name: '自治', path: '/zizhi' },
  { name: '烟火', path: '/yanhuo' },
  { name: '格物', path: '/gewu' },
  { name: '入圈', path: '/ruquan' },
];

export default function HomePage() {
  const pathname = usePathname();
  const [lightIntensity, setLightIntensity] = useState(0.6);
  const [windowLights, setWindowLights] = useState<boolean[]>([]);
  const { scrollYProgress } = useScroll();
  const doorOpenProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const firstScreenOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const secondScreenOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // 首屏“门缝里的光”呼吸效果
  useEffect(() => {
    const interval = setInterval(() => {
      setLightIntensity(prev => (prev === 0.6 ? 0.8 : 0.6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 第三屏窗户光点随机亮起（模拟有人回家）
  useEffect(() => {
    // 初始化 50 个光点，随机亮度
    const initialLights = Array.from({ length: 50 }, () => Math.random() > 0.7);
    setWindowLights(initialLights);
    const interval = setInterval(() => {
      setWindowLights(prev => {
        const newLights = [...prev];
        const randomIndex = Math.floor(Math.random() * newLights.length);
        newLights[randomIndex] = true;
        // 5秒后自动熄灭
        setTimeout(() => {
          setWindowLights(cur => {
            const reset = [...cur];
            reset[randomIndex] = false;
            return reset;
          });
        }, 5000);
        return newLights;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#A61B1A] font-serif overflow-x-hidden">
      {/* ========== 首屏：朱门待归 ========== */}
      <motion.section
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ opacity: firstScreenOpacity }}
      >
        {/* 绢布纹理 */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 8px)' }}
        />
        {/* 门缝里的光（呼吸 + 滚动展开） */}
        <motion.div
          className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-48 h-48 rounded-full bg-gradient-radial from-[#F5D300]/80 via-[#E8C84A]/40 to-transparent blur-3xl"
          style={{
            opacity: lightIntensity,
            scale: useTransform(doorOpenProgress, [0, 1], [1, 3]),
          }}
        />
        {/* 文案 */}
        <div className="relative z-10 text-center md:text-right md:absolute md:right-[15%] md:top-1/2 md:transform md:-translate-y-1/2">
          <div className="vertical-text text-6xl md:text-7xl text-[#E8C84A] font-han-yi tracking-wider drop-shadow-lg">
            方格智联
          </div>
          <div className="vertical-text text-5xl md:text-6xl text-[#E8C84A] font-han-yi tracking-wider mt-4">
            烟火邻里
          </div>
          <div className="mt-6 text-right">
            <div className="text-base md:text-xl text-[#F5F2EB] tracking-widest">让身边人 · 更有温度</div>
          </div>
        </div>
        {/* 左下角印章 */}
        <div className="absolute bottom-6 left-6 z-10 opacity-70">
          <div className="border border-[#E8C84A] px-2 py-1 text-[#E8C84A] text-xs">方格智联</div>
        </div>
        {/* 右上角导航 */}
        <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 text-right">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm tracking-wider transition-colors ${
                pathname === item.path ? 'text-[#E8C84A]' : 'text-[#F5F2EB]/60 hover:text-[#E8C84A]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* 滚动提示 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-5 h-8 border-b-2 border-r-2 border-[#F5F2EB]/40 rotate-45"></div>
        </div>
      </motion.section>

      {/* ========== 第二屏：千户万灯 ========== */}
      <motion.section
        className="relative min-h-screen bg-[#1A1A22] flex flex-col items-center justify-center py-20"
        style={{ opacity: secondScreenOpacity }}
      >
        {/* 楼群剪影（五层） */}
        <div className="absolute inset-0 pointer-events-none">
          {[1, 2, 3, 4, 5].map((layer) => (
            <div
              key={layer}
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: `${60 + layer * 20}px`,
                background: `linear-gradient(to top, rgba(20,20,30,${0.3 + layer * 0.1}), transparent)`,
                bottom: `${(layer - 1) * 30}px`,
              }}
            />
          ))}
        </div>
        {/* 窗户光点 */}
        <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-10 gap-2 px-4">
          {windowLights.map((isLit, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-sm transition-all duration-500 ${
                isLit ? 'bg-[#F5D300] shadow-[0_0_8px_#F5D300]' : 'bg-[#2A2A35]'
              }`}
              style={{ opacity: isLit ? 0.9 : 0.3 }}
            />
          ))}
        </div>
        {/* 文案 */}
        <div className="relative z-10 text-center mt-16">
          <h2 className="text-2xl md:text-3xl text-[#F5F2EB] tracking-wider">万家灯火，总有一盏为你而亮。</h2>
          <div className="inline-block border border-[#E8C84A] text-[#E8C84A] text-xs px-2 py-0.5 rounded mt-4">归</div>
          <p className="text-[#F5F2EB]/40 text-xs mt-8">已有 1,280+ 里坊，点亮了邻里圈的灯火。</p>
        </div>
      </motion.section>

      {/* ========== 第三屏：邻里有声 ========== */}
      <section className="min-h-screen bg-[#F5F2EB] flex items-center justify-center px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          {/* 摄影（模拟） */}
          <div className="md:w-1/2 relative">
            <div className="relative bg-gray-300 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-500 to-gray-700"></div>
              {/* 模拟雨丝和手递伞的意象 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-amber-800/50 backdrop-blur-sm flex items-center justify-center text-3xl">🤝</div>
              <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-amber-600/40 backdrop-blur-sm flex items-center justify-center text-2xl">☂️</div>
            </div>
            {/* 照片边缘烧灼效果 */}
            <div className="absolute -inset-1 border-2 border-[#A61B1A]/20 rounded-2xl pointer-events-none"></div>
          </div>
          {/* 文案 */}
          <div className="md:w-1/2 space-y-4">
            <div className="vertical-text text-4xl md:text-5xl text-gray-800 font-han-yi">一声呼唤</div>
            <div className="vertical-text text-4xl md:text-5xl text-gray-800 font-han-yi">总有人应</div>
            <p className="text-gray-600 leading-relaxed mt-4">
              借一把扳手，搬一袋米，下雨天帮忙收一床被子。<br />
              那些生活中细小的、需要另一个人的时刻——<br />
              在邻里圈，你总能找到一双手。
            </p>
            <div className="inline-block border border-[#A61B1A] text-[#A61B1A] text-xs px-2 py-0.5 rounded">我帮你</div>
          </div>
        </div>
      </section>

      {/* ========== 第四屏：围桌而坐 ========== */}
      <section className="min-h-screen bg-[#F5F2EB] flex items-center justify-center px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-12 items-center">
          {/* 插画 */}
          <div className="md:w-1/2 relative">
            <div className="relative bg-[#E8D8C8] rounded-2xl p-8 shadow-xl">
              {/* 八仙桌 */}
              <div className="relative w-full h-40 bg-[#8B5A2B] rounded-lg shadow-inner">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-2xl">🫖</div>
                <div className="absolute bottom-2 left-4 w-6 h-6 bg-gray-700 rounded-full"></div>
                <div className="absolute bottom-2 right-4 w-6 h-6 bg-gray-700 rounded-full"></div>
                <div className="absolute top-2 left-8 w-6 h-6 bg-gray-600 rounded-full"></div>
                <div className="absolute top-2 right-8 w-6 h-6 bg-gray-600 rounded-full"></div>
              </div>
              {/* 悬灯笼 */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-[#E8C84A] rounded-full shadow-lg animate-pulse"></div>
              {/* 猫 */}
              <div className="absolute -bottom-2 right-8 w-10 h-6 bg-gray-500 rounded-full"></div>
            </div>
          </div>
          {/* 文案 */}
          <div className="md:w-1/2 space-y-4">
            <div className="vertical-text text-4xl md:text-5xl text-gray-800 font-han-yi">走出家门</div>
            <div className="vertical-text text-4xl md:text-5xl text-gray-800 font-han-yi">就是朋友</div>
            <p className="text-gray-600 leading-relaxed mt-4">
              一场象棋比赛，一次亲子绘画，傍晚的广场舞。<br />
              社区里的快乐，从来不缺观众。<br />
              你来了，就是主角。
            </p>
            <Link href="/yanhuo" className="inline-block text-[#A61B1A] text-sm border-b border-[#A61B1A] hover:opacity-70 transition">
              看看最近有什么活动 →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 第五屏：入圈之门 ========== */}
      <section className="relative h-screen w-full bg-[#A61B1A] flex flex-col items-center justify-center overflow-hidden">
        {/* 绢布纹理 */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 8px)' }} />
        {/* 打开的门（暖白光芒） */}
        <div className="relative z-10 text-center">
          <div className="w-64 h-64 mx-auto rounded-full bg-gradient-radial from-[#F5F2EB] via-[#F5F2EB]/50 to-transparent blur-2xl animate-pulse"></div>
          {/* 门的上方 */}
          <h2 className="text-3xl md:text-4xl text-[#E8C84A] font-han-yi mt-8">推开门，就是家。</h2>
          {/* 小程序码占位 */}
          <div className="w-32 h-32 bg-white rounded-xl mx-auto mt-8 flex items-center justify-center text-gray-400 shadow-xl">📱 小程序码</div>
          <p className="text-[#F5F2EB] text-sm mt-4 tracking-wider">微信扫码 · 即刻入圈</p>
        </div>
        {/* 右下角落款 */}
        <div className="absolute bottom-6 right-6 text-[#F5F2EB]/40 text-xs">上海方格智联 · 让身边人有温度</div>
      </section>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}