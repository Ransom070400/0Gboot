import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';

interface ClaimModalProps {
  isOpen: boolean;
  prize: string;
  onClose: () => void;
}

export default function ClaimModal({ isOpen, prize, onClose }: ClaimModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQRFullScreen, setIsQRFullScreen] = useState(false);
  
  const tweetText = `I just won a ${prize} at the 0G Labs booth! 🔥 #0GLabs #SpinToWin`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={onClose}
            />

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 w-full max-w-md overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <motion.div layout="position">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-900 leading-tight">
                    Scan to claim
                  </h2>
                  <p className="text-center text-gray-600 mb-8">
                    Post on X to verify your win
                  </p>
                </motion.div>

                {/* Clickable QR Code Container */}
                <motion.div 
                  layoutId="qr-container"
                  className="flex justify-center mb-8 cursor-zoom-in group relative"
                  onClick={() => setIsQRFullScreen(true)}
                >
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-lg border border-purple-200 relative">
                    <QRCodeSVG
                      value={tweetUrl}
                      size={180}
                      level="H"
                      fgColor="#0C0C14"
                      bgColor="transparent"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[2px] rounded-3xl">
                       <Maximize2 className="text-purple-600 bg-white rounded-full p-2 shadow-lg" size={40} />
                    </div>
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
                          <div className="flex justify-between text-[11px] leading-relaxed text-gray-400 mt-2 italic">
                            *Click the QR code to enlarge it for easier scanning.
                          </div>
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

      {/* Full Screen QR Overlay */}
      <AnimatePresence>
        {isQRFullScreen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsQRFullScreen(false)}
            />
            
            <motion.div
              layoutId="qr-container"
              className="relative bg-white p-8 rounded-[40px] shadow-2xl"
            >
              <button
                onClick={() => setIsQRFullScreen(false)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 font-medium"
              >
                Close <X size={24} />
              </button>
              
              <QRCodeSVG
                value={tweetUrl}
                size={Math.min(window.innerWidth - 100, 400)}
                level="H"
                fgColor="#0C0C14"
                bgColor="white"
                includeMargin={true}
              />
              <p className="text-center mt-6 text-gray-500 font-medium">
                Scanning easier now?
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}