import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WinModalProps {
  isOpen: boolean;
  prize: string;
  onClaim: () => void;
}

export default function WinModal({ isOpen, prize, onClaim }: WinModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%',
                    backgroundColor: ['#6A00FF', '#B57AFF', '#FFD700', '#FF69B4'][
                      Math.floor(Math.random() * 4)
                    ],
                  }}
                  animate={{
                    y: ['0vh', '110vh'],
                    x: [0, (Math.random() - 0.5) * 200],
                    rotate: [0, Math.random() * 360],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    ease: 'easeIn',
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-purple-100">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10, stiffness: 200 }}
                className="text-7xl text-center mb-6"
              >
                🎉
              </motion.div>

              <h2 className="text-4xl font-bold text-center mb-3 text-gray-900">
                Congratulations!
              </h2>

              <p className="text-xl text-center text-gray-600 mb-8">
                You won a <span className="font-bold text-purple-600">{prize}</span>
              </p>

              <motion.button
                onClick={onClaim}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Claim Reward
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
