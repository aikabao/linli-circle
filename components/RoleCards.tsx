'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 角色卡片数据
const roles = [
  {
    name: '执事视界',
    target: '物业/居委',
    desc: '审核公告 · 调配积分 · 共治一方',
    link: '/property',
    ancientBg: 'bg-amber-700',
    modernBg: 'bg-amber-500',
    ancientIcon: '🏛️',
    modernIcon: '📊',
  },
  {
    name: '掌柜视界',
    target: '商家',
    desc: '积分揽客 · 赛事冠名 · 盘活流水',
    link: '/merchant',
    ancientBg: 'bg-amber-600',
    modernBg: 'bg-amber-400',
    ancientIcon: '🧮',
    modernIcon: '📱',
  },
  {
    name: '雅士视界',
    target: '居民',
    desc: '求助有门 · 议事投票 · 以分会友',
    link: '/resident',
    ancientBg: 'bg-amber-500',
    modernBg: 'bg-amber-300',
    ancientIcon: '🎋',
    modernIcon: '👥',
  },
];

// 模拟小程序滚动图片数据（实际可从 API 获取）
const scrollImages = [
  {
    id: 1,
    src: 'https://picsum.photos/id/1015/300/200',  // 山水风景（占位）
    title: '社区象棋大赛',
    description: '32位棋手激烈角逐',
    link: '#',
  },
  {
    id: 2,
    src: 'https://picsum.photos/id/104/300/200',   // 狗狗（占位）
    title: '邻里互助日',
    description: '免费义诊、家电维修',
    link: '#',
  },
  {
    id: 3,
    src: 'https://picsum.photos/id/169/300/200',   // 日出
    title: '积分兑换市集',
    description: '居民用积分换粮油',
    link: '#',
  },
  {
    id: 4,
    src: 'https://picsum.photos/id/155/300/200',   // 石板路
    title: '商家联盟会议',
    description: '共议积分闭环新规则',
    link: '#',
  },
  {
    id: 5,
    src: 'https://picsum.photos/id/96/300/200',    // 山间小屋
    title: '最美楼栋评选',
    description: '投票已开启，快来支持你楼栋',
    link: '#',
  },
  {
    id: 6,
    src: 'https://picsum.photos/id/20/300/200',    // 咖啡
    title: '新入驻商家',
    description: '老王生鲜，可用积分抵扣',
    link: '#',
  },
];

export default function RoleCards() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 横向滚动（鼠标滚轮支持）
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-rice-paper to-white">
      <div className="container mx-auto px-6">
        {/* 标题 */}
        <h2 className="text-4xl font-han-yi text-center text-cinnabar mb-16">角色之道 · 身份牌坊</h2>

        {/* 三张角色卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className={`relative h-80 w-full flex items-center justify-center text-6xl transition-all duration-500 ${hoverIndex === idx ? role.modernBg : role.ancientBg}`}>
                {hoverIndex === idx ? role.modernIcon : role.ancientIcon}
                <span className="absolute bottom-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  {hoverIndex === idx ? '现代场景' : '工笔形象'}
                </span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold">{role.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{role.target}</p>
                <p className="mt-4 text-cinnabar font-medium">{role.desc}</p>
                <button className="mt-6 px-6 py-2 border-2 border-cinnabar text-cinnabar rounded-full hover:bg-cinnabar hover:text-white transition">
                  了解{role.name === '执事视界' ? '执事堂' : role.name === '掌柜视界' ? '商家通' : '小程序'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 新增：小程序滚动图片展示区（大明画卷风格） */}
        <div className="relative mt-16 pt-8 border-t-2 border-cinnabar/30">
          {/* 装饰标题 */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-rice-paper px-6 py-1 rounded-full shadow-md">
            <span className="text-cinnabar font-han-yi text-sm tracking-widest">· 邻里烟火 · 小程序动态 ·</span>
          </div>

          <div
            ref={scrollRef}
            onWheel={handleWheel}
            className="overflow-x-auto scroll-smooth pb-6 hide-scrollbar"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="flex gap-6 w-max px-4">
              {scrollImages.map((img) => (
                <motion.a
                  key={img.id}
                  href={img.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-72 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* 朱红印章水印 */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-cinnabar/80 rounded-full flex items-center justify-center text-white text-xs rotate-12 shadow-md">
                      圈
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 group-hover:text-cinnabar transition">
                      {img.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {img.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center text-xs text-cinnabar">
                      <span>📸 邻里圈</span>
                      <span className="border-b border-cinnabar/30">查看详情 →</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* 左右渐变遮罩（提示可滚动） */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-32 bg-gradient-to-r from-rice-paper to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-32 bg-gradient-to-l from-rice-paper to-transparent pointer-events-none"></div>

          {/* 滚动提示文字 */}
          <div className="text-center mt-4 text-sm text-gray-400 flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-0.5 bg-cinnabar/50"></span>
            左右滑动浏览更多社区动态
            <span className="inline-block w-4 h-0.5 bg-cinnabar/50"></span>
          </div>
        </div>
      </div>

      {/* 隐藏滚动条的样式（全局或局部） */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #C92E20;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}