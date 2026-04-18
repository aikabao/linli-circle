'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ========== 时间轴节点数据 ==========
const timelineNodes = [
  { year: '2023', event: '项目立项\n初心：让身边人有温度' },
  { year: '2024', event: '首个试点社区落地\n验证自治模型' },
  { year: '2025', event: '商家积分体系跑通\n覆盖 20+ 社区' },
  { year: '2026', event: '大明风雅版上线\n邻里圈正式发布' },
];

// ========== 木塔层级数据 ==========
const pagodaLayers = [
  { name: '塔基', sub: '须弥座', tech: '微信云开发', points: ['云数据库（35+ 集合）', '云函数（15+ 函数）', '云存储（图片/文件）'] },
  { name: '一层', sub: '柱础层', tech: '数据隔离', points: ['所有业务数据绑定 communityId', '社区间数据完全隔离', '杜绝越权访问'] },
  { name: '二层', sub: '梁架层', tech: '用户体系', points: ['users 仅存基础信息', '身份通过关联表管理', '支持多社区多身份'] },
  { name: '三层', sub: '斗拱层', tech: '权限中台', points: ['游侠/雅士/雅星/执事/居委/店长/店员/超管', '前端 + 云函数双重校验'] },
  { name: '四层', sub: '平座层', tech: '积分引擎', points: ['用户积分账户与流水', '商家积分账户与流水', '消耗规则社区可配置'] },
  { name: '五层', sub: '门窗层', tech: 'IM 通讯', points: ['私聊仅限同社区', '支持发送图片/活动卡/二手卡'] },
  { name: '六层', sub: '檐柱层', tech: '安全策略', points: ['敏感集合仅云函数可写', '数据库安全规则加固'] },
  { name: '塔刹', sub: '宝顶', tech: '社区自治应用', points: ['议事厅投票', '邻里互助接单', '社区赛事赞助'] },
];

// ========== 数据卡片内容 ==========
const statsCards = [
  { icon: '🏘️', value: '1,280+', label: '入驻里坊（社区）', annotation: '壹仟贰佰捌拾', update: '截至乙巳年三月' },
  { icon: '🤝', value: '98.6%', label: '邻里互助完成率', annotation: '玖拾捌点陆', update: '数据来源：邻里圈运营平台' },
  { icon: '💰', value: '356,000+', label: '累计流转积分', annotation: '叁拾伍万陆仟', update: '统计口径：全平台累计' },
];

