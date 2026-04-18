export interface Lantern {
  id: number;
  text: string;
  status: 'urgent' | 'pending' | 'done';
  x: number;   // 0..1 画卷相对坐标
  y: number;
}

export interface Shop {
  id: number;
  name: string;
  x: number;
  y: number;
  items: string[];
}

export const mockData = {
  lanterns: [
    { id: 1, text: '5栋302张先生：借冲击钻', status: 'urgent', x: 0.6, y: 0.3 },
    { id: 2, text: '3栋李奶奶：取快递', status: 'pending', x: 0.65, y: 0.25 },
    { id: 3, text: '8栋王姐：帮收被褥', status: 'done', x: 0.55, y: 0.35 },
  ] as Lantern[],
  shops: [
    { id: 1, name: '张记杂货', x: 0.2, y: 0.6, items: ['酱油 50积分+5元', '洗衣液 80积分+8元'] },
    { id: 2, name: '老王生鲜', x: 0.25, y: 0.58, items: ['苹果 20积分+2元', '猪肉 60积分+15元'] },
  ] as Shop[],
  goodDeeds: ['6栋小李拾金不昧', '物业小陈雨中关窗'],
  currentEvent: { name: '象棋争霸赛', sponsor: '老王生鲜' },
};