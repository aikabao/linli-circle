'use client';
import { useState, useRef } from 'react';

export default function BgMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/guzheng.mp3'); // 请将古琴音乐文件放在 public/music/ 下
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('音频自动播放被阻止，需要用户交互'));
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-amber-800/70 backdrop-blur text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
      title={playing ? '静音' : '奏古琴'}
    >
      🎵
    </button>
  );
}