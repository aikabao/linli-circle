'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==================== 类型定义 ====================
interface Role {
  name: string;
  side: 'top' | 'bottom' | 'left' | 'right';
  position: string;
  duties: string;
}

const roles: Role[] = [
  { name: '执事', side: 'top', position: '审核公告 · 调配积分 · 配置规则 · 治理一方', duties: '审核公告 · 调配积分 · 配置规则 · 治理一方' },
  { name: '雅士', side: 'bottom', position: '免审二手 · 发起活动 · 参与议事 · 自荐雅星', duties: '免审二手 · 发起活动 · 参与议事 · 自荐雅星' },
  { name: '掌柜', side: 'left', position: '管理店铺 · 商品优惠 · 店员授权 · 赛事赞助', duties: '管理店铺 · 商品优惠 · 店员授权 · 赛事赞助' },
  { name: '居委', side: 'right', position: '执事之权 · 加红榜提名 · 审批自荐 · 导向共和', duties: '执事之权 · 加红榜提名 · 审批自荐 · 导向共和' },
];

// 完整角色牙牌数据（含额外角色用于展示）
const allRoleCards = [
  { name: '游侠', front: '游 侠', back: '浏览里坊 · 发布二手 · 求助邻里 · 待审入雅' },
  { name: '雅士', front: '雅 士', back: '免审二手 · 发起活动 · 参与议事 · 自荐雅星' },
  { name: '雅星', front: '雅 星', back: '免审发布 · 发起建议投票 · 社区代言 · 敦风化俗' },
  { name: '执事', front: '执 事', back: '审核公告 · 调配积分 · 配置规则 · 治理一方' },
  { name: '居委', front: '居 委', back: '执事之权 · 加红榜提名 · 审批自荐 · 导向共和' },
  { name: '掌柜', front: '掌 柜', back: '管理店铺 · 商品优惠 · 店员授权 · 赛事赞助' },
  { name: '店员', front: '店 员', back: '协管商品 · 核销优惠 · 权限内务 · 辅助经营' },
  { name: '超管', front: '超 管', back: '统辖诸坊 · 任命执事 · 审核商家 · 维系秩序' },
];

// 模拟好人好事数据
const goodDeeds = [
  { id: 1, date: '三月初八', building: '5栋', person: '李阿姨', deed: '拾金不昧，归还手机一部', highlight: true },
  { id: 2, date: '三月初七', building: '2栋', person: '王先生', deed: '义务修理楼道灯', highlight: false },
  { id: 3, date: '三月初六', building: '8栋', person: '陈奶奶', deed: '为快递小哥送水', highlight: false },
  { id: 4, date: '三月初五', building: '1栋', person: '张同学', deed: '帮老人提重物', highlight: false },
];

// 模拟雅星列表
const stars = [
  { name: '张雅士', building: '3栋 202', reason: '热心组织邻里活动，积极建言献策，获邻里一致推举。', avatar: '🌟' },
  { name: '李居委', building: '6栋 101', reason: '推动小区垃圾分类，协调物业解决多项难题。', avatar: '🏅' },
  { name: '王掌柜', building: '商铺 08', reason: '连续三月提供积分兑换优惠，深受居民好评。', avatar: '💼' },
];