// ========== 主组件 ==========
export default function GewuPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const pagodaRef = useRef<HTMLDivElement>(null);

  // 响应式检测
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 木塔逐层点亮动画 (GSAP ScrollTrigger)
  useEffect(() => {
    if (isMobile) return; // 移动端不执行复杂动画
    const ctx = gsap.context(() => {
      const layers = document.querySelectorAll('.pagoda-layer');
      layers.forEach((layer, idx) => {
        ScrollTrigger.create({
          trigger: pagodaRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(layer, { opacity: 1, y: 0, duration: 0.3, delay: idx * 0.15 });
          },
          once: true,
        });
      });
    }, pagodaRef);
    return () => ctx.revert();
  }, [isMobile]);

  // 滚动淡入动画（通用）
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
          once: true,
        });
        gsap.set(el, { opacity: 0, y: 30 });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      {/* ========== 首屏：八字箴言 ========== */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-ink overflow-hidden">
        {/* 金色网格背景 */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ filter: 'blur(8px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          >
            {/* 左列竖排八字 */}
            <div className="flex flex-col items-center">
              <div className="vertical-text text-6xl md:text-8xl font-bold text-amber-400 tracking-wider hover:-translate-y-1 transition-transform duration-300" style={{ textShadow: '0 0 8px rgba(212,175,55,0.3)' }}>
                格物致知
              </div>
            </div>
            {/* 中间玉佩装饰 */}
            <div className="w-16 h-24 border-2 border-amber-500/50 rounded-full relative">
              <div className="absolute inset-2 border border-amber-500/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500 text-xs whitespace-nowrap writing-mode-vertical-rl">方格智联</div>
            </div>
            {/* 右列竖排八字 */}
            <div className="flex flex-col items-center">
              <div className="vertical-text text-6xl md:text-8xl font-bold text-amber-400 tracking-wider hover:-translate-y-1 transition-transform duration-300">
                智联方圆
              </div>
            </div>
          </motion.div>
          <div className="mt-12 text-rice-paper text-sm tracking-widest space-y-2">
            <p>上海方格智联信息科技有限公司</p>
            <p>以技术之“格”，穷邻里相联之“理”。</p>
            <p>我们相信，社区不是冰冷的建筑集合，而是有温度的生命共同体。</p>
          </div>
        </div>
        {/* 向下箭头 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-6 border-b-2 border-r-2 border-amber-400 rotate-45"></div>
        </div>
      </section>

      {/* ========== 第二屏：使命 · 温度之源 ========== */}
      <section className="py-20 px-6 md:px-12 bg-rice-paper fade-up">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-cinnabar"></div>
              <span className="text-cinnabar text-sm tracking-wider">我们的使命</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">让身边人，<span className="text-cinnabar">更有温度</span></h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>在现代都市的钢筋森林里，邻里之间的温情正在悄然流失。上海方格智联的创立，源于一个朴素而坚定的信念——技术应当服务于人与人之间的真实连接。</p>
              <p>我们聚焦社区智能化，将 “共和自治” 的治理理念引入数字社区运营。通过清晰的角色权限体系、透明的积分流转机制、便捷的议事投票工具，让每一位居民、每一位商家、每一位社区管理者，都能找到自己的位置与价值。</p>
              <p className="italic">邻里圈，是我们给出的答案。</p>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <span className="text-gray-500 text-sm">—— 上海方格智联</span>
              <span className="border border-cinnabar text-cinnabar text-xs px-2 py-0.5 rounded">方格智联</span>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            {/* 水墨风格插画（用CSS模拟） */}
            <div className="relative bg-gradient-to-br from-gray-100 to-amber-50 rounded-2xl p-6 shadow-xl">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-800/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                {/* 八仙桌 */}
                <div className="w-full h-32 bg-amber-800 rounded-lg mb-4 relative">
                  <div className="absolute inset-2 bg-amber-700 rounded"></div>
                  {/* 茶壶 */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl">🫖</div>
                  <div className="absolute top-8 left-1/4 w-3 h-3 bg-amber-300 rounded-full"></div>
                  <div className="absolute top-8 right-1/4 w-3 h-3 bg-amber-300 rounded-full"></div>
                </div>
                {/* 剪影人物 */}
                <div className="flex justify-around mt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto"></div>
                    <div className="text-xs mt-1">老人</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto"></div>
                    <div className="text-xs mt-1">青年</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-500 rounded-full mx-auto"></div>
                    <div className="text-xs mt-1">孩子</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto"></div>
                    <div className="text-xs mt-1">物业</div>
                  </div>
                </div>
                {/* 楼宇轮廓 */}
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-8 h-16 bg-gray-400 rounded-t-lg"></div>
                  <div className="w-8 h-20 bg-gray-500 rounded-t-lg"></div>
                  <div className="w-8 h-14 bg-gray-400 rounded-t-lg"></div>
                </div>
                {/* 暖黄灯光 */}
                <div className="absolute bottom-8 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 第三屏：沿革 · 步履不停 ========== */}
      <section className="py-20 bg-amber-50/30 fade-up">
        <div className="max-w-6xl mx-auto px-6">
          {/* 锦缎装饰 */}
          <div className="relative w-full h-16 bg-cinnabar rounded-full mb-12 flex items-center justify-center">
            <span className="text-amber-300 text-sm tracking-widest">时 · 光</span>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-white text-xs">起</div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-white text-xs">续</div>
          </div>
          {/* 时间轴（桌面端横向，移动端纵向） */}
          {!isMobile ? (
            <div className="flex justify-between items-start gap-4">
              {timelineNodes.map((node, idx) => (
                <motion.div
                  key={node.year}
                  className="flex-1 text-center group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative inline-block">
                    {/* 铜钱节点 */}
                    <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:rotate-12 transition duration-300">
                      {node.year}
                    </div>
                    {/* 丝绦木牌 */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="bg-amber-100 text-gray-800 text-xs p-2 rounded shadow-lg whitespace-pre-line">
                        {node.event}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 text-sm text-gray-600 whitespace-pre-line">{node.event}</div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {timelineNodes.map((node) => (
                <div key={node.year} className="flex items-center gap-4 border-l-2 border-cinnabar pl-4">
                  <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold">{node.year}</div>
                  <div className="text-sm text-gray-700 whitespace-pre-line">{node.event}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

        {/* ========== 第四屏：架构 · 卯榫古塔 ========== */}
        <section ref={pagodaRef} className="py-20 px-6 md:px-12 bg-rice-paper fade-up">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
            {/* 左侧木塔插画 */}
            <div className="md:w-7/12 relative">
              <div className="relative w-full max-w-md mx-auto">
                {pagodaLayers.map((layer, idx) => (
                  <div
                    key={layer.name}
                    className="pagoda-layer relative mb-1 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                    onMouseEnter={() => setActiveLayer(idx)}
                    onMouseLeave={() => setActiveLayer(null)}
                  >
                    <div className={`bg-gradient-to-r from-amber-800 to-amber-700 rounded-lg p-3 flex justify-between items-center text-white shadow-md ${idx === 0 ? 'rounded-t-2xl' : ''} ${idx === pagodaLayers.length - 1 ? 'rounded-b-2xl' : ''}`}>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm md:text-base">{layer.sub}</span>
                        <span className="text-xs opacity-80">{layer.tech}</span>
                      </div>
                      <span className="text-xs">🔔</span>
                    </div>
                    {/* 塔身装饰线（除最后一层） */}
                    {idx < pagodaLayers.length - 1 && <div className="h-1 bg-amber-600/30 mx-4"></div>}
                  </div>
                ))}
                {/* 塔刹宝顶 */}
                <div className="w-8 h-12 bg-amber-600 mx-auto rounded-t-full -mb-1 relative z-10"></div>
              </div>
            </div>

            {/* 右侧技术要点卡片 */}
            <div className="md:w-5/12">
              {activeLayer !== null ? (
                <div className="bg-white border-2 border-cinnabar rounded-xl p-6 shadow-xl transition-all duration-300">
                  <div className="border-b border-amber-200 pb-2 mb-3">
                    <div className="text-cinnabar font-bold text-lg">{pagodaLayers[activeLayer].sub} · {pagodaLayers[activeLayer].tech}</div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {pagodaLayers[activeLayer].points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cinnabar">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right text-xs text-gray-400 border-t pt-2">经折装 · 技术卡片</div>
                </div>
              ) : (
                <div className="bg-white/50 border border-dashed border-cinnabar rounded-xl p-8 text-center text-gray-400">
                  🏯 将鼠标悬停在左侧塔层上查看详情
                </div>
              )}
            </div>
          </div>
        </section>

      {/* ========== 第五屏：数据 · 以数为镜 ========== */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white fade-up">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            {/* 千里江山图背景（极淡） */}
            <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: "url('/images/qianli.jpg')" }}></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {statsCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-cinnabar hover:-translate-y-2 transition duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-5xl mb-3">{card.icon}</div>
                  <div className="text-3xl font-bold text-cinnabar">{card.value}</div>
                  <div className="text-gray-600 mt-1">{card.label}</div>
                  <div className="vertical-text text-xs text-gray-400 mt-2">{card.annotation}</div>
                  <div className="text-[10px] text-gray-300 mt-3">{card.update}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== 第六屏：愿景 · 未来之约 ========== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-deep-red to-ink">
        <div className="absolute inset-0 bg-gold-cloud opacity-10"></div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
          <div className="vertical-text text-3xl text-amber-300 mb-6">路虽远，行则将至</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">我们的愿景：让每一个社区，都成为有温度的熟人社会。</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            从第一个试点社区，到未来的千城万坊，<br />
            方格智联愿做那条连接人与人的数字纽带。<br />
            格物致知，智联方圆，步履不停。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-cinnabar border border-amber-400 text-white rounded-full hover:scale-105 transition">
              加入我们 · 成为伙伴
            </button>
            <button className="px-6 py-2 border border-amber-400 text-amber-400 rounded-full hover:bg-amber-400/10 transition">
              下载邻里圈 · 即刻体验
            </button>
          </div>
          <div className="mt-12 text-gray-400 text-xs space-y-1">
            <p>商务合作：business@fangezhilian.com</p>
            <p>市场媒体：pr@fangezhilian.com</p>
          </div>
        </div>
      </section>

      {/* ========== 第七屏：脚注 ========== */}
      <footer className="bg-ink text-gray-400 text-xs py-4 px-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-800">
        <div>© 2026 上海方格智联信息科技有限公司 版权所有</div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <span>沪ICP备XXXXXXXX号</span>
          <span>隐私政策</span>
          <span>用户协议</span>
        </div>
      </footer>
    </div>
  );
}