'use client';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

interface Activity {
  id: string;
  type: 'help' | 'good' | 'competition' | 'fortune';
  content: string;
  tag: string;
}

export default function ActivityWall() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch('/api/wall')
      .then(res => res.json())
      .then(setActivities)
      .catch(() => setActivities([
        { id: '1', type: 'help', content: '张阿姨需要帮忙搬大米（5楼），已有人接单。', tag: '互助' },
        { id: '2', type: 'good', content: '6栋小李捡到钥匙一串，放门卫处。', tag: '好人好事' },
        { id: '3', type: 'competition', content: '迎新春棋牌赛火热报名中，赞助商家：老王生鲜。', tag: '赛事' },
        { id: '4', type: 'fortune', content: '今日运势 · 上上签 · 宜出行会友。', tag: '签文' },
      ]));
  }, []);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-rice-paper relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-hanYi text-center text-cinnabar mb-4">里坊烟火 · 动态消息墙</h2>
        <p className="text-center text-gray-600 mb-12">邻里真实互助，共建温情社区</p>
        <Masonry breakpointCols={breakpointColumns} className="flex -ml-6" columnClassName="pl-6">
          {activities.map(act => (
            <div key={act.id} className="bg-white rounded-lg shadow-md p-5 mb-6 border-l-4 border-cinnabar transition hover:shadow-lg">
              <div className="flex justify-between items-start">
                <span className="text-sm text-cinnabar font-bold">{act.tag}</span>
                {act.type === 'help' && <span className="text-xs bg-amber-100 px-2 py-1 rounded-full">已结缘</span>}
              </div>
              <p className="mt-2 text-gray-800">{act.content}</p>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}