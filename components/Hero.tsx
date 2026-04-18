'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const SealModel = dynamic(() => import('./SealModel'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 背景横向平移（无限循环）- 使用CSS渐变不需要移动，保留动画避免报错
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        x: '-33.33%',
        duration: 120,
        repeat: -1,
        ease: 'none',
      });
    }

    // 印章落下动画
    gsap.fromTo(sealRef.current,
      { scale: 0, opacity: 0, rotation: -15 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.2)' }
    );

    // 视差
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (contentRef.current) {
          gsap.set(contentRef.current, { y: self.progress * 150 });
        }
      },
    });
  }, []);

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* 背景 - 纯CSS渐变，不再请求图片 */}
      <div ref={bgRef} className="absolute inset-0 w-[150vw] h-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold whitespace-nowrap">
          邻里繁华图 · 长卷
        </div>
      </div>

      {/* 墨韵遮罩 */}
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* 前景内容 */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* 左上印章 */}
        <div ref={sealRef} className="absolute top-10 left-10">
          <div className="border-2 border-cinnabar p-2 rounded-sm shadow-md bg-rice-paper/30">
            <span className="vertical-text text-cinnabar font-han-yi text-sm">方格智联</span>
          </div>
        </div>

        {/* 主标题竖排 */}
        <div className="absolute left-[12%] top-1/3 -translate-y-1/2">
          <h1 className="vertical-text text-5xl md:text-7xl font-han-yi text-cinnabar tracking-wider">
            方格智联
          </h1>
        </div>

        {/* 中心Slogan */}
        <div className="text-center group gold-dust">
          <h2 className="text-4xl md:text-7xl font-bold text-rice-paper tracking-wider">
            让邻里间 · 更有温度
          </h2>
          <div className="h-0.5 w-0 group-hover:w-full transition-all duration-700 bg-cinnabar mx-auto mt-4" />
        </div>

        {/* 玉玺3D模型 */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 cursor-pointer group">
          <SealModel />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-rice-paper text-sm whitespace-nowrap">
            滑动开启画卷
          </span>
        </div>

        {/* 底部请柬按钮组 */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-8 flex-wrap">
          {['我是居民', '商家入驻', '物业合作'].map((text, idx) => (
            <button
              key={idx}
              className="relative px-8 py-3 bg-cinnabar border-2 border-amber-400 text-rice-paper font-bold rounded-md shadow-lg hover:scale-105 transition-transform duration-300 group"
            >
              {text}
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[waxMelt_0.4s_ease-out_forwards]"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}