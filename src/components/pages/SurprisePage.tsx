import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Sparkles from '@/components/Sparkles';

interface SurprisePageProps {
  onYes: () => void;
}

const funnyMessages = [
  "Nope! Try again 😜",
  "You can't escape! 🏃‍♀️",
  "Come on, click Yes! 💕",
  "I won't let you! 🙈",
  "Please? 🥺",
  "One more try! 😊",
];

const SurprisePage = ({ onYes }: SurprisePageProps) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoClick = () => {
    const newClicks = noClicks + 1;
    setNoClicks(newClicks);
    
    // Show funny message
    setCurrentMessage(funnyMessages[newClicks % funnyMessages.length]);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);

    // Move the button to a random position
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxX = containerRect.width - 150;
      const maxY = containerRect.height - 60;
      
      setNoPosition({
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY - maxY / 2,
      });
    }
  };

  const handleNoHover = () => {
    if (containerRef.current && noClicks > 2) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxX = containerRect.width - 150;
      const maxY = containerRect.height - 60;
      
      setNoPosition({
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY - maxY / 2,
      });
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen gradient-dream flex flex-col items-center justify-center relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Sparkles count={20} />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce-soft">🎀</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-bounce-soft" style={{ animationDelay: '0.5s' }}>💝</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-bounce-soft" style={{ animationDelay: '1s' }}>🌸</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-bounce-soft" style={{ animationDelay: '1.5s' }}>💐</div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <span className="text-6xl md:text-8xl">🥰</span>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-5xl text-foreground mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Do you want to see what I made for you?
        </motion.h2>

        {/* Funny message popup */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-glow border border-primary/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showMessage ? 1 : 0, 
            scale: showMessage ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-body font-semibold text-primary text-lg">{currentMessage}</p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            variant="romantic"
            size="xl"
            onClick={onYes}
            className="min-w-[140px]"
          >
            Yes ❤️
          </Button>

          <motion.div
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              variant="playful"
              size="xl"
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              className="min-w-[140px]"
            >
              No 🙈
            </Button>
          </motion.div>
        </motion.div>

        {noClicks > 3 && (
          <motion.p
            className="mt-8 text-muted-foreground font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Just click Yes already! 😄
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default SurprisePage;
