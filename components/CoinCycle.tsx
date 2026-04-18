'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CoinCycle() {
  const containerRef = useRef<HTMLElement>(null);
  const coinRingRef = useRef<SVGCircleElement>(null);
  const particlesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // 确保 DOM 元素已加载
    if (!coinRingRef.current || !particlesRef.current) return;

    // 创建滚动触发动画：铜钱外圈旋转
    const ringAnimation = gsap.to(coinRingRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });

    // 粒子流动动画：沿着圆形路径移动
    // 我们创建4个粒子，每个沿圆形路径移动
    const particles = particlesRef.current.querySelectorAll('.flow-particle');
    const paths = [
      { start: 0, duration: 4 },
      { start: 1, duration: 4.5 },
      { start: 2, duration: 5 },
      { start: 3, duration: 4.2 },
    ];

    particles.forEach((particle, idx) => {
      const duration = paths[idx % paths.length].duration;
      gsap.to(particle, {
        duration: duration,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: '#flowPath',
          align: '#flowPath',
          autoRotate: false,
          start: idx * 0.25, // 错开起始位置
        },
      });
    });

    // 滚动触发：当进入视口时开始动画（其实已经开始了，但可以添加滚动暂停效果）
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onToggle: (self) => {
        if (self.isActive) {
          ringAnimation.resume();
        } else {
          ringAnimation.pause();
        }
      },
    });

    return () => {
      ringAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-rice-paper relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* 左侧铜钱 SVG 动画区 */}
        <div className="lg:w-1/2 relative flex justify-center">
          <svg viewBox="0 0 500 500" className="w-full max-w-md mx-auto">
            <defs>
              {/* 定义圆形流动路径 */}
              <path
                id="flowPath"
                d="M 250,100 A 150,150 0 1,1 249.9,100"
                fill="none"
                stroke="none"
              />
              {/* 渐变定义 */}
              <radialGradient id="coinGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F9F8F6" />
                <stop offset="70%" stopColor="#E8D5B5" />
                <stop offset="100%" stopColor="#C92E20" />
              </radialGradient>
            </defs>

            {/* 铜钱外圈（可旋转） */}
            <g ref={coinRingRef}>
              <circle cx="250" cy="250" r="180" fill="none" stroke="#C92E20" strokeWidth="6" />
              <circle cx="250" cy="250" r="170" fill="none" stroke="#D4A373" strokeWidth="2" strokeDasharray="8 6" />
            </g>

            {/* 铜钱内方孔 */}
            <circle cx="250" cy="250" r="40" fill="url(#coinGradient)" stroke="#C92E20" strokeWidth="3" />
            <rect x="225" y="225" width="50" height="50" fill="#F9F8F6" stroke="#C92E20" strokeWidth="2" />

            {/* 四个方向的文字标签 */}
            <text x="250" y="90" textAnchor="middle" fill="#C92E20" fontSize="16" fontWeight="bold">居民消费/兑券</text>
            <text x="410" y="260" textAnchor="middle" fill="#C92E20" fontSize="16" fontWeight="bold">商家获得积分</text>
            <text x="250" y="430" textAnchor="middle" fill="#C92E20" fontSize="16" fontWeight="bold">商家消耗积分</text>
            <text x="90" y="260" textAnchor="middle" fill="#C92E20" fontSize="16" fontWeight="bold">居民获得服务</text>

            {/* 流动粒子组 */}
            <g ref={particlesRef}>
              {/* 粒子1 */}
              <circle className="flow-particle" r="6" fill="#FFD700" filter="url(#glow)">
                <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#flowPath" />
                </animateMotion>
              </circle>
              {/* 粒子2 */}
              <circle className="flow-particle" r="5" fill="#FFA500">
                <animateMotion dur="4.5s" repeatCount="indefinite" begin="1s">
                  <mpath href="#flowPath" />
                </animateMotion>
              </circle>
              {/* 粒子3 */}
              <circle className="flow-particle" r="7" fill="#FFD700">
                <animateMotion dur="5s" repeatCount="indefinite" begin="2s">
                  <mpath href="#flowPath" />
                </animateMotion>
              </circle>
              {/* 粒子4 */}
              <circle className="flow-particle" r="4" fill="#FFA500">
                <animateMotion dur="4.2s" repeatCount="indefinite" begin="3s">
                  <mpath href="#flowPath" />
                </animateMotion>
              </circle>
            </g>

            {/* 光晕滤镜 */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* 右侧说明文字 */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="vertical-text text-3xl font-han-yi text-cinnabar mb-4">商居一体 · 流水不腐 · 户枢不蠹</div>
          <p className="text-gray-700 leading-relaxed">
            积分闭环循环，激发社区商业活力。居民消费得积分，商家让利获客流，积分再投入社区推广，形成良性生态。
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="bg-white rounded-lg shadow p-3 text-center w-28">
              <div className="text-cinnabar text-xl">⬇️</div>
              <div className="text-sm">消费</div>
            </div>
            <div className="bg-white rounded-lg shadow p-3 text-center w-28">
              <div className="text-cinnabar text-xl">🔄</div>
              <div className="text-sm">循环</div>
            </div>
            <div className="bg-white rounded-lg shadow p-3 text-center w-28">
              <div className="text-cinnabar text-xl">⬆️</div>
              <div className="text-sm">增值</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}