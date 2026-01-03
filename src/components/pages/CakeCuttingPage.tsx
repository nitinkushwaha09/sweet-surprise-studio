import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Sparkles from '@/components/Sparkles';
import confetti from 'canvas-confetti';

interface CakeCuttingPageProps {
  onNext: () => void;
}

const CakeCuttingPage = ({ onNext }: CakeCuttingPageProps) => {
  const [isCutting, setIsCutting] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleCutCake = () => {
    setIsCutting(true);

    // Cutting animation sequence
    setTimeout(() => {
      setIsCut(true);
      
      // Celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#dda0dd']
      });

      // Show next button after animation
      setTimeout(() => setShowNextButton(true), 1500);
    }, 2000);
  };

  return (
    <motion.div
      className="min-h-screen gradient-romantic flex flex-col items-center justify-center relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Sparkles count={25} />

      <div className="relative z-10 text-center">
        <motion.h2
          className="font-display text-3xl md:text-5xl text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isCut ? "Yummy! 🍰" : "Time to cut the cake! 🎂"}
        </motion.h2>

        {/* Cake and girl container */}
        <motion.div
          className="relative mb-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        >
          {/* The cake and girl scene */}
          <div className="relative flex items-end justify-center gap-4">
            {/* Girl character */}
            <motion.div
              className="text-7xl md:text-9xl"
              animate={isCutting && !isCut ? {
                rotate: [0, -10, 10, -10, 0],
                x: [0, 20, 20, 20, 0]
              } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              👩
            </motion.div>

            {/* The cake */}
            <AnimatePresence mode="wait">
              {!isCut ? (
                <motion.div
                  key="full-cake"
                  className="text-[100px] md:text-[150px]"
                  animate={isCutting ? {
                    rotate: [0, -3, 3, 0],
                    scale: [1, 0.98, 1]
                  } : {}}
                  transition={{ duration: 0.5, repeat: isCutting ? 3 : 0 }}
                  exit={{ 
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  🎂
                </motion.div>
              ) : (
                <motion.div
                  key="cake-slice"
                  className="text-[100px] md:text-[150px]"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  🍰
                </motion.div>
              )}
            </AnimatePresence>

            {/* Knife animation - girl holding knife */}
            {isCutting && !isCut && (
              <motion.div
                className="absolute top-1/4 left-1/2 text-5xl md:text-7xl z-10"
                initial={{ y: -50, rotate: -60, opacity: 0 }}
                animate={{ 
                  y: [null, 30, 60, 60],
                  rotate: [-60, -30, 0, 0],
                  opacity: [0, 1, 1, 1]
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                🔪
              </motion.div>
            )}
          </div>

          {/* Sparkle effect during cutting */}
          {isCutting && !isCut && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: 4 }}
            >
              <span className="text-4xl">✨</span>
            </motion.div>
          )}
        </motion.div>

        {!isCutting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              variant="romantic"
              size="xl"
              onClick={handleCutCake}
            >
              Let's cut the cake madam ji 🍰
            </Button>
            <motion.p
              className="mt-4 text-muted-foreground font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              (or click on the cake!)
            </motion.p>
          </motion.div>
        )}

        {isCut && !showNextButton && (
          <motion.p
            className="font-body text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enjoy your slice! 😋
          </motion.p>
        )}

        {showNextButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="romantic"
              size="xl"
              onClick={onNext}
              className="animate-pulse-glow"
            >
              Well, I've a message for you madam jii 💌
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CakeCuttingPage;
