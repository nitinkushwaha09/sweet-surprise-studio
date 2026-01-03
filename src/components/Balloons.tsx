import { motion } from 'framer-motion';

interface BalloonProps {
  count?: number;
  animate?: boolean;
}

const balloonColors = [
  'text-primary',
  'text-rose',
  'text-lavender',
  'text-accent',
  'text-peach',
];

const Balloons = ({ count = 15, animate = false }: BalloonProps) => {
  const balloons = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 30 + 40,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 4,
    color: balloonColors[i % balloonColors.length],
    sway: Math.random() * 40 - 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className={`absolute ${balloon.color}`}
          style={{
            left: `${balloon.x}%`,
            bottom: animate ? '-100px' : `${Math.random() * 60 + 20}%`,
            fontSize: `${balloon.size}px`,
          }}
          initial={animate ? { y: 0, opacity: 0 } : { opacity: 0.7 }}
          animate={
            animate
              ? {
                  y: [0, -window.innerHeight - 200],
                  x: [0, balloon.sway, -balloon.sway, 0],
                  opacity: [0, 1, 1, 0],
                }
              : {
                  y: [0, -15, 0],
                  x: [0, balloon.sway / 3, 0],
                  opacity: 0.7,
                }
          }
          transition={
            animate
              ? {
                  duration: balloon.duration,
                  delay: balloon.delay,
                  ease: "easeOut",
                }
              : {
                  duration: 4,
                  delay: balloon.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          🎈
        </motion.div>
      ))}
    </div>
  );
};

export default Balloons;
