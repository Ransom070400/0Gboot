import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface ClaimModalProps {
  isOpen: boolean;
  prize: string;
  onClose: () => void;
}

export default function ClaimModal({ isOpen, prize, onClose }: ClaimModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const tweetText = `I just won a ${prize} at the 0G Labs booth! 🔥 #0GLabs #SpinToWin`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        /* Flex wrapper ensures the modal stays centered even when height changes */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            layout // Enable automatic layout transitions
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 w-full max-w-md overflow-hidden"
          >
            <div className="p-8 sm:p-12">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <motion.div layout="position">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-900 leading-tight">
                  Scan to claim your reward
                </h2>
                <p className="text-center text-gray-600 mb-8">
                  Post on X to verify your win
                </p>
              </motion.div>

              <motion.div layout className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-lg border border-purple-200">
                  <QRCodeSVG
                    value={tweetUrl}
                    size={180}
                    level="H"
                    fgColor="#0C0C14"
                    bgColor="transparent"
                  />
                </div>
              </motion.div>

              {/* Expandable Section */}
              <motion.div layout className="border-t border-gray-100 pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-between w-full text-gray-500 hover:text-purple-600 transition-colors text-sm font-medium"
                >
                  <span>{isExpanded ? "Hide Details" : "Show Prize Details"}</span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Prize:</span>
                          <span className="font-bold text-gray-900">{prize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location:</span>
                          <span className="font-medium">ETF Booth</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-gray-400 mt-2 italic">
                          *Please show the posted tweet to our booth staff to collect your physical item.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}