'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// ==================== FAQ 数据 ====================
const faqs = [
  {
    id: 1,
    question: '入驻邻里圈需要费用吗？',
    answer: '平台基础功能对社区与居民永久免费。商家入驻需经社区审核，无平台入驻费，仅涉及正常的积分流转与推广消耗。'
  },
  {
    id: 2,
    question: '如何成为认证业主（雅士）？',
    answer: '在小程序内提交业主认证申请，上传相关证明（如房产证或租赁合同），由本社区执事（物业/居委）审核通过即可。'
  },
  {
    id: 3,
    question: '商家积分如何获得与使用？',
    answer: '用户兑换您的优惠券或购买商品时，您将获得等额积分。积分可用于申请首页广告位、置顶店铺、发起社区赛事等推广活动。'
  },
  {
    id: 4,
    question: '一个手机号可以绑定多个社区吗？',
    answer: '可以。您可以在小程序内切换社区身份，每个社区的身份独立管理。'
  },
  {
    id: 5,
    question: '数据安全如何保障？',
    answer: '我们采用严格的 communityId 数据隔离机制，各社区数据互不干扰。敏感操作均由云函数后端校验，确保数据安全。'
  },
  {
    id: 6,
    question: '是否支持定制开发？',
    answer: '我们为大型社区或集团客户提供私有化部署与定制开发服务，请通过执事预约表单与我们联系。'
  },
];

