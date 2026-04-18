'use client';
import { useEffect, useRef } from 'react';

export default function ChineseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      alpha: number;
    }> = [];

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      const count = Math.floor(width * height / 15000); // 自适应密度
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedY: Math.random() * 0.8 + 0.3,
          alpha: Math.random() * 0.25 + 0.05,
        });
      }
    };

    let animationId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 46, 32, ${p.alpha})`; // 朱红色
        ctx.fill();
        p.y += p.speedY;
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      initParticles();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
}