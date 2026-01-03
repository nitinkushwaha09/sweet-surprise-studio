import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import Sparkles from '@/components/Sparkles';

const FinalMessagePage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showHearts, setShowHearts] = useState(false);

  const message = `Dear Madam Jii ❤️

I just want you to know how much you mean to me. I know I'm not always the best at putting my feelings into words, but that doesn't change how real they are. This is my way of telling you that you matter to me more than I can explain, and I'm really grateful to have you in my life.

And on your special day, I wish you the happiest birthday 🥹🫶🏻`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowHearts(true), 500);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen gradient-dream flex flex-col items-center justify-center relative overflow-hidden px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {showHearts && <FloatingHearts />}
      <Sparkles count={35} />

      {/* Glowing background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lavender/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <span className="text-7xl md:text-9xl animate-pulse-glow inline-block">💖</span>
        </motion.div>

        <motion.div
          className="bg-card/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-float border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="font-display text-xl md:text-3xl text-foreground whitespace-pre-line leading-relaxed">
            {displayedText}
            <motion.span
              className="inline-block ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {showHearts && (
          <motion.div
            className="mt-10 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {['💕', '🎂', '🎉', '✨', '🎁', '💝'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-4xl"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        )}

        {showHearts && (
          <motion.p
            className="mt-8 font-body text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Made with 💖 just for you
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default FinalMessagePage;
