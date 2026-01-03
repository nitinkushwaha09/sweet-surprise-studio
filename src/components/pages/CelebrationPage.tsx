import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Balloons from '@/components/Balloons';
import confetti from 'canvas-confetti';

interface CelebrationPageProps {
  onNext: () => void;
}

const CelebrationPage = ({ onNext }: CelebrationPageProps) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [balloonsFlying, setBalloonsFlying] = useState(false);
  const [darkened, setDarkened] = useState(false);
  const [showFlyButton, setShowFlyButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleBlowCandles = () => {
    // Start music
    if (audioRef.current) {
      audioRef.current.play().catch(console.log);
    }

    // Darken screen briefly
    setDarkened(true);
    setTimeout(() => setDarkened(false), 1500);

    // Blow candles animation
    setCandlesBlown(true);

    // Show fly balloons button after candles are blown
    setTimeout(() => setShowFlyButton(true), 1000);
  };

  const handleFlyBalloons = () => {
    // Trigger balloons flying up
    setBalloonsFlying(true);

    // Trigger confetti celebration
    const duration = 4 * 1000;
    const end = Date.now() + duration;
    const colors = ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#ffc0cb', '#dda0dd'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Go to next page after celebration
    setTimeout(onNext, 4000);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      className="min-h-screen gradient-sunset flex flex-col items-center justify-center relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Birthday music */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />

      {/* Mute button */}
      <motion.button
        className="absolute top-4 right-4 z-50 bg-card/80 backdrop-blur-sm p-3 rounded-full shadow-soft"
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? '🔇' : '🔊'}
      </motion.button>

      {/* Darkening overlay */}
      <AnimatePresence>
        {darkened && (
          <motion.div
            className="absolute inset-0 bg-foreground/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Balloons */}
      <Balloons count={20} animate={balloonsFlying} />

      {/* Static floating balloons before blown */}
      {!balloonsFlying && <Balloons count={10} animate={false} />}

      <div className="relative z-10 text-center">
        <motion.h2
          className="font-display text-3xl md:text-5xl text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {candlesBlown ? "🎉 Happy Birthday! 🎉" : "Make a wish... ✨"}
        </motion.h2>

        {/* Birthday cake with candles */}
        <motion.div
          className="relative mb-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        >
          <div className="text-8xl md:text-[120px] relative">
            🎂
            {/* Animated candle flames */}
            {!candlesBlown && (
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                <span className="text-3xl animate-candle-flicker">🕯️</span>
                <span className="text-3xl animate-candle-flicker" style={{ animationDelay: '0.1s' }}>🕯️</span>
                <span className="text-3xl animate-candle-flicker" style={{ animationDelay: '0.2s' }}>🕯️</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Blow candles button */}
        {!candlesBlown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              variant="romantic"
              size="xl"
              onClick={handleBlowCandles}
              className="animate-pulse-glow"
            >
              Blow the candles 🎂
            </Button>
          </motion.div>
        )}

        {/* Fly Balloons button - appears after candles are blown */}
        {showFlyButton && !balloonsFlying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              variant="romantic"
              size="xl"
              onClick={handleFlyBalloons}
              className="animate-bounce-soft"
            >
              Fly Balloons 🎈✨
            </Button>
          </motion.div>
        )}

        {candlesBlown && !showFlyButton && (
          <motion.p
            className="font-body text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✨ Your wish will come true ✨
          </motion.p>
        )}

        {balloonsFlying && (
          <motion.p
            className="font-body text-xl text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✨ Celebrating you! ✨
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default CelebrationPage;
