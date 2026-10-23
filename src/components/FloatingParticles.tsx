import React, { useMemo } from 'react';

export const FloatingParticles: React.FC<{ count?: number; className?: string }> = ({
  count = 24,
  className = '',
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 100) / count + (Math.sin(i) * 5)}%`,
      top: `${(Math.cos(i) * 45 + 50)}%`,
      size: Math.max(1.5, (i % 3) * 1.2 + 1),
      duration: 10 + (i % 8) * 2,
      delay: -(i * 1.3),
      opacity: 0.15 + (i % 4) * 0.1,
      color: i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#E5484D' : '#D6AD60',
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
