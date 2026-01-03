import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomePage from '@/components/pages/WelcomePage';
import SurprisePage from '@/components/pages/SurprisePage';
import CelebrationPage from '@/components/pages/CelebrationPage';
import CakeCuttingPage from '@/components/pages/CakeCuttingPage';
import FinalMessagePage from '@/components/pages/FinalMessagePage';

type Page = 'welcome' | 'surprise' | 'celebration' | 'cake' | 'final';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {currentPage === 'welcome' && (
            <WelcomePage onNext={() => setCurrentPage('surprise')} />
          )}
          {currentPage === 'surprise' && (
            <SurprisePage onYes={() => setCurrentPage('celebration')} />
          )}
          {currentPage === 'celebration' && (
            <CelebrationPage onNext={() => setCurrentPage('cake')} />
          )}
          {currentPage === 'cake' && (
            <CakeCuttingPage onNext={() => setCurrentPage('final')} />
          )}
          {currentPage === 'final' && (
            <FinalMessagePage />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
