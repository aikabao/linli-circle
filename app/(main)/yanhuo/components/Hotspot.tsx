'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface HotspotProps {
  type: 'lantern' | 'shop' | 'notice';
  data: any;
  onClose: () => void;
}

export default function Hotspot({ type, data, onClose }: HotspotProps) {
  const getContent = () => {
    if (type === 'lantern') {
      return (
        <div>
          <h3 className="font-bold text-cinnabar">邻里求助</h3>
          <p className="text-sm mt-2">{data.text}</p>
          <button className="mt-3 w-full bg-cinnabar text-white py-1 rounded text-sm">接单相助</button>
        </div>
      );
    }
    if (type === 'shop') {
      return (
        <div>
          <h3 className="font-bold text-cinnabar">{data.name}</h3>
          <ul className="text-sm mt-2 list-disc pl-4">
            {data.items.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <button className="mt-3 w-full bg-amber-700 text-white py-1 rounded text-sm">进店逛逛</button>
        </div>
      );
    }
    return <div>未知热点</div>;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-72 bg-white rounded-xl shadow-2xl p-4 border border-cinnabar"
      >
        {getContent()}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
      </motion.div>
    </AnimatePresence>
  );
}