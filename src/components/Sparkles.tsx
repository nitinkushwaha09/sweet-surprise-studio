import { motion } from 'framer-motion';

interface SparkleProps {
  count?: number;
}

const Sparkles = ({ count = 30 }: SparkleProps) => {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 1.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-gold"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            fontSize: `${sparkle.size}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default Sparkles;
