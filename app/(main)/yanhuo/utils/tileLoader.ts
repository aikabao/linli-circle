// 简化版瓦片加载器，实际可接入 Leaflet 或自实现
export async function loadTile(
  baseUrl: string,
  zoom: number,
  x: number,
  y: number
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `${baseUrl}/${zoom}/${x}/${y}.png`;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

// 占位函数
export function getTileUrls(viewportX: number, viewportY: number, zoom: number): string[] {
  // 简单返回空数组，实际需根据视口计算瓦片坐标
  return [];
}