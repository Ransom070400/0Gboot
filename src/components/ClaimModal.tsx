import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';

interface ClaimModalProps {
  isOpen: boolean;
  prize: string;
  onClose: () => void;
}

// All 100 tweet templates - ${prize} will be replaced with actual prize
const TWEET_TEMPLATES = [
  "Just hit the jackpot! Scored a ${prize} at the 0G Labs booth. Let's go! 🔥 #0GLabs #SpinToWin #0GFEST",
  "Lady Luck is on my side today. Walked away with a ${prize}! 🎡 #0GLabs #SpinToWin #0GFEST",
  "Huge win at #0GFEST! Just bagged a ${prize} from the 0G Labs wheel. 🚀 #0GLabs #SpinToWin",
  "My lucky day! Check out this ${prize} I just won. Thanks @0GLabs! 💎 #0GLabs #SpinToWin #0GFEST",
  "Spin. Win. Repeat. Just got a ${prize}! 🎡✨ #0GLabs #SpinToWin #0GFEST",
  "The wheel didn't let me down! Walking away with a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Feeling like a winner at the 0G Labs booth with my new ${prize}! 🏆 #0GLabs #SpinToWin #0GFEST",
  "BOOM! That's a ${prize} in the bag. 0G Labs is bringing the heat. #0GLabs #SpinToWin #0GFEST",
  "Not a bad day when you win a ${prize} just for spinning a wheel! 🎡💥 #0GLabs #SpinToWin #0GFEST",
  "Winning looks good on me. Thanks for the ${prize}, 0G Labs! #0GLabs #SpinToWin #0GFEST",
  "Stopped by the 0G Labs booth and it paid off! ${prize} secured. 🔒 #0GLabs #SpinToWin #0GFEST",
  "I came, I saw, I spun, I won a ${prize}. 🎯 #0GLabs #SpinToWin #0GFEST",
  "Instant win! Grabbed a ${prize} at the 0G Labs setup. #0GLabs #SpinToWin #0GFEST",
  "The vibe is high and the prizes are real! Just got a ${prize}. 🎡🔥 #0GLabs #SpinToWin #0GFEST",
  "Addicted to winning. Just snagged a ${prize} at #0GFEST! #0GLabs #SpinToWin",
  "If you aren't spinning at the 0G Labs booth, you're missing out on this ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Winner winner! ${prize} for the win at the 0G Labs booth. 🍗🎡 #0GLabs #SpinToWin #0GFEST",
  "That feeling when the wheel lands on ${prize}... pure hype! #0GLabs #SpinToWin #0GFEST",
  "Just a casual ${prize} win at #0GFEST. No big deal (okay, it's a big deal)! #0GLabs #SpinToWin",
  "0G Labs is the place to be. I'm leaving with a ${prize}! 🏃‍♂️💨 #0GLabs #SpinToWin #0GFEST",
  "Secured the ${prize}! 🎡 #0GLabs #SpinToWin #0GFEST",
  "Look what I just won: ${prize}! #0GLabs #SpinToWin #0GFEST",
  "0G Labs wheel = ${prize}. Simple math. 📈 #0GLabs #SpinToWin #0GFEST",
  "Spun and won a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Winning a ${prize} at #0GFEST! #0GLabs #SpinToWin",
  "Got lucky! ${prize} from 0G Labs. #0GLabs #SpinToWin #0GFEST",
  "New ${prize} unlocked at 0G Labs! 🔓 #0GLabs #SpinToWin #0GFEST",
  "Spin result: ${prize}! 🎡✨ #0GLabs #SpinToWin #0GFEST",
  "I'm a winner! ${prize} secured at #0GFEST. #0GLabs #SpinToWin",
  "Don't mind me, just winning a ${prize} over here. #0GLabs #SpinToWin #0GFEST",
  "Wheel of fortune gave me a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Easy win: ${prize} at the 0G Labs booth! #0GLabs #SpinToWin #0GFEST",
  "Catch me at 0G Labs winning this ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Score! A ${prize} from the spin-to-win. #0GLabs #SpinToWin #0GFEST",
  "It happened! ${prize} is mine. #0GLabs #SpinToWin #0GFEST",
  "Having a blast at #0GFEST and just won a ${prize} at 0G Labs! #0GLabs #SpinToWin",
  "Best booth at #0GFEST? Definitely 0G Labs. Got a ${prize}! #0GLabs #SpinToWin",
  "Make sure to visit 0G Labs. I just walked away with a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "The community energy at #0GFEST is unmatched. Especially with this ${prize}! #0GLabs #SpinToWin",
  "0G Labs is showing out! Won a ${prize} at their booth. #0GLabs #SpinToWin #0GFEST",
  "If you're at #0GFEST, go spin the wheel for a ${prize}! #0GLabs #SpinToWin",
  "Shoutout to @0GLabs for the ${prize}! Love the setup here. #0GLabs #SpinToWin #0GFEST",
  "Found the gold at the end of the rainbow: a ${prize} at 0G Labs! 🌈 #0GLabs #SpinToWin #0GFEST",
  "Who else is winning today? Just got my ${prize} at 0G Labs. #0GLabs #SpinToWin #0GFEST",
  "Joining the winner's circle with a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "0G Labs giving away the goods! Snagged a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Every spin is a win. Check out my ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Event highlights: Winning a ${prize} at 0G Labs! #0GLabs #SpinToWin #0GFEST",
  "The #0GFEST vibes are immaculate. Especially with my new ${prize}. #0GLabs #SpinToWin",
  "Come for the tech, stay for the ${prize}. Thanks 0G Labs! #0GLabs #SpinToWin #0GFEST",
  "My spinning finger finally paid off. Got a ${prize}! ☝️ #0GLabs #SpinToWin #0GFEST",
  "Is it skill or luck? Either way, I have a ${prize}. 😎 #0GLabs #SpinToWin #0GFEST",
  "Tell my mom I made it—I won a ${prize} at 0G Labs. #0GLabs #SpinToWin #0GFEST",
  "I think the wheel likes me. Just won a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "0% effort, 100% win. Scored a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "My prize cabinet is growing. Added a ${prize} today! #0GLabs #SpinToWin #0GFEST",
  "Just here for the tech... and the ${prize}. 😉 #0GLabs #SpinToWin #0GFEST",
  "They said \"Spin to Win,\" so I did exactly that. ${prize}! #0GLabs #SpinToWin #0GFEST",
  "I'm officially a pro spinner. Won a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Manifested this ${prize} at the 0G Labs booth. 🧘‍♂️ #0GLabs #SpinToWin #0GFEST",
  "Look at this beauty! A ${prize} from 0G Labs. #0GLabs #SpinToWin #0GFEST",
  "Spinning my way through #0GFEST. Result? A ${prize}! #0GLabs #SpinToWin",
  "Can't believe I actually won the ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Winning is easy at 0G Labs. Try for a ${prize} yourself! #0GLabs #SpinToWin #0GFEST",
  "Today's haul: One ${prize} from @0GLabs. #0GLabs #SpinToWin #0GFEST",
  "Proof that dreams come true: I won a ${prize}. 🎡😂 #0GLabs #SpinToWin #0GFEST",
  "0G Labs knows how to treat their visitors. ${prize} secured! #0GLabs #SpinToWin #0GFEST",
  "Adding some swag to my day with a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Who knew spinning a wheel could be so rewarding? ${prize}! #0GLabs #SpinToWin #0GFEST",
  "I came for the 0G Labs tech, I left with a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Winner alert! 🚨 Just grabbed a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "High stakes, high rewards. Won a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Feeling lucky at #0GFEST? Head to 0G Labs for a ${prize}. #0GLabs #SpinToWin",
  "The wheel has spoken: ${prize} for me! 🎡🗣️ #0GLabs #SpinToWin #0GFEST",
  "Just a quick spin and now I have a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Leveling up at #0GFEST with this ${prize}. #0GLabs #SpinToWin",
  "0G Labs delivering the goods today! ${prize} won. #0GLabs #SpinToWin #0GFEST",
  "My #0GFEST experience just got 10x better with this ${prize}. #0GLabs #SpinToWin",
  "Caught the winning bug at 0G Labs. ${prize} in hand! #0GLabs #SpinToWin #0GFEST",
  "Don't leave #0GFEST without trying for a ${prize} at 0G Labs. #0GLabs #SpinToWin",
  "Simple, fun, and I won a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "0G Labs booth is a vibe. Plus, I won a ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Big thanks to the team for the ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Look what I just picked up! A ${prize}. #0GLabs #SpinToWin #0GFEST",
  "The 0G Labs wheel is hot today! ${prize} secured. #0GLabs #SpinToWin #0GFEST",
  "Spinning my way into the weekend with a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Can't stop winning! Another ${prize} for the collection. #0GLabs #SpinToWin #0GFEST",
  "0G Labs + #0GFEST = My new ${prize}! #0GLabs #SpinToWin",
  "Victory spin! Landed on the ${prize}. #0GLabs #SpinToWin #0GFEST",
  "If you like winning, go to the 0G Labs booth. ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Flexing my new ${prize} from 0G Labs. #0GLabs #SpinToWin #0GFEST",
  "Just won a ${prize}. The 0G Labs booth is 10/10. #0GLabs #SpinToWin #0GFEST",
  "Winning feels good, but winning a ${prize} feels better! #0GLabs #SpinToWin #0GFEST",
  "New gear alert! Just got a ${prize} from 0G Labs. #0GLabs #SpinToWin #0GFEST",
  "Put a spin on your day at 0G Labs and win a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "Luck was on my side at #0GFEST. ${prize} won! #0GLabs #SpinToWin",
  "Checked out 0G Labs and all I got was this awesome ${prize}! #0GLabs #SpinToWin #0GFEST",
  "Success! The wheel gave me a ${prize}. #0GLabs #SpinToWin #0GFEST",
  "0G Labs is giving away ${prize}! Go get yours. #0GLabs #SpinToWin #0GFEST",
  "Ending the day strong with a ${prize} from 0G Labs. #0GLabs #SpinToWin #0GFEST",
];

export default function ClaimModal({ isOpen, prize, onClose }: ClaimModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQRFullScreen, setIsQRFullScreen] = useState(false);

  // Randomly select a tweet template and replace ${prize} placeholder
  const { tweetText, tweetUrl } = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * TWEET_TEMPLATES.length);
    const template = TWEET_TEMPLATES[randomIndex];
    const text = template.replace(/\$\{prize\}/g, prize);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    
    return { tweetText: text, tweetUrl: url };
  }, [prize, isOpen]); // Regenerate when prize changes or modal reopens

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
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-xs text-gray-400 italic mb-2">
                              Tweet Preview:
                            </p>
                            <p className="text-xs text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                              {tweetText}
                            </p>
                          </div>
                          <div className="text-[11px] leading-relaxed text-gray-400 mt-2 italic">
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
                size={Math.min(typeof window !== 'undefined' ? window.innerWidth - 100 : 300, 400)}
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