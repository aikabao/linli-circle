import { NextResponse } from 'next/server';

export async function GET() {
  // 实际应查询数据库
  const stats = {
    communities: 1280,
    totalDiscount: 35600,
    helpRate: 98.6,
  };
  return NextResponse.json(stats);
}