// ==================== 主组件 ====================
export default function RuquanPage() {
  // 状态
  const [doorOpen, setDoorOpen] = useState(false);
  const [openInvitation, setOpenInvitation] = useState<'zhi' | 'zhang' | 'lin' | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [merchantFormSubmitting, setMerchantFormSubmitting] = useState(false);
  const [merchantFormSuccess, setMerchantFormSuccess] = useState(false);
  
  const doorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // 门环晃动动画
  useEffect(() => {
    if (!doorOpen && ringRef.current) {
      gsap.fromTo(ringRef.current,
        { rotation: 0 },
        { rotation: 15, duration: 0.2, repeat: 3, yoyo: true, delay: 0.5 }
      );
    }
  }, [doorOpen]);

  // 开门动画
  const handleOpenDoor = () => {
    if (doorOpen) return;
    setDoorOpen(true);
    // 可选音效占位
  };

  // 请柬提交（执事表单）
  const handleZhiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 3000);
    }, 1000);
  };

  // 商家入驻提交
  const handleMerchantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMerchantFormSubmitting(true);
    setTimeout(() => {
      setMerchantFormSubmitting(false);
      setMerchantFormSuccess(true);
      setTimeout(() => setMerchantFormSuccess(false), 3000);
    }, 1000);
  };

  // 翻页动画变体
  const flipVariants = {
    closed: { rotateY: 0 },
    open: { rotateY: 180, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0] font-serif overflow-x-hidden">
      {/* ========== 首屏：朱红大门 ========== */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* 背景大门图片（模拟） */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/red-door.jpg')" }}
        ></div>
        {/* 深色渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>

        {/* 大门打开动画层（3D效果） */}
        <AnimatePresence>
          {!doorOpen ? (
            <motion.div
              key="door-closed"
              className="absolute inset-0 z-20 flex flex-col items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              <div className="text-center">
                <div className="vertical-text text-6xl md:text-7xl text-amber-400 font-han-yi mb-6 drop-shadow-lg">
                  何不就此入圈
                </div>
                <div className="text-rice-paper text-sm tracking-wider mb-8">
                  选择您的身份，开启邻里之旅
                </div>
                {/* 门环 */}
                <div
                  ref={ringRef}
                  className="inline-block cursor-pointer group"
                  onClick={handleOpenDoor}
                >
                  <div className="w-16 h-16 rounded-full bg-amber-600/80 border-4 border-amber-400 flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <div className="w-8 h-8 rounded-full bg-amber-800"></div>
                  </div>
                  <div className="text-amber-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition">
                    叩门入内
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-0 z-10 flex"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
              style={{ originX: 0.5 }}
            >
              <motion.div
                className="w-1/2 h-full bg-black/60 backdrop-blur-sm"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.div
                className="w-1/2 h-full bg-black/60 backdrop-blur-sm"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========== 第二屏：三路请柬（开门后显示） ========== */}
      {doorOpen && (
        <>
          <section className="py-20 px-6 md:px-12 bg-rice-paper relative">
            {/* 天光效果 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-white/40 rounded-full blur-3xl"></div>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 请柬一：执事 */}
                <div className="relative perspective-1000">
                  <div className="relative w-full h-[480px] cursor-pointer group">
                    <AnimatePresence mode="wait">
                      {openInvitation !== 'zhi' ? (
                        <motion.div
                          key="zhi-cover"
                          className="absolute inset-0 bg-gradient-to-br from-cinnabar to-red-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 text-center"
                          initial={{ rotateY: 0 }}
                          exit={{ rotateY: -180 }}
                          transition={{ duration: 0.6 }}
                          style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
                          onClick={() => setOpenInvitation('zhi')}
                        >
                          <div className="text-6xl mb-4 text-amber-300">🎩</div>
                          <div className="text-3xl font-bold text-amber-300 mb-2">致 执事</div>
                          <div className="text-white/80 text-sm">物业 · 居委 · 管理者</div>
                          <div className="absolute bottom-6 right-6 text-amber-400/50 text-xs">📜</div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="zhi-inner"
                          className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 overflow-y-auto border-2 border-cinnabar"
                          initial={{ rotateY: 180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-cinnabar text-xs border border-cinnabar px-2 py-0.5 rounded">执事堂</div>
                            <button
                              className="text-gray-400 hover:text-cinnabar text-xl"
                              onClick={() => setOpenInvitation(null)}
                            >
                              ✕
                            </button>
                          </div>
                          <h3 className="text-xl font-bold text-cinnabar mb-2">共话自治 · 预约演示</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            尊敬的社区管理者：诚邀您体验邻里圈「执事堂」后台。我们将为您专属演示积分规则配置、业主认证管理、社区赛事发布等功能。
                          </p>
                          <form onSubmit={handleZhiSubmit} className="space-y-3">
                            <input type="text" placeholder="姓名或称呼" className="w-full border border-gray-300 rounded p-2 text-sm" required />
                            <input type="tel" placeholder="联系方式" className="w-full border border-gray-300 rounded p-2 text-sm" required />
                            <input type="text" placeholder="所在社区" className="w-full border border-gray-300 rounded p-2 text-sm" />
                            <textarea placeholder="备注（可选）" className="w-full border border-gray-300 rounded p-2 text-sm" rows={2}></textarea>
                            <button
                              type="submit"
                              disabled={formSubmitting}
                              className="w-full bg-cinnabar text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                            >
                              {formSubmitting ? '飞鸽传书中...' : '提交预约 · 稍后专人联系'}
                            </button>
                            {formSuccess && <div className="text-green-600 text-xs text-center">✓ 请柬已送达</div>}
                          </form>
                          <div className="text-center text-xs text-gray-400 mt-3">或致电：400-XXX-XXXX</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 请柬二：掌柜 */}
                <div className="relative perspective-1000">
                  <div className="relative w-full h-[480px] cursor-pointer group">
                    <AnimatePresence mode="wait">
                      {openInvitation !== 'zhang' ? (
                        <motion.div
                          key="zhang-cover"
                          className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 text-center"
                          initial={{ rotateY: 0 }}
                          exit={{ rotateY: -180 }}
                          transition={{ duration: 0.6 }}
                          onClick={() => setOpenInvitation('zhang')}
                        >
                          <div className="text-6xl mb-4 text-amber-300">💰</div>
                          <div className="text-3xl font-bold text-amber-300 mb-2">致 掌柜</div>
                          <div className="text-white/80 text-sm">店长 · 店员 · 经营者</div>
                          <div className="absolute bottom-6 right-6 text-amber-400/50 text-xs">🧮</div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="zhang-inner"
                          className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 overflow-y-auto border-2 border-amber-600"
                          initial={{ rotateY: 180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-amber-700 text-xs border border-amber-700 px-2 py-0.5 rounded">掌柜通</div>
                            <button className="text-gray-400 hover:text-amber-700 text-xl" onClick={() => setOpenInvitation(null)}>✕</button>
                          </div>
                          <h3 className="text-xl font-bold text-amber-800 mb-2">积分启程 · 商家入驻</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            加入邻里圈「掌柜通」，让积分为您带来源源客流。入驻流程仅需三步：
                          </p>
                          <div className="flex justify-between items-center mb-4 text-center text-xs">
                            <div><span className="block w-8 h-8 bg-amber-100 rounded-full mx-auto">①</span>提交资料</div>
                            <div className="text-amber-500">→</div>
                            <div><span className="block w-8 h-8 bg-amber-100 rounded-full mx-auto">②</span>社区审核</div>
                            <div className="text-amber-500">→</div>
                            <div><span className="block w-8 h-8 bg-amber-100 rounded-full mx-auto">③</span>开店营业</div>
                          </div>
                          <form onSubmit={handleMerchantSubmit} className="space-y-3">
                            <input type="text" placeholder="店铺名称" className="w-full border border-gray-300 rounded p-2 text-sm" required />
                            <input type="text" placeholder="联系人" className="w-full border border-gray-300 rounded p-2 text-sm" required />
                            <input type="tel" placeholder="联系电话" className="w-full border border-gray-300 rounded p-2 text-sm" required />
                            <button
                              type="submit"
                              disabled={merchantFormSubmitting}
                              className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition"
                            >
                              {merchantFormSubmitting ? '提交中...' : '立即申请入驻'}
                            </button>
                            {merchantFormSuccess && <div className="text-green-600 text-xs text-center">✓ 申请已提交，执事将尽快审核</div>}
                          </form>
                          <div className="text-center text-xs text-gray-400 mt-3">已有店铺？<span className="text-amber-700 cursor-pointer">前往商家后台</span></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 请柬三：邻里 */}
                <div className="relative perspective-1000">
                  <div className="relative w-full h-[480px] cursor-pointer group">
                    <AnimatePresence mode="wait">
                      {openInvitation !== 'lin' ? (
                        <motion.div
                          key="lin-cover"
                          className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 text-center"
                          initial={{ rotateY: 0 }}
                          exit={{ rotateY: -180 }}
                          transition={{ duration: 0.6 }}
                          onClick={() => setOpenInvitation('lin')}
                        >
                          <div className="text-6xl mb-4 text-amber-300">🏠</div>
                          <div className="text-3xl font-bold text-amber-300 mb-2">致 邻里</div>
                          <div className="text-white/80 text-sm">业主 · 居民 · 体验者</div>
                          <div className="absolute bottom-6 right-6 text-amber-400/50 text-xs">🌸</div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="lin-inner"
                          className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center border-2 border-amber-600"
                          initial={{ rotateY: 180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="flex justify-end w-full">
                            <button className="text-gray-400 hover:text-amber-700 text-xl" onClick={() => setOpenInvitation(null)}>✕</button>
                          </div>
                          <h3 className="text-xl font-bold text-amber-800 mb-2">扫码入圈 · 即刻体验</h3>
                          <p className="text-gray-600 text-sm mb-4">邻里圈小程序，随时随地的社区生活助手。求助、议事、抽签、兑券……万千烟火，尽在掌中。</p>
                          <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm mx-auto mb-3">📱 小程序码</div>
                          <div className="text-cinnabar text-sm font-medium">微信扫码 · 即刻入圈</div>
                          <div className="text-gray-400 text-xs mt-2">iOS / Android 版本即将上线，敬请期待</div>
                          {/* 飘落花瓣装饰 */}
                          <div className="absolute -top-2 left-0 text-pink-300 text-xs animate-fall">🌸</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== 第三屏：FAQ 常见之问 ========== */}
          <section className="py-20 px-6 md:px-12 bg-[#F5F2EB] relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">入圈常见之问</h2>
                <div className="inline-block border border-cinnabar text-cinnabar text-xs px-2 py-0.5 rounded mt-2">释疑</div>
              </div>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button
                      className="w-full text-left p-5 flex justify-between items-center hover:bg-amber-50 transition"
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-0.5 rounded ${openFaq === faq.id ? 'bg-gray-800 text-white' : 'bg-cinnabar text-white'}`}>
                          {openFaq === faq.id ? '答' : '问'}
                        </span>
                        <span className="font-medium text-gray-800">{faq.question}</span>
                      </div>
                      <span className="text-gray-400">{openFaq === faq.id ? '▲' : '▼'}</span>
                    </button>
                    <AnimatePresence>
                      {openFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-gray-600 text-sm border-t border-gray-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========== 第四屏：千里传音 · 联络驿站 ========== */}
          <section className="py-20 px-6 md:px-12 bg-ink text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 左侧联系信息 */}
              <div>
                <div className="vertical-text text-2xl text-amber-400 mb-4">联络驿站</div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-amber-800/50 pb-2">
                    <span className="text-amber-400">📧</span>
                    <span>商务合作：business@fangezhilian.com</span>
                  </div>
                  <div className="flex items-center gap-3 border-b border-amber-800/50 pb-2">
                    <span className="text-amber-400">📧</span>
                    <span>媒体公关：pr@fangezhilian.com</span>
                  </div>
                  <div className="flex items-center gap-3 border-b border-amber-800/50 pb-2">
                    <span className="text-amber-400">📞</span>
                    <span>客服热线：400-XXX-XXXX（工作日 9:00-18:00）</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">📍</span>
                    <span>公司地址：上海市 XX 区 XX 路 XX 号 XX 楼</span>
                  </div>
                </div>
              </div>
              {/* 右侧关注我们 */}
              <div>
                <div className="vertical-text text-2xl text-amber-400 mb-4">里坊消息</div>
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 text-xs mb-2">公众号二维码</div>
                  <div className="text-sm">微信公众号 · 邻里圈</div>
                  <div className="text-xs text-gray-400 mt-1">关注获取最新社区活动与产品动态</div>
                  <div className="flex gap-4 mt-4">
                    <span className="w-8 h-8 border border-amber-500 rounded-full flex items-center justify-center text-amber-500">📱</span>
                    <span className="w-8 h-8 border border-amber-500 rounded-full flex items-center justify-center text-amber-500">📷</span>
                    <span className="w-8 h-8 border border-amber-500 rounded-full flex items-center justify-center text-amber-500">🎵</span>
                    <span className="w-8 h-8 border border-amber-500 rounded-full flex items-center justify-center text-amber-500">❓</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== 第五屏：尾卷 · 出品铭文 ========== */}
          <footer className="relative bg-ink text-gray-500 text-xs py-8 text-center border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 space-y-2">
              <p>上海方格智联信息科技有限公司 倾心出品</p>
              <p>沪ICP备XXXXXXXX号-1 | 沪公网安备 XXXXXXXXXXXX 号 | 隐私政策 | 用户协议</p>
              <p>© 2026 Shanghai Fangge Zhilian Information Technology Co., Ltd. All Rights Reserved.</p>
            </div>
            {/* 底部小印章 */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-20 border border-white rounded-full flex items-center justify-center text-white text-[10px]">方格</div>
            {/* 小燕子 */}
            <div className="absolute bottom-4 right-4 text-gray-600 text-xs">🐦</div>
          </footer>
        </>
      )}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation: fall 3s linear infinite;
        }
      `}</style>
    </div>
  );
}