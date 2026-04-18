'use client';

interface EagleEyeProps {
  viewportX: number;      // 0..1
  canvasWidth: number;
  onJump: (x: number) => void;
}

export default function EagleEye({ viewportX, canvasWidth, onJump }: EagleEyeProps) {
  // 假设视口宽度固定为 1200px（设计稿）
  const viewportWidth = 1200;
  const visibleRatio = viewportWidth / canvasWidth;
  const thumbPosition = viewportX * (1 - visibleRatio);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const newViewportX = Math.min(1 - visibleRatio, Math.max(0, clickX));
    onJump(newViewportX);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-32 h-20 bg-black/60 rounded-lg border border-amber-400 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full h-full bg-gray-800">
        <div
          className="absolute h-full bg-amber-500/30 border border-white"
          style={{ left: `${thumbPosition * 100}%`, width: `${visibleRatio * 100}%` }}
        />
      </div>
    </div>
  );
}