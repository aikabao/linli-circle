'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 抽签签文库
const lotteryMessages = [
  '今日宜：出门走走，与邻居打招呼',
  '今日宜：分享一道拿手菜',
  '今日宜：参加社区活动，认识新朋友',
  '今日宜：给楼下独居老人送一份水果',
  '今日宜：在邻里圈发布一条求助或帮助',
  '今日宜：傍晚散步，欣赏万家灯火',
];

// 好人好事数据
const goodDeeds = [
  { title: '6栋小李，拾金不昧', icon: '🔑', color: 'from-amber-200 to-amber-100' },
  { title: '物业老陈，雨中关窗', icon: '🪟', color: 'from-slate-200 to-slate-100' },
  { title: '王阿姨，帮忙取快递', icon: '📦', color: 'from-stone-200 to-stone-100' },
];

export default function YanhuoPage() {
  const [windowLightOn, setWindowLightOn] = useState(false);
  const [remainingDraws, setRemainingDraws] = useState(2);
  const [currentLottery, setCurrentLottery] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWindowLightOn(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDraw = () => {
    if (remainingDraws <= 0) {
      alert('今日抽签次数已用完，明日再来吧~');
      return;
    }
    setShake(true);
    setTimeout(() => setShake(false), 300);
    const randomIndex = Math.floor(Math.random() * lotteryMessages.length);
    setCurrentLottery(lotteryMessages[randomIndex]);
    setRemainingDraws(prev => prev - 1);
    setTimeout(() => setCurrentLottery(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#1a1e2b] font-serif overflow-x-hidden">
      {/* 第一屏：归 */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1119] via-[#1a1e2b] to-[#2a2f3f]">
          <div className="absolute top-0 left-0 w-64 h-64 bg-black/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 flex flex-wrap justify-around items-start gap-8 p-12 opacity-60">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-10 h-12 bg-amber-900/30 rounded-sm"></div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: windowLightOn ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/3 left-1/2 w-10 h-12 bg-amber-300 rounded-sm shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            style={{ transform: 'translateX(-20px)' }}
          />
        </div>
        <div className="absolute bottom-1/3 left-0 right-0 text-center">
          <h1 className="text-2xl md:text-3xl text-amber-100/90 tracking-wider drop-shadow-lg">
            万家灯火，总有一盏为你而亮。
          </h1>
          <p className="text-amber-200/50 text-xs mt-4 tracking-widest">邻里圈 · 让身边人有温度</p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-b-2 border-r-2 border-amber-400/50 rotate-45"></div>
        </div>
      </section>

      {/* 第二屏：助 */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-5/12 space-y-4">
            <div className="text-cinnabar text-sm tracking-wider">一声呼唤</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100">总有人应</h2>
            <p className="text-gray-300 leading-relaxed">
              不是惊天动地的大事。<br />
              借一把扳手，搬一袋米，下雨天帮忙收一床被子。<br />
              那些生活中细小的、需要另一个人的时刻——<br />
              在邻里圈，你总能找到一双手。
            </p>
            <div className="inline-block border border-cinnabar text-cinnabar px-4 py-1 rounded-full text-sm">我帮你</div>
          </div>
          <div className="md:w-7/12 flex justify-center">
            <div className="relative w-64 h-64 bg-gray-800/50 rounded-full flex items-center justify-center">
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-24 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl rotate-12 shadow-lg">🤝</div>
              <div className="absolute right-0 bottom-8 w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl">☂️</div>
              <div className="text-gray-400 text-sm absolute bottom-0">一双手递出温暖</div>
            </div>
          </div>
        </div>
      </section>

      {/* 第三屏：善 */}
      <section className="py-16 bg-[#F5F2EB]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl text-gray-800 mb-2">那些温暖的瞬间</h3>
          <div className="inline-block border border-cinnabar text-cinnabar text-xs px-2 py-0.5 rounded mb-12">邻里相望</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goodDeeds.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`relative h-56 rounded-xl shadow-lg overflow-hidden bg-gradient-to-br ${item.color} transition-all duration-500 group-hover:grayscale-0 grayscale`}>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">{item.icon}</div>
                </div>
                <p className="mt-3 text-gray-600 text-sm italic">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 第四屏：聚 */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-5/12 space-y-4">
            <div className="text-cinnabar text-sm tracking-wider">走出家门</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100">就是朋友</h2>
            <p className="text-gray-300 leading-relaxed">
              一场象棋比赛，一次亲子绘画，傍晚的广场舞。<br />
              社区里的快乐，从来不缺观众。<br />
              你来了，就是主角。
            </p>
            <a href="#" className="inline-block text-amber-400 text-sm border-b border-amber-400/50 hover:text-amber-300 transition">
              看看最近有什么活动 →
            </a>
          </div>
          <div className="md:w-7/12">
            <div className="relative bg-[#3e2a1f] rounded-2xl p-6 shadow-2xl">
              <div className="w-full h-40 bg-[#5c3a1f] rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center text-2xl">🫖</div>
                <div className="absolute bottom-2 left-4 w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="absolute bottom-2 right-4 w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="absolute top-2 left-8 w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="absolute top-2 right-8 w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-500 rounded-full"></div>
              </div>
              <div className="text-center text-amber-200/60 text-xs mt-3">八仙桌 · 围坐笑谈</div>
            </div>
          </div>
        </div>
      </section>

      {/* 第五屏：签 */}
      <section className="py-20 bg-[#11131e] text-center relative">
        <div className="max-w-md mx-auto px-6">
          <div
            className={`relative w-32 h-40 mx-auto cursor-pointer transition-all duration-200 ${shake ? 'animate-shake' : ''}`}
            onClick={handleDraw}
          >
            <div className="absolute bottom-0 w-full h-28 bg-amber-800 rounded-t-full shadow-xl"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-amber-700 rounded-full"></div>
            <div className="absolute bottom-0 w-full h-3 bg-amber-900 rounded-b-lg"></div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-10 bg-amber-200 rounded-t-md rotate-12"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-white text-[10px] bg-red-600 px-1 rounded">签</div>
          </div>
          <div className="text-amber-400 text-sm mt-4">点击签筒，抽取今日签文</div>
          <div className="text-gray-500 text-xs mt-1">今日剩余 {remainingDraws} 次</div>
          <div className="mt-6 w-4 h-8 mx-auto bg-amber-400/20 rounded-full animate-pulse"></div>
        </div>
        <AnimatePresence>
          {currentLottery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-40 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 rounded-xl p-4 shadow-2xl border-l-4 border-cinnabar max-w-sm"
            >
              <p className="text-cinnabar font-bold text-center">今日宜</p>
              <p className="text-gray-800 text-center mt-1">{currentLottery}</p>
              <div className="text-right text-xs text-gray-400 mt-2">—— 邻里圈 · 随缘</div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 第六屏：归处 */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1119] via-[#1a1e2b] to-[#2a2f3f]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0px, #fbbf24 1px, transparent 1px, transparent 20px)' }}></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="space-y-4">
            <p className="text-amber-100/80 text-xl tracking-wider">推开门，</p>
            <p className="text-amber-100/80 text-xl tracking-wider">就是家。</p>
            <p className="text-amber-400 text-lg font-bold">邻里圈，一直在。</p>
          </div>
          <div className="w-32 h-32 bg-white rounded-xl mt-8 flex items-center justify-center text-gray-400 text-sm shadow-xl">📱 小程序码</div>
          <p className="text-amber-200/70 text-xs mt-4">微信扫码，回到你的社区</p>
          <div className="absolute bottom-8 left-0 right-0 text-center text-gray-500/50 text-[10px] tracking-widest">
            上海方格智联 · 让身边人有温度
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out 0s 2;
        }
        .grayscale {
          filter: grayscale(100%);
        }
        .group:hover .grayscale {
          filter: grayscale(0%);
        }
      `}</style>
    </div>
  );
}