// ==================== 主组件 ====================
export default function ZizhiPage() {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [selectedStarIndex, setSelectedStarIndex] = useState(0);
  const [voteClicked, setVoteClicked] = useState(false);
  const [adPoints, setAdPoints] = useState(100);
  const [eventPoints, setEventPoints] = useState(200);
  const [topPoints, setTopPoints] = useState(50);
  const [adEnabled, setAdEnabled] = useState(true);
  const [eventEnabled, setEventEnabled] = useState(true);
  const [topEnabled, setTopEnabled] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // 卷轴展开动画 (GSAP)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 卷轴展开
      gsap.fromTo('.scroll-content',
        { width: '0%', opacity: 0 },
        { width: '100%', opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 }
      );
      // 轴头旋转
      gsap.fromTo('.scroll-knob-left',
        { rotation: 0 },
        { rotation: 360, duration: 1.2, ease: 'power2.out', delay: 0.3 }
      );
      // 绫边装裱视差
      ScrollTrigger.create({
        trigger: '.scroll-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set('.mount-border', { y: self.progress * 50 });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // 计算积分池预估收入
  const estimatedIncome = adPoints * 0.2 + eventPoints * 0.3 + topPoints * 0.5;

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-serif">
      {/* ========== 首屏：乡约卷轴 ========== */}
      <section className="scroll-section relative h-screen overflow-hidden bg-[#E8DCC8]">
        {/* 绫边装裱效果 */}
        <div className="absolute inset-0 pointer-events-none mount-border">
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#8B5A2B] to-[#C49A6C] opacity-60"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#8B5A2B] to-[#C49A6C] opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-[60px] h-full flex flex-col md:flex-row items-center justify-center gap-8">
          {/* 左侧卷轴 */}
          <div className="w-full md:w-[45%] relative">
            <div className="relative bg-[#FDF5E6] shadow-2xl rounded-lg overflow-hidden border-x-8 border-[#B87C4F]">
              {/* 左轴头 */}
              <div className="scroll-knob-left absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-16 bg-red-800 rounded-full shadow-lg z-10"></div>
              {/* 卷轴内容容器 */}
              <div className="scroll-content overflow-x-auto whitespace-nowrap" style={{ width: '100%' }}>
                <div className="inline-block p-8" style={{ writingMode: 'vertical-rl', minWidth: '300px' }}>
                  <div className="text-2xl font-bold text-center mb-4">《邻里圈自治公约》</div>
                  <div className="space-y-6 text-gray-800 leading-loose">
                    <p>凡入此圈者，无论游侠雅士，执事居委，商家邻里，<br />皆须守望相助，患难相恤，出入相友，德业相劝。</p>
                    <p>大事则议于亭，小事则决于堂。<br />商家以诚待客，积分流转有序，取之有道，用之有方。</p>
                    <p>置顶广告，赛事赞助，皆以积分为凭，公允透明。</p>
                    <p>特此立约，以昭信守。</p>
                    <p className="mt-8 text-right">上海方格智联 · 谨约</p>
                  </div>
                </div>
              </div>
              {/* 右轴头 */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-16 bg-red-800 rounded-full shadow-lg"></div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-4 animate-pulse">滑动卷轴，详阅公约全文 →</div>
          </div>

          {/* 右侧理念解读 */}
          <div className="w-full md:w-[55%] space-y-6">
            <div className="flex items-center gap-4">
              <div className="vertical-text text-6xl font-han-yi text-cinnabar">共和自治</div>
              <div className="border border-cinnabar px-2 py-1 text-xs text-cinnabar rounded">里仁为美</div>
            </div>
            <h3 className="text-2xl tracking-wider">数字时代的熟人社会重构</h3>
            <div className="space-y-4">
              {[
                { title: '自治而非管控', desc: '我们相信，社区治理的活力源于居民的共同参与。邻里圈将议事权、审核权、配置权交还给社区，让执事与居委成为真正的治理枢纽。' },
                { title: '积分而非货币', desc: '独创的商家积分闭环，让商业行为反哺社区运营。每一次消费、每一张优惠券，都在为社区公共事务注入能量。' },
                { title: '角色而非标签', desc: '从游侠到雅士，从执事到掌柜，每一个身份都对应着明确的权利与义务，构建一个权责清晰、各司其职的数字里坊。' },
              ].map((item, idx) => (
                <div key={idx} className="border-l-4 border-cinnabar pl-4">
                  <div className="font-bold text-cinnabar">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== 过渡带：花窗 ========== */}
      <div className="relative h-[120px] bg-[#FDF8F0] flex items-center justify-center">
        <div className="w-32 h-32 border-8 border-amber-800 rounded-full flex items-center justify-center bg-amber-100/50">
          <span className="text-cinnabar text-xl">议事</span>
        </div>
      </div>

      {/* ========== 第二屏：八仙桌角色矩阵 ========== */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* 八仙桌插画区域 */}
          <div className="relative w-full max-w-3xl mx-auto aspect-square bg-[#E8DCC8] rounded-2xl shadow-2xl p-8">
            {/* 桌面木纹 */}
            <div className="absolute inset-8 bg-[#8B5A2B] rounded-xl shadow-inner"></div>
            {/* 茶壶茶杯装饰 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center text-white text-2xl">🫖</div>
            <div className="absolute top-1/3 left-2/3 w-6 h-6 bg-amber-600 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-amber-600 rounded-full"></div>

            {/* 四个角色剪影 */}
            {roles.map((role) => {
              let positionClass = '';
              if (role.side === 'top') positionClass = 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2';
              if (role.side === 'bottom') positionClass = 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2';
              if (role.side === 'left') positionClass = 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2';
              if (role.side === 'right') positionClass = 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2';
              return (
                <div
                  key={role.name}
                  className={`absolute ${positionClass} w-24 h-32 bg-gray-700/60 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-cinnabar/80 hover:scale-110`}
                  onMouseEnter={() => setActiveRole(role.name)}
                  onMouseLeave={() => setActiveRole(null)}
                >
                  <div className="text-white text-sm font-bold">{role.name}</div>
                </div>
              );
            })}

            {/* 浮现的牙牌 */}
            <AnimatePresence>
              {activeRole && (
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 50, rotateX: 90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 bg-white rounded-lg shadow-2xl z-20 p-4 border-2 border-amber-400"
                >
                  <div className="text-center text-2xl font-bold text-cinnabar">{activeRole}</div>
                  <div className="h-px bg-amber-300 my-2"></div>
                  <div className="text-xs text-gray-700 space-y-1">
                    {allRoleCards.find(r => r.name === activeRole)?.back.split('·').map((item, idx) => (
                      <div key={idx}>• {item.trim()}</div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="text-center mt-8 text-gray-600">同坐一张桌，共商百家事。权责各有属，邻里共和谐。</div>
        </div>
      </section>

      {/* ========== 过渡带：石碑 ========== */}
      <div className="h-20 flex justify-center items-center">
        <div className="w-48 h-12 bg-gray-700 text-white flex items-center justify-center rounded-md cursor-pointer hover:bg-cinnabar transition" onClick={() => document.getElementById('yishiting')?.scrollIntoView({ behavior: 'smooth' })}>
          议事亭 ⚡
        </div>
      </div>

      {/* ========== 第三屏：议事亭与投票箱 ========== */}
      <section id="yishiting" className="py-16 bg-[#FDF8F0]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row gap-12">
          {/* 左侧场景 */}
          <div className="md:w-2/5 relative">
            <div className="bg-[#E8DCC8] rounded-2xl p-6 text-center">
              <div className="text-6xl mb-4">⛩️</div>
              <div className="text-2xl font-bold">议事亭</div>
              <div className="my-4 text-amber-800 text-xl">🔔</div>
              <div className="bg-red-800 text-white p-3 rounded-lg inline-block">票箱</div>
              <div className="mt-4 text-sm text-gray-600">
                <div>上联：大事小情共商议</div>
                <div>下联：家长里短总关情</div>
              </div>
            </div>
          </div>
          {/* 右侧投票卡片 */}
          <div className="md:w-3/5">
            <div className="bg-white border-2 border-cinnabar rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-cinnabar"></div>
                <h3 className="text-2xl font-bold">议事厅 · 一户一票</h3>
              </div>
              <div className="space-y-4">
                <div className="text-lg font-semibold">关于在小区东门增设智能快递柜的议案</div>
                <div className="text-sm text-gray-500">提案人：雅士 · 张先生（3栋202） | 附议数：15人附议，已达议事门槛</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>✅ 赞同（已投48票）</span>
                    <span>48%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-cinnabar h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span>❌ 反对（已投12票）</span>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span>🤐 弃权（已投3票）</span>
                    <span>3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
                <div className="text-right text-sm">总投票率 63%</div>
                <button
                  onClick={() => setVoteClicked(true)}
                  className={`relative w-full py-3 border-2 border-cinnabar text-cinnabar rounded-md hover:bg-cinnabar hover:text-white transition ${voteClicked ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {voteClicked ? '✅ 投票成功' : '投票封缄'}
                </button>
                {voteClicked && <div className="text-center text-cinnabar text-sm mt-2 animate-bounce">📜 投票成功印章</div>}
              </div>
              <div className="mt-6 text-xs text-gray-400 border-t pt-2">本议题由 XX社区 · 执事堂 发起，一户一票，公正公开。</div>
            </div>
            {/* 自治流程图示 */}
            <div className="mt-8 flex justify-between items-center bg-amber-50 p-4 rounded-lg">
              <div className="text-center"><div className="text-2xl">✍️</div><div>提议</div></div>
              <div className="text-cinnabar text-2xl">→</div>
              <div className="text-center"><div className="text-2xl">👥</div><div>共议</div></div>
              <div className="text-cinnabar text-2xl">→</div>
              <div className="text-center"><div className="text-2xl">🗳️</div><div>公决</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 第四屏：积分自治规则配置 ========== */}
      <section className="py-16 bg-gradient-to-r from-[#FDF5F0] to-[#F9E8E0]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-white border-4 border-cinnabar rounded-2xl shadow-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cinnabar text-white px-6 py-1 rounded-full text-sm">执事堂示</div>
            <h3 className="text-2xl font-bold text-center mt-4">积分消耗规则 · 动态配置</h3>
            <div className="space-y-6 mt-8">
              {/* 规则1 */}
              <RuleItem label="申请广告位消耗" value={adPoints} setValue={setAdPoints} min={0} max={500} unit="积分/次" enabled={adEnabled} setEnabled={setAdEnabled} />
              {/* 规则2 */}
              <RuleItem label="发起社区赛事消耗" value={eventPoints} setValue={setEventPoints} min={0} max={500} unit="积分/次" enabled={eventEnabled} setEnabled={setEventEnabled} />
              {/* 规则3 */}
              <RuleItem label="店铺置顶消耗" value={topPoints} setValue={setTopPoints} min={0} max={200} unit="积分/天" enabled={topEnabled} setEnabled={setTopEnabled} />
            </div>
            <div className="mt-8 bg-amber-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span>预计本月社区运营积分池收入：</span>
                <span className="text-cinnabar font-bold text-xl">{Math.floor(estimatedIncome)} 积分</span>
              </div>
            </div>
            <div className="mt-6 text-center text-xs text-gray-400 border-t pt-4">以上规则由 XX社区执事堂 制定，报邻里圈备案。</div>
            <div className="absolute bottom-4 right-4 w-16 h-16 opacity-30"><span className="text-cinnabar text-4xl">🔴</span></div>
          </div>
        </div>
      </section>

      {/* ========== 第五屏：荣誉体系 红榜与雅星 ========== */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row gap-12">
          {/* 红榜 */}
          <div className="md:w-1/2 bg-red-800 text-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-red-900 py-3 text-center text-3xl font-bold tracking-widest">红 榜</div>
            <div className="p-4 space-y-3">
              {goodDeeds.map(deed => (
                <div key={deed.id} className={`border-b border-red-600 pb-2 ${deed.highlight ? 'bg-red-700/30 p-2 rounded' : ''}`}>
                  <div className="flex items-center gap-2"><span className="text-yellow-300">善</span><span>{deed.date} · {deed.building} {deed.person} · {deed.deed}</span></div>
                </div>
              ))}
            </div>
          </div>
          {/* 雅星 */}
          <div className="md:w-1/2 bg-amber-50 rounded-2xl shadow-2xl p-6 relative">
            <div className="text-center text-3xl font-bold text-amber-800">雅 星</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-32 h-32 rounded-full bg-amber-200 flex items-center justify-center text-5xl">{stars[selectedStarIndex].avatar}</div>
              <div className="text-xl font-bold mt-2">{stars[selectedStarIndex].name}</div>
              <div className="text-sm text-gray-500">{stars[selectedStarIndex].building}</div>
              <div className="text-center text-gray-700 mt-4 px-4">{stars[selectedStarIndex].reason}</div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setSelectedStarIndex((prev) => (prev - 1 + stars.length) % stars.length)} className="px-4 py-1 bg-amber-700 text-white rounded">◀ 上一星</button>
                <button onClick={() => setSelectedStarIndex((prev) => (prev + 1) % stars.length)} className="px-4 py-1 bg-amber-700 text-white rounded">下一星 ▶</button>
              </div>
              <button className="mt-6 px-6 py-2 border border-amber-700 text-amber-700 rounded-full hover:bg-amber-700 hover:text-white transition">自荐 / 提名</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 底部通栏 ========== */}
      <footer className="bg-ink text-gold py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gold-cloud"></div>
        <div className="relative z-10">
          <div className="vertical-text text-4xl text-gold mx-auto">共和自治 · 非一人之治，乃众人之约</div>
          <div className="text-lg mt-6">即刻预约演示，开启您的社区自治新篇章。</div>
          <button className="mt-8 relative px-10 py-4 bg-cinnabar border-2 border-amber-400 text-white font-bold rounded-lg shadow-xl hover:scale-105 transition group">
            预约演示 · 共话自治
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[waxMelt_0.4s_ease-out_forwards]"></span>
          </button>
          <div className="mt-8 text-sm text-gray-400">
            <div>已是邻里圈用户？ → 前往执事堂后台</div>
            <div className="mt-2">想了解商家积分体系？ → 前往掌柜通</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==================== 辅助组件：规则配置项 ====================
function RuleItem({ label, value, setValue, min, max, unit, enabled, setEnabled }: any) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">{enabled ? '启' : '禁'}</span>
          <button onClick={() => setEnabled(!enabled)} className={`w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-cinnabar' : 'bg-gray-300'} relative`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          disabled={!enabled}
          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cinnabar"
        />
        <span className="w-16 text-right">{value} {unit}</span>
      </div>
    </div>
  );
}