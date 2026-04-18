'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Stats {
  communities: number;
  totalDiscount: number;
  helpRate: number;
}

export default function DataChapter() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(() => setStats({ communities: 1280, totalDiscount: 35600, helpRate: 98.6 }));
  }, []);

  if (!stats) return <div className="h-screen flex items-center justify-center">加载数据中...</div>;

  return (
    <section className="min-h-screen py-20 bg-rice-paper/30 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* 左侧奏折 */}
          <motion.div className="md:w-2/5 bg-white/80 p-8 rounded-lg shadow-xl border-l-8 border-cinnabar" style={{ y }}>
            <div className="text-cinnabar text-sm mb-2">奉天承运，智联昭曰</div>
            <p className="text-gray-800 leading-loose text-lg">
              自入圈以来，赖万千邻里同心，共筑烟火安居之所。今特张榜公示，以彰自治之功。
            </p>
            <div className="mt-6 flex justify-end">
              <div className="border border-cinnabar px-4 py-1 text-cinnabar font-hanYi">方格智联大印</div>
            </div>
          </motion.div>

          {/* 右侧数据卡片横向滚动 */}
          <div className="md:w-3/5 overflow-x-auto scroll-smooth">
            <div className="flex gap-6 w-max pb-4">
              {[
                { icon: '🏘️', value: stats.communities, label: '入驻里坊', annotation: '壹仟贰佰捌拾' },
                { icon: '💰', value: `¥${(stats.totalDiscount / 10000).toFixed(1)}万`, label: '商家累计让利', annotation: '叁万伍仟陆佰' },
                { icon: '🤝', value: `${stats.helpRate}%`, label: '邻里互助完成率', annotation: '玖拾捌点陆' },
              ].map((card, idx) => (
                <div key={idx} className="w-72 bg-white rounded-lg shadow-md p-6 flex-shrink-0 border-t-4 border-cinnabar">
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <div className="text-3xl font-bold text-cinnabar">{card.value}</div>
                  <div className="text-gray-600 mt-1">{card.label}</div>
                  <div className="text-xs text-gray-400 mt-2 vertical-text inline-block">{card.annotation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}