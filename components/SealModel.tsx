'use client';

export default function SealModel() {
  return (
    <div className="flex flex-col items-center group">
      {/* CSS 玉玺 */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 cursor-pointer transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
        <div className="absolute inset-0 animate-spin-slow group-hover:animate-none">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 rounded-lg shadow-2xl">
            <div className="absolute inset-1 border border-amber-400/30 rounded-md"></div>
            <div className="absolute inset-2 border border-amber-400/20 rounded-sm"></div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-amber-600 rounded-t-md"></div>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-amber-500 rounded-t-sm"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-amber-900 font-bold text-sm md:text-base writing-mode-vertical-rl tracking-wider opacity-80 group-hover:opacity-100">
            邻里圈
          </span>
        </div>
        <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <span className="mt-4 text-rice-paper text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        滑动开启画卷
      </span>
    </div>
  );
}