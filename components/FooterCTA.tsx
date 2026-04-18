export default function FooterCTA() {
  return (
    <footer className="relative bg-deep-red bg-gold-cloud bg-repeat py-32 text-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        <div className="vertical-text text-6xl text-rice-paper font-hanYi mx-auto">远亲不如近邻 · 何不就此入圈</div>
        <div className="flex justify-center gap-12 mt-16">
          <button className="group relative w-48 h-48 rounded-full border-4 border-amber-400 bg-deep-red shadow-2xl hover:scale-105 transition">
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-amber-400">预约演示</span>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition" />
          </button>
          <button className="group relative w-48 h-48 rounded-full border-4 border-amber-400 bg-deep-red shadow-2xl hover:scale-105 transition">
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-amber-400">扫码体验</span>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition" />
          </button>
        </div>
        <div className="mt-20 text-rice-paper text-sm opacity-70 flex justify-center gap-8">
          <span>上海方格智联信息科技有限公司</span>
          <span>沪ICP备XXXXXX号</span>
          <span>隐私协议</span>
        </div>
      </div>
    </footer>
  );
}