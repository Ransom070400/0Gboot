import { useState } from 'react';
import SpinWheel from './components/SpinWheel';
import WinModal from './components/WinModal';
import ClaimModal from './components/ClaimModal';

const LOGO_URL = "https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/pingou/0gl_ogo-removebg-preview.png";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const handleSpinComplete = (prize: string) => {
    setWonPrize(prize);
    setShowWinModal(true);
    setIsSpinning(false);
  };

  const handleClaimClick = () => {
    setShowWinModal(false);
    setShowClaimModal(true);
  };

  const handleClaimClose = () => {
    setShowClaimModal(false);
    setWonPrize(null);
  };

  const handleSpinStart = () => {
    if (!isSpinning) {
      setIsSpinning(true);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden font-sans">
      {/* Background Ambient Glow */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(106, 0, 255, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with New Logo */}
        <header className="py-4 sm:py-6 px-4 sm:px-8 border-b border-purple-100/50 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={LOGO_URL} 
                alt="0G Labs" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 leading-none tracking-tighter">0G LABS</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-600">Zero Gravity</span>
              </div>
            </div>
            
            <div className="text-right hidden xs:block">
              <h1 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Spin & Win</h1>
              <p className="text-[10px] text-gray-400 font-medium">ETF BOOTH EXCLUSIVE</p>
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center py-8 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
            
            {/* Wheel Container */}
            <div 
              onClick={handleSpinStart}
              className={`relative cursor-pointer transition-transform duration-300 ${isSpinning ? 'scale-95' : 'hover:scale-[1.02] active:scale-95'} w-full max-w-[320px] sm:max-w-[480px] md:max-w-[550px] aspect-square flex items-center justify-center`}
            >
              <SpinWheel onSpinComplete={handleSpinComplete} isSpinning={isSpinning} />
            </div>

            {/* Steps */}
            
          </div>
        </main>

        <footer className="py-8 text-center text-gray-400 text-[10px] uppercase tracking-widest font-medium">
          © 2026 0G Labs • Built for the Open Web
        </footer>
      </div>

      {/* Modals are called here at the root for perfect centering */}
      <WinModal
        isOpen={showWinModal}
        prize={wonPrize || ''}
        onClaim={handleClaimClick}
      />

      <ClaimModal
        isOpen={showClaimModal}
        prize={wonPrize || ''}
        onClose={handleClaimClose}
      />
    </div>
  );
}

function StepCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-purple-50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4 transform hover:scale-110 transition-transform cursor-default">{icon}</div>
      <h3 className="font-black text-gray-900 mb-2 text-sm uppercase tracking-tighter">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

export default App;