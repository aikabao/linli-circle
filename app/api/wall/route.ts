import { NextResponse } from 'next/server';

export async function GET() {
  const activities = [
    { id: '1', type: 'help', content: '张阿姨需要帮忙搬大米（5楼），已有人接单。', tag: '互助' },
    { id: '2', type: 'good', content: '6栋小李捡到钥匙一串，放门卫处。', tag: '好人好事' },
    { id: '3', type: 'competition', content: '迎新春棋牌赛火热报名中，赞助商家：老王生鲜。', tag: '赛事' },
    { id: '4', type: 'fortune', content: '今日运势 · 上上签 · 宜出行会友。', tag: '签文' },
  ];
  return NextResponse.json(activities);
}