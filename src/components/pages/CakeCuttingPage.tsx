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

      // Go to final page after animation
      setTimeout(onNext, 2000);
    }, 1500);
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

        {/* Cake container */}
        <motion.div
          className="relative mb-10 cursor-pointer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          onClick={!isCutting ? handleCutCake : undefined}
          whileHover={!isCutting ? { scale: 1.05 } : {}}
        >
          {/* The cake */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!isCut ? (
                <motion.div
                  key="full-cake"
                  className="text-[120px] md:text-[180px]"
                  animate={isCutting ? {
                    rotate: [0, -5, 5, 0],
                    scale: [1, 0.95, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
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
                  className="text-[120px] md:text-[180px]"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  🍰
                </motion.div>
              )}
            </AnimatePresence>

            {/* Knife animation */}
            {isCutting && !isCut && (
              <motion.div
                className="absolute top-0 left-1/2 text-6xl md:text-8xl"
                initial={{ y: -100, x: '-50%', rotate: -45 }}
                animate={{ 
                  y: [null, 50, 50],
                  rotate: [-45, 0, 0]
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                🔪
              </motion.div>
            )}
          </div>
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
              Cut the Cake 🍰
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

        {isCut && (
          <motion.p
            className="font-body text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enjoy your slice! 😋
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default CakeCuttingPage;
