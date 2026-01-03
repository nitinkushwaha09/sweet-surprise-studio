import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/FloatingHearts';
import Sparkles from '@/components/Sparkles';

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage = ({ onNext }: WelcomePageProps) => {
  return (
    <motion.div
      className="min-h-screen gradient-romantic flex flex-col items-center justify-center relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingHearts />
      <Sparkles count={25} />
      
      {/* Glowing orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lavender/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <span className="text-7xl md:text-9xl">💖</span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          It's your special day
        </motion.h1>

        <motion.p
          className="font-display text-3xl md:text-5xl text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          yeyeye 💖🎉
        </motion.p>

        <motion.div
          className="flex gap-3 justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {['✨', '🎂', '🎁', '🎊', '💕'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl md:text-3xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Button
            variant="romantic"
            size="xl"
            onClick={onNext}
            className="animate-bounce-soft"
          >
            Continue 💕
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
