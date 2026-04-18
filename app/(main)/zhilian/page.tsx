'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// ==================== 类型定义 ====================
interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

// ==================== 主组件 ====================
export default function ZhilianPage() {
  // 分屏悬停状态
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  // 积分模拟器数值
  const [pointsCost, setPointsCost] = useState(50);
  // 算盘数字（仅示意）
  const [abacusIncome] = useState(128);
  const [abacusExpense] = useState(50);
  const [abacusRedeem] = useState(23);
  // Tooltip状态
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: '', x: 0, y: 0 });
  // 悬浮包袱索引
  const [hoverBundle, setHoverBundle] = useState<number | null>(null);

  // 沙盘气泡数据
  const buildings = [
    { id: 1, name: '1栋', red: 0, yellow: 0, green: 2, redTip: '', yellowTip: '', greenTip: '2位邻居正在互动' },
    { id: 2, name: '2栋', red: 0, yellow: 0, green: 5, redTip: '', yellowTip: '', greenTip: '5位邻居正在互动' },
    { id: 3, name: '3栋', red: 3, yellow: 0, green: 0, redTip: '3条业主认证待审核', yellowTip: '', greenTip: '' },
    { id: 4, name: '4栋', red: 0, yellow: 0, green: 1, redTip: '', yellowTip: '', greenTip: '1位邻居正在互动' },
    { id: 5, name: '5栋', red: 0, yellow: 1, green: 0, redTip: '', yellowTip: '1条报修待指派', greenTip: '' },
    { id: 6, name: '6栋', red: 0, yellow: 0, green: 3, redTip: '', yellowTip: '', greenTip: '3位邻居正在互动' },
  ];

  // 权限清单
  const permissions = [
    '公告发布与置顶管理 —— 免审发布，直达千家',
    '业主认证与身份审核 —— 守护社区纯净',
    '积分消耗规则动态配置 —— 自治核心',
    '社区赛事与活动审批 —— 丰富邻里生活',
    '好人好事提名与红榜发布 —— 弘扬正气',
  ];

  // 包袱功能列表
  const bundles = [
    { name: '商品上下架', icon: '📦', desc: '管理店铺货架，积分标价' },
    { name: '优惠券创建', icon: '🎫', desc: '积分定价优惠券，吸引邻里' },
    { name: '店员权限', icon: '👥', desc: '添加店员，分级授权' },
    { name: '赛事赞助', icon: '🏆', desc: '赞助社区活动，品牌扬名' },
  ];

  // 铜钱串插图映射（根据积分数值显示不同图片，这里用CSS样式模拟）
  const getCoinStringDensity = () => {
    if (pointsCost < 50) return '稀疏';
    if (pointsCost < 120) return '适中';
    return '饱满';
  };

  // 处理气泡tooltip
  const handleBubbleHover = (e: React.MouseEvent, tip: string) => {
    if (!tip) return;
    setTooltip({
      visible: true,
      text: tip,
      x: e.clientX,
      y: e.clientY - 30,
    });
  };
  const hideTooltip = () => setTooltip({ ...tooltip, visible: false });

  // 滑条联动（简化，真实场景需要图片切换，这里用文字示意）
  useEffect(() => {
    // 可在此处更新铜钱串插图样式，本例用文字示意
  }, [pointsCost]);

  // 移动端判断
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2EB]">
      {/* 首屏横幅 Hero Banner */}
      <section className="relative h-[200px] bg-[#F5F2EB] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path d="M0,200 Q200,150 400,180 T800,160 T1200,190 T1440,170 L1440,200 L0,200 Z" fill="#A67B5B" />
            <path d="M0,200 Q300,170 600,190 T1200,170 L1440,180 L1440,200 L0,200 Z" fill="#8B5A2B" opacity="0.3" />
          </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-[60px] h-full flex items-center justify-between">
          <div className="vertical-text text-5xl font-han-yi text-cinnabar">智 · 联</div>
          <div className="text-center">
            <div className="text-xl text-ink">一方执事，一方掌柜，积分活水，商居共荣</div>
          </div>
          <div className="w-16 h-16 border-2 border-cinnabar/50 rounded-full flex items-center justify-center transform rotate-12">
            <span className="text-cinnabar text-sm">骑缝章</span>
          </div>
        </div>
      </section>

      {/* 核心交互区：双面绣分屏 */}
      <section className="relative max-w-[1440px] mx-auto px-[60px] py-8">
        {/* 桌面端左右分屏 */}
        {!isMobile ? (
          <div
            className="relative flex min-h-[700px] bg-white/40 rounded-2xl shadow-xl overflow-hidden"
            onMouseLeave={() => setHoverSide(null)}
          >
            {/* 左侧屏：执事堂 */}
            <motion.div
              className="relative bg-[#FDF8F5] p-6 overflow-y-auto"
              animate={{ flex: hoverSide === 'left' ? '0.65' : hoverSide === 'right' ? '0.35' : '0.5' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setHoverSide('left')}
            >
              <LeftPanel
                pointsCost={pointsCost}
                setPointsCost={setPointsCost}
                buildings={buildings}
                permissions={permissions}
                handleBubbleHover={handleBubbleHover}
                hideTooltip={hideTooltip}
                getCoinStringDensity={getCoinStringDensity}
              />
            </motion.div>

            {/* 中心金线 */}
            <div className="relative z-10 w-[2px] bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-400 shadow-[0_0_4px_#D4AF37]">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-400 shadow-lg"></div>
            </div>

            {/* 右侧屏：商家通 */}
            <motion.div
              className="relative bg-[#F5F7FA] p-6 overflow-y-auto"
              animate={{ flex: hoverSide === 'right' ? '0.65' : hoverSide === 'left' ? '0.35' : '0.5' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setHoverSide('right')}
            >
              <RightPanel
                abacusIncome={abacusIncome}
                abacusExpense={abacusExpense}
                abacusRedeem={abacusRedeem}
                bundles={bundles}
                hoverBundle={hoverBundle}
                setHoverBundle={setHoverBundle}
              />
            </motion.div>
          </div>
        ) : (
          // 移动端垂直堆叠 + 横向滑动卡片
          <div className="space-y-8">
            <div className="bg-[#FDF8F5] rounded-2xl p-4">
              <div className="text-center text-cinnabar mb-2">『执事堂』 ← 左右滑动查看 →</div>
              <div className="overflow-x-auto scroll-smooth pb-2">
                <div className="flex gap-4 w-max">
                  <div className="w-[85vw] flex-shrink-0 bg-white rounded-xl p-4">沙盘卡片（略）</div>
                  <div className="w-[85vw] flex-shrink-0 bg-white rounded-xl p-4">权限清单（略）</div>
                  <div className="w-[85vw] flex-shrink-0 bg-white rounded-xl p-4">积分模拟器（略）</div>
                </div>
              </div>
            </div>
            <div className="bg-[#F5F7FA] rounded-2xl p-4">
              <div className="text-center text-cinnabar mb-2">『掌柜通』 ← 左右滑动查看 →</div>
              <div className="overflow-x-auto scroll-smooth pb-2">
                <div className="flex gap-4 w-max">
                  <div className="w-[85vw] flex-shrink-0 bg-white rounded-xl p-4">算盘看板（略）</div>
                  <div className="w-[85vw] flex-shrink-0 bg-white rounded-xl p-4">功能包袱（略）</div>
                  <div className="w-[85vw] flex-shrink-0 bg-white rounded-xl p-4">积分闭环（略）</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 全局 Tooltip */}
        {tooltip.visible && (
          <div
            className="fixed z-50 bg-ink text-rice-paper text-xs px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}
      </section>

      {/* 底部通栏 CTA */}
      <section className="mt-12 py-12 bg-gradient-to-r from-[#FDF8F5] to-[#F5F7FA] border-t border-amber-200">
        <div className="max-w-[1440px] mx-auto px-[60px] text-center">
          <div className="vertical-text text-2xl text-cinnabar mx-auto mb-6">无论执事掌柜，皆可入此智联画卷</div>
          <div className="flex justify-center gap-10 flex-wrap">
            <button className="relative px-8 py-3 bg-cinnabar border-2 border-amber-400 text-rice-paper font-bold rounded-md shadow-lg hover:scale-105 transition group">
              预约演示 · 共话自治
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[waxMelt_0.4s_ease-out_forwards]"></span>
            </button>
            <button className="relative px-8 py-3 bg-blue-800 border-2 border-silver-400 text-white font-bold rounded-md shadow-lg hover:scale-105 transition group">
              商家入驻 · 积分启程
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[waxMelt_0.4s_ease-out_forwards]"></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== 左侧屏组件 ====================
function LeftPanel({
  pointsCost,
  setPointsCost,
  buildings,
  permissions,
  handleBubbleHover,
  hideTooltip,
  getCoinStringDensity,
}: any) {
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setPointsCost(val);
  };

  return (
    <div className="max-w-[500px] mx-auto">
      {/* 头部标识 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-amber-800 rounded-md shadow-md flex items-center justify-center text-white text-xl">⚡</div>
        <div>
          <div className="text-2xl font-bold">执事堂</div>
          <div className="text-xs text-cinnabar tracking-wider">审核 · 调配 · 共治</div>
        </div>
      </div>

      {/* 沙盘总览卡片 */}
      <div className="bg-white rounded-2xl border border-[#E5D9CC] shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">今日辖区总览</span>
          <span className="text-xs text-gray-400">乙巳年 三月廿八</span>
        </div>
        <div className="relative bg-amber-50/30 rounded-xl p-4 min-h-[220px]">
          <div className="grid grid-cols-3 gap-3">
            {buildings.map((bld: any) => (
              <div key={bld.id} className="relative bg-white rounded-lg p-2 shadow text-center">
                <div className="text-xs font-bold">{bld.name}</div>
                <div className="h-12 bg-gray-200 rounded mt-1"></div>
                <div className="absolute -top-2 -right-2">
                  {bld.red > 0 && (
                    <div
                      className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center cursor-help"
                      onMouseMove={(e) => handleBubbleHover(e, bld.redTip)}
                      onMouseLeave={hideTooltip}
                    >
                      {bld.red}
                    </div>
                  )}
                </div>
                <div className="absolute -top-2 -left-2">
                  {bld.yellow > 0 && (
                    <div
                      className="w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center cursor-help"
                      onMouseMove={(e) => handleBubbleHover(e, bld.yellowTip)}
                      onMouseLeave={hideTooltip}
                    >
                      {bld.yellow}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0">
                  {bld.green > 0 && (
                    <div
                      className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center cursor-help"
                      onMouseMove={(e) => handleBubbleHover(e, bld.greenTip)}
                      onMouseLeave={hideTooltip}
                    >
                      {bld.green}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-2 gap-3 text-xs">
            <span><span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>待审核</span>
            <span><span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>待处理</span>
            <span><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>活跃度</span>
          </div>
        </div>
      </div>

      {/* 竹简权限清单 */}
      <div className="bg-[#FDF5E6] border-x-8 border-[#B87C4F] rounded-lg p-5 mb-6 shadow-inner">
        <div className="space-y-3">
          {permissions.map((perm, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-dashed border-amber-300 pb-1">
              <div className="flex items-center gap-2">
                <span className="text-cinnabar">✓</span>
                <span className="text-sm">{perm}</span>
              </div>
              <span className="text-cinnabar text-xs bg-white px-1 rounded">准</span>
            </div>
          ))}
        </div>
      </div>

      {/* 积分规则模拟器 */}
      <div className="bg-white rounded-2xl border border-[#E5D9CC] shadow-md p-6">
        <div className="text-sm font-medium mb-4">消耗积分规则模拟 · 社区自治调节</div>
        <div className="mb-2 flex justify-between">
          <span>店铺置顶（每日消耗）</span>
          <span className="text-cinnabar font-bold">{pointsCost} 积分</span>
        </div>
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="200"
          step="1"
          value={pointsCost}
          onChange={handleSliderChange}
          className="w-full h-1 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-cinnabar"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
        </div>
        {/* 铜钱串示意 */}
        <div className="mt-4 flex items-center gap-2 text-amber-700">
          <span>💰</span>
          <span className="text-sm">铜钱串：{getCoinStringDensity()}</span>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          当前设置下，商家每置顶一日需消耗 <span className="text-cinnabar font-bold">{pointsCost}</span> 积分。此积分将回流社区运营池。
        </p>
      </div>
    </div>
  );
}

// ==================== 右侧屏组件 ====================
function RightPanel({ abacusIncome, abacusExpense, abacusRedeem, bundles, hoverBundle, setHoverBundle }: any) {
  // 算盘拨动效果（简单模拟）
  const [shake, setShake] = useState(false);
  const handleAbacusWheel = () => {
    setShake(true);
    setTimeout(() => setShake(false), 200);
  };

  return (
    <div className="max-w-[500px] mx-auto">
      {/* 头部标识 */}
      <div className="flex items-center justify-end gap-3 mb-8">
        <div>
          <div className="text-2xl font-bold text-right">掌柜通</div>
          <div className="text-xs text-cinnabar tracking-wider text-right">揽客 · 流水 · 扬名</div>
        </div>
        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl">💰</div>
      </div>

      {/* 算盘数据看板 */}
      <div
        className={`bg-white rounded-2xl border border-[#E5D9CC] shadow-md p-6 mb-6 cursor-pointer transition-all ${shake ? 'scale-105' : ''}`}
        onWheel={handleAbacusWheel}
      >
        <div className="text-center font-semibold mb-4">今日经营概览</div>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-2xl font-bold text-cinnabar">{abacusIncome}</div>
            <div className="text-xs text-gray-500">积分收入</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{abacusExpense}</div>
            <div className="text-xs text-gray-500">积分消耗</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">{abacusRedeem}</div>
            <div className="text-xs text-gray-500">优惠券核销</div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-3">单位：社区积分</div>
        <div className="flex justify-center gap-2 mt-2 text-amber-700">
          <span>🧮</span><span>💸</span><span>🎫</span>
        </div>
      </div>

      {/* 包袱货架 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {bundles.map((bundle, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#E5D9CC] p-4 text-center hover:shadow-lg transition-all cursor-pointer"
            onMouseEnter={() => setHoverBundle(idx)}
            onMouseLeave={() => setHoverBundle(null)}
          >
            <div className="text-3xl mb-2 transition-transform duration-300 transform hover:scale-110">
              {hoverBundle === idx ? bundle.icon : '🧺'}
            </div>
            <div className="font-medium text-sm">{bundle.name}</div>
            {hoverBundle === idx && (
              <div className="text-xs text-gray-500 mt-1">{bundle.desc}</div>
            )}
          </div>
        ))}
      </div>

      {/* 积分闭环动线 */}
      <div className="bg-white rounded-2xl border border-[#E5D9CC] p-5 relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">🏪➡️💰</div>
            <div className="font-bold text-sm">邻里兑券/消费</div>
            <div className="text-xs text-gray-500">用户使用积分，商家获得等额积分</div>
          </div>
          <div className="text-2xl text-amber-500 animate-pulse">→</div>
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">💰📈</div>
            <div className="font-bold text-sm">积分积攒</div>
            <div className="text-xs text-gray-500">积分累计，可兑换推广权益</div>
          </div>
          <div className="text-2xl text-amber-500 animate-pulse">→</div>
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">🔝🏆</div>
            <div className="font-bold text-sm">消耗积分·店铺置顶</div>
            <div className="text-xs text-gray-500">或申请广告、发起赛事</div>
          </div>
        </div>
        {/* 流动光点装饰 */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 animate-[shimmer_2s_infinite]"></div>
      </div>
    </div>
  );
}

