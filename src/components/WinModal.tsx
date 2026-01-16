import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';

interface WinModalProps {
  isOpen: boolean;
  prize: string;
  onClaim: () => void;
}

export default function WinModal({ isOpen, prize, onClaim }: WinModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setIsExpanded(false); // Reset expansion when modal closes
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        /* The Wrapper: fixed, flex, and centered */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Simple Confetti Implementation */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-sm"
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
                    rotate: [0, Math.random() * 720],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                />
              ))}
            </div>
          )}

          {/* Modal Container */}
          <motion.div
            layout // Magic for smooth expansion
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl border border-purple-100 w-full max-w-md overflow-hidden z-[60]"
          >
            <motion.div layout="position" className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6"
              >
                <Trophy className="text-yellow-600" size={40} />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-900 leading-tight">
                Congratulations!
              </h2>

              <p className="text-lg sm:text-xl text-center text-gray-600 mb-8">
                You won a <span className="font-bold text-purple-600 underline decoration-purple-200 underline-offset-4">{prize}</span>
              </p>
            </motion.div>

            {/* Main Action */}
            <motion.button
              layout="position"
              onClick={onClaim}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-200 transition-all mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Claim Reward
            </motion.button>

            {/* Expandable Prize Info */}
            <motion.div layout className="pt-2 border-t border-gray-50">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-center space-x-2 w-full text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium py-2"
              >
                <span>{isExpanded ? "Hide Prize Info" : "View Prize Info"}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-purple-50/50 rounded-2xl p-4 mt-2 space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Inventory ID:</span>
                        <span className="font-mono font-medium">#0G-{Math.floor(Math.random() * 1000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Validity:</span>
                        <span className="font-medium text-green-600">Available Now</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                        To claim, please proceed to the next step. You will need to verify your win on X (Twitter).
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}