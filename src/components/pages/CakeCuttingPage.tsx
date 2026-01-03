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
      setTimeout(onNext, 2500);
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

        {/* Cake and Girl Scene */}
        <motion.div
          className="relative mb-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        >
          <div className="relative flex items-end justify-center gap-2">
            {/* Girl Character */}
            <motion.div
              className="relative z-10"
              animate={isCutting && !isCut ? {
                rotate: [0, -5, 5, -5, 0],
              } : {}}
              transition={{ duration: 0.5, repeat: isCutting && !isCut ? 3 : 0 }}
            >
              {/* Girl body */}
              <div className="text-[80px] md:text-[120px]">👧</div>
              
              {/* Girl's arm holding knife - animated */}
              {isCutting && !isCut && (
                <motion.div
                  className="absolute -right-8 md:-right-12 top-1/3 origin-left"
                  initial={{ rotate: -30 }}
                  animate={{ 
                    rotate: [-30, 20, -30, 20, -30],
                    y: [0, 20, 0, 20, 0]
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <span className="text-4xl md:text-6xl">🔪</span>
                </motion.div>
              )}
            </motion.div>

            {/* The Cake */}
            <AnimatePresence mode="wait">
              {!isCut ? (
                <motion.div
                  key="full-cake"
                  className="text-[100px] md:text-[150px] cursor-pointer"
                  animate={isCutting ? {
                    scale: [1, 0.95, 1, 0.95, 1],
                    rotate: [0, 2, -2, 2, 0]
                  } : {}}
                  transition={{ duration: 1.5 }}
                  exit={{ 
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                  onClick={!isCutting ? handleCutCake : undefined}
                  whileHover={!isCutting ? { scale: 1.05 } : {}}
                >
                  🎂
                  {/* Cutting effect lines */}
                  {isCutting && !isCut && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0, 1, 0] }}
                      transition={{ duration: 0.3, repeat: 5 }}
                    >
                      <span className="text-4xl">✨</span>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="cake-slice"
                  className="flex gap-4 items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <motion.span
                    className="text-[80px] md:text-[120px]"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    🍰
                  </motion.span>
                  <motion.span
                    className="text-[80px] md:text-[120px]"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    🍰
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Table/Platform */}
          <motion.div
            className="w-64 md:w-96 h-4 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 rounded-full mt-2 shadow-lg"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
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

        {isCutting && !isCut && (
          <motion.p
            className="font-body text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✨ Cutting... ✨
          </motion.p>
        )}

        {isCut && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-body text-xl text-muted-foreground">
              Enjoy your slice! 😋🎉
            </p>
            <motion.div
              className="mt-2 text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💖
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CakeCuttingPage;
