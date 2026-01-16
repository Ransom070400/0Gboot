import { motion } from 'framer-motion';
import { useState } from 'react';

interface SpinWheelProps {
  onSpinComplete: (prize: string) => void;
  isSpinning: boolean;
}

const prizes = ['T-Shirt', 'Cap', 'Bottle', 'Tote Bag', 'Jotter', 'Bangle'];

export default function SpinWheel({ onSpinComplete, isSpinning }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);

  const colors = [
    '#6A00FF',
    '#8B2FFF',
    '#6A00FF',
    '#8B2FFF',
    '#6A00FF',
    '#8B2FFF',
  ];

  const segmentAngle = 360 / prizes.length;

  const handleSpin = () => {
    if (isSpinning) return;

    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const targetAngle = 360 * 5 + (360 - randomPrizeIndex * segmentAngle - segmentAngle / 2);
    const newRotation = rotation + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      onSpinComplete(prizes[randomPrizeIndex]);
    }, 4000);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-purple-200/30 via-transparent to-transparent blur-3xl" />

      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
        <motion.div
          className="w-full h-full rounded-full relative overflow-hidden shadow-2xl"
          animate={{ rotate: rotation }}
          transition={{
            duration: 4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            boxShadow: '0 0 60px rgba(106, 0, 255, 0.3), 0 20px 80px rgba(106, 0, 255, 0.2)',
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {prizes.map((prize, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
              const midAngle = (startAngle + endAngle) / 2;

              const largeArcFlag = segmentAngle > 180 ? 1 : 0;

              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);

              const textRadius = 70;
              const textX = 100 + textRadius * Math.cos(midAngle);
              const textY = 100 + textRadius * Math.sin(midAngle);

              return (
                <g key={index}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colors[index]}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${index * segmentAngle}, ${textX}, ${textY})`}
                  >
                    {prize}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-0 rounded-full ring-4 ring-white/20" />
        </motion.div>

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0"
          style={{
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '25px solid #6A00FF',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        />

        <motion.button
          onClick={handleSpin}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-lg sm:text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSpinning ? { scale: 1.05 } : {}}
          whileTap={!isSpinning ? { scale: 0.95 } : {}}
          style={{
            boxShadow:
              'inset 0 2px 10px rgba(255,255,255,0.2), 0 8px 30px rgba(106, 0, 255, 0.5)',
          }}
          animate={
            !isSpinning
              ? {
                  y: [0, -8, 0],
                }
              : {}
          }
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          SPIN
        </motion.button>
      </div>
    </div>
  );
}
