import { useEffect, useRef } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

const FloatingHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const hearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 20 + 15,
    delay: Math.random() * 8,
    duration: Math.random() * 4 + 6,
  }));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-pulse-glow"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animation: `float-up ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
